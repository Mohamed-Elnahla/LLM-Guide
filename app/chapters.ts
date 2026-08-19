import start from "../content/00-start-here.md?raw";
import basics from "../content/01-language-model-basics.md?raw";
import attention from "../content/02-attention-transformer.md?raw";
import architecture from "../content/03-architecture-evolution.md?raw";
import pretraining from "../content/04-pretraining-scaling-data.md?raw";
import postTraining from "../content/05-post-training-alignment.md?raw";
import fineTuning from "../content/06-fine-tuning-peft.md?raw";
import quantization from "../content/07-quantization-compression.md?raw";
import inference from "../content/08-inference-efficiency-mtp.md?raw";
import reasoning from "../content/09-reasoning-test-time-compute.md?raw";
import systems from "../content/10-multimodal-rag-agents.md?raw";
import evaluation from "../content/11-evaluation-safety-interpretability.md?raw";
import families from "../content/12-model-families.md?raw";
import timeline from "../content/13-timeline.md?raw";
import research from "../content/14-research-roadmap.md?raw";
import glossary from "../content/15-glossary.md?raw";
import audit from "../content/16-search-audit.md?raw";

export type Video = { title:string; duration:string; note:string; url:string; embedId?:string; embedUrl?:string };
export type Chapter = { slug:string; number:string; title:string; description:string; level:string; section:string; content:string };

export const chapters: Chapter[] = [
  {slug:"start",number:"00",title:"Start here",description:"The field in one mental model and a practical learning route.",level:"Beginner",section:"Foundations",content:start},
  {slug:"language-models",number:"01",title:"Language models from zero",description:"Tokens, vectors, probability, loss, and generation.",level:"Beginner",section:"Foundations",content:basics},
  {slug:"transformer",number:"02",title:"Attention & the Transformer",description:"Q, K, V, heads, blocks, position, and the forward pass.",level:"Core",section:"Foundations",content:attention},
  {slug:"architecture",number:"03",title:"Architecture evolution",description:"From 2017 attention to MoE, multimodality, and state-space models.",level:"Core",section:"Architecture",content:architecture},
  {slug:"pretraining",number:"04",title:"Pretraining, scaling & data",description:"Objectives, data pipelines, scaling laws, and distributed training.",level:"Core",section:"Training",content:pretraining},
  {slug:"post-training",number:"05",title:"Post-training & alignment",description:"SFT, RLHF, DPO, RLAIF, GRPO, verification, and distillation.",level:"Advanced",section:"Training",content:postTraining},
  {slug:"fine-tuning",number:"06",title:"Fine-tuning & PEFT",description:"Full adaptation, LoRA, QLoRA, datasets, merging, and evaluation.",level:"Applied",section:"Training",content:fineTuning},
  {slug:"quantization",number:"07",title:"Quantization & compression",description:"Low precision, GPTQ, AWQ, SmoothQuant, pruning, and trade-offs.",level:"Applied",section:"Efficiency",content:quantization},
  {slug:"inference",number:"08",title:"Inference, serving & MTP",description:"KV caches, kernels, batching, speculative decoding, and multi-token prediction.",level:"Advanced",section:"Efficiency",content:inference},
  {slug:"reasoning",number:"09",title:"Reasoning & test-time compute",description:"CoT, search, verifiers, reasoning RL, and faithful evaluation.",level:"Advanced",section:"Frontier",content:reasoning},
  {slug:"agents",number:"10",title:"Multimodality, RAG & agents",description:"Evidence, tools, memory, orchestration, and security boundaries.",level:"Applied",section:"Frontier",content:systems},
  {slug:"evaluation",number:"11",title:"Evaluation, safety & interpretability",description:"Measure the right system, find failures, and study mechanisms.",level:"Research",section:"Frontier",content:evaluation},
  {slug:"families",number:"12",title:"Five model ecosystems",description:"OpenAI, Google, Meta, Qwen, and DeepSeek—current through August 2026.",level:"Current",section:"Field map",content:families},
  {slug:"timeline",number:"13",title:"2017–2026 timeline",description:"The milestones and terminology shifts that reorganized the field.",level:"Reference",section:"Field map",content:timeline},
  {slug:"research",number:"14",title:"Research roadmap",description:"Competencies, reproduction ladder, open questions, and project design.",level:"Research",section:"Reference",content:research},
  {slug:"glossary",number:"15",title:"Glossary",description:"Compact definitions for the field’s core language.",level:"Reference",section:"Reference",content:glossary},
  {slug:"audit",number:"16",title:"Research audit",description:"Search queries, coverage, evidence policy, and limitations.",level:"Methods",section:"Reference",content:audit},
];
