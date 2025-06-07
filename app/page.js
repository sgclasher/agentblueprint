'use client';

import React, { useState, useRef } from 'react';
import useAgenticStore from './store/useAgenticStore';
import ServiceNowConnector from './components/ServiceNowConnector';
import FlowVisualizer from './components/FlowVisualizer';
import GlobalHeader from './components/GlobalHeader';
import { ReactFlowProvider } from 'reactflow';
import { Info } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const agenticData = useAgenticStore((state) => state.agenticData);
  const clearAgenticData = useAgenticStore((state) => state.clearAgenticData);
  const refreshData = useAgenticStore((state) => state.refreshData);
  const resetData = useAgenticStore((state) => state.resetData);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  // Refs for flow control methods
  const flowVisualizerRef = useRef({
    expandAllNodes: () => {},
    collapseAllNodes: () => {},
  });

  // Simple error boundary implementation
  const handleError = (error) => {
    console.error("Error in flow visualization:", error);
    setError(error.message || "An error occurred displaying the flow diagram");
  };

  // Handle refresh button click
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshData();
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError(err.message || "Failed to refresh data from ServiceNow");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Flow control handlers
  const handleExpandAll = () => {
    flowVisualizerRef.current.expandAllNodes();
  };
  
  const handleCollapseAll = () => {
    flowVisualizerRef.current.collapseAllNodes();
  };
  
  const handleResetFlow = () => {
    resetData();
  };

  return (
    <div className={styles.container}>
      <GlobalHeader />
      <main className={styles.main}>
        {agenticData && (
          <div className={styles.flowControls}>
            <div className={styles.controlsContainer}>
              <div className={styles.titleContainer}>
                <h2>ServiceNow Agentic AI Flow</h2>
                <p>Interactive visualization of AI agents, use cases, and tools</p>
              </div>
              
              <div className={styles.actionsContainer}>
                <div className={styles.buttonGroup}>
                  <button className="btn btn-secondary" onClick={handleCollapseAll}>
                    Collapse All
                  </button>
                  <button className="btn btn-secondary" onClick={handleExpandAll}>
                    Expand All
                  </button>
                </div>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="btn btn-primary"
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh'} 
                </button>
                <button 
                  onClick={() => setShowDebug(!showDebug)}
                  className="btn btn-secondary"
                  aria-label="Toggle debug info"
                >
                  <Info size={18} />
                </button>
                <button 
                  onClick={clearAgenticData}
                  className="btn btn-danger"
                >
                  Disconnect
                </button>
              </div>
            </div>
            
            {showDebug && (
              <div className={styles.debugInfo}>
                <details open>
                  <summary>Debug Information</summary>
                  <pre>
                    {JSON.stringify({
                      dataPresent: !!agenticData,
                      useCases: agenticData?.use_cases?.length || 0,
                      firstUseCase: agenticData?.use_cases?.[0]?.name || 'None'
                    }, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      
      <div className={styles.contentContainer}>
        {!agenticData ? (
          <div className={styles.connectorContainer}>
            <ServiceNowConnector />
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <h3>Error Displaying Flow</h3>
            <p>{error}</p>
            <button 
              onClick={clearAgenticData}
              className="btn btn-danger"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className={styles.flowContainer}>
            <ReactFlowProvider>
              <FlowVisualizer 
                onError={handleError} 
                ref={flowVisualizerRef}
              />
            </ReactFlowProvider>
          </div>
        )}
      </div>
      </main>
    </div>
  );
} 