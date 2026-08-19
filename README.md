# LLM Field Guide

A source-led, beginner-to-researcher guide to large language models, current through 19 August 2026. It covers the Transformer, architecture evolution, pretraining, post-training, fine-tuning, quantization, inference and MTP, reasoning, multimodality, RAG, agents, evaluation, safety, interpretability, and the OpenAI, Google, Meta, Qwen, and DeepSeek ecosystems.

## Local preview

```bash
npm install
npm run dev
```

## GitHub Pages

The repository includes `.github/workflows/pages.yml`. In GitHub, choose **Settings → Pages → Source: GitHub Actions**, then push the `main` branch. The static build uses relative asset paths, so it works for both user sites and project subpaths.

```bash
npm run build:pages
```

The generated static site is written to `pages-dist/`.

## Content

All long-form source lives in `content/*.md`. `RESEARCH_PLAN.md` explains the evidence hierarchy and update process. Chapter 16 contains the Consensus search audit and limitations.
