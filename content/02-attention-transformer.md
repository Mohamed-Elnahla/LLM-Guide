# Attention and the Transformer

## Why attention mattered

Earlier sequence models processed tokens recurrently. They carried a state from one time step to the next, which made long-range information difficult to preserve and limited parallel training. Sequence-to-sequence systems added attention so a decoder could directly weight encoder states. The 2017 Transformer removed recurrence and made attention the central mixing operation, improving parallelism and the path length between distant tokens [Vaswani et al., 2017](https://arxiv.org/abs/1706.03762).

## Query, key, value

For each token representation `x`, learned matrices produce a query `q`, key `k`, and value `v`. Intuitively:

- query: what information this position is looking for;
- key: what kind of information this position offers;
- value: the content passed along if selected.

For matrices `Q`, `K`, `V`:

```text
Attention(Q,K,V) = softmax(QKᵀ / √d_k) V
```

`QKᵀ` gives every query–key similarity. Division by `√d_k` prevents dot products from growing so large that softmax saturates. Each row of softmax becomes weights summing to one; multiplying by `V` creates a weighted mixture.

This is differentiable content-based routing, not a lookup rule written by a programmer. Heads can learn positional, syntactic, copying, induction-like, or task-specific patterns, but head visualizations alone do not prove a causal explanation.

## Self-attention and masks

**Self-attention** creates Q, K, and V from the same sequence. A causal decoder masks future positions, so token `t` can attend only to positions `≤ t`. An encoder normally attends bidirectionally. **Cross-attention** takes queries from one stream and keys/values from another, as in the original translation decoder or many vision-language connectors.

## Multi-head attention

Instead of one attention operation at full width, the model uses several learned projections in parallel, concatenates their results, and applies an output projection. Multiple heads allow different relation patterns, although real models often contain redundancy. Modern variants reduce inference memory:

- **MHA:** separate K/V per query head.
- **MQA:** all query heads share one K and one V head.
- **GQA:** groups of query heads share K/V heads, trading a little quality for a smaller KV cache [Ainslie et al., 2023](https://arxiv.org/abs/2305.13245).
- **MLA:** compresses key/value representations into a latent space; DeepSeek-V2 used it to reduce cache size [DeepSeek-AI, 2024](https://arxiv.org/abs/2405.04434).

## The block

A decoder-only Transformer repeats roughly this structure:

```text
x = x + Attention(Norm(x))
x = x + MLP(Norm(x))
```

The **residual stream** carries and accumulates information. **Normalization** controls activation scale; current LLMs commonly use pre-normalization and RMSNorm. The **MLP/feed-forward network** operates independently at each token position, expanding the hidden width, applying a nonlinearity or gate (often SwiGLU), then projecting back. Attention communicates across positions; the MLP transforms features within each position.

## Position

Pure attention is permutation-equivariant, so position must be represented. The original paper added sinusoidal vectors. Learned absolute embeddings followed. Transformer-XL introduced relative ideas and segment recurrence. **RoPE** rotates query/key features as a function of position so dot products encode relative displacement [Su et al., 2021](https://arxiv.org/abs/2104.09864). ALiBi adds distance-dependent attention bias. Current long-context systems often combine RoPE variants, careful training data, interpolation/extrapolation schemes, and attention/kernel changes.

## Encoder, decoder, encoder–decoder

- **Encoder-only (BERT):** bidirectional representation; historically strong for classification, extraction, and embeddings [Devlin et al., 2019](https://arxiv.org/abs/1810.04805).
- **Decoder-only (GPT/Llama/Qwen/DeepSeek):** causal next-token prediction; naturally generative and dominant for general-purpose LLMs.
- **Encoder–decoder (T5):** encoder reads the input bidirectionally and decoder generates output; efficient for conditional generation and sequence-to-sequence tasks [Raffel et al., 2020](https://jmlr.org/papers/v21/20-074.html).

Architecture is not destiny: data, scale, and training recipe can outweigh the family label.

## Complexity

Standard attention constructs an `n × n` score matrix, giving quadratic time/memory in sequence length for a straightforward implementation. FlashAttention computes exact attention with IO-aware tiling, avoiding materializing the full matrix in slow memory [Dao et al., 2022](https://arxiv.org/abs/2205.14135). Sparse, sliding-window, linear-attention, recurrent-memory, and state-space approaches attack different parts of the long-sequence problem. They should be compared on quality, hardware utilization, training stability, prefill, decoding, and cache costs—not asymptotic notation alone.

## A forward pass, end to end

1. Tokenize prompt.
2. Look up embeddings and apply position information.
3. Pass through repeated attention + MLP blocks.
4. Normalize final representations.
5. Project the last position to vocabulary logits (often using weights tied to input embeddings).
6. Sample or select a token.
7. Append it and repeat, reusing cached K/V tensors where supported.

## Primary reading

- [Attention Is All You Need on Consensus](https://consensus.app/papers/attention-is-all-you-need-vaswani-shazeer/948b6cae9eab51d59363e00237be52cd/?utm_source=chatgpt) — retrieved full record; 2017.
- [BERT on Consensus](https://consensus.app/papers/bert-pretraining-of-deep-bidirectional-transformers-for-devlin-chang/eb5ef9562a175684b555fc733970d3fe/?utm_source=chatgpt) — retrieved full record; 2019.
- [Transformer-XL](https://arxiv.org/abs/1901.02860), [RoFormer](https://arxiv.org/abs/2104.09864), and [FlashAttention](https://arxiv.org/abs/2205.14135).
