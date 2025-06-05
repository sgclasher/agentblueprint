'use client';

import React, { useState, useRef } from 'react';
import useAgenticStore from './store/useAgenticStore';
import ServiceNowConnector from './components/ServiceNowConnector';
import FlowVisualizer from './components/FlowVisualizer';
import GlobalHeader from './components/GlobalHeader';
import { ReactFlowProvider } from 'reactflow';
import { Users, TrendingUp, Info } from 'lucide-react';

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
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
    }}>
      <GlobalHeader />
      <main style={{ 
        minHeight: 'calc(100vh - 64px)', // Subtract header height
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        {agenticData && (
          <div className="flow-controls" style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderBottom: '1px solid var(--border-primary)',
            padding: 'var(--spacing-md) var(--spacing-lg)'
          }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-lg)'
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>ServiceNow Agentic AI Flow</h2>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>Interactive visualization of AI agents, use cases, and tools</p>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                <div className="button-group">
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
              <div className="debug-info" style={{
                marginTop: 'var(--spacing-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--border-radius)',
                padding: 'var(--spacing-md)'
              }}>
                <details open>
                  <summary>Debug Information</summary>
                  <pre style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    marginTop: 'var(--spacing-sm)'
                  }}>
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
      
      <div style={{ flex: 1, width: '100%' }}>
        {!agenticData ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            padding: 'var(--spacing-lg)' 
          }}>
            <ServiceNowConnector />
          </div>
        ) : error ? (
          <div style={{
            color: 'var(--accent-red)',
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--accent-red)',
            borderRadius: 'var(--border-radius)',
            background: 'var(--bg-secondary)',
            margin: 'var(--spacing-lg)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h3 style={{ fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-sm)' }}>
              Error Displaying Flow
            </h3>
            <p style={{ marginBottom: 'var(--spacing-md)' }}>{error}</p>
            <button 
              onClick={clearAgenticData}
              className="btn btn-danger"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div style={{ height: 'calc(100vh - 120px)', width: '100%', position: 'relative' }}>
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