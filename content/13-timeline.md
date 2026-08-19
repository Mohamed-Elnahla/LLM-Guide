# Timeline: attention to agentic reasoning

| Year | Milestone | Lasting significance |
|---|---|---|
| 2014 | Sequence-to-sequence and neural attention | Encoder–decoder learning and direct alignment over source states made neural translation practical |
| 2017 | Transformer | Removed recurrence; self-attention and parallel training became the general backbone |
| 2018 | GPT and BERT | Generative transfer and bidirectional masked pretraining established two dominant paradigms |
| 2019 | GPT-2, T5, Transformer-XL | Zero-shot generative behavior, text-to-text transfer, and explicit longer-memory research |
| 2020 | GPT-3 and scaling laws | Few-shot prompting and predictable scaling shifted research toward general models and compute planning |
| 2021 | Switch Transformer, RoPE, LoRA | Sparse MoE capacity, durable relative position methods, and cheap adaptation |
| 2022 | Chinchilla, InstructGPT/ChatGPT, CoT, FlashAttention | Compute-optimal data, RLHF assistants, elicited reasoning, and IO-aware exact attention |
| 2023 | GPT-4, Llama, DPO, QLoRA, Mamba, Gemini | Multimodal frontier models, open-weight ecosystem, simpler preferences, 4-bit adaptation, credible SSMs |
| 2024 | GPT-4o/o1, Llama 3, Qwen2.5, DeepSeek-V2/V3 | Native multimodality, inference-time reasoning, stronger open models, MLA/MoE/MTP/FP8 efficiency |
| 2025 | DeepSeek-R1, Qwen3, Llama 4, OpenAI o3/o4-mini, Gemini 2.5/3 | Reasoning RL and controllable thinking, open MoE multimodality, agentic tool use |
| 2026 | GPT-5.6, Gemini 3.x/3.6, Meta Muse Spark; diffusion and agent infrastructure | Frontier systems increasingly combine adaptive reasoning, multimodality, tools, computer use, and orchestration |

## Terminology shifts

- **Word → subword/byte token:** vocabularies moved from linguistic words toward reversible, scalable encoding units.
- **Transfer learning → pretraining/fine-tuning → foundation models:** one pretrained network became a reusable substrate for many tasks.
- **Language model → large language model → multimodal model:** the decoder’s interface expanded beyond text.
- **Fine-tuning → post-training:** modern recipes include SFT, preferences, RL, synthetic data, distillation, safety, and tool behavior.
- **Prompt engineering → context engineering:** system design now includes retrieved evidence, tools, memory, schemas, and trust boundaries.
- **Chatbot → agent:** the model participates in a stateful action loop; this label implies a system, not just weights.
- **Scaling → inference-time scaling:** capability investment moved from training only to adaptive computation per request.

## Paradigm changes to remember

The architecture revolution was only the first transition. The interface moved from task-specific fine-tuning to prompting; the optimization target moved from next-token loss to human and verifiable preferences; the unit of analysis moved from a checkpoint to a model-plus-tools system; and the compute frontier expanded from training FLOPs to lifetime inference efficiency.
