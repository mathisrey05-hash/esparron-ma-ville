# Héberger le site sur une VM Linux, à côté de WordPress

Ce guide installe le site de la mairie d'Esparron sur un serveur Linux (Ubuntu ou Debian)
qui fait déjà tourner WordPress. Les deux sites restent **séparés** :

```text
Navigateur ──► Apache ou Nginx (port 80/443, déjà utilisé par WordPress)
                 ├── blog.exemple.fr     ──► WordPress (inchangé)
                 └── esparron.exemple.fr ──► site de la mairie (Node.js, port 3000)
```

> Testé : construction « serveur Node » du projet, démarrage avec Node 22, les 12 pages
> répondent (200, et 404 pour une page inexistante) et la navigation fonctionne.
> Non testé : la configuration Apache/Nginx/HTTPS de votre VM (elle dépend de la machine).

---

## Option simple : pages HTML pour Apache, sans Node.js

Si vous voulez seulement déposer des fichiers (avec un `index.html`) dans Apache, utilisez
la version « pages HTML » du site. Chaque page devient un fichier `index.html` :

```text
site-statique/
├── index.html                 (accueil)
├── la-commune/index.html
├── mairie/index.html
├── actualites/index.html      (+ un dossier par article)
├── associations/index.html    (+ bouliste/, chasseurs/, comite/)
├── contact/index.html
├── connexion/index.html
├── 404.html                   (page « introuvable »)
├── .htaccess                  (réglages Apache, fichier caché)
└── assets/                    (images, styles, scripts)
```

> Testé : les 17 pages servies par Apache 2.4 (adresses avec et sans `/` final, page 404,
> images, menu, menu mobile, filtres des actualités, contrôle du formulaire de contact).

**Fabriquer le dossier** (sur votre ordinateur ou la VM, Node.js 20+ nécessaire seulement ici) :

```bash
npm install
npm run build:static      # crée le dossier site-statique/
```

**Le déposer sur la VM** (le site doit être à la **racine** d'une adresse, pas dans un sous-dossier) :

```bash
sudo mkdir -p /var/www/esparron-html
sudo cp -r site-statique/. /var/www/esparron-html/     # le « . » copie aussi .htaccess
sudo chown -R www-data:www-data /var/www/esparron-html
sudo a2enmod rewrite
```

Fichier `/etc/apache2/sites-available/esparron.conf` :

```apache
<VirtualHost *:80>
    ServerName esparron.sondomaine.fr
    DocumentRoot /var/www/esparron-html
    <Directory /var/www/esparron-html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

```bash
sudo a2ensite esparron
sudo apachectl configtest && sudo systemctl reload apache2
```

Sans nom de domaine, sur le réseau local : remplacez `*:80` par `*:8081`, ajoutez la ligne
`Listen 8081` dans `/etc/apache2/ports.conf`, rechargez Apache et ouvrez `http://IP-DE-LA-VM:8081`.
WordPress reste sur le port 80, inchangé.

**Limites :** le formulaire de contact et l'Espace personnel restent inactifs dans cette version.
Une modification du site n'apparaît qu'après avoir refait `npm run build:static` et recopié le
dossier. Quand la base de données et les tableaux de bord seront ajoutés, il faudra passer à la
méthode avec Node.js ci-dessous.

---

## 0. Ce qu'il faut demander à votre ami

- Un accès **SSH** à la VM avec un compte qui peut utiliser `sudo`.
- Savoir si WordPress tourne avec **Apache** ou **Nginx** :
  `sudo systemctl status apache2 nginx`
- Un **nom de domaine ou sous-domaine** pour le site (ex. `esparron.sondomaine.fr`) qui
  pointe vers l'adresse IP de la VM.
  Sans nom de domaine (VM seulement sur le réseau local), voir la section 7.

## 1. Installer Node.js 22 et Git

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git
node --version   # doit afficher v22.x (v20 minimum)
```

## 2. Récupérer le projet

Le plus simple : passer par GitHub (Lovable → Project settings → Git → connecter GitHub).

```bash
sudo mkdir -p /var/www/esparron
sudo chown $USER:$USER /var/www/esparron
git clone https://github.com/VOTRE-COMPTE/VOTRE-DEPOT.git /var/www/esparron
cd /var/www/esparron
```

Sans GitHub : téléchargez le ZIP, puis copiez-le depuis votre ordinateur :
`scp esparron.zip utilisateur@IP-DE-LA-VM:/var/www/` puis `unzip` sur la VM.

## 3. Construire le site

```bash
cd /var/www/esparron
npm install
npm run build:vm
```

Le résultat se trouve dans le dossier `.output/`. Test rapide :

```bash
PORT=3000 npm run start:vm
# dans un 2e terminal :
curl -I http://localhost:3000     # doit répondre "HTTP/1.1 200 OK"
```

Arrêtez ensuite avec `Ctrl + C`.

> Le port 3000 doit être libre : `sudo ss -ltnp | grep 3000` ne doit rien afficher.
> Sinon, choisissez un autre port (3001…) partout dans ce guide.

## 4. Laisser le site allumé en permanence (service systemd)

Créez le fichier `/etc/systemd/system/esparron.service` :

```ini
[Unit]
Description=Site de la mairie d'Esparron
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/esparron
ExecStart=/usr/bin/node .output/server/index.mjs
Environment=PORT=3000
Environment=HOST=127.0.0.1
Environment=NODE_ENV=production
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

Puis :

```bash
sudo chown -R www-data:www-data /var/www/esparron
sudo systemctl daemon-reload
sudo systemctl enable --now esparron
sudo systemctl status esparron      # doit afficher "active (running)"
journalctl -u esparron -f           # voir les messages du site en direct
```

`HOST=127.0.0.1` : le site n'est joignable que par Apache/Nginx, pas directement depuis internet.

## 5. Brancher le sous-domaine

### Si WordPress utilise Apache

```bash
sudo a2enmod proxy proxy_http headers
```

Fichier `/etc/apache2/sites-available/esparron.conf` :

```apache
<VirtualHost *:80>
    ServerName esparron.sondomaine.fr

    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

```bash
sudo a2ensite esparron
sudo apachectl configtest && sudo systemctl reload apache2
```

### Si WordPress utilise Nginx

Fichier `/etc/nginx/sites-available/esparron` :

```nginx
server {
    listen 80;
    server_name esparron.sondomaine.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/esparron /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

La configuration de WordPress n'est pas touchée : on ajoute seulement un nouveau site.

## 6. Activer le HTTPS (cadenas)

Obligatoire dès que la connexion (Espace personnel) sera active.

```bash
sudo apt install -y certbot python3-certbot-apache   # ou python3-certbot-nginx
sudo certbot --apache -d esparron.sondomaine.fr      # ou --nginx
```

Certbot renouvelle ensuite le certificat tout seul.

## 7. Sans nom de domaine (réseau local uniquement)

Pour une démonstration en classe, sur le même réseau que la VM :
dans le service (étape 4), remplacez `HOST=127.0.0.1` par `HOST=0.0.0.0`, puis
`sudo systemctl restart esparron` et ouvrez `http://IP-DE-LA-VM:3000`.
Pensez à ouvrir le port si un pare-feu est actif : `sudo ufw allow 3000/tcp`.

## 8. Mettre à jour le site après une modification dans Lovable

```bash
cd /var/www/esparron
sudo -u www-data git pull
sudo -u www-data npm install
sudo -u www-data npm run build:vm
sudo systemctl restart esparron
```

## 9. Après l'étape base de données (Lovable Cloud)

Quand la connexion et la base de données seront branchées, le site aura besoin de ses
réglages de connexion (adresse du projet et clé publique). Ils seront à recopier dans un
fichier `.env` sur la VM **avant** `npm run build:vm`, et ajoutés dans le service avec des lignes
`Environment=...`. Ce guide sera complété à ce moment-là avec la liste exacte.
La clé secrète (`service_role`) ne doit jamais être mise dans ce fichier côté navigateur.

## En cas de problème

| Symptôme | Vérification |
| --- | --- |
| `502 Bad Gateway` | Le site est-il lancé ? `sudo systemctl status esparron` |
| Page de WordPress à la place du site | Le `ServerName` / `server_name` correspond-il exactement au sous-domaine ? |
| `EADDRINUSE` dans les messages | Le port est déjà pris : changez `PORT` |
| La construction échoue | `node --version` doit être 20 ou plus |
| Pages HTML : `/mairie` affiche « Not Found » | `.htaccess` a-t-il été copié ? `AllowOverride All` et `a2enmod rewrite` sont-ils actifs ? |
| Pages HTML : site sans images ni couleurs | Le site est dans un sous-dossier : il doit être à la racine du `DocumentRoot` |
