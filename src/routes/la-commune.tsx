import { createFileRoute } from "@tanstack/react-router";
import { Church, Landmark, Trees, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Gallery } from "@/components/site/Gallery";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Todo } from "@/components/site/Todo";
import { images, TODO } from "@/lib/site-data";

export const Route = createFileRoute("/la-commune")({
  head: () => ({
    meta: [
      { title: "La commune — Mairie d'Esparron" },
      {
        name: "description",
        content: "Découvrez Esparron : présentation du village, histoire, patrimoine et vie locale.",
      },
      { property: "og:title", content: "La commune d'Esparron" },
      { property: "og:description", content: "Présentation, histoire, patrimoine et vie locale d'Esparron." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LaCommune,
});

const keyFacts = [
  { label: "Département", value: TODO("département") },
  { label: "Habitants", value: TODO("population (source INSEE)") },
  { label: "Superficie", value: TODO("superficie") },
  { label: "Altitude", value: TODO("altitude") },
];

const patrimoine = [
  { icon: Church, title: "Édifices religieux", text: TODO("église, chapelles et leur histoire") },
  { icon: Landmark, title: "Patrimoine bâti", text: TODO("fontaines, lavoirs, monuments") },
  { icon: Trees, title: "Patrimoine naturel", text: TODO("sites naturels, sentiers de randonnée") },
];

function LaCommune() {
  return (
    <>
      <PageHero
        eyebrow="Découvrir"
        title="La commune d'Esparron"
        intro="Un village, son histoire, son patrimoine et celles et ceux qui le font vivre."
        image={images.paysage}
      />

      {/* Présentation */}
      <section className="container-site grid gap-12 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Présentation" title="Le village" />
          <div className="prose-civic">
            <p>
              Texte temporaire — Esparron est une commune rurale nichée au cœur d'un paysage de
              collines, de forêts et de cultures. Cette section présentera le village, sa
              situation géographique et ce qui fait son caractère.
            </p>
            <p>
              <Todo value={TODO("présentation officielle de la commune")} />
            </p>
          </div>
        </div>
        <aside className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-primary">Repères</h3>
          <dl className="mt-4 divide-y">
            {keyFacts.map((f) => (
              <div key={f.label} className="flex items-start justify-between gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd className="text-right">
                  <Todo value={f.value} />
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Histoire */}
      <section className="bg-muted py-20">
        <div className="container-site grid items-center gap-12 md:grid-cols-2">
          <img
            src={images.ruelle}
            alt="Ruelle pavée du village (photo d'illustration)"
            loading="lazy"
            width={1280}
            height={896}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
          />
          <div>
            <SectionHeading eyebrow="Histoire" title="Des origines à aujourd'hui" />
            <div className="prose-civic">
              <p>
                Cette partie retracera les grandes étapes de l'histoire de la commune : ses
                origines, son évolution au fil des siècles et les événements qui l'ont marquée.
              </p>
              <p>
                <Todo value={TODO("histoire de la commune — à rédiger à partir de sources vérifiées")} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patrimoine */}
      <section className="container-site py-20">
        <SectionHeading eyebrow="Patrimoine" title="Un héritage à préserver" />
        <div className="grid gap-6 md:grid-cols-3">
          {patrimoine.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-xl border bg-card p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-civic-green-soft text-civic-green">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-2 text-sm">
                <Todo value={text} />
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Vie locale */}
      <section className="bg-primary-soft py-20">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Vie locale" title="Vivre à Esparron" />
            <div className="prose-civic">
              <p>
                Commerces, services, écoles, marchés, transports, associations : cette section
                réunira les informations utiles au quotidien des habitants.
              </p>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {["Commerces et artisans", "École et enfance", "Transports", "Santé"].map((t) => (
              <li key={t} className="rounded-lg border bg-card p-4">
                <span className="flex items-center gap-2 font-semibold text-primary">
                  <Users className="h-4 w-4 text-civic-green" /> {t}
                </span>
                <span className="mt-1 block text-sm">
                  <Todo value={TODO("informations")} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photos */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="En images"
          title="Photos de la commune"
          intro="Photos d'illustration en attendant les photos d'Esparron fournies par la mairie."
        />
        <Gallery
          items={[
            { src: images.villageHero, alt: "Vue du village (photo d'illustration)" },
            { src: images.patrimoine, alt: "Chapelle et fontaine (photo d'illustration)" },
            { src: images.ruelle, alt: "Ruelle fleurie (photo d'illustration)" },
            { src: images.paysage, alt: "Collines et vignes (photo d'illustration)" },
            { src: images.mairie, alt: "Façade de mairie (photo d'illustration)" },
          ]}
        />
      </section>
    </>
  );
}
