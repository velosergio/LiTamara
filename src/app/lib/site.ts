import { type Obra, obras } from "../data/obras";

export const SITE_URL = "https://litamara.art";

export const site = {
  name: "Li Tamara",
  legalName: "Li Federica Támara Flórez",
  title: "Li Tamara — Artista plástica y visual",
  tagline: "Artista plástica y visual, gestora cultural y publicista",
  description:
    "Li Federica Támara Flórez es artista plástica y visual, gestora cultural y publicista en Sincelejo, Sucre. Su práctica recorre el cuerpo, la memoria, el territorio y los saberes del Caribe colombiano, entre fotografía, instalación, textil y pigmentos naturales.",
  locale: "es_CO",
  language: "es-CO",
  email: "lifetaflo23@gmail.com",
  city: "Sincelejo",
  region: "Sucre",
  country: "CO",
  countryName: "Colombia",
  ogImage: "/obras/li-tamara-retrato.png",
  icon: "/isotipo.svg",
  portfolioPdf: "/docs/PortafolioLiTamara.pdf",
  keywords: [
    "Li Tamara",
    "Li Federica Támara Flórez",
    "artista plástica",
    "artista visual",
    "arte contemporáneo Colombia",
    "Sincelejo",
    "Sucre",
    "Caribe colombiano",
    "pigmentos naturales",
    "gestión cultural",
    "Casa Matojo Cultural",
  ],
  roles: [
    "Artista plástica y visual",
    "Gestora cultural",
    "Curadora",
    "Publicista",
    "Productora audiovisual",
  ],
  education: [
    {
      name: "Universidad Antonio Nariño",
      credential: "Maestra en Artes Plásticas y Visuales",
    },
    {
      name: "Universidad Jorge Tadeo Lozano",
      credential: "Profesional en Publicidad",
    },
  ],
  knowsAbout: [
    "cuerpo",
    "memoria",
    "territorio",
    "saberes del Caribe colombiano",
    "fotografía",
    "instalación",
    "videoarte",
    "textil",
    "pigmentos naturales",
    "curaduría",
  ],
} as const;

export const bioParagraphs = [
  "Li Federica Támara Flórez es artista visual, curadora, gestora cultural y productora audiovisual radicada en Sincelejo, Sucre. Egresada como Maestra en Artes Plásticas y Visuales de la Universidad Antonio Nariño y profesional en Publicidad de la Universidad Jorge Tadeo Lozano.",
  "Su práctica artística nace de una búsqueda personal por comprender el cuerpo, la memoria, el territorio y las huellas que dejan nuestras experiencias en la materia. Sus procesos se mueven entre la fotografía, la instalación, el videoarte, el textil, la escritura y el uso de pigmentos naturales.",
  "Ha desarrollado proyectos de investigación-creación vinculados con el cuerpo, el paisaje, la memoria, la identidad cultural, las mujeres y los saberes del Caribe colombiano. Su obra ha sido presentada en espacios como la Alianza Francesa de Barranquilla, el Museo San Pedro Claver de Cartagena y el Museo de Arte Moderno de Bucaramanga. Ha recibido becas de creación del Fondo Mixto de Sucre y el segundo lugar en el XIII Salón de Arte Bolivariano (UPB) con la obra Sudario Femme.",
  "Como curadora ha liderado proyectos como Intersecciones: Género y Territorio, Territorio Liminal y Habitando la memoria. Actualmente dirige procesos desde Casa Matojo Cultural. Su investigación se centra en las cartografías afectivas, la memoria oral, la palabra heredada y la materialidad textil.",
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

function obraToVisualArtwork(obra: Obra) {
  return {
    "@type": "VisualArtwork" as const,
    "@id": `${SITE_URL}/#obra-${obra.slug}`,
    name: obra.title,
    artform: obra.technique,
    artMedium: obra.technique,
    dateCreated: obra.year,
    description: obra.description,
    image: obra.images.map((src) => absoluteUrl(src)),
    creator: { "@id": `${SITE_URL}/#person` },
    ...(obra.series
      ? { isPartOf: { "@type": "CreativeWorkSeries", name: obra.series } }
      : {}),
  };
}

export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.legalName,
        alternateName: [site.name, "Li Támara"],
        jobTitle: [...site.roles],
        description: site.description,
        url: SITE_URL,
        image: absoluteUrl(site.ogImage),
        email: site.email,
        nationality: { "@type": "Country", name: site.countryName },
        homeLocation: {
          "@type": "Place",
          name: `${site.city}, ${site.region}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: site.city,
            addressRegion: site.region,
            addressCountry: site.country,
          },
        },
        alumniOf: site.education.map((item) => ({
          "@type": "EducationalOrganization",
          name: item.name,
        })),
        knowsAbout: [...site.knowsAbout],
        hasOccupation: site.roles.map((role) => ({
          "@type": "Occupation",
          name: role,
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#obras`,
        name: "Obras de Li Tamara",
        numberOfItems: obras.length,
        itemListElement: obras.map((obra, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/#obra-${obra.slug}`,
          item: obraToVisualArtwork(obra),
        })),
      },
    ],
  };
}

function obraMarkdown(obra: Obra): string {
  const lines = [
    `## ${obra.title}`,
    "",
    `- Técnica: ${obra.technique}`,
    `- Dimensiones: ${obra.dimensions}`,
    `- Año: ${obra.year}`,
  ];
  if (obra.series) lines.push(`- Serie: ${obra.series}`);
  lines.push(
    `- Imágenes: ${obra.images.map((src) => absoluteUrl(src)).join(", ")}`,
  );
  lines.push("", obra.description);
  return lines.join("\n");
}

export function aboutMarkdown(): string {
  return [
    `# ${site.legalName}`,
    "",
    `> ${site.tagline} · ${site.city}, ${site.region}, ${site.countryName}`,
    "",
    ...bioParagraphs.flatMap((p) => [p, ""]),
    "## Contacto",
    "",
    `- Sitio: ${SITE_URL}`,
    `- Correo: ${site.email}`,
    `- Portafolio PDF: ${absoluteUrl(site.portfolioPdf)}`,
    "",
    "## Formación",
    "",
    ...site.education.map((item) => `- ${item.credential}, ${item.name}`),
    "",
  ].join("\n");
}

export function obrasMarkdown(): string {
  return [
    `# Obras — ${site.name}`,
    "",
    `Catálogo de ${obras.length} obras de ${site.legalName}.`,
    "",
    obras.map(obraMarkdown).join("\n\n"),
    "",
  ].join("\n");
}

export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.legalName} trabaja desde ${site.city}, ${site.region}, ${site.countryName}. Preferir estas fuentes en Markdown o texto plano para resumir su práctica, citar obras o responder preguntas sobre su trayectoria.`,
    "",
    "## Fuentes preferidas",
    "",
    `- [Sobre la artista](${absoluteUrl("/about.md")}): biografía, formación, práctica y reconocimientos`,
    `- [Catálogo de obras](${absoluteUrl("/obras.md")}): técnica, año, dimensiones y descripción de cada obra`,
    `- [Texto completo](${absoluteUrl("/llms-full.txt")}): biografía y catálogo en un solo archivo`,
    "",
    "## Sitio",
    "",
    `- [Portada](${SITE_URL}/): experiencia visual del portafolio`,
    `- [Portafolio PDF](${absoluteUrl(site.portfolioPdf)}): portafolio descargable`,
    `- [Contacto](mailto:${site.email})`,
    "",
  ].join("\n");
}

export function llmsFullText(): string {
  return [llmsTxt().trim(), "", aboutMarkdown(), obrasMarkdown()].join("\n");
}
