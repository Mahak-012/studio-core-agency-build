import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Data ----------------------------------- */

const WORDS = [
  "Digital Ecosystems.",
  "Design Systems.",
  "Web Experiences.",
  "Product Interfaces.",
];

const TYPE_TEXT = "whoami --role → senior_frontend_engineer";

const FLOATING_CHIPS = [
  { label: "React", className: "top-[16%] left-[5%]", delay: "0s" },
  { label: "Next.js", className: "top-[28%] right-[6%]", delay: "1.2s" },
  { label: "TypeScript", className: "bottom-[24%] left-[9%]", delay: "2.1s" },
  { label: "Tailwind", className: "bottom-[30%] right-[8%]", delay: "0.6s" },
];

const STATS = [
  { value: "120+", label: "Projects Shipped" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "15ms", label: "Avg. TTFB" },
];

const TRUSTED = ["AEROSAAS", "VELOCE", "NOVALABS", "PIXELFORGE", "NORTHWIND", "QUANTUM UX"];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------- Count-up ---------------------------------- */

const CountUp = ({ value }) => {
  const match = value.match(/^([\d.]+)(.*)$/);
  const end = parseFloat(match[1]);
  const suffix = match[2] || "";
  const decimals = (match[1].split(".")[1] || "").length;
  const [display, setDisplay] = useState(REDUCED_MOTION ? end : 0);

  useEffect(() => {
    if (REDUCED_MOTION) return;
    const duration = 1600;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(+(end * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, decimals]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
};

/* --------------------------------- Hero ------------------------------------- */

const Hero = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");

  /* Rotating headline words */
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  /* Terminal typing effect */
  useEffect(() => {
    if (REDUCED_MOTION) {
      setTyped(TYPE_TEXT);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TYPE_TEXT.slice(0, i));
      if (i >= TYPE_TEXT.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, []);

  /* Cursor spotlight + parallax vars */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  /* Particle constellation canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || REDUCED_MOTION) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1e4, y: -1e4 };
    let pts = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(85, Math.floor((W * H) / 17000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const LINK = 110;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(244,63,94,${(1 - d / LINK) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(251,146,60,${(1 - md / 160) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          pts[i].x += (mouse.x - pts[i].x) * 0.002;
          pts[i].y += (mouse.y - pts[i].y) * 0.002;
        }
        ctx.fillStyle = "rgba(244,63,94,0.4)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    const sec = sectionRef.current;
    sec?.addEventListener("mousemove", onMove);
    sec?.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sec?.removeEventListener("mousemove", onMove);
      sec?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Magnetic buttons */
  const magnetize = (el) => {
    if (!el || REDUCED_MOTION) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      el.style.transition = "transform 0.15s ease-out";
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  };

  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  useEffect(() => magnetize(primaryRef.current), []);
  useEffect(() => magnetize(secondaryRef.current), []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 px-6 mx-auto max-w-7xl flex flex-col items-center text-center"
    >
      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(26px); filter: blur(10px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes drift-alt {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, 25px) scale(0.94); }
        }
        @keyframes aurora-a {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.75; }
          50%      { transform: translate(60px, 30px) rotate(8deg) scale(1.15); opacity: 1; }
        }
        @keyframes aurora-b {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.65; }
          50%      { transform: translate(-70px, -20px) rotate(-6deg) scale(1.1); opacity: 1; }
        }
        @keyframes horizon-pulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes gradient-pan {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes wheel {
          0%   { opacity: 1; transform: translateY(0); }
          70%  { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(0); }
        }
        @keyframes word-in {
          from { opacity: 0; transform: translateY(70%) rotateX(-40deg); }
          to   { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes marquee { to { transform: translateX(-50%); } }

        /* ✨ AMBIENT BASE — pure black ki jagah warm lit gradient */
        .hero-ambient {
          background:
            radial-gradient(ellipse 95% 60% at 50% -15%, rgba(244, 63, 94, 0.16), transparent 62%),
            radial-gradient(ellipse 55% 45% at 85% 12%, rgba(249, 115, 92, 0.09), transparent 55%),
            radial-gradient(ellipse 60% 50% at 10% 30%, rgba(192, 78, 158, 0.09), transparent 60%),
            radial-gradient(ellipse 70% 45% at 50% 110%, rgba(147, 51, 234, 0.07), transparent 65%),
            linear-gradient(to bottom, #191321 0%, #121017 45%, #0D0D11 80%, #0A0A0B 100%);
        }

        .reveal      { opacity: 0; animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .word-rotate { display: inline-block; transform-origin: bottom; animation: word-in 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .grad-text   { background-size: 200% auto; animation: gradient-pan 6s ease infinite; }
        .type-cursor { animation: blink 1s steps(1) infinite; }
        .marquee     { animation: marquee 30s linear infinite; }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .spotlight {
          background: radial-gradient(
            560px circle at var(--spot-x, 50%) var(--spot-y, 30%),
            rgba(244, 63, 94, 0.13),
            transparent 65%
          );
        }
        .parallax-a {
          transform: translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 12px), 0);
          transition: transform 0.4s ease-out;
        }
        .parallax-b {
          transform: translate3d(calc(var(--px, 0) * -18px), calc(var(--py, 0) * -13px), 0);
          transition: transform 0.4s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .word-rotate, .grad-text, .type-cursor, .marquee { animation: none !important; opacity: 1 !important; }
          .parallax-a, .parallax-b { transform: none !important; }
          .aurora-a, .aurora-b, .horizon-glow { animation: none !important; }
        }
      `}</style>

      {/* ======================= LIGHTING SYSTEM (sab se pehle) ======================= */}

      {/* ✨ LAYER 0: Ambient base — warm lit gradient, black screen khatam */}
      <div className="hero-ambient absolute inset-0 -z-30 pointer-events-none" />

      {/* ✨ LAYER 1: Aurora blobs — cinematic rose/purple/orange color wash */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div
          className="aurora-a absolute -top-32 left-[6%] h-[400px] w-[560px] rounded-full bg-rose-500/25 blur-[110px]"
          style={{ animation: REDUCED_MOTION ? "none" : "aurora-a 16s ease-in-out infinite" }}
        />
        <div
          className="aurora-b absolute -top-24 right-[4%] h-[360px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]"
          style={{ animation: REDUCED_MOTION ? "none" : "aurora-b 20s ease-in-out infinite" }}
        />
        <div
          className="aurora-a absolute top-[32%] left-[30%] h-[320px] w-[460px] rounded-full bg-orange-400/15 blur-[130px]"
          style={{ animation: REDUCED_MOTION ? "none" : "aurora-b 24s ease-in-out infinite reverse" }}
        />
      </div>

      {/* ✨ LAYER 2: Horizon glow — headline ke peeche rising warm light */}
      <div
        className="horizon-glow absolute top-[6%] left-1/2 -z-20 h-[300px] w-[780px] -translate-x-1/2 pointer-events-none"
        style={{
          animation: REDUCED_MOTION ? "none" : "horizon-pulse 8s ease-in-out infinite",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(251,113,133,0.2), transparent 70%)",
        }}
      />

      {/* Particle constellation */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full [mask-image:radial-gradient(ellipse_70%_65%_at_50%_40%,black,transparent)]"
      />

      {/* Grid — thori bright */}
      <div className="absolute inset-0 -z-20 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_35%,black,transparent)]" />

      {/* Film grain */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Drifting orbs — brighter */}
      <div className="parallax-a absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 h-[440px] w-[700px] rounded-full bg-rose-500/20 blur-[130px]" style={{ animation: REDUCED_MOTION ? "none" : "drift 14s ease-in-out infinite" }} />
        <div className="absolute top-[30%] right-[-140px] h-[320px] w-[320px] rounded-full bg-orange-500/15 blur-[110px]" style={{ animation: REDUCED_MOTION ? "none" : "drift-alt 18s ease-in-out infinite" }} />
        <div className="absolute bottom-[-80px] left-[-120px] h-[280px] w-[280px] rounded-full bg-fuchsia-500/15 blur-[100px]" style={{ animation: REDUCED_MOTION ? "none" : "drift 20s ease-in-out infinite" }} />
      </div>

      {/* Cursor spotlight — stronger */}
      <div className="spotlight absolute inset-0 -z-10 pointer-events-none" />

      {/* ✨ Bottom fade — hero ko next section mein smoothly merge karta hai */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 pointer-events-none bg-gradient-to-b from-transparent to-neutral-950" />

      {/* ======================= CONTENT ======================= */}

      {/* Floating tech chips */}
      <div className="parallax-b absolute inset-0 hidden lg:block pointer-events-none">
        {FLOATING_CHIPS.map((chip) => (
          <div
            key={chip.label}
            className={`absolute inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-700/70 bg-neutral-900/70 backdrop-blur-md text-[11px] font-medium text-neutral-300 shadow-lg shadow-black/30 ${chip.className}`}
            style={{ animation: REDUCED_MOTION ? "none" : `float-y 6s ease-in-out ${chip.delay} infinite` }}
          >
            <span className="h-1 w-1 rounded-full bg-rose-400" />
            {chip.label}
          </div>
        ))}
      </div>

      {/* Terminal typing line */}
      <div className="reveal mb-6 inline-flex items-center gap-2 rounded-lg border border-neutral-700/60 bg-neutral-950/70 px-4 py-2 font-mono text-[11px] text-neutral-400 backdrop-blur-sm sm:text-xs" style={{ animationDelay: "0s" }}>
        <span className="text-rose-500">$</span>
        <span className="text-neutral-300">{typed}</span>
        <span className="type-cursor inline-block h-3.5 w-[7px] translate-y-[2px] bg-rose-500/80" />
      </div>

      {/* Badge */}
      <div className="reveal group relative mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-700/70 bg-neutral-900/70 px-4 py-1.5 text-xs text-neutral-200 backdrop-blur-sm" style={{ animationDelay: "0.05s" }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
        Production-Ready Engineering
        <span className="text-neutral-500 transition-colors group-hover:text-neutral-300">→</span>
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
        <span className="sr-only">We Engineer High-Impact Digital Ecosystems.</span>
        <span aria-hidden="true">
          <span className="reveal inline-block" style={{ animationDelay: "0.15s" }}>We Engineer</span>{" "}
          <span className="reveal inline-block" style={{ animationDelay: "0.25s" }}>High-Impact</span>
          <br />
          <span className="reveal inline-block pb-2" style={{ animationDelay: "0.35s", perspective: "500px" }}>
            <span key={wordIndex} className="word-rotate grad-text inline-block bg-gradient-to-r from-rose-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              {WORDS[wordIndex]}
            </span>
          </span>
        </span>
      </h1>

      {/* Sub-copy */}
      <p className="reveal mt-7 max-w-2xl text-base font-light leading-relaxed text-neutral-300 sm:text-lg" style={{ animationDelay: "0.45s" }}>
        Translating premium design concepts into pixel-perfect, hyper-fast frontend deployments. We bridge the gap between{" "}
        <span className="text-white">creative art direction</span> and{" "}
        <span className="text-white">flawless codebase execution</span>.
      </p>

      {/* CTAs — magnetic */}
      <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: "0.55s" }}>
        <a
          ref={primaryRef}
          href="#contact"
          className="group relative w-full overflow-hidden rounded-xl bg-rose-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-rose-600/40 ring-1 ring-rose-400/30 transition-colors duration-300 hover:bg-rose-500 sm:w-auto"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-20deg]" />
          <span className="relative">Deploy Active Backlog</span>
        </a>
        <a
          ref={secondaryRef}
          href="#showcase"
          className="group w-full rounded-xl border border-neutral-700 bg-neutral-900/80 px-7 py-3.5 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-colors duration-300 hover:border-neutral-500 hover:bg-neutral-800 sm:w-auto"
        >
          Audit Case Studies
          <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Stats — count-up */}
      <div className="reveal mt-16 grid w-full max-w-xl grid-cols-3 gap-4 sm:gap-10 sm:divide-x sm:divide-neutral-700/60" style={{ animationDelay: "0.65s" }}>
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              <CountUp value={stat.value} />
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-widest text-neutral-400 sm:text-xs">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Trusted-by marquee */}
      <div className="reveal mt-14 w-full max-w-3xl" style={{ animationDelay: "0.75s" }}>
        <div className="mb-4 font-mono text-[10px] tracking-[0.3em] text-neutral-500">
          TRUSTED BY FAST-MOVING TEAMS
        </div>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
            {[...TRUSTED, ...TRUSTED].map((name, i) => (
              <React.Fragment key={i}>
                <span className="text-sm font-bold tracking-[0.2em] text-neutral-500 transition-colors duration-300 hover:text-neutral-200">
                  {name}
                </span>
                <span className="text-[10px] text-rose-400/50">//</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="reveal mt-14 flex flex-col items-center" style={{ animationDelay: "0.85s" }}>
        <div className="flex h-9 w-6 justify-center rounded-full border border-neutral-600 pt-2">
          <span className="h-1.5 w-1 rounded-full bg-neutral-400" style={{ animation: REDUCED_MOTION ? "none" : "wheel 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;