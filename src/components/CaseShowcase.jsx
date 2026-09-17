import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Data ---------------------------------- */

const CASES = [
  {
    id: "01",
    meta: "2024 // ENTERPRISE SAAS",
    title: "AeroSaaS Management Portal",
    type: "Enterprise Interface Integration",
    desc: "Converted complex dashboard visual assets into a dynamic, highly reusable component layer. Optimized structural clean folders ensuring fluid reactivity and 100% pixel-perfect fluid grids.",
    domain: "portal.aerosaas.io",
    mock: "dashboard",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Recharts"],
    metrics: [
      { value: "100%", label: "Pixel Parity" },
      { value: "-42%", label: "Bundle Size" },
      { value: "60fps", label: "Interactions" },
    ],
  },
  {
    id: "02",
    meta: "2024 // FINTECH",
    title: "Veloce FinTech Mobile UI",
    type: "Fluid Responsive Framework",
    desc: "Engineered a high-performance cross-device layout focusing on strict touch targets, absolute layout accuracy, and seamless Tailwind breakpoints under high-pressure agency delivery schedules.",
    domain: "app.veloce.finance",
    mock: "mobile",
    tags: ["React", "Tailwind", "Safe-Area", "Biometrics UI"],
    metrics: [
      { value: "312ms", label: "Avg. Load" },
      { value: "98+", label: "Lighthouse" },
      { value: "4.9★", label: "Beta Rating" },
    ],
  },
];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------- Hook ----------------------------------- */

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

/* ------------------------------ Mock UIs ----------------------------------- */

const BARS = [42, 68, 50, 84, 58, 92, 74, 61];

const DashboardMock = ({ inView }) => (
  <div className="flex h-full gap-3 p-3 sm:gap-4 sm:p-5">
    {/* Sidebar */}
    <div className="hidden sm:flex w-14 shrink-0 flex-col items-center gap-3 rounded-lg border border-neutral-800/70 bg-neutral-900/40 py-4">
      <span className="h-6 w-6 rounded-md bg-gradient-to-br from-rose-500 to-orange-400 shadow-lg shadow-rose-500/20" />
      <span className="mt-1 h-6 w-8 rounded-md border border-rose-500/30 bg-rose-500/25" />
      <span className="skeleton h-1.5 w-6 rounded-full" />
      <span className="skeleton h-1.5 w-6 rounded-full" />
      <span className="skeleton h-1.5 w-6 rounded-full" />
      <span className="mt-auto h-5 w-5 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
    </div>

    {/* Main */}
    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
      {/* Topbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="skeleton h-2 w-24 rounded-full" />
          <div className="skeleton h-2 w-16 rounded-full" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="skeleton h-6 w-14 rounded-md" />
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 p-2.5">
          <div className="skeleton mb-2 h-1.5 w-8 rounded-full" />
          <div className="text-[11px] font-bold text-white">$48.2K</div>
          <div className="text-[8px] font-semibold text-emerald-400">+8.2%</div>
          <svg viewBox="0 0 60 20" preserveAspectRatio="none" className="mt-1 h-4 w-full">
            <polyline points="0,15 10,12 20,14 30,8 40,10 50,4 60,6" fill="none" stroke="rgb(244 63 94 / 0.7)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 p-2.5">
          <div className="skeleton mb-2 h-1.5 w-8 rounded-full" />
          <div className="text-[11px] font-bold text-white">98.2%</div>
          <div className="text-[8px] font-semibold text-rose-400">-1.4%</div>
          <svg viewBox="0 0 60 20" preserveAspectRatio="none" className="mt-1 h-4 w-full">
            <polyline points="0,10 10,8 20,12 30,9 40,13 50,11 60,14" fill="none" stroke="rgb(251 146 60 / 0.7)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="rounded-lg border border-neutral-800/70 bg-neutral-900/40 p-2.5">
          <div className="skeleton mb-2 h-1.5 w-8 rounded-full" />
          <div className="text-[11px] font-bold text-white">12ms</div>
          <div className="text-[8px] font-semibold text-emerald-400">+3.1%</div>
          <svg viewBox="0 0 60 20" preserveAspectRatio="none" className="mt-1 h-4 w-full">
            <polyline points="0,16 10,14 20,10 30,12 40,6 50,8 60,3" fill="none" stroke="rgb(244 63 94 / 0.7)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Chart */}
      <div className="relative min-h-[92px] flex-1 overflow-hidden rounded-lg border border-neutral-800/70 bg-neutral-900/30 p-3">
        <div className="pointer-events-none absolute inset-3 flex flex-col justify-between">
          <span className="h-px w-full bg-neutral-800/50" />
          <span className="h-px w-full bg-neutral-800/50" />
          <span className="h-px w-full bg-neutral-800/50" />
        </div>
        <div className="relative flex h-full items-end gap-1.5 sm:gap-2">
          {BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[3px] bg-gradient-to-t from-rose-600/50 via-rose-500/40 to-orange-400/60"
              style={{
                height: inView ? `${h}%` : "6%",
                transition: REDUCED_MOTION
                  ? "none"
                  : `height 0.9s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.07}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileMock = ({ inView }) => (
  <div className="relative flex h-full items-center justify-center overflow-hidden p-6">
    {/* Glow behind phone */}
    <div className="absolute h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />

    <div className="relative aspect-[9/18] w-36 transition-transform duration-700 ease-out -rotate-3 group-hover:rotate-0 sm:w-40">
      <div className="h-full rounded-[1.5rem] border border-neutral-700/80 bg-neutral-900 p-1.5 shadow-2xl shadow-black/60">
        <div className="relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[1.1rem] bg-[#0C0C0E] p-3">
          {/* Notch */}
          <div className="absolute left-1/2 top-1.5 h-3 w-12 -translate-x-1/2 rounded-full bg-neutral-800" />

          {/* Status bar */}
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="text-[8px] font-semibold text-neutral-400">9:41</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          </div>

          {/* Balance card */}
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/20 to-orange-400/10 p-3">
            <div className="text-[8px] font-medium uppercase tracking-wider text-rose-300/70">Total Balance</div>
            <div className="mt-0.5 text-sm font-bold text-white">$24,562.00</div>
            <div className="mt-2 flex gap-1.5">
              <div className="skeleton h-4 flex-1 rounded-md" />
              <div className="h-4 flex-1 rounded-md border border-rose-500/30 bg-rose-500/25" />
            </div>
          </div>

          {/* Sparkline */}
          <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-8 w-full">
            <polyline points="0,22 14,18 28,20 42,12 56,15 70,8 84,11 100,4" fill="none" stroke="rgb(251 146 60 / 0.8)" strokeWidth="1.5" />
          </svg>

          {/* List rows */}
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="flex-1 space-y-1">
                <div className="skeleton h-1.5 w-3/4 rounded-full" />
                <div className="skeleton h-1.5 w-1/2 rounded-full" />
              </div>
              <div className="skeleton h-1.5 w-6 rounded-full" />
            </div>
          ))}

          {/* Floating profit chip */}
          <div
            className="absolute right-2 top-16 z-10 flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-neutral-900/95 px-2 py-1.5 shadow-lg backdrop-blur"
            style={{ animation: REDUCED_MOTION ? "none" : "float-y 5s ease-in-out infinite" }}
          >
            <span className="text-[9px] font-bold text-emerald-400">▲ +12.4%</span>
            <span className="text-[8px] text-neutral-500">wk</span>
          </div>

          {/* Tab bar */}
          <div className="mt-auto flex items-center justify-between border-t border-neutral-800/70 px-2 pt-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------- Browser Frame -------------------------------- */

const BrowserFrame = ({ domain, children, inView }) => (
  <div className="relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0B] shadow-2xl shadow-black/50">
    {/* Chrome bar */}
    <div className="flex h-10 items-center gap-3 border-b border-neutral-800/80 bg-neutral-900/40 px-4">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
      </div>
      <div className="mx-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900/80 px-3 py-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5 shrink-0 text-emerald-500/70">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span className="truncate font-mono text-[10px] text-neutral-500">{domain}</span>
      </div>
    </div>

    {/* Viewport */}
    <div className="relative h-[calc(100%-2.5rem)]">
      {children}
      {/* Subtle scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02]" />
    </div>

    {/* Live badge */}
    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 rounded-md border border-neutral-800 bg-[#0A0A0B]/90 px-2.5 py-1 font-mono text-[9px] tracking-widest text-neutral-500 backdrop-blur">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      LIVE COMPONENT PREVIEW
    </div>
  </div>
);

/* -------------------------------- Row -------------------------------------- */

const CaseRow = ({ item, index }) => {
  const [ref, inView] = useInView(0.2);
  const reversed = index % 2 === 1;

  const reveal = (delay = 0) => ({
    className: `rv transition-all duration-1000 ease-out ${
      inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`,
    style: { transitionDelay: REDUCED_MOTION ? "0s" : `${delay}ms` },
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-12 md:gap-16 lg:flex-row ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Visual */}
      <div className="group relative w-full lg:w-[54%]" {...reveal(0)}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-rose-500/15 via-transparent to-orange-400/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative z-10 aspect-[16/10] transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <BrowserFrame domain={item.domain} inView={inView}>
            {item.mock === "dashboard" ? (
              <DashboardMock inView={inView} />
            ) : (
              <MobileMock inView={inView} />
            )}
          </BrowserFrame>
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative w-full lg:w-[46%] ${
          reversed ? "lg:pl-2" : "lg:pr-2"
        }`}
        {...reveal(180)}
      >
        {/* Ghost number */}
        <span
          className={`pointer-events-none absolute -top-20 select-none text-[8rem] font-extrabold leading-none tracking-tighter text-white/[0.03] transition-colors duration-700 group-hover:text-rose-500/[0.05] sm:text-[10rem] ${
            reversed ? "-left-2" : "-right-2"
          }`}
        >
          {item.id}
        </span>

        <div className="relative space-y-5">
          {/* Meta line */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-neutral-500">
            <span className="h-px w-8 bg-gradient-to-r from-rose-500 to-transparent" />
            CASE_{item.id} // {item.meta}
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {item.title}
          </h3>

          <span className="inline-flex rounded-md border border-rose-500/20 bg-rose-500/[0.07] px-2.5 py-1 text-[11px] font-medium tracking-wide text-rose-300/90">
            {item.type}
          </span>

          <p className="text-sm font-light leading-relaxed text-neutral-400 sm:text-base">
            {item.desc}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 divide-x divide-neutral-800/70 border-y border-neutral-800/70 py-4">
            {item.metrics.map((m, i) => (
              <div key={m.label} className={i === 0 ? "pr-4" : "px-4"}>
                <div className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-neutral-500">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-800/80 bg-neutral-900/60 px-2.5 py-1 text-[11px] font-medium text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-2 pt-1 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500"
          >
            <span className="relative">
              View Case Breakdown
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-rose-500/40 transition-transform duration-300 group-hover/link:scale-x-0" />
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rose-400 transition-transform delay-100 duration-300 group-hover/link:scale-x-100" />
            </span>
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- Section ------------------------------------ */

const CaseShowcase = () => {
  const [headRef, headInView] = useInView(0.3);

  return (
    <section id="showcase" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:py-32">
      <style>{`
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 2.4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton { animation: none; }
          .rv { transition: none !important; }
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Hairline divider */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[300px] w-[420px] rounded-full bg-rose-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-[280px] w-[380px] rounded-full bg-orange-500/[0.05] blur-[110px]" />

      {/* Header */}
      <div
        ref={headRef}
        className={`rv mb-16 transition-all duration-700 ease-out sm:mb-24 ${
          headInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-rose-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
              // Selected Frameworks
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
              Case Studies{" "}
              <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Delivery Execution.
              </span>
            </h2>
          </div>

          <div className="md:max-w-sm md:text-right">
            <p className="text-sm font-light leading-relaxed text-neutral-400">
              A showcase of micro-layouts engineered with absolute production discipline and zero design discrepancies.
            </p>
            <a href="#contact" className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-300 transition-colors hover:text-rose-400">
              View All Work
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-24 sm:space-y-32">
        {CASES.map((item, index) => (
          <CaseRow key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* NDA footer */}
      <div className="mt-24 flex justify-center sm:mt-32">
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-neutral-800 px-6 py-4 font-mono text-[11px] tracking-widest text-neutral-500 transition-colors duration-300 hover:border-neutral-700 hover:text-neutral-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-rose-500/60">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          NEXT CASE — UNDER NDA [ AVAILABLE ON REQUEST ]
        </div>
      </div>
    </section>
  );
};

export default CaseShowcase;