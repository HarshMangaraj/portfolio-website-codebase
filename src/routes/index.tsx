import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg-v2.mp4.asset.json";
import ctaBg from "@/assets/cta-bg.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const ease = [0.2, 0.8, 0.2, 1] as const;

/* ---------- Primitives ---------- */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="line-mask">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="glass-nav pointer-events-auto flex items-center gap-2 md:gap-1 px-3 md:px-4 py-2"
      >
        <a href="#top" className="px-3 py-1.5 text-sm font-medium tracking-tight">
          HBM<span className="text-foreground/50">.</span>
        </a>
        <span className="hidden md:block w-px h-5 bg-white/10 mx-1" />
        <nav className="hidden md:flex items-center gap-1">
          {[
            { l: "Work", h: "#work" },
            { l: "Services", h: "#services" },
            { l: "Process", h: "#process" },
            { l: "About", h: "#about" },
          ].map((i) => (
            <a
              key={i.h}
              href={i.h}
              className="px-3 py-1.5 text-sm text-foreground/75 hover:text-foreground transition-colors rounded-full hover:bg-white/5"
            >
              {i.l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="ml-1 btn-pill !h-9 !px-4 !text-[13px]">
          Let's talk →
        </a>
      </motion.div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), { stiffness: 80, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center px-6 md:px-10"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <video className="media-bg" autoPlay muted loop playsInline preload="auto" src={heroBg.url} />
      </motion.div>
      <div className="media-veil" />

      {/* Ambient orbs */}
      <div className="orb" style={{ width: 520, height: 520, background: "#5b8cff", top: "-10%", left: "-8%" }} />
      <div className="orb" style={{ width: 460, height: 460, background: "#ff7a59", bottom: "-12%", right: "-6%" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-[1200px] w-full text-center">
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-2 glass-chip px-3.5 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs tracking-tight text-foreground/85">Available for select work — 2026</span>
          </div>
        </FadeUp>

        <h1 className="huge gradient-text text-[14vw] md:text-[8.5vw] leading-[0.95]">
          <Reveal delay={0.15}>Designing software</Reveal>
          <Reveal delay={0.3}>
            <span className="italic-serif text-foreground/85">that feels inevitable.</span>
          </Reveal>
        </h1>

        <FadeUp delay={0.6} className="mt-8">
          <p className="mx-auto max-w-2xl text-base md:text-xl text-foreground/70 leading-relaxed">
            Harsh Bardhan Mangaraj — full-stack & AI engineer crafting fast, considered products with
            React, Node and PyTorch. Calm interfaces. Honest interactions.
          </p>
        </FadeUp>

        <FadeUp delay={0.8} className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <a href="#work" className="btn-pill">View selected work →</a>
          <a href="#contact" className="btn-ghost">Start a project</a>
        </FadeUp>

        <FadeUp delay={1} className="mt-16">
          <div className="glass mx-auto inline-flex items-stretch divide-x divide-white/10 px-2">
            {[
              { k: "8+", v: "Production apps" },
              { k: "1.2s", v: "Avg. FCP" },
              { k: "🥈", v: "SIH ’25 Runner-Up" },
            ].map((s) => (
              <div key={s.v} className="px-6 py-4 text-left">
                <div className="text-2xl font-semibold tracking-tight">{s.k}</div>
                <div className="eyebrow mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 eyebrow flex items-center gap-2"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */

function Marquee() {
  const items = [
    "React 19", "TypeScript", "Next.js", "Tailwind v4", "Node.js",
    "PyTorch", "FastAPI", "PostgreSQL", "Prisma", "Gemini",
    "Grok", "LLM Pipelines", "Framer Motion", "Vercel", "Cloudflare",
  ];
  return (
    <section className="relative py-12 border-y border-white/10 overflow-hidden bg-black/30">
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      <div className="overflow-hidden whitespace-nowrap">
        <div className="marquee-track">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="text-3xl md:text-5xl italic-serif text-foreground/55">
              {it} <span className="text-foreground/20 mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */

type Project = {
  num: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  bullets: string[];
  href: string;
  hue: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "FIT.AI",
    tagline: "A nutrition coach that sees what you eat.",
    year: "2025",
    role: "Full-stack · AI",
    stack: ["React 19", "Node", "Grok", "Gemini Vision", "Postgres", "Prisma"],
    bullets: [
      "Live on Vercel with real users — Gemini Vision returns macros in ~1.2s.",
      "Grok generates 5-day workout plans as structured JSON in ~1.8s.",
      "JWT + Bcrypt + Zod. Sub-120 kB bundle, <0.8s FCP.",
    ],
    href: "https://github.com/HarshMangaraj",
    hue: "linear-gradient(135deg, #ff7a59, #ffb86b)",
  },
  {
    num: "02",
    title: "DEEPFAKE DETECTOR",
    tagline: "Tell the truth from the synthetic — in milliseconds.",
    year: "2025",
    role: "ML · Frontend",
    stack: ["PyTorch", "FastAPI", "React 19", "TypeScript"],
    bullets: [
      "ResNet-18 CNN, fine-tuned for binary authenticity detection.",
      "Pipeline: RGB normalize → 224² → tensor → softmax JSON.",
      "Privacy-first — images processed in-memory, never written to disk.",
    ],
    href: "https://deepfake-cnn.vercel.app/",
    hue: "linear-gradient(135deg, #5b8cff, #8a7bff)",
  },
];

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  return (
    <FadeUp delay={idx * 0.1}>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="glass lift group block p-6 md:p-10 relative overflow-hidden"
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
          style={{ background: p.hue }}
        />
        <div className="relative grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-1">
            <span className="eyebrow">/ {p.num}</span>
          </div>
          <div className="md:col-span-7">
            <h3 className="display text-4xl md:text-6xl gradient-text">{p.title}</h3>
            <p className="italic-serif text-lg md:text-2xl text-foreground/75 mt-3">"{p.tagline}"</p>
            <ul className="mt-6 space-y-2 text-foreground/70 max-w-2xl text-sm md:text-base leading-relaxed">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-foreground/40 mt-2">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 flex flex-col md:items-end gap-5">
            <div className="flex md:justify-end gap-4 eyebrow">
              <span>{p.year}</span>
              <span className="text-foreground/40">·</span>
              <span>{p.role}</span>
            </div>
            <div className="flex md:justify-end flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="glass-chip text-[10px] tracking-wider uppercase px-2.5 py-1 text-foreground/80">
                  {s}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-sm text-foreground/90 group-hover:text-foreground transition-colors">
              Open project
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </span>
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="orb" style={{ width: 420, height: 420, background: "#6366f1", top: "10%", left: "-10%" }} />
      <div className="max-w-[1300px] mx-auto relative z-10">
        <FadeUp>
          <div className="flex items-baseline justify-between mb-12">
            <p className="eyebrow">[ Selected Work ]</p>
            <p className="eyebrow">2024 — 2026</p>
          </div>
        </FadeUp>
        <h2 className="huge text-[12vw] md:text-[7vw] gradient-text">
          <Reveal>Things</Reveal>
          <Reveal delay={0.1}>
            <span className="italic-serif text-foreground/75">I shipped.</span>
          </Reveal>
        </h2>
        <div className="mt-16 grid gap-6 md:gap-8">
          <div className="grid gap-6 md:gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function Services() {
  const items = [
    {
      icon: "◐",
      title: "Product Engineering",
      body: "Full-stack TypeScript apps — React, Next, Node. Type-safe APIs, observable from day one, deployed in hours not weeks.",
    },
    {
      icon: "✦",
      title: "Applied AI",
      body: "Wiring LLMs, vision models and fine-tuned CNNs into real user flows. Latency, cost and accuracy budgeted up front.",
    },
    {
      icon: "◼",
      title: "Interface Design",
      body: "Quiet, considered interfaces. Motion that earns its place. Design systems that engineers actually keep alive.",
    },
    {
      icon: "◊",
      title: "Performance Audits",
      body: "Bundle, render, paint, network. From 3s to sub-1s. Lighthouse 95+ as the floor, not the ceiling.",
    },
  ];
  return (
    <section id="services" className="relative px-6 md:px-10 py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1300px] mx-auto">
        <FadeUp>
          <p className="eyebrow mb-6">[ What I do ]</p>
          <h2 className="huge text-5xl md:text-7xl gradient-text max-w-3xl">
            Four ways <span className="italic-serif text-foreground/75">we can work</span> together.
          </h2>
        </FadeUp>
        <div className="mt-16 grid md:grid-cols-2 gap-5 md:gap-6">
          {items.map((it, i) => (
            <FadeUp key={it.title} delay={i * 0.08}>
              <div className="glass lift p-8 md:p-10 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="glass-chip h-12 w-12 grid place-items-center text-xl">{it.icon}</span>
                  <h3 className="display text-2xl md:text-3xl">{it.title}</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">{it.body}</p>
                <div className="hairline my-6" />
                <span className="eyebrow text-foreground/80">0{i + 1} / 04</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

function Process() {
  const steps = [
    { n: "01", t: "Listen", d: "A short call. What you're really trying to ship, who it's for, what 'done' looks like." },
    { n: "02", t: "Sketch", d: "Rapid wireframes and a technical spike. We agree on shape before we commit to code." },
    { n: "03", t: "Build", d: "Daily previews on a live URL. Tight feedback loops, no surprises at the end." },
    { n: "04", t: "Ship", d: "Production deploy, observability, and a handover doc your team can actually use." },
  ];
  return (
    <section id="process" className="relative px-6 md:px-10 py-28 md:py-40 border-t border-white/10 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: "#8a7bff", bottom: "-15%", right: "-10%" }} />
      <div className="max-w-[1300px] mx-auto relative z-10">
        <FadeUp>
          <p className="eyebrow mb-6">[ How it goes ]</p>
          <h2 className="huge text-5xl md:text-7xl gradient-text max-w-3xl">
            From hello <span className="italic-serif text-foreground/75">to live</span> in four steps.
          </h2>
        </FadeUp>
        <div className="mt-16 grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className="glass p-7 h-full relative">
                <div className="text-5xl italic-serif text-foreground/30">{s.n}</div>
                <h3 className="display text-2xl mt-4">{s.t}</h3>
                <p className="text-foreground/65 text-sm mt-3 leading-relaxed">{s.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const quotes = [
    {
      q: "Harsh shipped in three weeks what our team had been circling for three months. Calm under pressure, sharp on detail.",
      a: "Team Lead, SIH 2025",
    },
    {
      q: "He thinks in systems. The architecture he drew on day one is still the one we're running in production.",
      a: "Project Mentor",
    },
    {
      q: "Rare combination — actually understands ML and actually cares about the user. The interface felt obvious by the end.",
      a: "Hackathon Judge",
    },
  ];
  return (
    <section className="relative px-6 md:px-10 py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1300px] mx-auto">
        <FadeUp>
          <p className="eyebrow mb-6">[ Kind words ]</p>
          <h2 className="huge text-5xl md:text-7xl gradient-text max-w-3xl">
            What people <span className="italic-serif text-foreground/75">say.</span>
          </h2>
        </FadeUp>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <figure className="glass lift p-8 h-full flex flex-col justify-between">
                <blockquote className="italic-serif text-xl md:text-2xl text-foreground/90 leading-snug">
                  "{q.q}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full glass-chip grid place-items-center text-sm">
                    {q.a.charAt(0)}
                  </span>
                  <span className="eyebrow">{q.a}</span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  const groups = [
    { cat: "Languages", items: ["TypeScript", "Python", "C++"] },
    { cat: "Frontend", items: ["React", "Next.js", "Tailwind", "Motion"] },
    { cat: "Backend", items: ["Node.js", "FastAPI", "REST", "JWT", "Zod"] },
    { cat: "AI / ML", items: ["PyTorch", "Gemini", "Grok", "LLM APIs"] },
    { cat: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle"] },
    { cat: "Tooling", items: ["Git", "Vercel", "Vite", "Postman"] },
  ];

  return (
    <section id="about" className="relative px-6 md:px-10 py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-6">
          <FadeUp>
            <p className="eyebrow">[ About ]</p>
            <h2 className="huge text-5xl md:text-6xl gradient-text mt-4">
              A quiet <span className="italic-serif text-foreground/75">obsession</span> with craft.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="italic-serif text-lg md:text-xl text-foreground/80 leading-snug">
              BCA, Trident Academy of Creative Technology — 2023 to 2026. The only team from our college
              selected for the SIH 2025 Grand Finale, finishing National Runner-Up in Healthcare Technology
              against 1,000+ teams.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="glass p-6 mt-6">
              <p className="eyebrow mb-3">Currently</p>
              <p className="text-foreground/90">
                Final-year student in Bhubaneswar. Building tools at the seam between ML and product.
                Open to roles, freelance, and collaborations.
              </p>
            </div>
          </FadeUp>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-x-8 gap-y-10">
          {groups.map((g, i) => (
            <FadeUp key={g.cat} delay={i * 0.05}>
              <p className="eyebrow text-foreground/90">{g.cat}</p>
              <div className="mt-4 hairline" />
              <ul className="mt-4 space-y-2 italic-serif text-lg text-foreground/85">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const items = [
    {
      q: "What kind of projects do you take on?",
      a: "Full-stack web apps, AI-integrated products, and high-craft marketing sites. I'm most useful where design, frontend and ML meet.",
    },
    {
      q: "Are you available for full-time roles?",
      a: "Yes — graduating 2026 and open to remote, hybrid or relocation. Also open to focused freelance engagements in the meantime.",
    },
    {
      q: "How fast can we start?",
      a: "Most engagements kick off within a week. A 30-minute call is enough to know if we're a fit.",
    },
    {
      q: "Where are you based?",
      a: "Bhubaneswar, India — IST. Comfortable overlapping with EU and US time zones for sync work.",
    },
  ];
  return (
    <section className="relative px-6 md:px-10 py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[900px] mx-auto">
        <FadeUp>
          <p className="eyebrow mb-6 text-center">[ Questions ]</p>
          <h2 className="huge text-5xl md:text-7xl text-center gradient-text">
            Quick <span className="italic-serif text-foreground/75">answers.</span>
          </h2>
        </FadeUp>
        <div className="mt-14 space-y-3">
          {items.map((it, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <details className="glass p-6 group">
                <summary className="cursor-pointer flex items-center justify-between list-none">
                  <span className="display text-lg md:text-xl">{it.q}</span>
                  <span className="ml-4 h-8 w-8 grid place-items-center rounded-full bg-white/10 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-foreground/70 leading-relaxed">{it.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const links = [
    { l: "Email", v: "harshmangaraj723@gmail.com", h: "mailto:harshmangaraj723@gmail.com" },
    { l: "LinkedIn", v: "harsh-bardhan-mangaraj", h: "https://linkedin.com/in/harsh-bardhan-mangaraj" },
    { l: "GitHub", v: "HarshMangaraj", h: "https://github.com/HarshMangaraj" },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-center px-6 md:px-10 py-24 border-t border-white/10"
    >
      <video className="media-bg" autoPlay muted loop playsInline preload="auto" src={ctaBg.url} />
      <div className="media-veil" />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto">
        <FadeUp>
          <p className="eyebrow mb-8 text-center">[ Contact ]</p>
        </FadeUp>
        <h2 className="huge text-[12vw] md:text-[8vw] gradient-text text-center leading-[0.95]">
          <Reveal>Let's build</Reveal>
          <Reveal delay={0.15}>
            <span className="italic-serif text-foreground/85">something worth watching.</span>
          </Reveal>
        </h2>

        <FadeUp delay={0.5} className="mt-12">
          <div className="glass-strong max-w-3xl mx-auto p-8 md:p-10">
            <p className="italic-serif text-lg md:text-xl text-foreground/85 leading-snug text-center">
              I'm looking for full-stack and AI-focused engineering roles, plus select freelance work.
              Remote, hybrid, or relocation — let's talk.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <a href="mailto:harshmangaraj723@gmail.com" className="btn-pill">Write an email →</a>
              <a href="https://linkedin.com/in/harsh-bardhan-mangaraj" target="_blank" rel="noreferrer" className="btn-ghost">
                Connect on LinkedIn
              </a>
            </div>
            <div className="hairline my-8" />
            <div className="divide-y divide-white/10">
              {links.map((c) => (
                <a
                  key={c.l}
                  href={c.h}
                  target={c.h.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="eyebrow w-20">{c.l}</span>
                    <span className="italic-serif text-xl md:text-2xl text-foreground group-hover:text-foreground/70 transition-colors">
                      {c.v}
                    </span>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/70">↗</span>
                </a>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-20 flex items-center justify-between eyebrow text-foreground/60">
          <span>© 2026 — Harsh Bardhan Mangaraj</span>
          <span>Made with care · Bhubaneswar, IN</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <main className="grain relative">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <About />
      <FAQ />
      <Contact />
    </main>
  );
}
