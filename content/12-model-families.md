# Model-family evolution: OpenAI, Google, Meta, Qwen, DeepSeek

> Current through **19 August 2026**. Closed-model architecture details are included only when officially disclosed. Model names, availability, and product routing change quickly; follow the linked official source for current use.

## OpenAI: generative pretraining → prompting → alignment → reasoning agents

| Era | Major step | Why it mattered |
|---|---|---|
| 2018 | GPT | Combined Transformer decoder pretraining with supervised fine-tuning for transfer [OpenAI](https://openai.com/index/language-unsupervised/) |
| 2019 | GPT-2 | Scaled causal LM to 1.5B and demonstrated zero-shot multitask behavior; staged release raised model-release governance [OpenAI](https://openai.com/index/better-language-models/) |
| 2020 | GPT-3 | 175B parameters; in-context zero/few-shot prompting became a general interface [OpenAI](https://openai.com/index/language-models-are-few-shot-learners/) |
| 2022 | InstructGPT / ChatGPT | SFT + reward modeling + RLHF shifted focus from base loss to human-preferred assistant behavior |
| 2023 | GPT-4 | Stronger multimodal (image/text input) frontier model; limited architectural disclosure [technical report](https://arxiv.org/abs/2303.08774) |
| 2024 | GPT-4o; o1 | Native real-time multimodality; then a distinct reasoning series trained to spend more inference compute [o1](https://openai.com/index/learning-to-reason-with-llms/) |
| 2025 | GPT-4.1; o3/o4-mini; GPT-5 | Long-context coding/instruction improvements, agentic tool use, and convergence of GPT and reasoning behavior [o3/o4-mini](https://openai.com/index/introducing-o3-and-o4-mini/) |
| 2026 | GPT-5.x and GPT-5.6 | Model families expose cost/capability tiers and reasoning-effort controls; GPT-5.6 Sol/Terra/Luna emphasize efficient agentic knowledge work [OpenAI, July 2026](https://openai.com/index/gpt-5-6/) |

Research theme: OpenAI moved from publishing architecture/scale details toward system cards, behavior, safety, and product-level routed systems. Do not assume public GPT-3 architecture details apply to later models.

## Google / DeepMind: bidirectional understanding → text-to-text → scale → native multimodality

| Era | Major step | Why it mattered |
|---|---|---|
| 2018–20 | BERT, T5 | BERT established bidirectional masked pretraining; T5 unified NLP as text-to-text and systematized transfer-learning comparisons |
| 2021–22 | Switch, GLaM, PaLM | Sparse MoE scaling and large dense Pathways models; PaLM documented scaling across reasoning, multilingual, and code tasks [PaLM](https://arxiv.org/abs/2204.02311) |
| 2023 | Gemini 1 | A family designed for multimodal inputs and different deployment scales [technical report](https://deepmind.google/gemini/gemini_1_report.pdf) |
| 2024 | Gemini 1.5; Gemma | Long-context MoE Gemini models and open-weight Gemma models derived from Google research |
| 2025 | Gemini 2.x / 2.5; Gemma 3 | Native multimodality, reasoning/“thinking,” tool use, very long context, and open-weight multimodal variants |
| 2025–26 | Gemini 3 → 3.6; Gemma 4 | Frontier reasoning and action families split into Pro/Flash/Flash-Lite and modality/specialist variants; current official model-card index lists Gemini 3.6 Flash (July 2026) [model cards](https://deepmind.google/models/model-cards/) |

Research theme: Google has explored every major architecture family—encoders, encoder–decoders, dense decoders, MoE, long-context and multimodal systems—while maintaining small open-weight Gemma releases alongside closed Gemini systems.

## Meta: efficient open weights → scaled open ecosystem → MoE multimodality

| Era | Major step | Why it mattered |
|---|---|---|
| 2023 | LLaMA; Llama 2 | Strong compute-efficient base models and broadly available weights catalyzed open fine-tuning; Llama 2 added chat models and safety reporting [paper](https://arxiv.org/abs/2307.09288) |
| 2024 | Llama 3 / 3.1 / 3.2 / 3.3 | Improved tokenizer/data/post-training; 3.1 scaled a dense decoder to 405B with 128K context; 3.2 added vision and small edge models [Llama 3 paper](https://arxiv.org/abs/2407.21783) |
| 2025 | Llama 4 Scout/Maverick | First Llama MoE and natively multimodal models; 17B active parameters with 16 or 128 experts, with distillation from Behemoth [Meta](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) |
| 2026 | Muse Spark | Meta Superintelligence Labs introduced a natively multimodal reasoning model with tool use, visual CoT, and multi-agent orchestration; it is a new Muse family rather than a disclosed Llama 5 [Meta](https://ai.meta.com/blog/introducing-muse-spark-msl/) |

Research theme: Llama made reproducible post-training and serving research accessible. “Open source” remains debated because weights and code may be available while training data, full recipe, and license freedoms are limited.

## Qwen: multilingual open weights → specialist models → unified thinking

| Era | Major step | Why it mattered |
|---|---|---|
| 2023 | Qwen / Qwen-VL / Qwen-Audio | Alibaba’s open-weight multilingual family launched text and modality-specific branches [report](https://arxiv.org/abs/2309.16609) |
| 2024 | Qwen1.5, Qwen2, Qwen2.5 | Dense and MoE sizes, GQA, improved multilingual/code/math data, 128K context, and specialist Coder/Math/VL models [Qwen2](https://arxiv.org/abs/2407.10671) |
| 2025 | QwQ; Qwen3 | Open reasoning and a single family with thinking/non-thinking modes; dense 0.6–32B and MoE up to 235B total/22B active, 36T pretraining tokens, 119 languages [Qwen3](https://qwenlm.github.io/blog/qwen3/) |
| 2025–26 | Qwen3-VL/Omni and later Qwen3.x releases | Expanded unified multimodal and agent-oriented models. The official dynamic Qwen site should be treated as the source for 2026 product names; independently verify details before citing them in research. |

Research theme: Qwen pairs broad size coverage and Apache-licensed releases with strong multilingual, code, math, vision, audio, and agent work. Qwen3’s controllable thinking budget is a useful open reference for inference-time scaling.

## DeepSeek: efficient open MoE → MLA/MTP → reasoning RL

| Era | Major step | Why it mattered |
|---|---|---|
| 2024 | DeepSeek-V2 | DeepSeekMoE plus Multi-head Latent Attention reduced active compute and KV cache; 236B total/21B active [paper](https://arxiv.org/abs/2405.04434) |
| 2024 | DeepSeek-Coder/Math | Domain models and the GRPO algorithm connected verifiable tasks with efficient reinforcement learning [DeepSeekMath](https://arxiv.org/abs/2402.03300) |
| Dec 2024 | DeepSeek-V3 | 671B total/37B active MoE, 14.8T tokens, auxiliary-loss-free load balancing, FP8 training, MLA, and multi-token prediction [report](https://arxiv.org/abs/2412.19437) |
| Jan 2025 | DeepSeek-R1 | Reasoning RL, cold-start data, multi-stage post-training, and distillation into smaller Qwen/Llama-derived models [report](https://arxiv.org/abs/2501.12948) |
| Aug 2025 | DeepSeek-V3.1 | Hybrid think/non-think modes, 128K context, 840B-token continued pretraining over V3, and stronger agent/tool behavior [official release](https://api-docs.deepseek.com/news/news250821/) |
| 2026 | Systems work | Official repositories emphasize inference/training infrastructure including FlashMLA, DeepEP, DeepGEMM, speculative decoding, and agent harnesses [DeepSeek GitHub](https://github.com/deepseek-ai) |

Research theme: DeepSeek’s unusual impact comes from combining strong open weights with detailed efficiency innovations across architecture, numerical training, load balancing, kernels, and RL. Do not treat unofficial rumors or third-party “V4” pages as primary evidence until DeepSeek publishes an official model/report.

## Cross-family comparison

| Dimension | OpenAI | Google | Meta | Qwen | DeepSeek |
|---|---|---|---|---|---|
| Weights | Closed frontier | Closed Gemini; open Gemma | Open-weight Llama; closed Muse | Broad open-weight releases | Broad open-weight releases |
| Signature contribution | GPT prompting, RLHF assistants, productized reasoning | BERT/T5, scaling/MoE, native multimodality | Open-weight ecosystem at scale | Multilingual/specialist breadth, hybrid thinking | MLA, efficient MoE/FP8/MTP, reasoning RL |
| Architecture disclosure | Limited after GPT-3 | Reports/cards, variable detail | Detailed Llama papers | Detailed technical reports | Detailed technical reports |
| 2026 direction | Routed agentic frontier tiers | Gemini reasoning/action and modality variants | Muse multimodal reasoning/orchestration | Agentic multimodal Qwen3.x ecosystem | Efficient infrastructure and hybrid reasoning |

Comparisons should normalize tool access, reasoning budget, date, prompt, and cost. A proprietary system may silently route among models; an open checkpoint is more reproducible but may lack the production harness used in reported results.
