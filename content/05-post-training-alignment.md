# Post-training and alignment

## Why pretraining is not enough

A base model is optimized to continue its training distribution, not to infer a user’s intent, admit uncertainty, refuse dangerous instructions, or format an answer. Post-training constructs an assistant policy from a pretrained model. It can unlock capabilities already latent in the base model, teach new routines, and reshape behavior, but it cannot reliably repair every missing fact or fundamental base-model limitation.

## Stage 1: supervised fine-tuning (SFT)

Train on `(instruction, desired response)` examples with the same cross-entropy objective, normally masking loss on the prompt. Data can come from humans, stronger models, execution-verified solutions, or curated transformations. Quality, diversity, and task balance often matter more than raw example count.

SFT teaches format and provides a good initial policy. It also risks imitation artifacts: verbose teacher style, over-refusal, hidden answer leakage, and narrow behavior outside the instruction distribution.

## Stage 2: preferences

Preference data compares candidate responses. In classical RLHF:

1. collect human rankings;
2. train a reward model to score responses;
3. optimize the policy with reinforcement learning, while penalizing departure from a reference policy.

InstructGPT used this SFT → reward model → PPO pipeline and showed that a 1.3B aligned model could be preferred to much larger base GPT-3 on its prompt distribution [Ouyang et al., 2022](https://arxiv.org/abs/2203.02155). The result illustrates that model size and behavioral usefulness are different axes.

## DPO and related objectives

**Direct Preference Optimization (DPO)** rearranges the preference-learning problem into a classification-like objective that directly increases the relative likelihood of chosen over rejected responses, avoiding explicit reward-model fitting and online RL in its basic form [Rafailov et al., 2023](https://arxiv.org/abs/2305.18290). Variants include IPO, KTO, ORPO, SimPO, and online preference methods. Names change quickly; compare assumptions, on/off-policy data, reference dependence, stability, compute, and actual evaluation.

## RLAIF and constitutions

**RLAIF** substitutes or augments human feedback with feedback from AI models. Constitutional AI uses written principles plus self-critique/revision and preference learning to improve harmlessness with less direct human labeling [Bai et al., 2022](https://arxiv.org/abs/2212.08073). AI feedback scales, but inherits evaluator blind spots and can make a policy optimize surface signals rather than intent.

## RL with verifiable rewards

Math, code, formal proofs, and some tool tasks provide automatic correctness checks. This supports reinforcement learning without a learned preference model for every example. **GRPO**, introduced in DeepSeekMath, estimates group-relative advantages without a separate value model, reducing memory [Shao et al., 2024](https://arxiv.org/abs/2402.03300). DeepSeek-R1 scaled this direction and documented emergent long reasoning, plus a practical cold-start and distillation pipeline [DeepSeek-AI, 2025](https://arxiv.org/abs/2501.12948).

Verification is not a universal solution. Reward hacking persists when tests are incomplete, formatting correlates with correctness, or an evaluator has blind spots. Unverifiable domains still require human judgment, model graders calibrated to humans, or outcome proxies.

## Process vs outcome supervision

- **Outcome reward:** scores the final answer. Flexible, but gives sparse credit and may reinforce lucky reasoning.
- **Process supervision:** labels intermediate steps. Denser signal and potentially easier diagnosis, but expensive and may enforce one style of solution.
- **Process reward model:** estimates step quality and can guide search; it must itself be evaluated for calibration and exploitability.

## Distillation

A smaller **student** trains on outputs, logits, or internal signals from a stronger **teacher**. Distillation can transfer instruction-following and reasoning behavior, create efficient domain models, and convert sampled search trajectories into direct behavior. It can also transfer hallucinations, style artifacts, and safety weaknesses. Synthetic-data provenance and contamination tracking matter.

## Alignment is plural

Helpful, honest, harmless, instruction-following, culturally appropriate, legally compliant, and user-steerable can conflict. “Human preference” varies by annotator and context. Treat alignment as an explicit specification and evaluation program, not one scalar reward.

## Key failure modes

- Reward hacking and evaluator exploitation.
- Sycophancy: agreeing with the user over truth.
- Over-refusal or brittle keyword safety.
- Preference collapse toward bland, long, hedged responses.
- Alignment tax on some base capabilities.
- Distribution shift between labeling prompts and deployment.
- Hidden objectives or deceptive behavior remain open research questions, not solved properties.

## Sources

- [InstructGPT on Consensus](https://consensus.app/papers/training-language-models-to-follow-instructions-with-ouyang-wu/183f55c332775490b6263da9f4b4204a/?utm_source=chatgpt).
- [DPO on Consensus](https://consensus.app/papers/direct-preference-optimization-your-language-model-is-rafailov-sharma/1ee8db4229ee52ec8af09f4e12828ff2/?utm_source=chatgpt).
- [Constitutional AI on Consensus](https://consensus.app/papers/constitutional-ai-harmlessness-from-ai-feedback-bai-kadavath/f9ee64622b4459ddb86d22aab500edb1/?utm_source=chatgpt).
- [DeepSeek-R1 on Consensus](https://consensus.app/papers/deepseekr1-incentivizes-reasoning-in-llms-through-deepseek-ai-guo/3b6645a38cd55272bd633b72b0c8acfa/?utm_source=chatgpt).
