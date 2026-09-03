import Link from "next/link";
import { obras } from "../data/obras";
import { bioParagraphs, site } from "../lib/site";

export default function CrawlableContent() {
  return (
    <section className="sr-only" aria-label="Sobre la artista y su obra">
      <p>
        {site.tagline}. {site.city}, {site.region}, {site.countryName}.
      </p>
      {bioParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
      ))}
      <p>
        Contacto: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        Portafolio en PDF: <a href={site.portfolioPdf}>Descargar portafolio</a>
      </p>
      <p>
        Fuentes para modelos de lenguaje: <Link href="/llms.txt">llms.txt</Link>
        , <Link href="/about.md">about.md</Link>,{" "}
        <Link href="/obras.md">obras.md</Link>
      </p>

      <h2>Obras</h2>
      {obras.map((obra) => (
        <article key={obra.slug}>
          <h3>{obra.title}</h3>
          <p>
            {obra.technique}. {obra.dimensions}. {obra.year}
            {obra.series ? `. Serie ${obra.series}` : ""}.
          </p>
          <p>{obra.description}</p>
        </article>
      ))}
    </section>
  );
}
