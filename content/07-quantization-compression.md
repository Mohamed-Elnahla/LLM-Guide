# Quantization and compression

## Precision is a systems choice

A parameter stored in FP32 uses 4 bytes; FP16/BF16 uses 2; INT8 uses 1; idealized 4-bit storage uses half a byte before scales/metadata. An 8B-parameter model therefore needs roughly 16 GB just for BF16 weights, 8 GB at 8-bit, or 4 GB at 4-bit—plus KV cache, activations, runtime buffers, and quantization metadata.

Quantization maps high-precision values to a smaller set of representable values using scales and sometimes zero points. The goals are lower memory bandwidth, smaller storage, and faster supported kernels. A smaller file does not guarantee faster inference: hardware support, dequantization, batch size, and kernel quality determine speed.

## What can be quantized

- **Weights (W):** largest static memory; common for local inference.
- **Activations (A):** dynamic values; more sensitive because ranges vary by token/channel.
- **KV cache:** grows with batch, sequence length, layers, and K/V heads; crucial for long context.
- **Gradients/optimizer states:** relevant during training.

Notation such as W4A16 means 4-bit weights and 16-bit activations/compute. Always ask whether accumulation remains higher precision.

## PTQ vs QAT

**Post-training quantization (PTQ)** converts a trained model using calibration data and/or weight statistics. It is cheap. **Quantization-aware training (QAT)** simulates low precision during training or fine-tuning so weights adapt; it can preserve quality at lower bit widths but costs training compute.

## Major methods

- **LLM.int8():** routes activation outliers through higher-precision computation [Dettmers et al., 2022](https://arxiv.org/abs/2208.07339).
- **GPTQ:** layer-wise, approximate second-order weight-only PTQ that minimizes reconstruction error [Frantar et al., 2022](https://arxiv.org/abs/2210.17323).
- **SmoothQuant:** transfers activation outlier difficulty into weights with an equivalent scaling transform, enabling W8A8 inference [Xiao et al., 2022](https://arxiv.org/abs/2211.10438).
- **AWQ:** uses activation statistics to identify salient weights and scaling that protects them during low-bit weight quantization [Lin et al., 2023](https://arxiv.org/abs/2306.00978).
- **NF4/QLoRA:** a distribution-aware 4-bit type used to store frozen base weights during adapter training.
- **FP8:** floating-point formats with small exponent/mantissa used on supporting accelerators for training and inference.

Formats such as GGUF, GPTQ checkpoints, AWQ checkpoints, and bitsandbytes representations describe ecosystems and packing choices, not one universal algorithm.

## Why reasoning can be fragile

Average perplexity may barely change while rare multi-step or exact tasks degrade. Errors can accumulate across long generations, and activation distributions during reasoning may differ from short calibration data. Evaluate the target workload: code compilation, math, long context, tool schemas, multilingual text, and safety—not only WikiText perplexity.

## Other compression methods

- **Pruning:** remove weights, channels, heads, layers, or experts. Unstructured sparsity needs hardware support to produce speedups.
- **Distillation:** train a smaller model to imitate a teacher; changes weights and often architecture.
- **Weight sharing/factorization:** reduce independent parameters.
- **Vocabulary trimming:** useful for narrow language/domain deployments but harms generality.
- **Early exit/adaptive depth:** use fewer layers for easy inputs.

## A practical selection guide

| Constraint | Start with | Verify |
|---|---|---|
| Consumer GPU local chat | 4–6 bit weight-only | VRAM, tokens/s, long-context quality |
| High-throughput server | BF16/FP8 or W8A8 kernels | batch throughput and tail latency |
| Fine-tuning with limited VRAM | QLoRA | task quality vs LoRA/full FT |
| Very long context | KV-cache quantization + GQA/MLA | recall and decode latency |
| CPU/mobile | hardware-native integer/low-bit format | actual device energy and speed |

## Sources

- [SmoothQuant on Consensus](https://consensus.app/papers/smoothquant-accurate-and-efficient-posttraining-xiao-lin/b3d3b648ab02580b816708e644830fc0/?utm_source=chatgpt).
- [AWQ on Consensus](https://consensus.app/papers/awq-activationaware-weight-quantization-for-llm-lin-tang/d6c61576c34d5d5aa3d4760a16aa3585/?utm_source=chatgpt).
- [GPTQ](https://arxiv.org/abs/2210.17323) and [QLoRA](https://arxiv.org/abs/2305.14314).
