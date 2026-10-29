import { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/booking/BookingModal";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Process from "@/pages/Process";
import About from "@/pages/About";
import Resources, { ResourceArticle } from "@/pages/Resources";
import Contact from "@/pages/Contact";
import NextStep from "@/pages/NextStep";
import { PrivacyPolicy, TermsOfUse } from "@/pages/Legal";
import { AppStoreProvider } from "@/lib/store";
import { usePageMeta } from "@/lib/hooks";
import { ButtonLink, Eyebrow } from "@/components/ui";

/* ------------------------------ Scroll manager ----------------------------- */

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const t = window.setTimeout(
          () => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
          160
        );
        return () => window.clearTimeout(t);
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

/* ------------------------------ Progress rail ------------------------------ */

function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-royal via-gold to-gold-soft transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* --------------------------------- 404 ------------------------------------ */

function NotFound() {
  usePageMeta("Page not found | Ascent Consulting", "That page is not available on the Ascent Consulting website.");
  return (
    <section className="bg-arc relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-36 text-ivory lg:pt-48">
      <div aria-hidden className="bg-hairline pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow tone="light">Error 404</Eyebrow>
            <h1 className="display-lg mt-6 text-ivory">
              This page isn't part of <span className="text-gold">the journey</span>.
            </h1>
            <p className="lede mt-5 max-w-xl text-ivory/65">
              The link may be out of date. Everything on this site is reachable from the navigation — services,
              process, resources, and the enquiry form.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/" tone="gold" arrow>
                Return home
              </ButtonLink>
              <ButtonLink to="/services" tone="ghost-light">
                View services
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Popular destinations" className="grid gap-px overflow-hidden border border-ivory/14 bg-ivory/14 sm:grid-cols-2" style={{ borderRadius: 5 }}>
            {[
              { label: "Services", to: "/services", note: "Four areas of support" },
              { label: "Our process", to: "/process", note: "Five stages, in order" },
              { label: "Resources", to: "/resources", note: "Draft guides by stage" },
              { label: "Contact", to: "/contact", note: "Enquiry and booking" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group bg-navy-800/85 p-6 transition-colors duration-500 hover:bg-royal/45"
              >
                <span className="font-display text-[1.02rem] font-bold text-ivory">{l.label}</span>
                <span className="mt-1.5 block text-[0.82rem] text-ivory/58">{l.note}</span>
                <span aria-hidden className="mt-4 block h-px w-6 bg-gold/60 transition-all duration-500 group-hover:w-14" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Layout ---------------------------------- */

function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollProgressBar />
      <Header />
      <main id="main" className="flex-1">
        <div key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceArticle />} />
          <Route path="/next-step" element={<NextStep />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppStoreProvider>
        <ScrollManager />
        <Layout />
      </AppStoreProvider>
    </HashRouter>
  );
}
