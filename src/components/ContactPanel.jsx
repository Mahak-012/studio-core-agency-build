import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Data ----------------------------------- */

const PROJECT_TYPES = ["Full-time Remote", "Freelance Overflow", "Rush Build", "Consulting"];

const STATS = [
  { value: "< 2hrs", label: "Avg. Response" },
  { value: "48hrs", label: "Sprint Kickoff" },
  { value: "100%", label: "On-Time Rate" },
];

const EMAIL = "studio@devforge.io";

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

/* ---------------------------------- Icons ----------------------------------- */

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.28 10.28 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.9 2.1h3.7l-8.1 9.3L24 22.9h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 2.1h7.7l5.3 7 5.9-7Zm-1.3 18.6h2L6.6 4.2h-2.2l13.2 16.5Z" />
    </svg>
  ),
};

/* ------------------------------ Form Field ---------------------------------- */

const Field = ({ label, error, children }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400">
        {label}
      </label>
      {error && <span className="text-[11px] font-medium text-rose-400">required</span>}
    </div>
    {children}
  </div>
);

/* --------------------------------- Section ----------------------------------- */

const ContactPanel = () => {
  const [sectionRef, sectionInView] = useInView(0.15);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [brief, setBrief] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [refCode] = useState(() => `ALC-${Math.floor(1000 + Math.random() * 9000)}`);

  const reveal = (delay = 0) => ({
    className: `rv transition-all duration-1000 ease-out ${
      sectionInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`,
    style: { transitionDelay: REDUCED_MOTION ? "0s" : `${delay}ms` },
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    const form = e.currentTarget;
    const email = form.elements.email.value.trim();
    const nextErrors = {};
    if (!email) nextErrors.email = true;
    if (!brief.trim()) nextErrors.brief = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  const inputBase =
    "w-full rounded-lg border bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:outline-none focus:ring-1";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:py-32"
    >
      <style>{`
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
        @keyframes success-pop {
          0%   { transform: scale(0.6); opacity: 0; }
          60%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-25px, 20px) scale(1.05); }
        }
        .check-path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: draw-check 0.5s ease-out 0.2s forwards;
        }
      `}</style>

      {/* Hairline divider */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -z-10 left-[5%] top-[15%] h-[320px] w-[480px] rounded-full bg-rose-500/[0.07] blur-[130px]"
        style={{ animation: "orb-drift 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -z-10 bottom-[10%] right-[5%] h-[300px] w-[420px] rounded-full bg-orange-500/[0.05] blur-[120px]"
        style={{ animation: "orb-drift 22s ease-in-out infinite reverse" }}
      />

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ------------------------------ Left column ------------------------------ */}
        <div>
          <div {...reveal(0)}>
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-rose-500">
              <span className="h-px w-8 bg-gradient-to-r from-rose-500 to-transparent" />
              // Allocation Panel
            </div>

            <h2 className="max-w-lg text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
              Ready to Clear Your{" "}
              <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Engineering Bottlenecks?
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-neutral-400 sm:text-base">
              Available for immediate full-time remote deployment or freelance dev overflow.
              Let&apos;s discuss your project timelines — we reply fast, always.
            </p>
          </div>

          {/* Availability terminal card */}
          <div {...reveal(120)}>
            <div className="mt-8 max-w-md overflow-hidden rounded-xl border border-neutral-800 bg-[#0A0A0B] font-mono text-xs shadow-xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-neutral-800/80 bg-neutral-900/40 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-neutral-700" />
                  <span className="h-2 w-2 rounded-full bg-neutral-700" />
                  <span className="h-2 w-2 rounded-full bg-rose-500/60" />
                </div>
                <span className="text-[10px] tracking-widest text-neutral-600">
                  availability --check
                </span>
              </div>
              <div className="space-y-1.5 px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">$ status --q3</span>
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    OPEN
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">$ sprint_slots --left</span>
                  <span className="font-semibold text-rose-400">2 remaining</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">$ timezone --overlap</span>
                  <span className="font-semibold text-neutral-300">EST / PST ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact channels */}
          <div {...reveal(200)}>
            <div className="mt-8 max-w-md space-y-3">
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/30 px-4 py-3 transition-colors duration-300 hover:border-neutral-700">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <span className="text-rose-500">{ICONS.mail}</span>
                  <span className="font-medium">{EMAIL}</span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-all duration-300 ${
                    copied
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  {copied ? ICONS.check : ICONS.copy}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <a
                href="#"
                className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/30 px-4 py-3 transition-colors duration-300 hover:border-rose-500/40 hover:bg-rose-500/[0.04]"
              >
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <span className="text-rose-500">{ICONS.calendar}</span>
                  <span className="font-medium group-hover:text-white">
                    Book a 15-min intro call
                  </span>
                </div>
                <span className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1">
                  {ICONS.arrow}
                </span>
              </a>

              <div className="flex items-center gap-3 px-1 pt-1 text-xs text-neutral-500">
                <span className="text-neutral-600">{ICONS.pin}</span>
                Remote-first — US time zones · Async-friendly · Slack / Teams native
              </div>
            </div>
          </div>

          {/* Stats */}
          <div {...reveal(280)}>
            <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-neutral-800/70 border-y border-neutral-800/70 py-5">
              {STATS.map((s) => (
                <div key={s.label} className="first:pr-4 [&:not(:first-child)]:px-4">
                  <div className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-neutral-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div {...reveal(340)}>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                Elsewhere:
              </span>
              {[ICONS.linkedin, ICONS.github, ICONS.x].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500/40 hover:text-rose-400"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------ Right column (form) ------------------------------ */}
        <div {...reveal(150)}>
          <div className="relative">
            {/* Gradient border wrapper */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-neutral-700/60 via-neutral-800/40 to-rose-500/25" />

            <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0B] shadow-2xl shadow-black/50">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/40 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] tracking-widest text-neutral-500">
                    ~/handoff_request.sh
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/[0.07] px-2 py-0.5 font-mono text-[9px] font-medium tracking-widest text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  ACCEPTING
                </span>
              </div>

              {status === "sent" ? (
                /* ------------------------------ Success state ------------------------------ */
                <div className="flex min-h-[480px] flex-col items-center justify-center px-8 py-12 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
                    style={{ animation: REDUCED_MOTION ? "none" : "success-pop 0.5s ease-out" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgb(52 211 153)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                    >
                      <path className="check-path" d="m4 12.5 5 5L20 6.5" />
                    </svg>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                    Request Logged. 🚀
                  </h3>
                  <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-neutral-400">
                    Your handoff brief has been queued. Expect a response within{" "}
                    <span className="font-medium text-neutral-200">2 business hours</span>.
                  </p>

                  <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-[11px] tracking-widest text-neutral-500">
                    TICKET: <span className="text-rose-400">#{refCode}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setBrief("");
                      setSelectedTypes([]);
                      setErrors({});
                    }}
                    className="mt-8 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300"
                  >
                    Submit another brief →
                  </button>
                </div>
              ) : (
                /* ------------------------------ Form ------------------------------ */
                <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-8">
                  <Field label="Corporate Email" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      placeholder="studio@agency.com"
                      onChange={() => errors.email && setErrors((p) => ({ ...p, email: false }))}
                      className={`${inputBase} ${
                        errors.email
                          ? "border-rose-500/60 ring-rose-500/20"
                          : "border-neutral-800 hover:border-neutral-700 focus:border-rose-500 focus:ring-rose-500/20"
                      }`}
                    />
                  </Field>

                  {/* Project type chips */}
                  <Field label="Engagement Type">
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const active = selectedTypes.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleType(type)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                              active
                                ? "border-rose-500/50 bg-rose-500/10 text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.15)]"
                                : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                            }`}
                          >
                            {active && "✓ "}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Project Brief" error={errors.brief}>
                    <textarea
                      rows="4"
                      maxLength={500}
                      value={brief}
                      onChange={(e) => {
                        setBrief(e.target.value);
                        if (errors.brief) setErrors((p) => ({ ...p, brief: false }));
                      }}
                      placeholder="Describe the active backlog or rush client build..."
                      className={`${inputBase} resize-none ${
                        errors.brief
                          ? "border-rose-500/60 ring-rose-500/20"
                          : "border-neutral-800 hover:border-neutral-700 focus:border-rose-500 focus:ring-rose-500/20"
                      }`}
                    />
                    <div className="mt-1.5 text-right font-mono text-[10px] text-neutral-600">
                      {brief.length} / 500
                    </div>
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative w-full overflow-hidden rounded-xl bg-neutral-100 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white disabled:translate-y-0 disabled:opacity-80"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
                    <span className="relative flex items-center justify-center gap-2">
                      {status === "sending" ? (
                        <>
                          <span
                            className="h-4 w-4 rounded-full border-2 border-neutral-400 border-t-neutral-900"
                            style={{ animation: "spin 0.7s linear infinite" }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Initiate Handoff Coordination
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center font-mono text-[10px] tracking-wider text-neutral-600">
                    NDA-FRIENDLY · NO RETAINER LOCK-IN · 48H ONBOARDING
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPanel;