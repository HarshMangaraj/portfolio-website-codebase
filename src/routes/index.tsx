import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg-v2.mp4.asset.json";
import ctaBg from "@/assets/cta-bg.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const ease = [0.2, 0.8, 0.2, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="line-mask">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between pointer-events-none">
      <a href="#top" className="pointer-events-auto eyebrow text-foreground/90 hover:text-foreground transition-colors">
        HARSH B. MANGARAJ
      </a>
      <nav className="pointer-events-auto hidden md:flex gap-10">
        {[
          { l: "Work", h: "#work" },
          { l: "About", h: "#about" },
          { l: "Contact", h: "#contact" },
        ].map((i) => (
          <a key={i.h} href={i.h} className="eyebrow hover:text-foreground transition-colors">
            {i.l}
          </a>
        ))}
      </nav>
      <a href="#contact" className="pointer-events-auto eyebrow md:hidden">MENU</a>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
      <video className="media-bg" autoPlay muted loop playsInline preload="auto" src={heroBg.url} />
      <div className="media-veil" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1400px] w-full">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="eyebrow mb-10"
        >
          [ I. Full-Stack & AI Engineer — Portfolio ’26 ]
        </motion.p>

        <h1 className="huge text-foreground text-[18vw] md:text-[11vw]">
          <Reveal delay={0.2}>BUILDING</Reveal>
          <Reveal delay={0.45}>
            <span className="italic-serif text-foreground/85">with intent.</span>
          </Reveal>
        </h1>

        <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
            className="md:col-span-6 italic-serif text-xl md:text-2xl text-foreground/80 leading-snug"
          >
            A final-year BCA student shipping production AI applications — React, Next.js, PyTorch and LLMs woven into things people actually use.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            className="md:col-span-4 md:col-start-8 space-y-2 eyebrow"
          >
            <p>Bhubaneswar / Open to Remote</p>
            <p className="text-foreground">★ SIH 2025 — National Runner-Up</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 1 }}
            className="md:col-span-2 md:justify-self-end"
          >
            <a href="#work" className="disc">Begin</a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

type Project = {
  num: string;
  title: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  href: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "FIT.AI",
    tagline: "A nutrition coach that sees what you eat.",
    stack: ["React 19", "Node.js", "Grok AI", "Gemini Vision", "PostgreSQL", "Prisma"],
    bullets: [
      "Full-stack AI fitness & nutrition platform — live on Vercel with real users.",
      "Gemini Vision scans food images and returns macros in ~1.2s with a confidence score.",
      "Grok generates 5-day workout plans as structured JSON from health metrics in ~1.8s.",
      "Secured with JWT, Bcrypt and Zod. Bundle sub-120 kB with <0.8s FCP.",
    ],
    href: "https://github.com/HarshMangaraj",
  },
  {
    num: "02",
    title: "DEEPFAKE DETECTOR",
    tagline: "Tell the truth from the synthetic — in milliseconds.",
    stack: ["PyTorch", "FastAPI", "React 19", "TypeScript", "Tailwind v4"],
    bullets: [
      "End-to-end media authenticity platform using a fine-tuned ResNet-18 CNN.",
      "Pipeline: RGB normalize → 224×224 resize → tensor → binary head → softmax JSON.",
      "Privacy-first — uploaded images processed in-memory and never written to disk.",
      "Type-safe React SPA with drag-and-drop upload and a verification ring.",
    ],
    href: "https://deepfake-cnn.vercel.app/",
  },
];

function ProjectRow({ p }: { p: Project }) {
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease }}
      className="group block py-14 md:py-20 border-t border-border"
    >
      <div className="grid md:grid-cols-12 gap-8 items-baseline">
        <div className="md:col-span-1 eyebrow">/ {p.num}</div>
        <div className="md:col-span-7">
          <div className="huge text-[10vw] md:text-[5.5vw] text-foreground transition-opacity duration-700 group-hover:opacity-60">
            {p.title}
          </div>
          <p className="italic-serif text-lg md:text-2xl text-foreground/70 mt-4">"{p.tagline}"</p>
          <ul className="mt-6 space-y-2 text-foreground/70 max-w-2xl text-sm md:text-base leading-relaxed">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-foreground/40 mt-2">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4 flex flex-col md:items-end gap-6">
          <div className="flex md:justify-end flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="eyebrow border border-border px-2.5 py-1.5">{s}</span>
            ))}
          </div>
          <span className="eyebrow text-foreground inline-flex items-center gap-2">
            View Project <span aria-hidden>↗</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-16">
          <p className="eyebrow">[ II. Selected Work ]</p>
          <p className="eyebrow">2024 — 2026</p>
        </div>
        <h2 className="huge text-[14vw] md:text-[7vw] text-foreground">
          Things <span className="italic-serif text-foreground/70">I shipped.</span>
        </h2>
        <div className="mt-20">
          {projects.map((p) => <ProjectRow key={p.title} p={p} />)}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const groups = [
    { cat: "Languages", items: ["TypeScript", "Python", "C++"] },
    { cat: "Frontend", items: ["React", "Next.js", "Tailwind", "Framer Motion"] },
    { cat: "Backend", items: ["Node.js", "FastAPI", "REST", "JWT", "Zod"] },
    { cat: "AI / ML", items: ["PyTorch", "Gemini Vision", "Grok", "LLM APIs"] },
    { cat: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle"] },
    { cat: "Tooling", items: ["Git", "Vercel", "Vite", "Postman"] },
  ];

  return (
    <section id="about" className="relative px-6 md:px-10 py-32 md:py-44 border-t border-border">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 space-y-6">
          <p className="eyebrow">[ III. About ]</p>
          <h2 className="huge text-5xl md:text-6xl">
            A quiet <span className="italic-serif text-foreground/70">obsession</span> with craft.
          </h2>
          <p className="italic-serif text-lg md:text-xl text-foreground/75 leading-snug">
            BCA, Trident Academy of Creative Technology, 2023 — 2026. Bhubaneswar, Odisha. The only team from our college selected for the SIH 2025 Grand Finale — finished National Runner-Up in Healthcare Technology against 1,000+ teams.
          </p>
        </div>
        <div className="md:col-span-8 md:col-start-6 grid grid-cols-2 gap-x-10 gap-y-12">
          {groups.map((g) => (
            <div key={g.cat}>
              <p className="eyebrow text-foreground/90">{g.cat}</p>
              <div className="mt-4 hairline" />
              <ul className="mt-4 space-y-2 italic-serif text-lg text-foreground/80">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { l: "Email", v: "harshmangaraj723@gmail.com", h: "mailto:harshmangaraj723@gmail.com" },
    { l: "LinkedIn", v: "harsh-bardhan-mangaraj", h: "https://linkedin.com/in/harsh-bardhan-mangaraj" },
    { l: "GitHub", v: "HarshMangaraj", h: "https://github.com/HarshMangaraj" },
  ];

  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20 pt-32 border-t border-border">
      <video className="media-bg" autoPlay muted loop playsInline preload="auto" src={ctaBg.url} />
      <div className="media-veil" />
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <p className="eyebrow mb-10">[ IV. Contact ]</p>
        <h2 className="huge text-[14vw] md:text-[8vw] text-foreground">
          Let’s build <br />
          <span className="italic-serif text-foreground/80">something worth watching.</span>
        </h2>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="italic-serif text-lg md:text-xl text-foreground/80 leading-snug">
              I’m looking for full-stack and AI-focused engineering roles. Remote, hybrid, or relocation — let’s talk.
            </p>
            <a href="mailto:harshmangaraj723@gmail.com" className="disc mt-10">Write</a>
          </div>
          <div className="md:col-span-7 md:col-start-6 border-y border-border divide-y divide-border">
            {links.map((c) => (
              <a
                key={c.l}
                href={c.h}
                target={c.h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between py-5"
              >
                <div className="flex items-baseline gap-8">
                  <span className="eyebrow w-20">{c.l}</span>
                  <span className="italic-serif text-2xl md:text-3xl text-foreground group-hover:text-foreground/70 transition-colors">{c.v}</span>
                </div>
                <span className="eyebrow opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24 flex items-center justify-between eyebrow text-foreground/60">
          <span>© 2026 — HBM</span>
          <span>FIN.</span>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="grain relative">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
