# Pretraining, scaling, and data

## Pretraining is compression through prediction

During pretraining, batches of token sequences pass through the model, next-token or denoising loss is computed, gradients are accumulated, and distributed optimizers update weights. The model is not given an explicit ontology; structures useful for prediction emerge because they reduce loss across many contexts. This objective is broad enough to absorb language, code, world knowledge, styles, and procedures, but it does not guarantee truthfulness, calibrated uncertainty, or obedience.

## The training stack

1. **Collect and license data:** web pages, books, code, academic text, conversations, images/audio, synthetic examples.
2. **Filter:** remove spam, malware, explicit content, personal information, benchmark data, and low-quality or duplicated material.
3. **Deduplicate:** exact and approximate duplication affect memorization and effective data diversity.
4. **Mix:** choose proportions across languages, domains, code, math, and modalities.
5. **Tokenize and pack:** concatenate documents efficiently while preserving boundaries or attention rules.
6. **Train:** distributed data/tensor/pipeline/expert parallelism, mixed precision, checkpointing, and failure recovery.
7. **Evaluate checkpoints:** loss, downstream capabilities, memorization, safety, and data-specific slices.

Data curation is a modeling decision. More tokens can be worse if they amplify duplication, contamination, or low-value patterns. Synthetic data can concentrate skills and cover rare tasks, but recursive low-quality generation can reduce diversity or propagate errors.

## Scaling laws

Empirical scaling laws show smooth relationships between held-out loss and model size, dataset size, and compute across useful ranges [Kaplan et al., 2020](https://arxiv.org/abs/2001.08361). They help predict training outcomes before spending the full budget. They are not laws of nature: coefficients depend on data, tokenizer, architecture, optimizer, and metric.

Chinchilla studied compute-optimal allocation and found that model size and training tokens should grow together more aggressively than common practice at the time [Hoffmann et al., 2022](https://arxiv.org/abs/2203.15556). A smaller model trained on more tokens can outperform a larger undertrained one at similar training compute—and is usually cheaper to serve.

Later work adds inference demand to the optimization: if a model will answer billions of queries, spending more training compute to make a smaller model better can reduce lifetime cost [Sardana et al., 2024](https://arxiv.org/abs/2401.00448). “Optimal” therefore requires an objective: training budget, latency, memory, energy, deployment volume, or capability frontier.

## Optimization concepts

- **Batch size:** tokens contributing to an update; large batches improve throughput but change optimization dynamics.
- **Learning-rate schedule:** warmup avoids early instability; decay supports convergence.
- **AdamW:** adaptive momentum optimizer with decoupled weight decay.
- **Gradient clipping:** prevents extreme updates.
- **Mixed precision:** BF16/FP16/FP8 reduce memory and accelerate math while select values remain higher precision.
- **Parallelism:** data parallel copies batches; tensor parallel splits matrix operations; pipeline parallel splits layers; expert parallel distributes MoE experts.
- **Checkpointing:** recompute activations to exchange compute for memory.

## Continual pretraining vs fine-tuning

**Continual/domain-adaptive pretraining** keeps a language-model objective on new raw text and can absorb domain vocabulary and distributions. **Supervised fine-tuning** learns prompt–response behavior. Continual pretraining can cause catastrophic forgetting or distribution drift; mixing replay data, reducing learning rates, and evaluating general capabilities are essential.

## Contamination and memorization

If benchmark questions or close variants appear in training, the test no longer estimates generalization. URL filtering is insufficient: copies, translations, solution explanations, and synthetic variants can leak. Good evaluation records dataset dates, searches n-gram overlap, uses private or newly generated tests, and reports sensitivity to decontamination.

## What the loss does not tell you

Cross-entropy rewards matching the observed distribution, including errors and contradictions. It averages across tokens, so a small improvement may or may not matter on rare capabilities. Post-training can improve human preference while slightly worsening raw language-model loss. Safety and factuality need targeted evaluation.

## Sources

- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361).
- [Training Compute-Optimal Large Language Models](https://consensus.app/papers/training-computeoptimal-large-language-models-hoffmann-borgeaud/8878a8d11742580fa23cc42a5e9f2a55/?utm_source=chatgpt) — full Consensus record.
- [Data-Constrained Language Model Pretraining](https://arxiv.org/abs/2305.16264).
- [Beyond Chinchilla-Optimal](https://arxiv.org/abs/2401.00448).
