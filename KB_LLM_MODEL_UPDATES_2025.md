## OpenAI API Changes (2025)

**Models:**
- **o1:** Advanced reasoning and instruction-following.
- **GPT-4o:** Multi-modal, cost-effective, includes built-in image generation (as of March 2025), and real-time voice interactions (Advanced Voice Mode).
- **GPT-4.5-preview:** Deprecated and will be removed from API on July 14, 2025.
- **o3 and o4 mini:** Released April 16, 2025.
- **o3-pro:** Available for Pro users in ChatGPT and API (June 10, 2025).
- **Codex Mini model:** Introduced in May 2025 updates.

**New Features & Updates:**
- **Agents SDK:** Build AI agents for complex tasks, orchestrating multiple models and tools (e.g., code interpreter, web search). Primarily Python, but similar functionality in JavaScript via AI SDK.
- **Streaming API:** For real-time responses.
- **DALL-E:** Image generation with various resolutions. Content filter blocks inappropriate content.
- **Whisper API:** Speech-to-text for multiple languages and formats. GPT-4o Voice Mode for real-time voice interactions.
- **Embeddings:** Convert text into number sequences for semantic relationships, best used with vector databases.
- **Hybrid Approach:** Combine deterministic code with AI for robust applications.
- **Responses API:** New tools like web search and file search (March 2025).
- **Schema Validation:** Introduced in May 2025 updates.
- **Reinforcement Fine-tuning:** For smarter AI apps (May 2025 updates).

**Key URLs for OpenAI:**
- https://openai.com/index/new-tools-and-features-in-the-responses-api/
- https://zuplo.com/blog/2025/04/10/openai-api
- https://community.openai.com/t/gpt-4-5-preview-model-will-be-removed-from-the-api-on-2025-07-14/1230050
- https://help.openai.com/en/articles/9624314-model-release-notes
- https://community.openai.com/t/chatgpt-release-notes-2025-march-27-gpt-4o-a-new-update/1153887
- https://www.reddit.com/r/ChatGPT/comments/1ld5y3f/deprecation_notice_gpt45_preview_in_the_openai/
- https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-lifecycle
- https://www.arsturn.com/blog/adapting-to-change-navigate-openai-latest-api-features
- https://community.openai.com/t/openai-roadmap-and-characters/1119160
- https://sbthemes.com/blog/openai-api-updates-may-2025-summary



## Anthropic Claude API Changes (2025)

**Models:**
- **Claude Opus 4 and Claude Sonnet 4:** Launched May 22, 2025, with extended thinking capabilities.
- **Claude Sonnet 3.7:** Launched February 24, 2025, capable of near-instant responses or step-by-step extended thinking.
- **Claude Haiku 3.5:** Vision support added February 24, 2025.
- **Deprecated Models:** Claude 2, Claude 2.1, and Claude Sonnet 3 deprecated January 21, 2025.
- **Retired Models:** Claude 1 and Instant models retired November 6, 2024.

**New Features & Updates:**
- **Fine-grained tool streaming:** Public beta launched June 11, 2025, allows streaming tool use parameters without buffering/JSON validation.
- **Extended thinking:** Default behavior in Claude 4 models returns a summary of Claude’s full thinking process.
- **Interleaved thinking:** Public beta launched May 22, 2025, enables Claude to think between tool calls.
- **Files API:** Public beta launched May 22, 2025, for uploading and referencing files in Messages API and code execution tool.
- **Code execution tool:** Public beta launched May 22, 2025, enables Claude to execute Python code in a secure sandboxed environment.
- **MCP connector:** Public beta launched May 22, 2025, allows connection to remote MCP servers from Messages API.
- **`top_p` (nucleus sampling) parameter:** Default value changed from 0.999 to 0.99 for all models (May 22, 2025).
- **Web search tool:** Launched May 7, 2025, for accessing up-to-date web information.
- **Cache control:** Must be specified directly in the parent `content` block of `tool_result` and `document.source` (May 1, 2025).
- **URL source blocks for images and PDFs:** Added February 27, 2025, allows direct referencing via URL.
- **`tool_choice` parameter:** `none` option added February 27, 2025, to prevent Claude from calling tools.
- **OpenAI-compatible API endpoint:** Launched February 27, 2025, for testing Claude models with existing OpenAI integrations.
- **Token-efficient tool use implementation:** Released February 24, 2025.
- **Default temperature in Console:** Changed from 0 to 1 for new prompts (February 24, 2025).
- **Updated tools:** `bash_20250124`, `text_editor_20250124`, `computer_20250124` released February 24, 2025, independent from computer use.
- **`anthropic-organization-id` response header:** Added February 10, 2025.
- **Citations capability:** Launched January 23, 2025, for source attribution.
- **Plain text and custom content documents:** Support added January 23, 2025.
- **Prompt caching:** Updated January 15, 2025, for easier use and automatic reading from longest previously cached prefix.
- **Putting words in Claude’s mouth:** Enabled when using tools (January 15, 2025).
- **Optimized prompt caching in Message Batches API:** January 10, 2025.
- **Delete endpoint in Message Batches API:** Added December 19, 2024.
- **Generally Available Features (December 17, 2024):** Models API, Message Batches API, Token counting API, Prompt Caching, PDF support.
- **New Official SDKs (December 17, 2024):** Java SDK (alpha), Go SDK (alpha).
- **API key grouping in Developer Console:** December 4, 2024.
- **Updated rate limits for Messages API:** November 20, 2024.
- **Tool use support in Workbench:** November 20, 2024.
- **PDF support for Claude Sonnet 3.5 models:** November 13, 2024.

**Key URLs for Anthropic:**
- https://docs.anthropic.com/en/release-notes/api
- https://docs.anthropic.com/en/docs/about-claude/models/migrating-to-claude-4
- https://docs.anthropic.com/en/docs/about-claude/models/overview
- https://www.reddit.com/r/ClaudeAI/comments/1lekm64/anthropic_status_update_wed_18_jun_2025_084701/
- https://sdtimes.com/ai/ai-updates-from-the-past-week-anthropic-launches-claude-4-models-openai-adds-new-tools-to-responses-api-and-more-may-23-2025/
- https://www.anthropic.com/news/claude-4
- https://www.reddit.com/r/ClaudeAI/comments/1kx4ef2/anthropic_status_update/
- https://docs.anthropic.com/en/release-notes/claude-code
- https://www.cursor-ide.com/blog/claude-api-key-guide-2025
- https://docs.anthropic.com/en/release-notes/claude-apps



## Google Gemini API Changes (2025)

**Models:**
- **gemini-2.5-pro:** Stable version released June 17, 2025, with adaptive thinking. `gemini-2.5-pro-preview-05-06` will be deprecated soon.
- **gemini-2.5-flash:** Stable version released June 17, 2025. `gemini-2.5-flash-preview-04-17` will be deprecated on July 11, 2025.
- **gemini-2.5-flash-lite-preview-06-17:** Low-cost, high-performance model released June 17, 2025.
- **gemini-2.5-pro-preview-06-05:** New version with adaptive thinking released June 5, 2025. `gemini-2.5-pro-preview-05-06` deprecated June 19, 2025.
- **gemini-2.5-flash-preview-05-20:** Preview model optimized for price-performance and adaptive thinking released May 20, 2025.
- **`gemini-2.5-pro-preview-tts` and `gemini-2.5-flash-preview-tts`:** Models capable of generating speech released May 20, 2025.
- **`lyria-realtime-exp`:** Model for real-time music generation released May 20, 2025.
- **`gemini-2.5-flash-preview-native-audio-dialog` and `gemini-2.5-flash-exp-native-audio-thinking-dialog`:** New Live API models with native audio output capabilities released May 20, 2025.
- **`gemma-3n-e4b-it` preview:** Released May 20, 2025, as part of Gemma 3n launch.
- **`gemini-2.0-flash-preview-image-generation`:** Preview model for generating and editing images released May 7, 2025.
- **`gemini-2.5-pro-preview-05-06`:** New version with improvements on code and function calling released May 6, 2025.
- **`gemini-2.5-flash-preview-04-17`:** Preview model optimized for price-performance and adaptive thinking released April 17, 2025.
- **`veo-2.0-generate-001`:** GA text- and image-to-video model released April 9, 2025.
- **`gemini-2.0-flash-live-001`:** Public preview of Live API model with billing enabled released April 9, 2025.
- **`gemini-2.5-pro-preview-03-25`:** Public preview with billing enabled released April 4, 2025.
- **`gemini-2.5-pro-exp-03-25`:** Public experimental model with thinking mode always on released March 25, 2025.
- **Experimental Gemini 2.0 Flash model:** Capable of image generation and editing released March 12, 2025.
- **`gemma-3-27b-it`:** Released March 12, 2025, as part of Gemma 3 launch.
- **`gemini-embedding-exp-03-07`:** Experimental Gemini-based embeddings model released March 7, 2025.
- **`gemini-2.0-flash-lite`:** GA version optimized for speed, scale, and cost efficiency released February 25, 2025.
- **Gemini 1.0 Pro:** No longer supported as of February 18, 2025.
- **`imagen-3.0-generate-002`:** GA version of Imagen 3 in Gemini API released February 6, 2025.
- **`gemini-2.0-flash-001`:** GA version supporting text-only output released February 5, 2025.
- **`gemini-2.0-pro-exp-02-05`:** Experimental public preview of Gemini 2.0 Pro released February 5, 2025.
- **`gemini-2.0-flash-lite-preview-02-05`:** Released February 5, 2025.

**New Features & Updates:**
- **Adaptive thinking:** Introduced with `gemini-2.5-pro` and `gemini-2.5-flash` (June 17, 2025).
- **Custom video preprocessing:** Support launched May 20, 2025.
- **Multi-tool use:** Supports code execution and Grounding with Google Search on same `generateContent` request (May 20, 2025).
- **Asynchronous function calls:** Support launched in Live API (May 20, 2025).
- **URL context tool:** Experimental tool for providing URLs as additional context to prompts (May 20, 2025).
- **Enhanced Session Management and Reliability (Live API):** Session Resumption, Longer Sessions via Context Compression, Graceful Disconnect Notification (April 9, 2025).
- **More Control over Interaction Dynamics (Live API):** Configurable Voice Activity Detection (VAD), Configurable Interruption Handling, Configurable Turn Coverage, Configurable Media Resolution (April 9, 2025).
- **Richer Output and Features (Live API):** Expanded Voice & Language Options, Text Streaming, Token Usage Reporting (April 9, 2025).
- **Context caching:** Launched for Gemini 2.0 Flash (April 16, 2025).
- **YouTube URLs as media source:** Support added March 12, 2025.
- **Inline video:** Support for videos less than 20MB added March 12, 2025.
- **Google Gen AI SDK for TypeScript and JavaScript:** Public preview released March 11, 2025.
- **Search as a tool:** Support added to `gemini-2.0-pro-exp-02-05` (February 28, 2025).
- **Additional regions:** Support for Kosovo, Greenland, and Faroe Islands in AI Studio and API (February 19, 2025).
- **OpenAI libraries compatibility:** Updates on compatibility (February 11, 2025).
- **Google Gen AI SDK for Java:** Public preview released February 6, 2025.

**Key URLs for Google Gemini:**
- https://ai.google.dev/gemini-api/docs/changelog
- https://developers.googleblog.com/en/gemini-api-io-updates/
- https://blog.google/technology/google-deepmind/google-gemini-updates-io-2025/
- https://developers.googleblog.com/en/gemini-2-5-thinking-model-updates/
- https://ai.google.dev/gemini-api/docs/models
- https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro
- https://support.google.com/gemini/thread/350529250/the-2-5pro-api-i-was-using-all-of-a-sudden-stopped-working-and-now-the-new-version-doesn-t-work-also?hl=en
- https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash
- https://blog.google/technology/developers/google-ai-developer-updates-io-2025/
- https://www.youtube.com/shorts/MnLRlu3Ob8Y

