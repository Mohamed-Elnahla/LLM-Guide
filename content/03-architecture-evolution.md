# How architectures evolved

## 2017–2019: pretraining becomes the interface

The original Transformer was an encoder–decoder for translation. GPT showed that a decoder pretrained with next-token prediction could transfer through fine-tuning [OpenAI, 2018](https://openai.com/index/language-unsupervised/). BERT showed the strength of large bidirectional encoders trained with masked-token prediction. GPT-2 scaled causal pretraining and demonstrated surprising zero-shot task behavior [OpenAI, 2019](https://openai.com/index/better-language-models/). T5 framed NLP tasks uniformly as text-to-text.

The enduring architectural split was now visible: encoders for representations, decoders for open-ended generation, encoder–decoders for conditional generation.

## 2020–2022: scale, prompting, and compute balance

GPT-3’s 175B-parameter decoder showed that tasks could be specified through natural-language prompts and demonstrations without gradient updates [Brown et al., 2020](https://openai.com/index/language-models-are-few-shot-learners/). Kaplan-style scaling laws related loss to model size, data, and compute [Kaplan et al., 2020](https://arxiv.org/abs/2001.08361). Chinchilla later argued that, under a fixed training-compute budget, many large models were undertrained and should use substantially more tokens [Hoffmann et al., 2022](https://arxiv.org/abs/2203.15556).

Architecture changes supported scale: pre-normalization, RMSNorm, gated MLPs, better parallelism, RoPE, and more stable optimizers. Sparse **mixture-of-experts** (MoE) models routed each token through only a subset of feed-forward experts, increasing total parameter capacity without proportional active compute. Switch Transformer demonstrated trillion-parameter sparse scaling, while also exposing routing balance and communication as central problems [Fedus et al., 2021](https://arxiv.org/abs/2101.03961).

## 2022–2024: assistants, open weights, efficiency

Instruction tuning and preference optimization turned continuation models into assistants. InstructGPT used supervised demonstrations, a reward model, and PPO-based RLHF [Ouyang et al., 2022](https://arxiv.org/abs/2203.02155). ChatGPT made the interaction pattern mainstream. Open-weight families—especially Llama—accelerated fine-tuning, quantization, and local inference research.

Serving requirements drove grouped-query attention, optimized kernels, paged KV-cache systems, low-bit quantization, continuous batching, and speculative decoding. Long-context claims expanded from thousands to hundreds of thousands and then millions of tokens, though evaluations showed that maximum accepted length and reliable use of dispersed information are different properties.

Alternative sequence models reappeared. **Mamba** used selective state-space layers with linear-time sequence processing and hardware-aware algorithms [Gu & Dao, 2023](https://arxiv.org/abs/2312.00752). Hybrid models combine attention’s flexible content lookup with recurrent/state-space efficiency. Transformers remain dominant, but “all-attention everywhere” is no longer the only credible design point.

## 2024–2026: multimodal, MoE, reasoning, and action

Frontier systems became natively multimodal and increasingly agentic. GPT-4o unified real-time text, vision, and audio interaction; Gemini was designed as a multimodal family; Llama 4 introduced Meta’s first Llama MoE and native multimodality; Qwen and DeepSeek paired open-weight releases with rapid architectural experimentation.

Reasoning models changed the scaling story. Performance could increase not only through more pretraining compute, but through post-training with verifiable rewards and more inference-time computation. OpenAI o1 made this product-visible in 2024. DeepSeek-R1 documented a pipeline in which reinforcement learning elicited long reasoning behavior and then distilled it into smaller models [DeepSeek-AI, 2025](https://arxiv.org/abs/2501.12948). Qwen3 integrated thinking and non-thinking modes into the same weights [Qwen Team, 2025](https://arxiv.org/abs/2505.09388).

By 2026, the leading product direction fused reasoning, tool use, computer interaction, multimodality, and multi-agent orchestration. This is a system-level change: capability increasingly depends on the model, inference budget, tools, context management, and harness together.

## Architectural idea map

| Idea | What it changes | Main benefit | Main cost/risk |
|---|---|---|---|
| Decoder-only | Causal generation backbone | Simple general interface | Sequential decoding |
| RoPE/relative position | Position representation | Better relative structure, extensibility | Long-range extrapolation needs care |
| GQA/MQA/MLA | K/V organization | Smaller cache, faster decode | Possible quality/implementation tradeoffs |
| MoE | Sparse expert routing | More capacity per active FLOP | Communication, load balance, large weight memory |
| Sliding/sparse attention | Attention pattern | Cheaper long sequences | May miss global interactions |
| State-space/recurrent hybrid | Sequence mixing | Linear-time streaming | Less mature tooling; task-dependent quality |
| Native multimodality | Token/representation streams | One model across media | Data alignment and evaluation complexity |
| Diffusion language models | Generation process | Parallel token refinement potential | Different training/serving stack; developing field |

## Do not infer what is undisclosed

Closed labs often publish behavior and safety evaluations without parameter counts, data mixtures, or exact architectures. Treat “Transformer-based,” “reasoning model,” and “multimodal” as the disclosed facts, not permission to invent hidden details. Product names may refer to routed systems rather than one static checkpoint.
