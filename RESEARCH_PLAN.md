# LLM Field Guide — research and content plan

Last updated: 2026-08-19

## Goal

Build a durable, source-led learning path that takes a reader from no machine-learning background to being able to read current LLM papers, reproduce experiments, and identify research questions. The guide separates stable mechanisms from fast-changing model-release facts and labels claims according to source quality.

## Evidence hierarchy

1. Original peer-reviewed paper or author technical report.
2. Official model card, system card, research blog, or repository from the producing lab.
3. High-quality survey used to map terminology and locate primary work.
4. Secondary explanation only when no primary account exists; clearly labeled.

Benchmarks are reported as claims by their authors, not universal rankings. “Open” is decomposed into open paper, open code, open weights, open data, and license rather than treated as one property.

## Research map

| Area | Questions to answer | Primary evidence sought |
|---|---|---|
| Foundations | What problem did attention solve? What is learned? | Transformer, GPT, BERT, scaling-law papers |
| Architecture | Decoder vs encoder; attention variants; MoE; long context; SSMs | RoPE, GQA, Switch, Mamba, long-context reports |
| Pretraining | Objectives, tokenization, data mixtures, optimization, compute | GPT-3, Kaplan scaling, Chinchilla, data papers |
| Post-training | SFT, reward models, RLHF, RLAIF, DPO, GRPO, distillation | InstructGPT, Constitutional AI, DPO, DeepSeekMath/R1 |
| Adaptation | Full FT, PEFT, LoRA/QLoRA, adapters, prompt tuning, merging | LoRA, QLoRA and comparative studies |
| Efficiency | Precision, quantization, sparsity, kernels, caching, decoding, MTP | GPTQ, AWQ, SmoothQuant, FlashAttention, speculative decoding, MTP |
| Reasoning | CoT, search, verifiers, process rewards, test-time scaling | CoT, self-consistency, ReAct, R1 and reasoning reports |
| Systems | RAG, tools, agents, memory, context engineering | RAG, Toolformer, ReAct and agent evaluations |
| Evaluation | Capability, robustness, contamination, calibration, safety | HELM, benchmark papers, model/system cards |
| Model families | What did OpenAI, Google, Meta, Qwen, DeepSeek change? | Official papers, reports, model cards, release pages |

## Deliverables

- Beginner-to-advanced chapters in `content/`.
- A chronological timeline and cross-family comparison.
- A glossary and equations/notation reference.
- A source library with primary links and Consensus retrieval links.
- A reproducible search audit with known coverage limits.
- A minimal accessible website with search and light/dark themes.
- GitHub Pages deployment workflow and a static-safe client experience.

## Updating the guide

For a new model release, record the announcement date, model type, modalities, context policy, disclosed architecture, post-training method, release level, model/system card, and any reproducible evaluation. Do not infer undisclosed parameter counts or training methods. Date every “current” statement.
