import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

/* ---------------------------------- Data ----------------------------------- */

const LINKS = [
  { label: "Capabilities", id: "features" },
  { label: "Work", id: "showcase" },
  { label: "Contact", id: "contact" },
];

const NAV_OFFSET = 88;

/* -------------------------------- Navbar ------------------------------------ */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* Scroll: shrink + progress + scroll-spy */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);

      let current = "";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET + 40) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu: scroll lock + ESC */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Smooth scroll with offset */
  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const toTop = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (e) => {
    e?.preventDefault();
    setOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 90px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "border-rose-500/15 bg-gradient-to-b from-[#16121C]/95 to-[#100D15]/95 shadow-2xl shadow-rose-950/20 backdrop-blur-2xl"
            : "border-transparent bg-gradient-to-b from-[#16121C]/60 to-transparent"
        }`}
      >
        {/* Top hairline glow */}
        <div
          className={`absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-400/70 to-transparent transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400 shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          {/* LOGO */}
          <a
            href="#top"
            onClick={toTop}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] transition-transform duration-300 group-hover:scale-125" />
            </span>
            <span className="text-lg font-black tracking-tighter text-white">
              STUDIO<span className="text-rose-500">.</span>CORE
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {LINKS.map(({ label, id }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  className={`group relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <span
                    className={`mr-1.5 font-mono text-[9px] align-middle transition-colors duration-300 ${
                      isActive ? "text-rose-500" : "text-rose-500/40 group-hover:text-rose-500/70"
                    }`}
                  >
                    /
                  </span>
                  {label}

                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* DESKTOP CTA → MODAL */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 font-mono text-[9px] tracking-widest text-emerald-400 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              2 SLOTS LEFT
            </div>

            <button
              onClick={openModal}
              className="group relative overflow-hidden rounded-full border border-rose-500/30 bg-gradient-to-b from-[#1E1725] to-[#151019] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-rose-100 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-400/60 hover:text-white hover:shadow-rose-500/20"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
              <span className="relative">Let&apos;s Talk</span>
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 p-2 text-neutral-200 transition-colors hover:text-white focus:outline-none md:hidden"
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0C0B10]/[0.98] px-6 backdrop-blur-3xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-rose-500/[0.1] blur-[110px]" />

        {LINKS.map(({ label, id }, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => goTo(e, id)}
            className={`group relative py-3 text-3xl font-bold tracking-tight transition-all duration-500 ${
              activeId === id ? "text-rose-400" : "text-neutral-200 hover:text-rose-500"
            } ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
          >
            <span className="mr-3 font-mono text-sm font-normal text-rose-500/60">
              0{i + 1}
            </span>
            {label}
            <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-300 group-hover:w-2/3" />
          </a>
        ))}

        <div
          className={`mt-10 transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? "400ms" : "0ms" }}
        >
          <button
            onClick={openModal}
            className="group relative overflow-hidden rounded-full bg-rose-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-rose-500/30 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full skew-x-[-12deg]" />
            <span className="relative">Let&apos;s Talk →</span>
          </button>
        </div>

        <div
          className={`absolute bottom-10 font-mono text-[10px] tracking-[0.25em] text-neutral-600 transition-all duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: open ? "500ms" : "0ms" }}
        >
          STUDIO.CORE // PRODUCTION-READY ENGINEERING
        </div>
      </div>

      {/* CONTACT MODAL */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;