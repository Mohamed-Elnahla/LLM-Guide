import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default:worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers:{ accept:"text/html" } }), {
    ASSETS:{ fetch:async () => new Response("Not found", { status:404 }) },
  }, { waitUntil(){}, passThroughOnException(){} });
}

test("renders the finished LLM Field Guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>LLM Field Guide — From Attention to Frontier Models<\/title>/i);
  assert.match(html, /LLM Field Guide/);
  assert.match(html, /papers screened/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships the full Markdown corpus and GitHub Pages workflow", async () => {
  const [files, workflow, plan, packageJson] = await Promise.all([
    readdir(new URL("../content/", import.meta.url)),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../RESEARCH_PLAN.md", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.equal(files.filter((file) => file.endsWith(".md")).length, 17);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(packageJson, /"build:pages"/);
  assert.match(plan, /Evidence hierarchy/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(root);
});
