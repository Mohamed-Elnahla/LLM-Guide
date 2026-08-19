"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { chapters } from "./chapters";
import { chapterVideos } from "./video-guide";
import { ThemeToggle } from "./theme-toggle";

const sections = [...new Set(chapters.map((chapter) => chapter.section))];
const hashSlug = () => typeof window === "undefined" ? "start" : window.location.hash.replace(/^#\/?/, "") || "start";
const headingSlug = (text:string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";

type VisualKind = "layers" | "tokens" | "attention" | "pipeline" | "alignment" | "adapter" | "quantization" | "cache" | "reasoning" | "agent" | "evaluation" | "ecosystem";

const visualFor: Record<string, { kind: VisualKind; label: string; caption: string }> = {
  start: { kind: "layers", label: "One field, four layers", caption: "Original schematic · use it as the map for the chapters that follow." },
  "language-models": { kind: "tokens", label: "From tokens to a next-token guess", caption: "Original schematic · the prediction loop simplified." },
  transformer: { kind: "attention", label: "Attention routes information", caption: "Original schematic · Q/K/V and the residual stream, simplified from the chapter's cited papers." },
  pretraining: { kind: "pipeline", label: "Pretraining is a data-to-weights pipeline", caption: "Original schematic · data quality and evaluation sit inside the training loop." },
  "post-training": { kind: "alignment", label: "Post-training changes how knowledge is elicited", caption: "Original schematic · a compact view of SFT and preference optimization." },
  "fine-tuning": { kind: "adapter", label: "PEFT leaves the base mostly frozen", caption: "Original schematic · the adapter path carries the small update." },
  quantization: { kind: "quantization", label: "Compression trades precision for efficiency", caption: "Original schematic · fewer numeric states, lower memory, measured quality trade-offs." },
  inference: { kind: "cache", label: "Serving is a repeated decode loop", caption: "Original schematic · the KV cache prevents recomputing prior context." },
  reasoning: { kind: "reasoning", label: "Test-time compute searches before answering", caption: "Original schematic · candidates are filtered by a verifier or outcome signal." },
  agents: { kind: "agent", label: "An agent is a model–tool loop", caption: "Original schematic · retrieval and tools are outside the model weights." },
  evaluation: { kind: "evaluation", label: "Measure the whole system", caption: "Original schematic · component metrics do not replace end-to-end and impact measures." },
  families: { kind: "ecosystem", label: "Model families are a field map, not a leaderboard", caption: "Original schematic · compare design choices, training, deployment, and evidence." },
};

function VisualExplainer({ slug }: { slug: string }) {
  const visual = visualFor[slug] ?? { kind: "ecosystem" as VisualKind, label: "A field of connected ideas", caption: "Original schematic · a visual index for this reference chapter." };
  return <figure className={`concept-visual visual-${visual.kind}`} aria-label={visual.label}>
    <div className="visual-heading"><span className="visual-kicker">Visual explainer</span><strong>{visual.label}</strong></div>
    <div className="visual-stage" aria-hidden="true">
      {visual.kind === "layers" && <><div className="layer-stack"><span>APPLICATION</span><span>INFERENCE SYSTEM</span><span>TRAINING</span><span className="highlight">MODEL</span></div><div className="visual-arrow">↓</div><div className="visual-note">keep the layers separate</div></>}
      {visual.kind === "tokens" && <><div className="token-row"><i>the</i><i>model</i><i>predicts</i><i className="highlight">next</i></div><div className="visual-arrow">→</div><div className="vector-bars"><b/><b/><b/><b/><b/></div><div className="visual-arrow">→</div><div className="prob-row"><span>token A <b style={{width:"72%"}}/></span><span>token B <b style={{width:"44%"}}/></span><span>token C <b style={{width:"21%"}}/></span></div></>}
      {visual.kind === "attention" && <><div className="qkv"><span>Q</span><span>·</span><span>K</span><span>→</span><span>weights</span><span>× V</span></div><div className="attention-grid">{Array.from({length:25}, (_, i) => <i key={i} className={i === 7 || i === 13 || i === 18 ? "hot" : ""}/>)}</div><div className="residual-line"><span>token stream</span><b>attention</b><span>MLP</span><b>attention</b><span>output</span></div></>}
      {visual.kind === "pipeline" && <><div className="flow-row"><span>collect</span><b>→</b><span>filter</span><b>→</b><span className="highlight">train</span><b>→</b><span>evaluate</span></div><div className="loop-line"><span>new data / new checkpoint</span><b>↺</b></div></>}
      {visual.kind === "alignment" && <><div className="model-node">base<br/>model</div><div className="branch-line"><span>SFT</span><span>preference data</span><span>verifier / reward</span></div><div className="aligned-node highlight">useful<br/>assistant</div></>}
      {visual.kind === "adapter" && <><div className="adapter-base"><span>frozen base weights</span><b>████████████</b><b>████████████</b><b>████████████</b></div><div className="adapter-path"><span>LoRA / adapter</span><b>▰ ▰ ▰</b></div><div className="adapter-output">adapted behavior</div></>}
      {visual.kind === "quantization" && <><div className="precision-block"><span>FP16</span><b>████████████████</b><small>more states · more memory</small></div><div className="precision-arrow">→</div><div className="precision-block compact highlight"><span>INT4</span><b>███</b><small>fewer states · faster serving</small></div></>}
      {visual.kind === "cache" && <><div className="decode-prompt"><span>prompt</span><b>▰ ▰ ▰ ▰</b></div><div className="decode-cache"><span>KV cache</span><b>••••••••••</b></div><div className="decode-next highlight">next token</div><div className="decode-loop">append ↺ repeat</div></>}
      {visual.kind === "reasoning" && <><div className="reason-root">question</div><div className="reason-branches"><span>path A</span><span className="highlight">path B</span><span>path C</span></div><div className="verifier">verifier<br/><small>select / refine</small></div><div className="reason-answer">answer</div></>}
      {visual.kind === "agent" && <><div className="agent-loop"><span>observe</span><b>→</b><span className="highlight">decide</span><b>→</b><span>act</span><b>→</b><span>result</span><b>↺</b></div><div className="agent-tools"><span>retrieval</span><span>calculator</span><span>API / browser</span></div></>}
      {visual.kind === "evaluation" && <><div className="eval-stack"><span>impact</span><span>system</span><span>behavior</span><span>capability</span><span className="highlight">component</span></div><div className="eval-callout">test the layer where failure matters</div></>}
      {visual.kind === "ecosystem" && <><div className="ecosystem-orbit"><span className="highlight">data</span><span>architecture</span><span>training</span><span>hardware</span><span>deployment</span><strong>model family</strong></div></>}
    </div>
    <figcaption>{visual.caption}</figcaption>
  </figure>;
}

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
  const articleParts = useMemo(() => {
    const videosByHeading = chapterVideos[current.slug] ?? {};
    let body = marked.parse(current.content, { async:false }) as string;
    body = body.replace(/<(h2|h3)>(.*?)<\/\1>/g, (match, _tag:string, rawTitle:string) => {
      const title = rawTitle.replace(/<[^>]+>/g, "");
      const cards = (videosByHeading[headingSlug(title)] ?? []).map((video) => {
        const embedSrc = video.embedId
          ? `https://www.youtube-nocookie.com/embed/${video.embedId}?rel=0`
          : video.embedUrl;
        const embed = embedSrc
          ? `<div class="video-frame"><iframe src="${embedSrc}" title="${video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
          : `<a class="video-link" href="${video.url}" target="_blank" rel="noreferrer"><span>Open this focused video on YouTube ↗</span></a>`;
        return `<aside class="video-card"><div class="video-copy"><div class="video-label"><span class="video-dot"></span> Focus video <span class="video-duration">${video.duration}</span></div><h4>${video.title}</h4><p>${video.note}</p><a class="video-source" href="${video.url}" target="_blank" rel="noreferrer">YouTube source ↗</a></div>${embed}</aside>`;
      }).join("");
      return `${match}${cards}`;
    });
    body = body.replace(/(<h1>.*?<\/h1>)/, "$1<!--VISUAL-->");
    return { html:body };
  }, [current]);
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
    article?.querySelectorAll("h2, h3").forEach((heading) => { heading.id = headingSlug(heading.textContent ?? ""); });
    window.scrollTo({ top:0, behavior:"instant" });
  }, [articleParts]);

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
      <article className="article-body">
        <div dangerouslySetInnerHTML={{ __html:articleParts.html.split("<!--VISUAL-->")[0] }} />
        <VisualExplainer slug={current.slug} />
        <div dangerouslySetInnerHTML={{ __html:articleParts.html.split("<!--VISUAL-->")[1] ?? "" }} />
      </article>
      <nav className="page-nav" aria-label="Previous and next chapters">
        {currentIndex > 0 ? <button onClick={() => navigate(chapters[currentIndex-1].slug)}><span>Previous</span><strong>← {chapters[currentIndex-1].title}</strong></button> : <span />}
        {currentIndex < chapters.length-1 ? <button className="next" onClick={() => navigate(chapters[currentIndex+1].slug)}><span>Next</span><strong>{chapters[currentIndex+1].title} →</strong></button> : <span />}
      </nav>
      <footer><p>Built as a source-led learning resource. Verify fast-changing model details at the linked primary source.</p><p>Markdown source included · Updated 2026-08-19</p></footer>
    </main>
  </div>;
}
