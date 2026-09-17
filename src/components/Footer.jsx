import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Data ----------------------------------- */

const NAV_COLUMNS = [
  {
    heading: "Navigate",
    links: [
      { label: "Overview", href: "#top" },
      { label: "Capabilities", href: "#features" },
      { label: "Case Studies", href: "#showcase" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Frontend Engineering", href: "#features" },
      { label: "Pixel-Perfect Conversion", href: "#features" },
      { label: "Rapid Prototyping", href: "#features" },
      { label: "Sprint Overflow", href: "#contact" },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.28 10.28 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2.1h3.7l-8.1 9.3L24 22.9h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 2.1h7.7l5.3 7 5.9-7Zm-1.3 18.6h2L6.6 4.2h-2.2l13.2 16.5Z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6 9.42 8.03 17.72" />
      </svg>
    ),
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

/* --------------------------------- Clock ----------------------------------- */

const useUsClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-US", {
            timeZone: "America/New_York",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
};

/* --------------------------------- Footer ----------------------------------- */

const Footer = () => {
  const [ref, inView] = useInView(0.1);
  const usTime = useUsClock();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reveal = (delay = 0) => ({
    className: `rv transition-all duration-1000 ease-out ${
      inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`,
    style: { transitionDelay: REDUCED_MOTION ? "0s" : `${delay}ms` },
  });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <style>{`
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          15%      { transform: scale(1.3); }
          30%      { transform: scale(1); }
          45%      { transform: scale(1.2); }
        }
        @keyframes watermark-drift {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-2%); }
        }
        .heart {
          animation: heart-beat 1.6s ease-in-out infinite;
          display: inline-block;
          color: rgb(244 63 94);
        }
        @media (prefers-reduced-motion: reduce) {
          .heart { animation: none; }
          .rv { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Hairline gradient divider */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-rose-500/[0.05] blur-[130px]" />

      {/* ------------------------------ Main content ------------------------------ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div {...reveal(0)} className="md:col-span-5">
            <a href="#top" className="group inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 shadow-lg shadow-rose-500/25 transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M8 6 2 12l6 6" />
                  <path d="M16 6l6 6-6 6" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                STUDIO<span className="text-rose-500">.CORE</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-neutral-500">
              High-impact digital ecosystems, engineered for US agencies and studios.
              Pixel-perfect. Production-ready. Always on time.
            </p>

            {/* Status + clock */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 font-mono text-[10px] tracking-widest text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                ALL SYSTEMS OPERATIONAL
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 font-mono text-[10px] tracking-widest text-neutral-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 text-rose-500">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                NEW YORK · {usTime || "--:--:--"}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col, ci) => (
            <div key={col.heading} {...reveal(120 + ci * 80)} className="md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                // {col.heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-light text-neutral-400 transition-colors duration-300 hover:text-rose-400"
                    >
                      <span className="h-px w-0 bg-rose-500 transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials column */}
          <div {...reveal(280)} className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              // Connect
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500/40 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Mini CTA */}
            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2.5 text-xs font-semibold text-neutral-300 transition-all duration-300 hover:border-rose-500/40 hover:text-white"
            >
              Start a project
              <span className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ------------------------------ Bottom bar ------------------------------ */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 sm:flex-row">
          <div className="font-mono text-[11px] tracking-wide text-neutral-500">
            © {new Date().getFullYear()} STUDIO.CORE // ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide">
            <span className="text-neutral-600">[ BUILT WITH REACT + TAILWIND ]</span>

            {/* Made with heart by Mahak */}
            <span className="flex items-center gap-1.5 text-neutral-400">
              MADE WITH{" "}
              <span className="heart" aria-label="love" role="img">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]">
                  <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z" />
                </svg>
              </span>{" "}
              BY{" "}
              <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text font-semibold text-transparent">
                MAHAK
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------ Giant watermark ------------------------------ */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 select-none overflow-hidden"
      >
        <div
          className="whitespace-nowrap bg-gradient-to-b from-neutral-800/60 to-neutral-900/0 bg-clip-text text-center text-[18vw] font-extrabold leading-[0.8] tracking-tighter text-transparent md:text-[13vw]"
          style={{ animation: REDUCED_MOTION ? "none" : "watermark-drift 20s ease-in-out infinite" }}
        >
          STUDIO.CORE
        </div>
      </div>

      {/* ------------------------------ Back to top ------------------------------ */}
      <a
        href="#top"
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/90 text-neutral-400 shadow-2xl shadow-black/50 backdrop-blur transition-all duration-500 hover:border-rose-500/50 hover:text-rose-400 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M12 19V5m-7 7 7-7 7 7" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;