# Inference, serving, and multi-token prediction

## Prefill and decode

**Prefill** processes the prompt in parallel and builds key/value tensors for every layer. It is often compute-heavy. **Decode** produces tokens sequentially, reading weights and the KV cache each step; at small batches it is often memory-bandwidth-bound. Time to first token and inter-token latency therefore respond to different optimizations.

## The KV cache

Without caching, generation would recompute attention keys and values for the entire prefix at every step. The KV cache stores them. Its approximate size grows with:

```text
batch × sequence × layers × KV-heads × head-dim × 2(K,V) × bytes
```

MHA has one K/V pair per query head; MQA, GQA, and MLA reduce this dimension. Paged allocation reduces fragmentation. Prefix caching reuses identical prompt prefixes. Cache quantization saves memory but can degrade quality.

## Kernels and batching

FlashAttention is an exact IO-aware attention algorithm that tiles work to reduce high-bandwidth-memory traffic [Dao et al., 2022](https://arxiv.org/abs/2205.14135). FlashAttention-2 improves work partitioning; FlashAttention-3 targets newer hardware. Continuous batching admits and removes requests dynamically. PagedAttention organizes KV blocks for high utilization. Tensor/expert parallelism distributes work but adds communication.

## Speculative decoding

A small **draft model** proposes several tokens. The target model verifies them in parallel and accepts a prefix according to a rule that preserves the target distribution; rejected positions fall back to target sampling. Speedup depends on draft acceptance, verification cost, hardware utilization, and batch regime [Leviathan et al., 2022](https://arxiv.org/abs/2211.17192). Self-speculation uses early layers or auxiliary heads instead of a separate model.

## MTP: multi-token prediction

Standard next-token prediction supervises only the immediate next token at each position. **Multi-token prediction (MTP)** adds heads/objectives for several future tokens. Meta researchers found it could improve representation learning and downstream performance at larger scales, while enabling speculative-style decoding [Gloeckle et al., 2024](https://arxiv.org/abs/2404.19737).

DeepSeek-V3 used sequential multi-token prediction modules during training. The primary model predicts the next token; additional modules predict subsequent future tokens using previous representations and target embeddings. During inference, the extra modules can be discarded for ordinary decoding or used to support speculative decoding [DeepSeek-AI, 2024](https://arxiv.org/abs/2412.19437).

MTP is not the same as simply outputting several independently predicted tokens. Future tokens depend on earlier future tokens, and naive parallel prediction creates inconsistency. Implementations differ: multiple independent heads, sequential depth, blockwise decoding, or diffusion-style refinement.

## Other decoding ideas

- **Medusa/EAGLE-style heads:** propose token trees or feature-level drafts for verification.
- **Lookahead decoding:** parallelizes Jacobi-like iterations without a separate draft model.
- **Early exit:** easy tokens use fewer layers.
- **Parallel/diffusion language modeling:** iteratively denoise or refine multiple tokens; trades autoregressive simplicity for parallel steps.
- **Test-time routing:** choose model size, reasoning budget, or tool use per request.

## Throughput is not latency

Benchmark with the actual prompt/output lengths, concurrency, sampling, quantization, and hardware. Report:

- time to first token;
- inter-token latency or tokens/second per request;
- total request latency and p95/p99;
- aggregate throughput;
- memory and energy;
- quality after optimization.

A technique can double aggregate throughput while making one interactive request slower. Vendor tokens/second numbers without batch and length are not comparable.

## Serving checklist

1. Fix quality and context requirements.
2. Choose the smallest model meeting them.
3. Select precision supported by real kernels.
4. Measure prefill and decode separately.
5. Add continuous batching and cache management.
6. Consider speculative decoding only after profiling.
7. Load-test realistic arrival patterns.
8. Watch tail latency, OOMs, cache hit rate, and output drift.

## Sources

- [FlashAttention](https://arxiv.org/abs/2205.14135).
- [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192).
- [Better & Faster Large Language Models via Multi-token Prediction](https://arxiv.org/abs/2404.19737).
- [DeepSeek-V3 Technical Report on Consensus](https://consensus.app/papers/deepseekv3-technical-report-deepseek-ai-liu/dd2d38b767f3582c93820157007e765b/?utm_source=chatgpt) and [official arXiv record](https://arxiv.org/abs/2412.19437).
