import type { Video } from "./chapters";

const watch = (title: string, duration: string, note: string, id: string): Video => ({
  title,
  duration,
  note,
  url: `https://www.youtube.com/watch?v=${id}`,
  embedId: id,
});

// Exact Markdown subtitle slugs. Missing keys intentionally mean no video.
export const chapterVideos: Record<string, Record<string, Video[]>> = {
  start: {
    "the-entire-field-in-one-paragraph": [
      watch("But what is a GPT? Visual intro to Transformers", "27 min", "A visual map of the key ideas behind generative language models.", "wjZofJX0v4M")
    ]
  },
  "language-models": {
    "text-becomes-tokens": [
      watch("How Tokenization Works in LLMs", "7 min", "See how raw text is split into discrete token IDs.", "viZrOnJclY0"),
      watch("Let's Build the GPT Tokenizer", "130 min", "Andrej Karpathy's comprehensive deep dive into Byte Pair Encoding (BPE) and tokenizers.", "zduSFxRajkE")
    ],
    "ids-become-vectors": [
      watch("Neural Networks, From Scratch", "19 min", "Build intuition for parameters, layers, and vector representations.", "aircAruvnKk")
    ],
    "the-objective": [
      watch("Neural Networks: Cross Entropy Loss", "6 min", "Connect the next-token prediction objective to probability and loss.", "6ArSys5qHAU")
    ],
    sampling: [
      watch("Decoder-Only Transformers & Sampling", "15 min", "Understand how temperature and top-p sampling control generation.", "bQ5BoolX9Ag")
    ]
  },
  transformer: {
    "why-attention-mattered": [
      watch("Attention in Transformers, Step by Step", "18 min", "A visual walkthrough of information routing across tokens.", "eMlx5fFNoYc")
    ],
    "query-key-value": [
      watch("Attention Is All You Need — Math & Architecture", "179 min", "Umar Jamil's complete breakdown of Query, Key, and Value matrices.", "bCz4OMemCcA")
    ],
    "self-attention-and-masks": [
      watch("Let's Build GPT: From Scratch, in Code", "117 min", "Andrej Karpathy builds causal self-attention and masking step by step.", "kCc8FmEb1nY")
    ],
    "multi-head-attention": [
      watch("Coding a Transformer From Scratch in PyTorch", "120 min", "Umar Jamil implements multi-head self-attention and transformer blocks in code.", "ISNdQcPhsts")
    ],
    "positional-encoding-and-rotary-rope": [
      watch("LLaMA Architecture, KV Cache & Rotary Positional Embedding (RoPE)", "125 min", "Deep dive into RoPE mathematics, RMSNorm, and grouped-query attention.", "Mn_9W1nCFLo")
    ]
  },
  architecture: {
    "2017–2019-pretraining-becomes-the-interface": [
      watch("Encoder-Only Transformers (BERT) Explained", "14 min", "The architectural shift from encoder-only representations to decoder pretraining.", "zxQyTK8quyY")
    ],
    "2020–2023-scaling-instruction-tuning-and-rlhf": [
      watch("Deep Dive into LLMs like ChatGPT", "215 min", "Andrej Karpathy's end-to-end breakdown of pretraining, fine-tuning, and alignment.", "7xTGNNLPyMI")
    ],
    "2024–2026-multimodal-moe-reasoning-and-action": [
      watch("Mixture of Experts (MoE) & DeepSeek Architectures", "11 min", "How routing networks direct tokens to specialized expert sub-networks.", "4ucnsFBQmDA")
    ],
    "state-space-models-and-hybrids-mamba": [
      watch("Mamba and S4 Explained", "110 min", "Architecture, parallel scan, kernel fusion, recurrent and convolution math.", "8Q_tqwpTpVU")
    ]
  },
  pretraining: {
    "pretraining-is-compression-through-prediction": [
      watch("How Large Language Models Pretrain", "10 min", "See pretraining as compressing massive text data into model weights.", "5sLYAQS9sWQ")
    ],
    "scaling-laws": [
      watch("LLM Scaling Laws Explained", "60 min", "Why parameters, dataset size, and compute must scale together predictably.", "zjkBMFhNj_g")
    ],
    "optimization-concepts": [
      watch("Gradient Descent, Visually Explained", "21 min", "See how prediction errors steer parameters via backpropagation.", "IHZwWFHWa-w")
    ],
    "distributed-training-intuition": [
      watch("Building a Distributed Training Framework from First Principles", "105 min", "Umar Jamil's guide to data parallelism, tensor parallelism, and distributed scaling.", "XoGvCBRnwLs")
    ]
  },
  "post-training": {
    "stage-1-supervised-fine-tuning-sft": [
      watch("Supervised Fine-Tuning (SFT) for LLMs", "26 min", "The first post-training stage: adapting base models with curated demonstrations.", "eC6Hd1hFvos")
    ],
    preferences: [
      watch("Reinforcement Learning from Human Feedback (RLHF), Clearly Explained", "16 min", "How human preference datasets and reward models shape assistant behavior.", "qPN_XZcJf_s")
    ],
    "dpo-and-related-objectives": [
      watch("Direct Preference Optimization (DPO) Explained", "14 min", "Directly optimizing policy probabilities without training a separate reward model.", "vAmKB7iPkWw")
    ],
    "rl-with-verifiable-rewards": [
      watch("DeepSeek-R1: Teaching AI to Reason With Verifiable Rewards", "18 min", "Why checkable outcomes (code/math execution) create clean learning signals.", "lLMCLDqdbl0")
    ]
  },
  "fine-tuning": {
    lora: [
      watch("LoRA: Low-Rank Adaptation of LLMs", "55 min", "Visualize small trainable rank-decomposition matrices injected into frozen weights.", "PXWYUTMt-AU")
    ],
    qlora: [
      watch("QLoRA: Efficient 4-bit Fine-Tuning", "11 min", "Combining 4-bit NormalFloat quantization with low-rank adapter updates.", "TPcXVJ1VSRI")
    ],
    "model-merging": [
      watch("Model Merging & Mergekit Architecture", "25 min", "Combines multiple fine-tuned LLM checkpoints without retraining.", "IVDNhQIzyIY")
    ]
  },
  quantization: {
    "precision-is-a-systems-choice": [
      watch("What is LLM Quantization?", "95 min", "Lower numeric precision, VRAM savings, and measured quality trade-offs.", "0VdNflU08yA")
    ],
    "ptq-vs-qat": [
      watch("Post-Training Quantization vs Quantization-Aware Training", "12 min", "Comparing post-training calibration with training-time quantization.", "wIXr22QTEHg")
    ],
    "major-methods": [
      watch("GPTQ, AWQ, and GGUF Quantization Compared", "18 min", "Comparing modern post-training quantization algorithms for LLMs.", "mNE_d-C82lI")
    ]
  },
  inference: {
    "prefill-and-decode": [
      watch("LLM Inference: Prefill vs Decode Phases", "15 min", "Separating parallel prompt prefill from memory-bound token decoding.", "HRKFa8LIAQg")
    ],
    "the-kv-cache": [
      watch("How KV Cache Speeds Up LLMs", "10 min", "Why serving systems cache key and value tensors to avoid quadratic recomputation.", "o0gkdZBtwEg")
    ],
    "kernels-and-batching": [
      watch("FlashAttention Derived & Coded from First Principles", "100 min", "GPU memory hierarchy optimization and Triton kernel implementations.", "zy8ChVd_oTM")
    ],
    "speculative-decoding": [
      watch("Speculative Decoding for Faster LLMs", "9 min", "How a smaller draft model accelerates generation for a larger target model.", "gBMO1JZav44")
    ]
  },
  reasoning: {
    "chain-of-thought-prompting": [
      watch("Chain-of-Thought Prompting in Generative AI", "5 min", "How intermediate reasoning tokens improve performance on complex tasks.", "Fp-ue4UCE3s")
    ],
    "sampling-and-search": [
      watch("Tree of Thoughts & Guided LLM Search", "10 min", "Generating multiple candidate reasoning paths and evaluating them with verifiers.", "ut5kp56wW_4")
    ],
    "inference-time-scaling": [
      watch("DeepSeek-R1 & Test-Time Compute Scaling", "3 min", "Trading inference latency and compute for accuracy on hard problems.", "YwCLWZHm574")
    ]
  },
  agents: {
    "multimodal-models": [
      watch("CLIP: Contrastive Language-Image Pretraining & Multimodality", "75 min", "Joint text-image embeddings, contrastive pretraining, and vision encoders.", "L3BTG8ETY_Y")
    ],
    "retrieval-augmented-generation-rag": [
      watch("What is Retrieval-Augmented Generation (RAG)?", "7 min", "Grounding LLM generation in retrieved external documents.", "T-D1OfcDW1M")
    ],
    tools: [
      watch("What is Tool Calling? Connecting LLMs to Your Data", "12 min", "How language models format structured function calls for external APIs.", "h8gMhXYAv1k")
    ],
    agents: [
      watch("AI Agents & Agentic Reasoning Architecture", "25 min", "Structuring observation, decision, tool invocation, and memory loops.", "KrRD7r7y7NY")
    ]
  },
  evaluation: {
    "start-from-a-threat-model-and-use-case": [
      watch("AI Threat Modeling & Red Teaming", "22 min", "Defining evaluation boundaries based on specific risk and failure scenarios.", "15sFfOLCLkc")
    ],
    "evaluation-layers": [
      watch("LLM Evaluation Layers & Benchmarking", "14 min", "Disentangling component metrics from system-level and end-to-end behavior.", "kDY4TodQwbg")
    ],
    "benchmark-hazards": [
      watch("LLM as a Judge & Benchmark Hazards", "16 min", "Why static benchmarks saturate and suffer from data leakage.", "trfUBIDeI1Y")
    ],
    interpretability: [
      watch("Sparse Autoencoders & Mechanistic Interpretability", "45 min", "Extracting monosemantic features and understanding internal model representations.", "Tgq7E4YcPKQ")
    ]
  },
  research: {
    "how-to-read-a-paper": [
      watch("How To Read Papers Fast & Effectively", "15 min", "A structured workflow for reading AI research papers efficiently.", "EXALI6jFu6E")
    ]
  }
};

const urls = Object.values(chapterVideos).flatMap((headings) => Object.values(headings).flatMap((videos) => videos.map((video) => video.url)));
if (new Set(urls).size !== urls.length) throw new Error("Duplicate YouTube video assignment in chapterVideos");
