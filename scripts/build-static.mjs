// Fabrique une version « pages HTML » du site pour Apache (sans Node.js sur la VM).
// 1. construit le site en mode serveur Node (build:vm), 2. le démarre en local,
// 3. visite toutes les pages en suivant les liens, 4. enregistre chaque page en
//    <chemin>/index.html dans le dossier site-statique/, avec images, styles et scripts.
import { spawn, execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT = "site-statique";
const PORT = process.env.STATIC_PORT || "3999";
const ORIGIN = `http://127.0.0.1:${PORT}`;

if (!process.argv.includes("--skip-build")) {
  // Construction « serveur Node » ; on retire les variables propres à l'éditeur Lovable,
  // qui forceraient l'autre format de construction.
  const env = { ...process.env, NITRO_PRESET: "node-server" };
  delete env.LOVABLE_SANDBOX;
  delete env.DEV_SERVER__PROJECT_PATH;
  execSync("npm run build:vm", { stdio: "inherit", env });
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(".output/public", OUT, { recursive: true });

const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT, HOST: "127.0.0.1", NODE_ENV: "production" },
  stdio: ["ignore", "inherit", "inherit"],
});

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(ORIGIN + "/");
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Le site ne démarre pas sur " + ORIGIN);
}

function linksIn(html) {
  const found = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const p = m[1];
    if (p.startsWith("//") || /\.[a-z0-9]{2,5}$/i.test(p)) continue; // fichiers (css, ico…)
    found.add(p.length > 1 ? p.replace(/\/+$/, "") : p);
  }
  return found;
}

function fileFor(path) {
  return path === "/" ? join(OUT, "index.html") : join(OUT, path, "index.html");
}

let failed = 0;
try {
  await waitForServer();
  const queue = ["/"];
  const seen = new Set(queue);
  while (queue.length) {
    const path = queue.shift();
    const res = await fetch(ORIGIN + path);
    const type = res.headers.get("content-type") || "";
    if (!type.includes("text/html")) continue;
    const html = await res.text();
    if (res.status !== 200) {
      console.error(`✗ ${path} → ${res.status}`);
      failed++;
      continue;
    }
    const file = fileFor(path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`✓ ${path}`);
    for (const l of linksIn(html)) if (!seen.has(l)) { seen.add(l); queue.push(l); }
  }

  // Page 404 servie par Apache pour les adresses inconnues
  const notFound = await fetch(ORIGIN + "/page-introuvable-esparron");
  writeFileSync(join(OUT, "404.html"), await notFound.text());

  writeFileSync(
    join(OUT, ".htaccess"),
    [
      "# Site de la mairie d'Esparron — version pages HTML",
      "DirectoryIndex index.html",
      "# /mairie (sans barre finale) affiche directement /mairie/index.html",
      "DirectorySlash Off",
      "ErrorDocument 404 /404.html",
      "",
      "<IfModule mod_rewrite.c>",
      "  RewriteEngine On",
      "  RewriteCond %{REQUEST_FILENAME} !-f",
      "  RewriteCond %{REQUEST_FILENAME}/index.html -f",
      "  RewriteRule ^(.+?)/?$ $1/index.html [L]",
      "</IfModule>",
      "",
      "<IfModule mod_expires.c>",
      "  ExpiresActive On",
      '  ExpiresByType image/jpeg "access plus 30 days"',
      '  ExpiresByType text/css "access plus 30 days"',
      '  ExpiresByType application/javascript "access plus 30 days"',
      "</IfModule>",
      "",
    ].join("\n"),
  );
  console.log(`\n${seen.size} adresses visitées. Résultat : dossier ${OUT}/`);
} finally {
  server.kill();
}
if (failed || !existsSync(join(OUT, "index.html"))) {
  console.error(`${failed} page(s) en erreur`);
  process.exit(1);
}
