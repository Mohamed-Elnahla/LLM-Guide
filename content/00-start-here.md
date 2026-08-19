# Start here: the shortest path into LLM research

> **Goal:** build a correct mental model before collecting jargon. You do not need advanced mathematics to begin, but you should become comfortable with vectors, probability, derivatives, and reading plots.

## The entire field in one paragraph

A language model assigns probabilities to sequences of tokens. A modern LLM turns tokens into vectors, repeatedly mixes information across positions with attention and transforms each position with a small neural network, then predicts a probability distribution for the next token. Pretraining compresses statistical structure from a very large corpus into model parameters. Post-training changes how that knowledge is elicited and how behavior follows instructions. At inference, the model generates one or more tokens, appends them to its context, and repeats. Everything else—mixture-of-experts, retrieval, tools, quantization, reasoning traces, multimodality—is an extension, training strategy, or systems optimization around this loop.

## Four layers you must keep separate

1. **Model:** the parameterized function—architecture, weights, tokenizer, and modalities.
2. **Training:** data, objective, optimization, compute, and post-training recipes used to obtain the weights.
3. **Inference system:** kernels, batching, caches, quantization, routing, sampling, and serving.
4. **Application system:** prompts, retrieval, tools, memory, guardrails, evaluation, and user interface.

Many confused debates compare different layers. RAG does not put new facts into weights; it supplies text in context. Quantization usually changes numerical representation, not architecture. Chain-of-thought may describe a prompting format, supervised data, reinforcement-learning behavior, or hidden internal computation—those are not interchangeable.

## Learning order

Read chapters 01–04 before jumping to model comparisons. Then choose a branch:

- **Train/adapt models:** chapters 05–07.
- **Serve models efficiently:** chapter 08.
- **Reasoning and agents:** chapters 09–10.
- **Evaluate or study safety:** chapter 11.
- **Track the frontier:** chapter 12 and the timeline.

## A practical 12-week route

| Weeks | Focus | Concrete output |
|---|---|---|
| 1–2 | Python, linear algebra, probability, PyTorch | Implement linear regression and a two-layer network |
| 3–4 | Tokens, embeddings, language-model loss | Train a character-level model |
| 5–6 | Attention and Transformer | Implement a small decoder-only Transformer |
| 7–8 | Fine-tuning, LoRA, evaluation | Adapt a small open-weight model and create an eval set |
| 9–10 | Quantization, serving, RAG | Run a quantized model and build a cited retrieval baseline |
| 11–12 | Reproduce one paper result | Write a short report with assumptions, controls, and failures |

## Rules for reading claims

- A lower training loss does not guarantee better real-world behavior.
- A benchmark score is conditional on prompt, sampling, tools, contamination, and evaluation harness.
- Parameter count is not active compute for an MoE model.
- Context-window length is not the same as useful recall across that window.
- “Reasoning” performance can improve through better knowledge, search, more sampled tokens, verifiers, tools, or training; the score alone does not identify the cause.
- Open weights do not imply open training data or an unrestricted license.

## First readings

1. [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — the architectural origin.
2. [A Survey of Large Language Models](https://consensus.app/papers/a-survey-of-large-language-models-zhao-zhou/b7833da1da155ad8ac6c41ab9b11a72c/?utm_source=chatgpt) — a field map retrieved through Consensus.
3. [Language Models are Few-Shot Learners](https://openai.com/index/language-models-are-few-shot-learners/) — why scale changed the interface from task-specific heads to prompting.
4. [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) — why data/compute balance matters.
5. [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) — the modern assistant pipeline.

## What “caught up” looks like

You are ready to start research when you can explain the forward pass, distinguish pretraining from post-training, calculate rough memory/compute costs, identify the right baseline and ablation, distrust an underspecified benchmark, and reproduce a small result. Frontier trivia is less important than these habits.
