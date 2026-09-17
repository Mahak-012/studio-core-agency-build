import React, { useEffect, useRef, useState } from "react";

const PROJECT_TYPES = ["Full-time Remote", "Freelance Overflow", "Rush Build"];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ContactModal = ({ open, onClose }) => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [brief, setBrief] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [refCode, setRefCode] = useState("");
  const firstInputRef = useRef(null);

  /* Open hone pe: reset + focus + ESC listener + scroll lock */
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 350);
      const onKey = (e) => e.key === "Escape" && onClose();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    const nextErrors = {};
    if (!name.trim()) nextErrors.name = true;
    if (!email.trim()) nextErrors.email = true;
    if (!brief.trim()) nextErrors.brief = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    setTimeout(() => {
      setRefCode(`ALC-${Math.floor(1000 + Math.random() * 9000)}`);
      setStatus("sent");
    }, 1600);
  };

  const inputBase =
    "w-full rounded-lg border bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:outline-none focus:ring-1";

  const errState = "border-rose-500/60 ring-rose-500/20";
  const okState =
    "border-neutral-800 hover:border-neutral-700 focus:border-rose-500 focus:ring-rose-500/20";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6 ${
        open ? "" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
    >
      <style>{`
        @keyframes modal-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-panel-in {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modal-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modal-panel-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(28px) scale(0.96); }
        }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
        @keyframes success-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes field-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .m-backdrop { animation: modal-backdrop-in 0.3s ease-out forwards; }
        .m-panel { animation: modal-panel-in 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }
        .m-closing .m-backdrop { animation: modal-backdrop-out 0.25s ease-in forwards; }
        .m-closing .m-panel { animation: modal-panel-out 0.25s ease-in forwards; }
        .m-field {
          opacity: 0;
          animation: field-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .check-path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: draw-check 0.5s ease-out 0.2s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .m-backdrop, .m-panel, .m-field { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ------------------------------ Backdrop ------------------------------ */}
      <div
        className="m-backdrop absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* ------------------------------- Panel -------------------------------- */}
      <div
        className={`m-panel relative w-full max-w-lg overflow-hidden rounded-t-2xl sm:rounded-2xl ${
          status === "sent" ? "" : "max-h-[92vh] overflow-y-auto"
        }`}
      >
        {/* Gradient border */}
        <div className="absolute -inset-px rounded-t-2xl bg-gradient-to-b from-rose-500/40 via-neutral-800 to-neutral-800 sm:rounded-2xl" />

        <div className="relative rounded-t-2xl bg-[#0A0A0B] sm:rounded-2xl">
          {/* Terminal header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800/80 bg-[#0A0A0B]/95 px-5 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="h-2.5 w-2.5 rounded-full bg-rose-500/60 transition-colors hover:bg-rose-500"
                />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
              </div>
              <span className="font-mono text-[10px] tracking-widest text-neutral-500">
                ~/quick_handoff.sh
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-800 text-neutral-500 transition-all duration-300 hover:border-neutral-700 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "sent" ? (
            /* ------------------------------ SUCCESS ------------------------------ */
            <div className="flex min-h-[420px] flex-col items-center justify-center px-8 py-12 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
                style={{ animation: REDUCED_MOTION ? "none" : "success-pop 0.5s ease-out" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="rgb(52 211 153)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path className="check-path" d="m4 12.5 5 5L20 6.5" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                Request Logged. 🚀
              </h3>
              <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-neutral-400">
                Your brief has been queued. Expect a response within{" "}
                <span className="font-medium text-neutral-200">2 business hours</span>.
              </p>

              <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-[11px] tracking-widest text-neutral-500">
                TICKET: <span className="text-rose-400">#{refCode}</span>
              </div>

              <button
                onClick={onClose}
                className="mt-8 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300"
              >
                Close panel →
              </button>
            </div>
          ) : (
            /* ------------------------------- FORM -------------------------------- */
            <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-7">
              {/* Intro */}
              <div className="m-field" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  2 SPRINT SLOTS AVAILABLE — Q3
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                  Let&apos;s build something{" "}
                  <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                    production-grade.
                  </span>
                </h3>
                <p className="mt-1 text-xs font-light text-neutral-500">
                  30-second brief. No calls unless you want one.
                </p>
              </div>

              {/* Name */}
              <div className="m-field" style={{ animationDelay: "0.16s" }}>
                <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400">
                  Your Name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: false }));
                  }}
                  placeholder="Alex Carter"
                  className={`${inputBase} ${errors.name ? errState : okState}`}
                />
              </div>

              {/* Email */}
              <div className="m-field" style={{ animationDelay: "0.22s" }}>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400">
                    Corporate Email
                  </label>
                  {errors.email && (
                    <span className="text-[11px] font-medium text-rose-400">required</span>
                  )}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: false }));
                  }}
                  placeholder="studio@agency.com"
                  className={`${inputBase} ${errors.email ? errState : okState}`}
                />
              </div>

              {/* Type chips */}
              <div className="m-field" style={{ animationDelay: "0.28s" }}>
                <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400">
                  Engagement Type
                </label>
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
              </div>

              {/* Brief */}
              <div className="m-field" style={{ animationDelay: "0.34s" }}>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400">
                    Project Brief
                  </label>
                  {errors.brief && (
                    <span className="text-[11px] font-medium text-rose-400">required</span>
                  )}
                </div>
                <textarea
                  rows="3"
                  maxLength={400}
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value);
                    if (errors.brief) setErrors((p) => ({ ...p, brief: false }));
                  }}
                  placeholder="Describe the active backlog or rush client build..."
                  className={`${inputBase} resize-none ${errors.brief ? errState : okState}`}
                />
                <div className="mt-1.5 text-right font-mono text-[10px] text-neutral-600">
                  {brief.length} / 400
                </div>
              </div>

              {/* Submit */}
              <div className="m-field" style={{ animationDelay: "0.4s" }}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative w-full overflow-hidden rounded-xl bg-rose-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-500 hover:shadow-rose-500/40 disabled:translate-y-0 disabled:opacity-80"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <>
                        <span
                          className="h-4 w-4 rounded-full border-2 border-rose-300/50 border-t-white"
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

                <p className="mt-3 text-center font-mono text-[10px] tracking-wider text-neutral-600">
                  NDA-FRIENDLY · NO RETAINER LOCK-IN
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;