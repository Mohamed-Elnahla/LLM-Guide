# Evaluation, safety, and interpretability

## Start from a threat model and use case

There is no universal LLM score. A medical summarizer, coding agent, tutor, and creative assistant have different costs of error. Define users, tasks, deployment context, adversaries, acceptable failures, latency/cost budgets, and escalation paths before choosing metrics.

## Evaluation layers

1. **Component:** tokenizer, retrieval recall, tool schema validity, calibration.
2. **Capability:** knowledge, reasoning, coding, languages, multimodal perception.
3. **Behavior:** instruction following, refusal, bias, truthfulness, uncertainty.
4. **System:** end-to-end task completion with prompts, tools, and runtime.
5. **Impact:** real user outcomes, misuse, labor effects, energy, and incidents.

HELM argued for multi-metric, scenario-based evaluation across accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency [Liang et al., 2022](https://arxiv.org/abs/2211.09110). A benchmark leaderboard compresses these dimensions and can hide trade-offs.

## Benchmark hazards

- Training contamination and repeated public test sets.
- Prompt/template sensitivity.
- Different sampling or tool access.
- Grader bias, position bias, and verbosity bias.
- Non-independent questions and misleading confidence intervals.
- Saturation and ceiling effects.
- Cherry-picked subsets or unreported failed runs.
- Benchmark gaming that does not transfer to real tasks.

Use frozen harnesses, version everything, report variance and confidence intervals, retain raw outputs, and create private temporal holdouts. Compare cost and latency at the same quality target.

## Hallucination and calibration

“Hallucination” includes unsupported claims, contradiction with supplied evidence, and factual error against the world. Separate these. A model may be correct without citation, cite an irrelevant source, or faithfully summarize a false source. Evaluate claim extraction, source entailment, citation completeness, and uncertainty.

Calibration asks whether stated confidence matches empirical correctness. Token probabilities are not automatically meaningful answer-level confidence. Abstention, ensembles, self-consistency, retrieval evidence, and calibrated verifier models can help but must be tested under shift.

## Safety work

Safety includes harmful-content policy, misuse resistance, privacy, cybersecurity, biosecurity, autonomy, deception, bias, robustness, and secure tool use. Model cards and system cards document intended use, evaluations, mitigations, and limitations; they are evidence from the developer, not independent certification.

Red teaming searches for failures. Automated adversarial generation expands coverage; domain experts identify realistic harms; public challenges surface unexpected attacks. Defenses need layered monitoring because jailbreak robustness can change with languages, encodings, modalities, and tool access.

## Interpretability

- **Probing:** train a classifier on activations; shows information is decodable, not necessarily used.
- **Attribution:** estimate which input features affect an output; sensitive to method and baseline.
- **Activation patching/causal tracing:** intervene on internal states to test causal contribution.
- **Circuit analysis:** identify interacting components implementing a behavior.
- **Sparse autoencoders (SAEs):** decompose activations into sparse learned features, aiming to reduce polysemantic mixing.

Mechanistic interpretability has produced concrete small-scale circuits and increasingly large feature dictionaries, but scalable, faithful explanations of frontier models remain open. Natural-language explanations can be plausible without being complete or causal.

## Reproducible evaluation template

Record model/checkpoint/API date, system prompt, tokenizer, decoding parameters, tool definitions, quantization, hardware, dataset version, contamination checks, grader and rubric, repeats/seeds, cost, latency, raw generations, and analysis code. For changing hosted models, rerun sentinel tests and store dated outputs.

## Sources

- [Holistic Evaluation of Language Models](https://consensus.app/papers/holistic-evaluation-of-language-models-liang-bommasani/af07346449425d8ca294a7be247f4a48/?utm_source=chatgpt).
- [TruthfulQA](https://arxiv.org/abs/2109.07958).
- [On the Dangers of Stochastic Parrots](https://dl.acm.org/doi/10.1145/3442188.3445922).
- [Towards Monosemanticity](https://transformer-circuits.pub/2023/monosemantic-features/) and [Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/).
