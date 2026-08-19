# Reasoning and test-time compute

## What “reasoning” can mean

The word covers several phenomena: producing explicit intermediate text, executing a learned algorithm, searching candidate solutions, using a verifier, calling tools, or simply recalling a memorized pattern. Behavioral success does not by itself reveal the internal mechanism. Good research uses operational definitions: accuracy on held-out compositional problems, robustness to changed variables, sample efficiency, calibration, and process validity.

## Chain-of-thought prompting

Chain-of-thought (CoT) prompting asks for intermediate steps and improved many arithmetic, commonsense, and symbolic tasks in sufficiently large models [Wei et al., 2022](https://arxiv.org/abs/2201.11903). Zero-shot “think step by step” showed that an instruction alone could elicit some of the effect [Kojima et al., 2022](https://arxiv.org/abs/2205.11916). CoT is an output trace, not guaranteed faithful access to internal computation; models can rationalize answers or omit decisive factors.

## Sampling and search

- **Self-consistency:** sample multiple reasoning paths and vote on the answer [Wang et al., 2022](https://arxiv.org/abs/2203.11171).
- **Best-of-N:** score N candidate responses with a reward model or verifier.
- **Tree/graph search:** expand, evaluate, and backtrack through partial solutions.
- **Self-refinement:** critique and revise outputs, sometimes with external feedback.
- **Program/tool execution:** delegate exact arithmetic, code, retrieval, or formal checking.

More samples help only when errors are not perfectly correlated and selection is reliable. A weak judge can make search worse.

## Training reasoning behavior

SFT on worked solutions teaches a trace format. Rejection sampling keeps verified trajectories. Process supervision labels steps. Reinforcement learning with verifiable rewards encourages exploration toward correct outcomes. Distillation turns expensive search or a stronger model’s trajectories into a cheaper policy.

DeepSeek-R1 reported that large-scale RL on verifiable tasks could elicit self-reflection and long reasoning in R1-Zero, while a cold-start data stage plus multi-stage training improved readability and general behavior in R1 [DeepSeek-AI, 2025](https://arxiv.org/abs/2501.12948). Qwen3 used long-CoT cold start, reasoning RL, mode fusion, and general RL to unite thinking and non-thinking modes [Qwen Team, 2025](https://arxiv.org/abs/2505.09388). These are training recipes, not proof that natural-language traces perfectly represent latent reasoning.

## Inference-time scaling

Traditional scaling spends compute before deployment. Inference-time scaling spends variable compute per problem through longer deliberation, more samples, search, tools, or stronger verifiers. The optimal policy is conditional: simple tasks should exit quickly; difficult tasks may merit larger budgets. Modern APIs expose “reasoning effort” or thinking budgets as a product-level control.

Report the complete quality–cost curve. A model that wins after 100 samples may be worse per dollar or per second. Token length is an imperfect compute proxy because hidden computation, tool calls, and parallel candidates differ.

## Failure modes

- **Overthinking:** longer traces introduce mistakes on easy questions.
- **Reward hacking:** exploit a verifier or tests.
- **Unfaithful traces:** correct answer with misleading explanation or vice versa.
- **Length bias:** graders reward verbosity.
- **Answer leakage:** benchmark solutions in training.
- **Fragile procedures:** fail under renamed variables, irrelevant information, or distribution shifts.
- **Tool error propagation:** correct planning with incorrect observations or unsafe actions.

## Research questions

- Can a model learn when to stop thinking?
- How do we verify open-ended reasoning where answers are not automatically checkable?
- Which internal computations are causally responsible for an answer?
- How should reasoning models express uncertainty?
- Can process supervision improve robustness without enforcing one human style?
- What is the best allocation among parameters, pretraining tokens, post-training, and inference compute?

## Sources

- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903).
- [Self-Consistency Improves Chain of Thought](https://arxiv.org/abs/2203.11171).
- [ReAct](https://arxiv.org/abs/2210.03629).
- [Let’s Verify Step by Step](https://arxiv.org/abs/2305.20050).
- [DeepSeek-R1 on Consensus](https://consensus.app/papers/deepseekr1-incentivizes-reasoning-in-llms-through-deepseek-ai-guo/3b6645a38cd55272bd633b72b0c8acfa/?utm_source=chatgpt).
