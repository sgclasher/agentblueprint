# Agentic-AI Pattern & Blueprint Portfolio  
*A vendor-neutral knowledge base for any LLM that must design or reason about autonomous-agent solutions.*

> **How to use this file**  
> 1. **Part 1** defines the canonical design patterns (single-agent loops ➜ planning hybrids ➜ orchestration styles ➜ cross-cutting blocks).  
> 2. **Part 2** shows six worked examples—one for every major orchestration pattern.  
> 3. **Glossary** maps common synonyms so retrieval works even when prompts use different wording.

---

## 🟢  Front-Matter Abstract (LLM Hint)
This document catalogues repeat-able design patterns that have emerged in modern (2022-2025) agentic-AI systems and illustrates each pattern with a domain blueprint.  
Chunk boundaries follow Markdown headings (`##`, `###`) so that RAG engines such as **Cursor AI** can co-embed patterns *and* examples in one namespace.

---

## Part 1 – Foundational Design Patterns

### 1 · Core Single-Agent Reasoning Loops
| Pattern | Essence | Typical Trigger → Flow → Outcome |
|---------|---------|----------------------------------|
| **Tool-Use / Function-Calling** | LLM decides when to invoke an external function/API and merges the result into context. | “User asks for payroll data” → *Call* HR API → “Return formatted answer”. |
| **ReAct (Reason + Act)** | Interleave `Thought → Action → Observation` steps; reasoning guides tool calls and vice-versa. | “Research topic” → think → *search* → observe → think → *summarise*. |
| **Self-Reflection / Critique** | Agent critiques its own draft against a rubric and revises if quality is low. | Draft policy → self-check compliance → fix → publish. |

---

### 2 · Planning-Heavy Hybrids
| Pattern | Essence | Why/When |
|---------|---------|----------|
| **Plan-and-Execute (Planner ↔ Executor)** | Large planner decomposes goal; cheaper executor handles each step; can re-plan. | Multi-step tasks where cost matters (e.g., data-migration scripts). |
| **Plan-Act-Reflect** | Adds a supervisory loop that periodically checks progress vs. goal and replans if off-track. | Open-ended research, creative writing, exploratory data analysis. |
| **Hierarchical Planning** | Goal cascades through multiple planner layers; each abstracts detail for its parent. | Very long horizon (supply-chain simulations, game-AI). |

---

### 3 · Multi-Agent Orchestration Styles
| Pattern | Interaction Style | Strengths | Watch-outs |
|---------|------------------|-----------|------------|
| **Manager-Workers (Orchestrator-Worker)** | One coordinator assigns tasks to specialist agents. | Deterministic, auditable, easy guardrails. | Single bottleneck if manager fails. |
| **Hierarchical / Hub-and-Spoke** | Tree of managers (CEO → VP → Staff). | Scales to huge graphs; clear accountability. | Added latency per layer. |
| **Blackboard / Shared-Memory** | Agents publish to a common store; peers subscribe/react. | High parallelism, loose coupling. | Needs conflict-resolution logic. |
| **Market-Based / Auction** | Agents bid for tasks based on cost/confidence. | Robust under load spikes; fosters specialisation. | Coordination overhead. |
| **Fully Decentralised Swarm** | Peers talk directly, sometimes with voting. | Fault-tolerant, emergent behaviour. | Hard to debug; policy enforcement tricky. |

---

### 4 · Cross-Cutting Building Blocks
| Block | Role in an Agentic System |
|-------|---------------------------|
| **Memory (long-term & episodic)** – vector / graph stores that any agent can query or update. |
| **Guardrails & policy engines** – filters or schema validators that run before/after tool calls. |
| **Human-in-the-Loop (HITL) gates** – autonomy checkpoints for risky actions (payments, PII). |
| **Event / message bus** – Kafka, Redis Streams, or graph edges for real-time pub-sub workflows. |
| **Observability & evaluation** – span tracing, cost/latency dashboards, automated eval suites. |

---

### 5 · Choosing a Pattern – Quick Heuristics
| Need | Start With | Scale-Up Path |
|------|------------|---------------|
| One-shot answer + optional API call | **ReAct + Tool-Use** | Add Self-Reflection for critical outputs. |
| Multi-step business process | **Plan-and-Execute** | Wrap in Plan-Act-Reflect if objectives drift. |
| Specialist hand-offs (e.g., research → draft → review) | **Manager-Workers** | Evolve to Hierarchical if tasks explode. |
| Unpredictable, bursty collaboration | **Blackboard or Market-Based** | Layer guardrails & monitoring to tame chaos. |

---

### 6 · Key Take-Aways
1. **Inner loop first, orchestration second** – perfect ReAct/Tool-Use before wiring many agents.  
2. **Planning = cost lever** – pay once for a strategic plan, reuse cheaper executors.  
3. **Memory & guardrails are non-negotiable** – prevent forgetfulness and unsafe actions.  
4. **Pattern choice is situational** – start simple, add hierarchy/auction/blackboard only when scale or adaptability demands it.

---

## Part 2 – Domain Blueprints (Pattern in Action)

> Each example lists **Pattern**, **Trigger → Flow → Outcome**, key **Agents**, autonomy **Guardrails**, and headline **KPIs**.  
> Tool names stay abstract (“CRM API” vs. “Salesforce”) so the blueprint travels across stacks.

---

### A · Customer-Support Concierge  
*Pattern:* **Manager-Workers**  
*Trigger → Flow → Outcome:*  
  1. **Triage Bot** classifies ticket & sentiment.  
  2. **Solution Finder** searches KB / calls CRM API.  
  3. **Escalation Agent** routes to human if policy requires.  
Outcome → First-response < 30 s, 24 × 7 coverage.  
*Guardrails:* `policy_checked` on Escalation; `human_approval` for account credits.  
*KPIs:* First-response time, CSAT, resolution rate.

---

### B · Security-Operations Copilot  
*Pattern:* **Blackboard / Shared-Memory**  
*Trigger:* SIEM emits high-severity alert.  
*Flow:*  
  • **Alert Ingestor** posts IoCs to the blackboard.  
  • **Threat Hunter** correlates endpoints & logs.  
  • **Remediation Agent** drafts containment playbook; waits for analyst HITL.  
Outcome → MTTR cut 50 %.  
*Guardrails:* `human_approval` before quarantine.  
*KPIs:* Mean-time-to-detect, Mean-time-to-remediate.

---

### C · Marketing Campaign Optimiser  
*Pattern:* **Plan-and-Execute**  
*Trigger:* Quarterly campaign goal entered.  
*Flow:* Planner allocates budget → Channel Bots (email, ads, social) test creatives → Weekly Reflector re-plans based on ROAS.  
Outcome → 15-25 % lift in conversions.  
*Guardrails:* `policy_checked` on compliance (brand tone, privacy).  
*KPIs:* ROAS, conversion rate, CAC.

---

### D · Healthcare Appointment Scheduler  
*Pattern:* **Single ReAct Agent**  
*Trigger:* Patient requests appointment via chat.  
*Flow:* Check availability API → verify insurance → book slot → send reminders.  
Outcome → No-shows down 30 %; admin hours halved.  
*Guardrails:* `policy_checked` (HIPAA filters) before data output.  
*KPIs:* No-show rate, scheduling latency.

---

### E · HR Onboarding Orchestrator  
*Pattern:* **Hierarchical (Manager → Specialists)**  
*Trigger:* Offer letter accepted.  
*Flow:*  
  1. **Onboarding Manager** spawns tasks.  
  2. **IT Setup Agent** provisions accounts.  
  3. **Policy Tutor** assigns courses.  
  4. **Buddy Agent** schedules check-ins.  
Outcome → Ramp-up time cut; HR email traffic -40 %.  
*Guardrails:* `human_approval` for equipment purchases.  
*KPIs:* Time-to-productivity, new-hire satisfaction.

---

### F · Supply-Chain Resilience Monitor  
*Pattern:* **Market-Based / Auction**  
*Trigger:* Forecast shows potential stock-out.  
*Flow:* Disruption event broadcast → **Routing Agent**, **Inventory Re-balancer**, **Supplier Liaison** bid mitigation plans → highest score executes.  
Outcome → Double-digit reduction in lost-sales days.  
*Guardrails:* `policy_checked` cost ceiling; `human_approval` for contracts > $100 k.  
*KPIs:* Stock-out days, logistics cost, service level.

---

## Glossary – Quick Reference

| Term | Synonyms / Notes |
|------|------------------|
| **ReAct** | Reason-and-Act, CoT+Act |
| **Tool-Use** | Function-calling, API-routing |
| **Planner** | Decomposer, strategic agent |
| **Manager-Workers** | Orchestrator-Worker, commander pattern |
| **Blackboard** | Shared-memory, pub-sub board |
| **Market-Based** | Auction, bidding, contract-net |
| **Self-Reflection** | Critique, verify-then-fix |
| **HITL** | Human-in-the-loop, manual gate |
| **Guardrail** | Policy engine, validator |

---

### End-Notes / Further Reading (optional links)
* Tool-Use schema evolution – Martin Fowler (2023)  
* ReAct pattern – Yao et al., *ICLR 2023*  
* Plan-and-Execute design – LangChain blog series (2024)  
* Blackboard architectures – Hayes-Roth et al., *Communications of the ACM* (1986)  
* Auction-based multi-agent systems – Sandholm, *AI Magazine* (1999)  

---

**Document version:** 2025-06-25 • Maintainer: *Chris / Agentic-AI Blueprint Team*  
Feel free to extend with new examples—keep headings consistent so chunking remains stable.
