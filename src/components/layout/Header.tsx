import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { nav, brand, services } from "@/data/site";
import { useBodyLock, useScrolled } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { BrandMark, Icon, IconArrow, IconChevron, IconClose, IconMenu } from "@/components/Icon";

function ServicesNavItem({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 130);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKey);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        to="/services"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(false)}
        className={cn(
          "group relative flex items-center gap-1.5 px-3.5 py-2 font-display text-[0.86rem] font-semibold transition-colors duration-300",
          solid ? "text-slateink hover:text-navy" : "text-ivory/78 hover:text-ivory"
        )}
      >
        Services
        <IconChevron
          size={14}
          className={cn("transition-transform duration-400", open && "-rotate-180", solid ? "text-gold-deep" : "text-gold")}
        />
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0.5 left-3.5 right-3.5 h-px origin-left bg-gold transition-transform duration-400",
            open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )}
        />
      </Link>

      <div
        className={cn(
          "absolute left-0 top-full w-[560px] origin-top-left pt-3 transition-all duration-300",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="overflow-hidden border border-navy/12 bg-paper shadow-[0_40px_90px_-46px_rgba(16,26,44,0.75)]" style={{ borderRadius: 5 }}>
          <div className="grid grid-cols-2 gap-px bg-navy/8">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services#${s.slug}`}
                onClick={() => setOpen(false)}
                className="group bg-paper p-5 transition-colors duration-300 hover:bg-ivory"
              >
                <span className="flex items-center justify-between">
                  <Icon name={s.icon} size={20} className="text-royal transition-colors duration-300 group-hover:text-gold-deep" />
                  <span className="font-mono text-[0.6rem] text-navy/25">{s.index}</span>
                </span>
                <span className="mt-3.5 block font-display text-[0.95rem] font-bold leading-snug tracking-[-0.015em] text-charcoal">
                  {s.title}
                </span>
                <span className="mt-1.5 block text-[0.78rem] leading-relaxed text-slateink">
                  {s.scope[0]}
                  {i === 3 ? " (proposed)" : ""}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-navy/10 bg-ivory px-5 py-3.5">
            <span className="text-[0.78rem] text-slateink">Not sure which one fits?</span>
            <Link
              to="/next-step"
              onClick={() => setOpen(false)}
              className="link-arrow text-[0.8rem] text-royal hover:text-gold-deep"
            >
              Find Your Next Step <IconArrow size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { openBooking } = useStore();
  useBodyLock(menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      {/* Slim brand bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 hidden overflow-hidden bg-navy-800 text-ivory/70 transition-all duration-500 lg:block",
          solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-12 py-2.5">
          <p className="eyebrow text-[0.62rem] text-ivory/55">
            {brand.legalName} <span className="text-gold/70">DBA</span> {brand.dba}
          </p>
          <p className="eyebrow flex items-center gap-3 text-[0.62rem]">
            <span className="text-gold/85">{brand.tagline}</span>
            <span aria-hidden className="h-px w-10 bg-ivory/20" />
            <Link to="/next-step" className="text-ivory/60 transition-colors hover:text-gold-soft">
              Find your next step
            </Link>
          </p>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
          !solid && "lg:top-[36px]",
          solid
            ? "border-b border-navy/10 bg-ivory/92 text-charcoal shadow-[0_10px_40px_-30px_rgba(16,26,44,0.6)] backdrop-blur-md"
            : "border-b border-ivory/10 bg-transparent text-ivory"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="Ascent Consulting — home"
            className={cn("group shrink-0 transition-opacity hover:opacity-90", solid && "[&_span.text-ivory]:text-navy")}
          >
            <span className="flex items-center gap-3">
              <BrandMark size={34} tone={solid ? "dark" : "light"} />
              <span className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-display text-[1.02rem] font-extrabold tracking-[-0.02em] transition-colors duration-500",
                    solid ? "text-navy" : "text-ivory"
                  )}
                >
                  ASCENT
                </span>
                <span
                  className={cn(
                    "eyebrow mt-1 text-[0.56rem] transition-colors duration-500",
                    solid ? "text-gold-deep" : "text-gold/85"
                  )}
                >
                  Consulting
                </span>
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.to === "/services" ? (
                <ServicesNavItem key={item.to} solid={solid} />
              ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "group relative px-3.5 py-2 font-display text-[0.86rem] font-semibold transition-colors duration-300",
                    solid
                      ? isActive
                        ? "text-navy"
                        : "text-slateink hover:text-navy"
                      : isActive
                        ? "text-ivory"
                        : "text-ivory/72 hover:text-ivory"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-0.5 left-3.5 right-3.5 h-px origin-left bg-gold transition-transform duration-400",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openBooking("Header")}
              className={cn(
                "btn sweep hidden sm:inline-flex",
                solid ? "btn-navy" : "btn-gold",
                "!px-5 !py-2.5 !text-[0.8rem]"
              )}
            >
              <span className="relative z-10">Book a Consultation</span>
              <IconArrow size={15} className="relative z-10" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center border transition-colors duration-300 lg:hidden",
                solid ? "border-navy/15 text-navy hover:border-gold" : "border-ivory/25 text-ivory hover:border-gold"
              )}
              style={{ borderRadius: 3 }}
            >
              {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-400",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "bg-arc absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-gold/20 px-7 pb-8 pt-24 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                tabIndex={menuOpen ? 0 : -1}
                style={{ transitionDelay: menuOpen ? `${120 + i * 55}ms` : "0ms" }}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between border-b border-ivory/10 py-4 font-display text-2xl font-bold tracking-[-0.02em] transition-all duration-500",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    isActive ? "text-gold" : "text-ivory hover:text-gold-soft"
                  )
                }
              >
                {item.label}
                <span className="eyebrow text-[0.55rem] text-ivory/30">0{i + 1}</span>
              </NavLink>
            ))}
          </nav>

          <div
            className={cn(
              "mt-8 flex flex-col gap-3 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "470ms" : "0ms" }}
          >
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                openBooking("Mobile menu");
              }}
              className="btn btn-gold sweep w-full"
            >
              <span className="relative z-10">Book a Consultation</span>
              <IconArrow size={16} className="relative z-10" />
            </button>
            <Link
              to="/next-step"
              tabIndex={menuOpen ? 0 : -1}
              className="btn btn-ghost-light w-full"
            >
              Find Your Next Step
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-ivory/45">{brand.positioning}</p>
          </div>
        </div>
      </div>
    </>
  );
}
