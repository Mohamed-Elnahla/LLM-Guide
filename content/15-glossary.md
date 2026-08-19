# Glossary

**Activation** — a value produced inside a network for a particular input.  
**Alignment** — methods and goals for making system behavior follow intended values, instructions, and constraints.  
**Autoregressive** — factorizes a sequence into predictions conditioned on earlier elements.  
**Attention head** — one learned query/key/value routing subspace within multi-head attention.  
**Backpropagation** — computes gradients of a loss with respect to parameters using the chain rule.  
**Base model** — pretrained model before assistant-oriented post-training.  
**Batch** — examples/tokens processed together for training or inference.  
**Benchmark contamination** — evaluation content or close variants appearing in training.  
**BF16** — 16-bit floating point with FP32-like exponent range and reduced mantissa precision.  
**BPE** — byte-pair encoding; iteratively merges frequent adjacent symbols into tokens.  
**Causal mask** — prevents a position from attending to future positions.  
**Checkpoint** — saved model and often optimizer/training state.  
**Context window** — maximum token span a model invocation can process under its serving policy.  
**Cross-entropy** — negative log likelihood of the target class/token.  
**Decoder-only** — causal Transformer stack used by GPT, Llama, Qwen, and DeepSeek text models.  
**Dense model** — activates essentially all standard parameters for each token, unlike sparse MoE routing.  
**Distillation** — trains a student from a teacher’s outputs or internal signals.  
**DPO** — preference objective that directly raises chosen responses relative to rejected responses.  
**Embedding** — learned vector representation of a token or other item.  
**Encoder** — bidirectional representation stack; BERT is encoder-only.  
**Epoch** — one pass over a finite training dataset.  
**Fine-tuning** — gradient updates adapting pretrained weights or added parameters to new data.  
**FLOP** — floating-point operation; used approximately to count compute.  
**FP8** — 8-bit floating formats supported by newer accelerators.  
**Foundation model** — broadly pretrained model adaptable to many downstream tasks.  
**GQA** — grouped-query attention; groups query heads share key/value heads.  
**Gradient** — derivative indicating how a parameter change affects loss.  
**GRPO** — group-relative policy optimization; estimates relative advantages within sampled groups without a separate critic/value model.  
**Hallucination** — generated content unsupported by evidence or inconsistent with facts/context.  
**In-context learning** — behavior induced by instructions/examples in context without parameter updates.  
**Instruction tuning** — supervised fine-tuning on instructions and desired responses.  
**KV cache** — saved attention keys/values for earlier tokens during autoregressive generation.  
**Latency** — elapsed response time; distinguish time to first token from decode time.  
**Logit** — unnormalized score before softmax.  
**LoRA** — learns low-rank weight updates while freezing base weights.  
**Loss** — scalar training objective minimized by optimization.  
**MLA** — multi-head latent attention; compresses K/V representations into a latent form.  
**MLP/FFN** — per-token feed-forward subnetwork in each Transformer block.  
**MoE** — mixture of experts; routes each token through selected expert subnetworks.  
**MTP** — multi-token prediction; trains predictions for multiple future tokens.  
**Parameter** — learned scalar weight.  
**PEFT** — parameter-efficient fine-tuning; adapts a small subset or added parameters.  
**Perplexity** — exponentiated average cross-entropy; lower is better on the same tokenization/data.  
**Post-training** — assistant/capability/safety training after broad pretraining.  
**Prefill** — parallel processing of prompt tokens before autoregressive decoding.  
**Quantization** — represents weights/activations/cache with lower precision.  
**RAG** — retrieval-augmented generation; supplies retrieved evidence in context.  
**Residual stream** — running representation updated by attention and MLP sublayers.  
**RLHF** — reinforcement learning from human feedback, often using preferences and a reward model.  
**RMSNorm** — normalization based on root mean square without mean subtraction.  
**RoPE** — rotary positional embedding applied to query/key features.  
**Sampling temperature** — scales logits to control probability sharpness.  
**Scaling law** — empirical relation predicting loss/capability from size, data, and compute in a regime.  
**SFT** — supervised fine-tuning.  
**Softmax** — normalizes logits into a probability distribution.  
**Speculative decoding** — draft tokens are proposed cheaply and verified by the target model.  
**State-space model (SSM)** — sequence model maintaining a recurrent state; selective SSMs include Mamba.  
**Tokenizer** — reversible mapping between text/bytes and token IDs.  
**Tool calling** — structured generation requesting an external operation executed by a runtime.  
**Training token** — a token occurrence used as a prediction example, not a unique vocabulary item.  
**Transformer** — architecture built from attention, per-token MLPs, residual connections, and normalization.  
**Weight tying** — reuses the token embedding matrix for output projection.  
