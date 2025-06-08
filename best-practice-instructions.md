# Best Practice & Extensibility Improvement Plan

This plan outlines key areas for improving the codebase of the agentic-ai-flow application. The focus is on increasing type safety, standardizing development practices, and improving component architecture for better long-term maintainability and extensibility.

---

### **Phase 1: Foundational Improvements (Completed)**

*   **[x] Introduce TypeScript (`.ts`/`.tsx`)**:
    *   Renamed critical files (`FlowCanvas.js`, `generate/route.js`, `validation.js`) to use TypeScript extensions.
    *   Added explicit types for props, state, and function signatures in the converted files.
*   **[x] Enable Strict TypeScript Mode**:
    *   Set `"strict": true` in `tsconfig.json` to enforce higher code quality standards.

---

### **Phase 2: Code & Project Standardization (Completed)**

*   **[x] Standardize Styling:**
    *   **Problem:** The project used a mix of global CSS (`globals.css`, `timeline.css`) and CSS Modules (`*.module.css`). This can lead to style conflicts and makes code harder to reason about.
    *   **Solution:** Adopt CSS Modules as the primary styling method for component-scoped styles. Refactor styles from global files into their respective component modules where applicable. Reserve `globals.css` only for true global styles like fonts, root variables, and base element styling.
    *   **Status:**
        *   **[x]** Migrated `BusinessProfileModal` styles from `timeline.css` to a dedicated CSS module.
        *   **[x]** Migrated `TimelineSidebar` styles from `timeline.css` to a dedicated CSS module.
        *   **[x]** Migrated `MetricsWidget` styles from `timeline.css` to a dedicated CSS module.
        *   **[x]** Migrated `TimelineContent` styles from `timeline.css` to a dedicated CSS module.
        *   **[x]** **Post-refactor fix:** Restored the main timeline page layout by creating a dedicated CSS module for it, fixing a styling regression.

*   **[x] Component Architecture:**
    *   **Problem:** Some components are doing too much. For example, `FlowCanvas.tsx` includes the logic for rendering a details panel.
    *   **Solution:** Break down large components into smaller, single-purpose components.
    *   **Status:**
        *   **[x]** Extracted the details panel from `FlowCanvas.tsx` into a new `SelectedNodePanel.tsx` component.

---

### **Phase 3: Production Readiness & Scalability (Completed)**

*   **[x] Robust Rate Limiting:**
    *   **Problem:** The current rate limiting is in-memory, which is not suitable for a serverless deployment model where each request can be handled by a different instance.
    *   **Solution:** Implement a centralized rate-limiting strategy using a persistent store like Redis or a database (e.g., a simple table in Supabase).
    *   **Status:**
        *   **[x]** Created a database schema for rate limiting.
        *   **[x]** Updated the `checkRateLimit` function to use the database.
        *   **[x]** The rate-limiting is now backed by the Supabase database.

*   **[x] Review Unstable Dependencies:**
    *   **Problem:** The project uses canary/unstable versions of Next.js (`^15.2.4`) and React (`^19.1.0`).
    *   **Solution:** For a production environment, consider pinning to the latest stable versions of these packages to ensure stability and avoid breaking changes.
    *   **Status:**
        *   **[x]** Downgraded Next.js to the latest stable version.
        *   **[x]** Downgraded React to the latest stable LTS version.

*   **[x] Address Security Vulnerabilities:**
    *   **Problem:** The `/api/timeline/generate` route is unauthenticated, posing a significant security risk.
    *   **Solution:** Implement proper authentication and authorization for all API routes. This should involve verifying user sessions and ensuring users can only access their own data.
    *   **Status:**
        *   **[x]** Implemented session-based authentication for the `/api/timeline/generate` route using Supabase.
        *   **[x]** Removed the hardcoded user ID and security warnings.
