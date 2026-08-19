# From learner to LLM researcher

## Core competencies

### Mathematics

Be fluent with matrix multiplication, dot products, norms, eigen/singular-value intuition, probability distributions, expectation, log likelihood, entropy/KL divergence, gradients, chain rule, and optimization. Add information theory and reinforcement learning when your project needs them.

### Engineering

Use Python, PyTorch/JAX, Linux, Git, GPU profiling, experiment configuration, distributed basics, and reliable data pipelines. Learn to estimate tensor shapes and memory before running code. Reproduce with seeds, environment locks, checkpoints, and logged artifacts.

### Scientific method

State a falsifiable question. Choose baselines that isolate the claimed contribution. Change one factor or use factorial design. Report negative results and variance. Inspect examples. Avoid tuning on the test set. Release code/data where licensing and safety permit.

## Reproduction ladder

1. Implement character-level next-token prediction.
2. Implement one-head causal attention and verify the mask.
3. Train a tiny Transformer; plot train/validation loss and samples.
4. Reproduce a LoRA fine-tune with a clean held-out set.
5. Compare BF16, 8-bit, and 4-bit inference on quality, memory, and speed.
6. Build BM25, dense, and hybrid RAG baselines; separate retrieval from generation error.
7. Reproduce a reasoning experiment with greedy, self-consistency, and verifier selection at matched cost.
8. Contribute a new ablation, dataset slice, kernel, evaluator, or failure analysis.

## How to read a paper

Read abstract and figures, then write the claim in one sentence. Identify the causal comparison: what changed, against what baseline, under what budget? Inspect data and evaluation before architecture detail. Check whether tables normalize parameters, active parameters, tokens, compute, tools, and inference budget. Read limitations and appendix. Finally, locate code/issues and papers that failed to reproduce it.

## Research directions with room for contribution

- Data attribution, provenance, consent, deduplication, and high-value data selection.
- Small-model reasoning and reliable adaptive compute.
- Long-context evaluation that measures usable memory, not accepted length.
- Efficient multimodal architectures and tokenizers.
- Quantization that preserves rare capabilities and long reasoning.
- Faithful process supervision and verifier robustness.
- Mechanistic understanding across training checkpoints and post-training.
- Agent reliability, recovery, secure tool use, and long-horizon evaluation.
- Multilingual and culturally grounded evaluation beyond translated benchmarks.
- Continual learning without forgetting or unsafe drift.
- Reproducible evaluation under contaminated and fast-changing benchmarks.
- Energy, water, hardware lifecycle, and total-cost reporting.

## A good first project

Choose one small open-weight model, one narrow task, and one claimed method. Example: “Does activation-aware 4-bit quantization disproportionately harm mathematical self-consistency compared with ordinary QA at equal output-token budget?” Build a clean dataset, compare BF16/GPTQ/AWQ, run multiple seeds/samples, record memory and latency, analyze which step types fail, and release the harness. A precise negative result is more valuable than a vague new framework.

## Search strings

```text
("large language model" OR LLM) AND (scaling OR pretraining) AND (data quality OR compute optimal)

("parameter efficient fine tuning" OR PEFT OR LoRA OR QLoRA) AND (ablation OR comparison OR benchmark)

(quantization OR "low precision") AND (reasoning OR "long context") AND (evaluation OR degradation)

("test-time compute" OR "inference-time scaling") AND (verifier OR "process reward" OR search)

("large language model agent" OR "tool use") AND (reliability OR security OR benchmark)
```

## Research hygiene checklist

- Version model, code, data, and evaluator.
- Track licenses and data provenance.
- Keep a preregistered or time-stamped evaluation plan when stakes justify it.
- Report the full quality–cost curve.
- Distinguish author-reported results from independent replication.
- Preserve raw generations and error taxonomies.
- Threat-model releases and protect sensitive data.
- Update conclusions when evidence changes.
