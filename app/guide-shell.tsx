"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { chapters } from "./chapters";
import { ThemeToggle } from "./theme-toggle";

const sections = [...new Set(chapters.map((chapter) => chapter.section))];
const hashSlug = () => typeof window === "undefined" ? "start" : window.location.hash.replace(/^#\/?/, "") || "start";

export function GuideShell() {
  const [slug, setSlug] = useState("start");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sync = () => setSlug(chapters.some((c) => c.slug === hashSlug()) ? hashSlug() : "start");
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const current = chapters.find((chapter) => chapter.slug === slug) ?? chapters[0];
  const currentIndex = chapters.indexOf(current);
  const html = useMemo(() => marked.parse(current.content, { async:false }) as string, [current]);
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? chapters.filter((c) => `${c.title} ${c.description} ${c.content}`.toLowerCase().includes(needle)) : chapters;
  }, [query]);

  useEffect(() => {
    const update = () => {
      const article = document.querySelector(".article-pane"); if (!article) return;
      const top = article.getBoundingClientRect().top; const total = article.scrollHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(100, ((-top + 78) / Math.max(total, 1)) * 100)));
    };
    update(); window.addEventListener("scroll", update, { passive:true });
    return () => window.removeEventListener("scroll", update);
  }, [slug]);

  useEffect(() => {
    const article = document.querySelector(".article-body");
    article?.querySelectorAll("a").forEach((link) => {
      if ((link as HTMLAnchorElement).hostname && (link as HTMLAnchorElement).hostname !== window.location.hostname) { link.setAttribute("target", "_blank"); link.setAttribute("rel", "noreferrer"); }
    });
    article?.querySelectorAll("h2, h3").forEach((heading) => { heading.id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section"; });
    window.scrollTo({ top:0, behavior:"instant" });
  }, [html]);

  function navigate(nextSlug:string) { window.location.hash = `/${nextSlug}`; setSlug(nextSlug); setMenuOpen(false); }

  return <div className="guide-app">
    <div className="reading-progress" style={{ width:`${progress}%` }} />
    <header className="app-header">
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle chapter navigation">{menuOpen ? "×" : "☰"}</button>
      <button className="brand brand-button" onClick={() => navigate("start")}><span className="brand-mark">L</span><span>LLM Field Guide</span></button>
      <div className="header-meta"><span className="updated">Current through 19 Aug 2026</span><span className="pages-ready">GitHub Pages ready</span><ThemeToggle /></div>
    </header>

    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
      <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts…" aria-label="Search the guide"/><kbd>/</kbd></label>
      <nav className="chapter-nav" aria-label="Guide chapters">
        {sections.map((section) => { const items = matches.filter((c) => c.section === section); if (!items.length) return null; return <div className="nav-group" key={section}><p>{section}</p>{items.map((c) => <button className={c.slug === current.slug ? "active" : ""} onClick={() => navigate(c.slug)} key={c.slug}><span>{c.number}</span><span>{c.title}</span></button>)}</div>; })}
        {matches.length === 0 && <p className="no-results">No chapter contains “{query}”.</p>}
      </nav>
      <div className="sidebar-foot"><span><b>380</b> papers screened</span><span><b>21</b> searches</span></div>
    </aside>

    <main className="article-pane">
      <div className="article-meta"><span>Chapter {current.number}</span><span>{current.level}</span><button onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link</button></div>
      <article className="article-body" dangerouslySetInnerHTML={{ __html:html }} />
      <nav className="page-nav" aria-label="Previous and next chapters">
        {currentIndex > 0 ? <button onClick={() => navigate(chapters[currentIndex-1].slug)}><span>Previous</span><strong>← {chapters[currentIndex-1].title}</strong></button> : <span />}
        {currentIndex < chapters.length-1 ? <button className="next" onClick={() => navigate(chapters[currentIndex+1].slug)}><span>Next</span><strong>{chapters[currentIndex+1].title} →</strong></button> : <span />}
      </nav>
      <footer><p>Built as a source-led learning resource. Verify fast-changing model details at the linked primary source.</p><p>Markdown source included · Updated 2026-08-19</p></footer>
    </main>
  </div>;
}
