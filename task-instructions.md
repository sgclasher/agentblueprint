# Current Task

### Plan to Restore Diagram Controls

I will restore the diagram controls for the React Flow component in the `servicenow-visualizer`. Here is a breakdown of the steps I will take:

*   **Step 1: Investigate Core Logic**
    *   I will first examine `app/hooks/useFlowLayout.ts` to understand how the layout direction is managed.
    *   Then, I will look into `app/components/flow/FlowCanvas.tsx` to see how view options like `fitView` are configured.

*   **Step 2: Enhance `useFlowLayout` Hook**
    *   In `app/hooks/useFlowLayout.ts`, I will expose a function to allow changing the layout direction dynamically.

*   **Step 3: Update `FlowVisualizer` Component**
    *   I will modify `app/components/FlowVisualizer.tsx` to pass down the necessary props for controlling the layout and auto-fit behavior from its parent.

*   **Step 4: Implement UI Controls in `ServiceNowVisualizerPage`**
    *   I will edit `app/servicenow-visualizer/page.tsx` to:
        *   Add component state for `layoutDirection` and `autoFit`.
        *   Introduce new UI buttons for "Horizontal Layout", "Vertical Layout", "Auto-Fit", and "Reset Flow".
        *   Wire up the event handlers for these new controls.

*   **Step 5: Update `FlowCanvas`**
    *   I will adjust `app/components/flow/FlowCanvas.tsx` to use the `fitView` prop based on the `autoFit` state.

*   **Step 6: Apply Styles**
    *   I will add new styles to `app/servicenow-visualizer/ServiceNowVisualizer.module.css` to match the appearance of the controls in the screenshot you provided.

*   **Step 7: Testing**
    *   As per your instructions, I will also add tests to ensure the new controls behave as expected.
