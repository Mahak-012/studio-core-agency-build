import React, { useEffect, useRef, useState } from "react";

/* --------------------------------- Data ---------------------------------- */

const CAPABILITIES = [
  {
    icon: "code",
    title: "Frontend Engineering",
    desc: "Translating heavy Figma visual assets into structured, component-driven React and Next.js codebases with modular folder architectures.",
    tags: ["React 18", "Next.js 14", "Modular Architecture"],
    meta: "SDLC // COMPONENT-DRIVEN",
  },
  {
    icon: "pixel",
    title: "Pixel-Perfect Conversion",
    desc: "Maintaining absolute typographic precision, fluid responsive alignments, and exact padding/margin layouts as intended by the UI/UX designer.",
    tags: ["Figma → Code", "Design Tokens", "Fluid Grids"],
    meta: "TOLERANCE // 0PX DEVIATION",
  },
  {
    icon: "bolt",
    title: "Rapid Prototyping",
    desc: "Accelerating project timelines by shipping clean, production-ready interactive interfaces under strict agency deadlines with full autonomy.",
    tags: ["48h Kickoff", "Zero Tech-Debt", "Full Autonomy"],
    meta: "TURNAROUND // < 48 HOURS",
  },
];

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M8 6 2 12l6 6" />
      <path d="M16 6l6 6-6 6" />
    </svg>
  ),
  pixel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="h-6 w-6">
      <path d="M13 2 4.8 12.4a.5.5 0 0 0 .4.8H11l-1 8.8 8.2-10.4a.5.5 0 0 0-.4-.8H13l1-8.8Z" />
    </svg>
  ),
};

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------- Hook ---------------------------------- */

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

/* ------------------------------ Card -------------------------------------- */

const CapabilityCard = ({ item, index }) => {
  const [ref, inView] = useInView(0.3);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Spotlight position (CSS vars inherit down to the overlay)
    e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--my", `${py * 100}%`);

    if (!REDUCED_MOTION) {
      setTilt({ x: (0.5 - py) * 6, y: (px - 0.5) * 6 });
    }
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="group relative h-full rounded-2xl bg-neutral-800/70 p-px shadow-xl shadow-black/20 transition-shadow duration-500 hover:shadow-2xl hover:shadow-rose-950/40"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)${
            hovered ? " translateY(-6px)" : ""
          }`,
          transition: "transform 0.25s ease-out, box-shadow 0.5s ease",
        }}
      >
        {/* Animated gradient ring (fades in on hover) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-rose-500/60 via-rose-500/15 to-orange-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-full overflow-hidden rounded-2xl bg-[#0A0A0B] p-8">
          {/* Cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(244,63,94,0.12), transparent 70%)",
            }}
          />

          {/* Ghost number */}
          <span className="pointer-events-none absolute -top-3 right-4 select-none text-8xl font-extrabold tracking-tighter text-white/[0.035] transition-colors duration-500 group-hover:text-rose-500/[0.09]">
            0{index + 1}
          </span>

          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-rose-500 transition-all duration-500 group-hover:border-rose-500/50 group-hover:text-rose-400 group-hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]">
            {ICONS[item.icon]}
          </div>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-rose-400">
            {item.title}
          </h3>

          <p className="mt-3 text-sm font-light leading-relaxed text-neutral-400">
            {item.desc}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-800/80 bg-neutral-900/60 px-2.5 py-1 text-[11px] font-medium text-neutral-400 transition-colors duration-300 group-hover:border-neutral-700/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Techy meta footer */}
          <div className="mt-7 flex items-center gap-3 border-t border-neutral-800/70 pt-4">
            <span className="h-1 w-1 rounded-full bg-rose-500/60" />
            <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
              {item.meta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- Section ---------------------------------- */

const CapabilityGrid = () => {
  const [headRef, headInView] = useInView(0.4);
  const [ctaRef, ctaInView] = useInView(0.3);

  return (
    <section id="features" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:py-32">
      <style>{`
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(30px, -20px) scale(1.06); }
        }
      `}</style>

      {/* Soft top hairline divider */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute -z-10 h-[300px] w-[500px] rounded-full bg-rose-500/[0.07] blur-[120px] left-[10%] top-[5%]" style={{ animation: "orb-drift 16s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -z-10 h-[280px] w-[420px] rounded-full bg-orange-500/[0.05] blur-[110px] bottom-[5%] right-[8%]" style={{ animation: "orb-drift 20s ease-in-out infinite reverse" }} />

      {/* Header */}
      <div
        ref={headRef}
        className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out ${
          headInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Core Capabilities
        </div>

        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
          Engineered for{" "}
          <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
            Production Overflow.
          </span>
        </h2>

        <p className="mt-5 text-sm font-light leading-relaxed text-neutral-400 sm:text-base">
          Supporting busy digital studios with high-performance execution. We clear your engineering backlog — instantly, at agency-grade quality.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CAPABILITIES.map((item, index) => (
          <CapabilityCard key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div
        ref={ctaRef}
        className={`relative mt-16 rounded-2xl transition-all duration-700 ease-out ${
          ctaInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-rose-500/40 via-neutral-800 to-orange-500/40" />
        <div className="relative flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0A0A0B] px-8 py-8 backdrop-blur sm:flex-row sm:items-center sm:px-10">
          <div>
            <div className="mb-2 text-[11px] font-mono tracking-widest text-rose-500/80">
              [ AVAILABLE FOR Q3 SPRINTS ]
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Need all three, yesterday?
            </h3>
            <p className="mt-1.5 text-sm font-light text-neutral-400">
              We plug into your sprint within 48 hours — no onboarding overhead, no hand-holding required.
            </p>
          </div>
          <a
            href="#contact"
            className="group relative w-full shrink-0 overflow-hidden rounded-xl bg-rose-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-500 sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
            <span className="relative">Reserve Capacity →</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CapabilityGrid;