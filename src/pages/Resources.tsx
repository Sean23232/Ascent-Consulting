import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/utils/cn";
import { articles, px, readingTime, resourceCategories, type Article } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import PageHero from "@/components/PageHero";
import ConsultationCTABand from "@/components/ServiceCtaBand";
import { ButtonLink, Eyebrow, Pill, Reveal, Section } from "@/components/ui";
import { IconAlert, IconArrow, IconClock, IconDoc, IconSearch } from "@/components/Icon";

function ArticleCard({ a, index }: { a: Article; index: number }) {
  const featured = index === 0;
  return (
    <Reveal delay={index * 90} className={cn(featured && "md:col-span-2")}>
      <article
        className={cn(
          "group card-hover relative flex h-full flex-col overflow-hidden border border-navy/10 bg-paper",
          featured ? "md:grid md:grid-cols-[1.05fr_1fr] md:items-stretch" : ""
        )}
        style={{ borderRadius: 5 }}
      >
        <div className={cn("relative overflow-hidden bg-navy", featured ? "md:h-full" : "")}>
          <img
            src={a.image}
            alt={a.imageAlt}
            loading="lazy"
            width={1100}
            height={750}
            className={cn("img-zoom w-full object-cover opacity-88", featured ? "h-56 md:h-full" : "h-48")}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
          <span className="eyebrow absolute left-5 top-5 border border-ivory/25 bg-navy/60 px-3 py-1.5 text-[0.5rem] text-ivory/85 backdrop-blur-sm" style={{ borderRadius: 999 }}>
            {a.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <span className="eyebrow inline-flex items-center gap-1.5 text-[0.52rem] text-slateink">
              <IconClock size={12} /> {readingTime(a)} min read
            </span>
            {a.draft && <Pill tone="gold" className="!px-2.5 !py-0.5 !text-[0.48rem]">Draft</Pill>}
          </div>

          <h3 className={cn("mt-4 font-display font-extrabold tracking-[-0.025em] text-charcoal", featured ? "text-[1.45rem] leading-tight sm:text-[1.7rem]" : "text-[1.15rem] leading-snug")}>
            <Link to={`/resources/${a.slug}`} className="transition-colors duration-300 hover:text-royal">
              <span aria-hidden className="absolute inset-0 z-0" />
              <span className="relative z-10">{a.title}</span>
            </Link>
          </h3>

          <p className={cn("mt-3.5 text-[0.92rem] leading-relaxed text-slateink", featured && "max-w-lg")}>{a.excerpt}</p>

          <div className="mt-auto pt-6">
            <Link to={`/resources/${a.slug}`} className="link-arrow relative z-20 text-[0.85rem] text-royal group-hover:text-gold-deep">
              Read the article <IconArrow size={14} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Resources() {
  usePageMeta(
    "Resources | Ascent Consulting — Guides on Setup, Planning & Funding Preparation",
    "Draft guidance on starting a business, business planning, funding preparation, and growth — with search and category filters."
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof resourceCategories)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.body.some((b) => b.text.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHero
        eyebrow="Resource centre"
        breadcrumb="Resources"
        title={
          <>
            Practical Reading for <span className="text-gold">Each Stage</span>.
          </>
        }
        lede="Guidance written around the journey — starting a business, planning, funding preparation, and growth. Every piece is marked as draft content pending review."
        image={px(7413914, 1000, 900)}
        imageAlt="Colleagues reviewing written planning material together"
        meta={[
          { label: "Articles", value: `${articles.length} published drafts` },
          { label: "Categories", value: "Four" },
          { label: "Status", value: "Draft — pending review" },
        ]}
      />

      <Section tone="light" id="resource-library">
        <div className="flex flex-col gap-6 border-b border-navy/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Browse</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="display-md mt-4 text-charcoal">Filter the library</h2>
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full lg:max-w-md">
            <div className="relative">
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <IconSearch size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slateink" />
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, or keywords…"
                className="field pl-11"
              />
            </div>
            <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {resourceCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "shrink-0 border px-3.5 py-2 font-display text-[0.78rem] font-semibold transition-all duration-300",
                    category === c
                      ? "border-navy bg-navy text-ivory"
                      : "border-navy/14 bg-paper text-slateink hover:-translate-y-0.5 hover:border-gold/60 hover:text-charcoal"
                  )}
                  style={{ borderRadius: 999 }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="mt-6 font-mono text-[0.72rem] text-slateink" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {category !== "All" && ` in ${category}`}
          {query.trim() && ` matching “${query.trim()}”`}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filtered.map((a, i) => (
              <ArticleCard key={a.slug} a={a} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-navy/25 bg-paper/60 p-12 text-center" style={{ borderRadius: 5 }}>
            <IconDoc size={26} className="mx-auto text-navy/30" />
            <p className="mt-4 font-display text-[1.1rem] font-bold text-charcoal">Nothing matches that search yet</p>
            <p className="mx-auto mt-2 max-w-md text-[0.9rem] leading-relaxed text-slateink">
              The resource centre is being populated. Try a broader term, or reset the filters to see everything
              currently available.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="btn btn-navy !py-2.5 !text-[0.8rem]">
                Reset filters
              </button>
              <ButtonLink to="/contact" tone="ghost-dark" size="sm">
                Ask a question instead
              </ButtonLink>
            </div>
          </div>
        )}

        <Reveal delay={100}>
          <div className="mt-12 flex items-start gap-3 border border-gold/30 bg-gold/[0.06] p-5" style={{ borderRadius: 4 }}>
            <IconAlert size={16} className="mt-0.5 shrink-0 text-gold-deep" />
            <p className="text-[0.82rem] leading-relaxed text-charcoal/80">
              All articles on this site are draft, informational content. They do not contain fabricated research,
              statistics, expert endorsements, or financial claims, and they do not constitute legal, tax, or regulated
              financial advice.
            </p>
          </div>
        </Reveal>
      </Section>

      <ConsultationCTABand />
    </>
  );
}

export function ResourceArticle() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  const { openBooking } = useStore();

  usePageMeta(
    article ? `${article.title} | Ascent Consulting Resources` : "Resource not found | Ascent Consulting",
    article?.excerpt ?? "This resource is not available."
  );

  if (!article) {
    return (
      <Section tone="light">
        <div className="max-w-xl">
          <Eyebrow>Resource centre</Eyebrow>
          <h1 className="display-md mt-5 text-charcoal">That article isn't available</h1>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-slateink">
            The link may be out of date. Browse the resource centre for current draft guidance.
          </p>
          <div className="mt-7 flex gap-3">
            <ButtonLink to="/resources" tone="navy" arrow>
              Back to resources
            </ButtonLink>
            <ButtonLink to="/contact" tone="ghost-dark">
              Ask a question
            </ButtonLink>
          </div>
        </div>
      </Section>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const mins = readingTime(article);

  return (
    <>
      <article>
        <PageHero
          eyebrow={article.category}
          breadcrumb="Resources"
          title={<span className="text-[clamp(2rem,4.6vw,3.4rem)]">{article.title}</span>}
          lede={article.excerpt}
          meta={[
            { label: "Reading time", value: `${mins} minutes` },
            { label: "Status", value: article.draft ? "Draft content" : "Published" },
            { label: "Category", value: article.category },
          ]}
        />

        <Section tone="paper">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div className="max-w-2xl">
              <div className="group relative mb-10 overflow-hidden bg-navy" style={{ borderRadius: 5 }}>
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  width={1100}
                  height={620}
                  className="img-zoom h-64 w-full object-cover opacity-90 sm:h-80"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>

              {article.body.map((block, i) => (
                <Reveal key={i} delay={40}>
                  <div className="mb-8">
                    {block.heading && (
                      <h2 className="font-display text-[1.32rem] font-extrabold tracking-[-0.022em] text-charcoal">
                        <span className="mr-3 font-mono text-[0.7rem] font-medium text-gold-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {block.heading}
                      </h2>
                    )}
                    <p className={cn("mt-3 text-[1rem] leading-[1.78] text-charcoal/85", !block.heading && "border-l border-gold/40 pl-5 text-[0.88rem] leading-relaxed text-slateink")}>
                      {block.text}
                    </p>
                  </div>
                </Reveal>
              ))}

              <div className="mt-10 border-t border-navy/10 pt-8">
                <Link to="/resources" className="link-arrow text-royal">
                  Back to all resources <IconArrow size={15} />
                </Link>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-navy/12 bg-ivory/60 p-6" style={{ borderRadius: 5 }}>
                <p className="eyebrow text-[0.55rem] text-royal">Continue the conversation</p>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-slateink">
                  Reading about a stage and working through it are different things. A consultation looks at your
                  specific position.
                </p>
                <button type="button" onClick={() => openBooking(`Resource — ${article.slug}`)} className="btn btn-navy sweep mt-5 w-full">
                  <span className="relative z-10">Book a consultation</span>
                  <IconArrow size={15} className="relative z-10" />
                </button>
                <Link to="/next-step" className="btn btn-ghost-dark mt-3 w-full">
                  Find Your Next Step
                </Link>
              </div>

              <div className="mt-6">
                <p className="eyebrow text-[0.55rem] text-royal">Related reading</p>
                <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/resources/${r.slug}`} className="group flex gap-4 py-4">
                        <img
                          src={r.image}
                          alt=""
                          loading="lazy"
                          width={160}
                          height={160}
                          className="h-14 w-14 shrink-0 object-cover opacity-85 transition-opacity duration-400 group-hover:opacity-100"
                          style={{ borderRadius: 3 }}
                        />
                        <span>
                          <span className="eyebrow block text-[0.48rem] text-gold-deep">{r.category}</span>
                          <span className="mt-1.5 block font-display text-[0.9rem] font-bold leading-snug text-charcoal transition-colors group-hover:text-royal">
                            {r.title}
                          </span>
                          <span className="mt-1.5 block font-mono text-[0.62rem] text-slateink">{readingTime(r)} min</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Section>
      </article>

      <ConsultationCTABand />
    </>
  );
}
