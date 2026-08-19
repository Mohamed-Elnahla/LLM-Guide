# Language models from zero

## Text becomes tokens

Computers do not directly process words. A **tokenizer** maps text to integer IDs from a fixed vocabulary. Tokens may be characters, bytes, common word pieces, or whole frequent words. Byte-pair encoding (BPE), WordPiece, and SentencePiece are common families. The choice affects sequence length, multilingual fairness, code handling, and cost: APIs charge tokens, attention operates over token positions, and a language represented inefficiently consumes more context and compute.

The mapping is reversible for ordinary text: `text → token IDs → text`. Token boundaries are engineering artifacts, not linguistic truth. A token like `ing` can participate in many words; a byte-level tokenizer can represent any string without an unknown-token fallback.

## IDs become vectors

An embedding table contains one learned vector per token. Looking up token ID `i` selects row `E[i]`. If the hidden width is `d`, a sequence of `n` tokens becomes a matrix with shape `n × d`. Position information is added or applied so the same token at position 2 is distinguishable from position 200.

Vectors are useful because gradient-based learning can organize them continuously: patterns that support similar predictions can acquire related directions. But an embedding coordinate rarely has a simple standalone meaning. Information is distributed and changes as representations pass through layers.

## The objective

For a causal language model, training examples are shifted copies of the same sequence:

```text
input:   The cat sat on
target:  cat sat on the
```

At each position the model outputs logits—one score per vocabulary item. Softmax converts logits `z` into probabilities:

```text
p(token i) = exp(z_i) / Σ_j exp(z_j)
```

Cross-entropy loss penalizes low probability on the observed next token:

```text
loss = -Σ_t log p(x_t | x_<t)
```

Backpropagation calculates how each parameter contributed to the loss; an optimizer such as AdamW adjusts parameters to reduce expected loss over future batches. Training uses teacher forcing: every target position can be evaluated in parallel because the correct prior tokens are supplied. Generation is sequential because the next input depends on the model’s sampled output.

## What parameters store

Parameters do not form a clean database of sentences. Training repeatedly nudges weights so the network becomes better at predicting many overlapping patterns. The result contains linguistic regularities, associations, procedures, and compressed facts, but retrieval is approximate and context-dependent. Memorization also occurs, especially for duplicated or distinctive data, which creates privacy and evaluation-contamination risks.

## Sampling

Generation chooses from the predicted distribution. **Greedy decoding** takes the highest-probability token. **Temperature** divides logits before softmax: values below 1 sharpen the distribution; values above 1 flatten it. **Top-k** keeps only k candidates. **Top-p** keeps the smallest set whose cumulative probability reaches p. These controls change diversity and failure modes but do not add knowledge.

## Base, instruct, chat, and reasoning models

- A **base model** continues text according to pretraining statistics.
- An **instruction-tuned model** is supervised on prompts and desired responses.
- A **chat model** additionally learns roles, dialogue patterns, preferences, and safety behavior.
- A **reasoning model** is trained and/or configured to spend additional computation on multi-step problems; the term does not specify one architecture.

## Essential quantities

- **Parameters:** learned scalar values; relevant to memory and training compute.
- **Tokens:** discrete sequence units; relevant to data and runtime cost.
- **Context window:** maximum tokens processed in one request, including output in many APIs.
- **FLOPs:** approximate arithmetic work.
- **Perplexity:** `exp(average cross-entropy)`; lower means better next-token prediction on that dataset.
- **Latency:** time to first token plus time per generated token.
- **Throughput:** tokens or requests served per unit time.

## Check your understanding

If the vocabulary is 50,000 and the hidden width is 4,096, the input embedding table alone has about 205 million parameters. A 4,000-token prompt followed by 500 generated tokens requires one large prompt-processing pass and 500 sequential decode steps. The distinction explains why prefill and decoding have different hardware bottlenecks.

## Sources

- Bengio et al., [A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html) (2003).
- Sennrich et al., [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909) (2016).
- Kudo and Richardson, [SentencePiece](https://arxiv.org/abs/1808.06226) (2018).
- OpenAI, [Improving language understanding with unsupervised learning](https://openai.com/index/language-unsupervised/) (2018).
