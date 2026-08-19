# Research audit and source policy

## Search summary

- Initial reconnaissance: 1 Consensus search.
- Confirmed depth: 20 targeted follow-up searches.
- Searches successful: 21 of 21; no retries or terminal failures.
- Results returned: generally 20 per query; two searches returned 19.
- Detected Consensus tier: 20-result tier.
- Unique academic records surfaced across the 20 stored follow-up searches: **380** after case-insensitive title deduplication. The initial 20-result scan is reported separately and overlaps the follow-up corpus.
- Full paper records fetched before citation: **24** high-priority papers.
- Web evidence: primary papers and official lab reports/model cards only for technical claims; current releases checked through 19 August 2026.

## Queries

1. Broad LLM evolution, Transformer architecture, instruction tuning, reasoning, efficiency.
2. Transformer, BERT, GPT, and foundational scaling work.
3. Efficient attention, MoE, position encoding, long context, state-space models.
4. Scaling laws, Chinchilla, data/compute/tokenization.
5. Instruction tuning, SFT, LoRA/QLoRA, PEFT, continued pretraining.
6. RLHF, DPO, RLAIF, Constitutional AI, GRPO.
7. GPTQ, AWQ, SmoothQuant, QLoRA, low precision.
8. KV cache, FlashAttention, speculative decoding, multi-token prediction.
9. Chain-of-thought, test-time compute, process rewards, verifiers, reasoning RL.
10. Multimodal vision/language/audio architectures.
11. RAG, tools, agents, memory, context engineering.
12. Evaluation, benchmarks, hallucination, calibration, contamination.
13. Mechanistic interpretability, sparse autoencoders, safety/transparency.
14. OpenAI GPT/InstructGPT/GPT-4/o1 family.
15. Google BERT/T5/PaLM/Gemini/Gemma family.
16. Meta Llama family through Llama 4.
17. Qwen family through Qwen3.
18. DeepSeek V2/V3/R1, MLA, MoE, MTP.
19. Pre-2021 foundational era.
20. 2022–2026 post-training, inference, and reasoning surveys.
21. Follow-up from Attention Is All You Need into later architectures.

## Limits

Consensus relevance ranking favored recent surveys for broad queries and did not always surface the original foundational paper; targeted title searches and primary web sources filled that gap. Citation counts are dynamic and were used only for prioritization, not as a quality metric. Current commercial model details are often undisclosed. The guide explicitly avoids guessing hidden architectures, parameter counts, datasets, and training cost.

This is a structured launch pad, not a claim that every LLM paper has been reviewed. The field produces new work daily; readers should follow citation graphs and run updated searches for active projects.

## Citation policy

Academic synthesis links to original papers and, for key records fetched in this session, the canonical Consensus page. Current model facts link to the producing lab. Author-reported benchmark claims should be treated as claims until independently reproduced. Secondary sources are excluded from core technical claims.
