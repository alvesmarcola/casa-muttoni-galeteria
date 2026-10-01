import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import galeto from "@/assets/galeto.jpg";
import massas from "@/assets/massas.jpg";
import ambiente from "@/assets/ambiente.jpg";

const WA = "https://wa.me/5554999648929";
const WA_MENU = `${WA}?text=${encodeURIComponent("Olá! Gostaria de receber o menu completo da Casa Muttoni.")}`;
const IG = "https://instagram.com/casamuttoni";
const ADDRESS = "R. F. G. Bier, 552 - Planalto, Gramado - RS";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Casa Muttoni Galeteria, " + ADDRESS)}`;
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent("Casa Muttoni Galeteria, " + ADDRESS)}&output=embed`;

const TITLE = "Casa Muttoni Galeteria | Gastronomia Italiana em Gramado";
const DESC =
  "Casa Muttoni Galeteria em Gramado. Gastronomia italiana, massas artesanais, galeto e uma experiência acolhedora inspirada na tradição da família Muttoni.";

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Casa Muttoni Galeteria",
  servesCuisine: ["Italiana", "Italiana colonial", "Galeteria"],
  telephone: "+55 54 99964-8929",
  sameAs: [IG],
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. F. G. Bier, 552",
    addressLocality: "Gramado",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  areaServed: "Gramado, Serra Gaúcha",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: Index,
});

const NAV = [
  ["Casa", "#casa"],
  ["Nossa História", "#historia"],
  ["Menu", "#menu"],
  ["Experiência", "#experiencia"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
] as const;

const MENU: [string, string[]][] = [
  ["Entradas", ["Capeletti em brodo", "Pão rústico italiano", "Polenta"]],
  ["Massas Tradicionais", ["Nhoque", "Spaghetti", "Rigatoni", "Nhoque ao molho de cogumelos"]],
  ["Massas Recheadas", ["Tortéi", "Ravioli", "Ravioli de ricota e nozes", "Tortéi de moranga"]],
  ["Galeto", ["Galeto Primo Canto"]],
  ["Acompanhamentos", ["Polenta", "Pão rústico italiano"]],
  ["Sobremesas", ["Sagu com creme", "Pera caramelada com sorvete", "Sorvete de creme com calda de vinho"]],
  ["Drinks", []],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Btn({ href, children, variant = "primary", external }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" | "light" | "accent"; external?: boolean }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    ghost: "border border-foreground/30 text-foreground hover:border-foreground",
    light: "border border-cream/50 text-cream hover:bg-cream hover:text-charcoal",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center px-7 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${styles}`}
    >
      {children}
    </a>
  );
}

function SectionHead({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="reveal">
      <div className="flex items-center gap-4">
        <span className="tricolore" />
        <span className={`eyebrow ${light ? "text-gold" : "text-accent"}`}>{eyebrow}</span>
      </div>
      <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{title}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-background/95 text-foreground backdrop-blur border-b" : "text-cream"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#casa" className="font-serif text-2xl tracking-wide">Casa Muttoni</a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] opacity-80 transition-opacity hover:opacity-100">{l}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="border border-current px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-70">Reservar</a>
        </nav>
        <button aria-label="Abrir menu" onClick={() => setOpen(!open)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t px-6 pb-8 lg:hidden">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="border-b py-4 font-serif text-2xl">{l}</a>
          ))}
          <div className="mt-6"><Btn href={WA} external>Reservar mesa</Btn></div>
        </nav>
      )}
    </header>
  );
}

function Img({ src, alt, className = "", w, h, eager }: { src: string; alt: string; className?: string; w: number; h: number; eager?: boolean }) {
  return <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} className={`h-full w-full object-cover ${className}`} />;
}

function Index() {
  useReveal();
  return (
    <div className="paper">
      <Header />

      {/* HERO */}
      <section id="casa" className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0">
          <Img src={hero} alt="Mesa com massas artesanais, vinho e luz de vela" w={1920} h={1088} eager className="hero-zoom opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/30" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:pb-28">
          <p className="eyebrow text-gold">Casa Muttoni · Galeteria</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
            Tradição italiana <em className="text-gold">à mesa.</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
            Uma experiência gastronômica que reúne massas artesanais, galeto e o sabor da cozinha de família em Gramado.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Btn href={WA} external>Reservar mesa</Btn>
            <Btn href="#menu" variant="light">Conheça nosso menu</Btn>
          </div>
          <div className="mt-16 flex items-center gap-4 text-cream/60">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow">Gramado • Serra Gaúcha</span>
          </div>
        </div>
      </section>

      {/* ESSÊNCIA */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:py-36">
        <div className="reveal relative md:col-span-6">
          <div className="aspect-[4/5] overflow-hidden"><Img src={massas} alt="Massa fresca sendo preparada à mão" w={1024} h={1280} /></div>
          <div className="absolute -bottom-8 right-0 bg-primary px-8 py-6 text-primary-foreground md:-right-10">
            <p className="eyebrow text-gold">Desde</p>
            <p className="font-serif text-5xl">2011</p>
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-5 md:col-start-8">
          <SectionHead eyebrow="Nossa essência" title="Uma casa feita de histórias." />
          <div className="reveal mt-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>A Casa Muttoni nasceu do desejo de cozinhar como em casa — preservando as receitas, os sabores e o espírito familiar que atravessam gerações.</p>
            <p>Aqui, cada prato carrega a memória da cozinha italiana colonial da Serra Gaúcha, servida com o cuidado de quem recebe a família à mesa.</p>
          </div>
          <div className="reveal mt-10 flex items-center gap-5 border-y py-6">
            <span className="font-serif text-4xl italic text-accent">✦</span>
            <p className="font-serif text-2xl">Massas feitas na casa</p>
          </div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section id="historia" className="bg-charcoal py-24 text-cream md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Nossa história" title="Da família Muttoni para a sua mesa." light />
            <p className="reveal mt-8 max-w-lg leading-relaxed text-cream/70">
              A história da Casa Muttoni está ligada à imigração italiana que deu forma à Serra Gaúcha. Das cozinhas de família vieram as receitas, o gosto pela mesa farta e a comida afetiva que hoje recebemos em Gramado.
            </p>
            <ol className="reveal mt-12 border-l border-gold/40">
              {[
                ["Imigração italiana", "A família e a cultura italiana chegam à Serra Gaúcha."],
                ["Receitas de família", "Sabores preservados e passados de geração em geração."],
                ["2011", "Nasce a Casa Muttoni, em Gramado."],
                ["Hoje", "Massas frescas, galeto e a mesa sempre posta para receber."],
              ].map(([t, d]) => (
                <li key={t} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rotate-45 bg-gold" />
                  <p className="font-serif text-2xl">{t}</p>
                  <p className="mt-1 text-sm text-cream/60">{d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal grid grid-cols-5 gap-4 self-center">
            <div className="col-span-3 aspect-[3/4] overflow-hidden"><Img src={ambiente} alt="Salão do restaurante à noite" w={1280} h={960} /></div>
            <div className="col-span-2 mt-16 flex aspect-[3/4] items-center justify-center border border-dashed border-gold/50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Espaço reservado<br />para foto histórica<br />da família</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHead eyebrow="Especialidades" title="Sabores que fazem parte da nossa história." />
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {([
            ["Galeto", "Galeto preparado no estilo tradicional, um dos símbolos da casa.", galeto, "object-bottom"],
            ["Massas frescas", "Massas produzidas na própria cozinha da Casa Muttoni.", massas, ""],
            ["Sequência de massas", "Uma experiência farta com diferentes massas e molhos.", hero, "object-right"],
            ["Vinhos", "Uma seleção de vinhos para acompanhar a experiência.", ambiente, "object-left"],
          ] as [string, string, string, string][]).map(([t, d, img, pos], i) => (
            <article key={t} className="reveal group" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="aspect-[3/4] overflow-hidden">
                <Img src={img} alt={t} w={800} h={1066} className={`${pos} transition-transform duration-[1.6s] group-hover:scale-105`} />
              </div>
              <p className="mt-6 font-serif text-sm italic text-accent">0{i + 1}</p>
              <h3 className="mt-1 text-3xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="border-y bg-secondary/60 py-24 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="eyebrow text-accent">Il menù</p>
            <h2 className="reveal mt-5 text-5xl md:text-7xl">Menu</h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">Uma seleção de pratos da casa. Consulte valores e disponibilidade com nossa equipe.</p>
          </div>
          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {MENU.map(([cat, items]) => (
              <div key={cat} className="reveal">
                <div className="flex items-baseline gap-4 border-b border-foreground/20 pb-3">
                  <h3 className="text-3xl italic">{cat}</h3>
                  <span className="h-px flex-1 bg-gold/40" />
                </div>
                {items.length ? (
                  <ul className="mt-5 space-y-3">
                    {items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-[0.95rem]">
                        <span className="h-1 w-1 rotate-45 bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm italic text-muted-foreground">Consulte nossa carta de drinks na casa.</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center"><Btn href={WA_MENU} variant="ghost" external>Ver menu completo</Btn></div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <SectionHead eyebrow="Experiência" title="Mais do que uma refeição." />
          <p className="reveal max-w-md text-lg leading-relaxed text-muted-foreground">Um lugar para reunir pessoas, compartilhar histórias e aproveitar a mesa sem pressa.</p>
        </div>
        <div className="mt-20 grid border-t md:grid-cols-3">
          {[
            ["Tradição", "Receitas e sabores que atravessam gerações."],
            ["Artesanal", "Massas e preparos feitos com cuidado."],
            ["Acolhimento", "Uma experiência inspirada na cozinha de família."],
          ].map(([t, d], i) => (
            <div key={t} className="reveal border-b py-10 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
              <p className="font-serif text-6xl text-gold">{["I", "II", "III"][i]}</p>
              <h3 className="mt-6 text-3xl">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="px-4 pb-24 md:px-6 md:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 px-2"><SectionHead eyebrow="Galeria" title="Momentos à mesa." /></div>
          <div className="columns-2 gap-3 md:columns-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5">
            {[
              [hero, "Massas e vinho", "aspect-[4/5]"],
              [galeto, "Galeto", "aspect-square object-bottom"],
              [ambiente, "Ambiente", "aspect-[4/3]"],
              [massas, "Massa artesanal", "aspect-[3/4]"],
              [ambiente, "Detalhes do salão", "aspect-[3/4] object-right"],
              [hero, "Vinhos", "aspect-[4/3] object-left"],
            ].map(([src, alt, cls], i) => (
              <figure key={i} className="reveal group relative break-inside-avoid overflow-hidden">
                <img src={src} alt={alt} loading="lazy" className={`w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105 ${cls}`} />
                <figcaption className="absolute inset-0 flex items-end bg-charcoal/0 p-5 opacity-0 transition-all duration-700 group-hover:bg-charcoal/35 group-hover:opacity-100">
                  <span className="font-serif text-xl italic text-cream">{alt}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 px-2 text-xs text-muted-foreground">Imagens ilustrativas — serão substituídas por fotos reais da Casa Muttoni.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal py-32 text-center text-cream md:py-44">
        <div className="absolute inset-0 opacity-35"><Img src={ambiente} alt="" w={1280} h={960} /></div>
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="reveal relative mx-auto max-w-3xl px-6">
          <span className="tricolore mx-auto block" />
          <h2 className="mt-8 text-5xl md:text-7xl">Sua mesa está esperando.</h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/75">Venha viver uma experiência de gastronomia italiana em Gramado.</p>
          <div className="mt-10"><Btn href={WA} variant="accent" external>Reservar pelo WhatsApp</Btn></div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section id="contato" className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <SectionHead eyebrow="Localização" title="Venha nos visitar." />
          <dl className="reveal mt-10 space-y-7">
            <div>
              <dt className="eyebrow text-muted-foreground">Endereço</dt>
              <dd className="mt-2 font-serif text-2xl leading-snug">Casa Muttoni Galeteria<br />R. F. G. Bier, 552<br />Planalto — Gramado/RS</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Telefone / WhatsApp</dt>
              <dd className="mt-2 text-lg"><a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-accent">(54) 99964-8929</a></dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Instagram</dt>
              <dd className="mt-2 text-lg"><a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-accent">@casamuttoni</a></dd>
            </div>
          </dl>
          <div className="reveal mt-10"><Btn href={MAPS} external>Como chegar</Btn></div>
        </div>
        <div className="reveal min-h-[380px] border p-2 md:col-span-7">
          <iframe title="Mapa Casa Muttoni" src={MAP_EMBED} loading="lazy" className="h-full min-h-[380px] w-full grayscale-[60%]" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl">Casa Muttoni</p>
            <p className="mt-2 font-serif text-lg italic text-gold">Tradição italiana à mesa.</p>
          </div>
          <nav className="grid grid-cols-2 gap-3 text-sm">
            {NAV.map(([l, h]) => <a key={h} href={h} className="opacity-75 hover:opacity-100">{l}</a>)}
          </nav>
          <div className="space-y-2 text-sm opacity-80">
            <p><a href={IG} target="_blank" rel="noopener noreferrer">@casamuttoni</a></p>
            <p><a href={WA} target="_blank" rel="noopener noreferrer">(54) 99964-8929</a></p>
            <p>R. F. G. Bier, 552 — Planalto, Gramado/RS</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15 py-6 text-center text-xs opacity-60">© Casa Muttoni Galeteria · Gramado • Serra Gaúcha</div>
      </footer>

      {/* WhatsApp flutuante */}
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" /></svg>
      </a>
    </div>
  );
}
