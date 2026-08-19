# Fine-tuning and parameter-efficient adaptation

## Choose the lightest intervention that can work

Use prompting when the behavior can be specified in context. Use retrieval when facts must be updated or cited. Use tools when the task needs actions or exact computation. Fine-tune when you need repeated behavior, domain language, structured outputs, latency savings from shorter prompts, or a capability not reliably elicited otherwise. Continue pretraining when the model must absorb a domain distribution from large unlabeled corpora.

## Full fine-tuning

Update all model weights. It offers maximum flexibility but requires optimizer states and gradients for every trainable parameter, can overfit small datasets, and creates a full new checkpoint. It is appropriate when data and compute are substantial, the model is small enough, or deep behavioral/knowledge changes are required.

## LoRA

Low-Rank Adaptation freezes a weight matrix `W` and learns a low-rank update:

```text
W' = W + (α/r) BA
```

where `A` and `B` have rank `r` much smaller than the original dimensions. LoRA adapters are small, can be swapped, and can often be merged into base weights for inference [Hu et al., 2021](https://arxiv.org/abs/2106.09685). Rank, target modules, scaling, dropout, and learning rate matter. LoRA is not automatically as capable as full fine-tuning for every distribution shift.

## QLoRA

QLoRA stores a frozen base model in 4-bit NormalFloat (NF4), computes through dequantized values, and trains LoRA adapters. It introduced double quantization and paged optimizers to reduce memory while retaining strong adaptation performance [Dettmers et al., 2023](https://arxiv.org/abs/2305.14314). Quantized storage does not mean every training operation happens in 4-bit arithmetic.

## Other PEFT families

- **Adapters:** insert small trainable bottleneck modules between layers.
- **Prompt/prefix tuning:** optimize continuous virtual tokens or attention prefixes.
- **IA³:** learns multiplicative scaling vectors for activations.
- **BitFit:** trains bias terms only.
- **DoRA:** decomposes weight magnitude and direction, applying low-rank adaptation to direction.
- **Selective fine-tuning:** trains chosen layers or modules.

Select based on memory, inference overhead, modularity, target task, and evidence—not novelty.

## Dataset design

Define the behavior before collecting data. Keep train, validation, and test sources separate. Include hard negatives and counterexamples. Remove accidental answer leakage. Preserve relevant general tasks to monitor forgetting. Record licenses and personally identifiable information. For chat data, apply the exact model chat template and decide which tokens receive loss.

Ten thousand diverse, correct examples usually beat a million noisy ones. But tiny datasets can make style look improved while degrading robustness. Plot results against data quantity and inspect per-category behavior.

## Hyperparameters to understand

- Learning rate and schedule.
- Effective batch size and sequence length.
- Epochs or total tokens; repeated examples increase overfitting.
- LoRA rank, alpha, dropout, and target matrices.
- Weight decay, gradient clipping, warmup.
- Packing and loss masks.
- Precision and gradient checkpointing.

## Model merging

Weight interpolation, task arithmetic, TIES/DARE-style methods, and adapter composition attempt to combine capabilities without joint retraining. Merging is cheap experimentation, not guaranteed semantic composition. Models should share a compatible base, tokenizer, architecture, and parameter alignment. Evaluate interference and safety after merging.

## Evaluation protocol

Always compare against:

1. the untouched base/instruct model;
2. a strong prompt-only baseline;
3. retrieval/tool baselines when relevant;
4. a trivial or majority baseline;
5. ablations of data and adaptation method.

Evaluate held-out task quality, general capability regression, calibration, safety, latency, and memory. Human review should be blinded where feasible. LLM-as-judge needs position-bias controls, multiple graders or calibration against humans, and raw sample inspection.

## Sources

- [LoRA on Consensus](https://consensus.app/papers/lora-lowrank-adaptation-of-large-language-models-hu-shen/1431353d4e615dc1bad45d8db1506cea/?utm_source=chatgpt).
- [QLoRA on Consensus](https://consensus.app/papers/qlora-efficient-finetuning-of-quantized-llms-dettmers-pagnoni/d03b940acefc5c64a10b5f96c39625ed/?utm_source=chatgpt).
- [Prefix-Tuning](https://arxiv.org/abs/2101.00190) and [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/abs/2104.08691).
