# Multimodality, retrieval, tools, and agents

## Multimodal models

A multimodal LLM maps more than text into compatible representations and generates one or more modalities. Common designs include:

- a pretrained vision/audio encoder plus a projection or cross-attention connector into a language model;
- interleaved modality tokens processed by one Transformer;
- modality-specific encoders/decoders with a shared backbone;
- native joint pretraining on mixed text, image, audio, and video sequences.

Images may become patch tokens; audio becomes frames or learned codec tokens; video adds temporal sampling. “Native multimodal” usually signals joint training and interaction across modalities, but exact definitions vary by lab. Evaluate perception, grounding, temporal reasoning, generation fidelity, latency, and modality-specific safety separately.

## Retrieval-augmented generation (RAG)

RAG retrieves external records and includes selected content in the model context before generation [Lewis et al., 2020](https://arxiv.org/abs/2005.11401). A production pipeline includes:

```text
ingest → parse → chunk → embed/index → retrieve → rerank → construct context → generate → cite → evaluate
```

Retrieval provides updateable evidence and provenance. It does not guarantee factual answers: retrieval may miss the right record, return stale or adversarial text, truncate decisive context, or be ignored by the generator. Evaluate retrieval recall separately from answer correctness and citation entailment.

Dense vector search captures semantic similarity; lexical search preserves exact terms; hybrids often work well. Rerankers improve ordering. Query rewriting, decomposition, and iterative retrieval help multi-hop problems but add latency and failure points.

## Tools

Tools expose typed actions: web search, calculators, databases, code execution, browsers, or business APIs. Toolformer showed a model could learn where and how to insert API calls using self-supervised filtering [Schick et al., 2023](https://arxiv.org/abs/2302.04761). ReAct interleaved reasoning and actions, grounding plans in observations [Yao et al., 2022](https://arxiv.org/abs/2210.03629).

Function calling is constrained text generation plus a runtime. The application validates arguments, authorizes side effects, executes the tool, and returns results. Schemas improve syntax, not semantic correctness or permissions.

## Agents

An agent is a loop in which a model observes state, selects actions, receives results, updates its context or memory, and continues until a stopping condition. Useful components include planning, tool selection, working memory, retrieval, reflection, verification, and human approval.

Long-horizon reliability compounds. If each of ten steps succeeds independently with probability 0.95, end-to-end success is only about 0.60. Real errors are correlated and stateful. Agent evaluation therefore measures task completion, cost, time, unsafe actions, recovery, and reproducibility—not conversational impressiveness.

## Memory and context engineering

- **Working memory:** current context window and scratch state.
- **Episodic memory:** summaries or logs of prior interactions.
- **Semantic memory:** retrieved facts in databases/vector stores.
- **Procedural memory:** prompts, policies, skills, code, and fine-tuned weights.

Context engineering selects, orders, compresses, and labels information supplied to a model. More context can reduce performance through distraction, conflicts, and lost-in-the-middle effects. Preserve source boundaries and trust levels; retrieved web content is data, not instructions.

## Security model

Prompt injection occurs when untrusted content attempts to redirect the model. Because instructions and data share the same token channel, prompting alone is not a reliable security boundary. Use least-privilege tools, allowlists, sandboxing, typed validation, secret isolation, approval for consequential actions, rate limits, audit logs, and deterministic policy checks outside the model.

## Sources

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP](https://arxiv.org/abs/2005.11401).
- [Toolformer](https://arxiv.org/abs/2302.04761).
- [ReAct](https://arxiv.org/abs/2210.03629).
- [RAG survey retrieved through Consensus](https://consensus.app/papers/retrievalaugmented-generation-for-large-language-models-gao-xiong/4d433eb94a8a5f2cade94b64ac76b657/?utm_source=chatgpt).
