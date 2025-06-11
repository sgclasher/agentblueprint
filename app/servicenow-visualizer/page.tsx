'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useAgenticStore from '../store/useAgenticStore';
import useAuthStore from '../store/useAuthStore';
import FlowVisualizer, { FlowVisualizerHandles } from '../components/FlowVisualizer';
import GlobalHeader from '../components/GlobalHeader';
import { ReactFlowProvider } from 'reactflow';
import { Info, Settings } from 'lucide-react';
import styles from './ServiceNowVisualizer.module.css';

export default function ServiceNowVisualizerPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const session = useAuthStore((state) => state.session);
  
  const agenticData = useAgenticStore((state) => state.agenticData);
  const clearAgenticData = useAgenticStore((state) => state.clearAgenticData);
  const refreshData = useAgenticStore((state) => state.refreshData);

  const [pageStatus, setPageStatus] = useState<'loading' | 'ready'>('loading');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [hasServiceNowCredentials, setHasServiceNowCredentials] = useState<boolean>(false);
  const [autoFit, setAutoFit] = useState<boolean>(false);
  const [layout, setLayout] = useState<'LR' | 'TB'>('LR');

  const flowVisualizerRef = useRef<FlowVisualizerHandles>(null);
  const hasInitialized = useRef(false);

  const connectAndFetchData = useCallback(async () => {
    if (!isAuthenticated || !session?.access_token) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const response = await fetch('/api/servicenow/get-credentials', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });
      const credentialsData = await response.json();

      const hasCreds = credentialsData.hasCredentials && !!credentialsData.instanceUrl && !!credentialsData.username;
      setHasServiceNowCredentials(hasCreds);

      if (hasCreds) {
        const setConnectionDetails = useAgenticStore.getState().setConnectionDetails;
        setConnectionDetails({
          instanceUrl: credentialsData.instanceUrl,
          scopeId: credentialsData.scopeId || ''
        });
        await refreshData(session.access_token);
      } else {
        clearAgenticData();
      }
    } catch (err: any) {
      console.error("Error connecting or fetching data:", err);
      setError(err.message || "Failed to connect to ServiceNow");
    } finally {
      setIsConnecting(false);
    }
  }, [isAuthenticated, session, refreshData, clearAgenticData]);
  
  useEffect(() => {
    const initialize = async () => {
      if (!isAuthenticated || hasInitialized.current) {
        return;
      }
      hasInitialized.current = true;

      if (agenticData) {
        setPageStatus('ready');
        return;
      }

      try {
        const response = await fetch('/api/servicenow/get-credentials', {
          headers: { 'Authorization': `Bearer ${session?.access_token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to check credentials');
        }

        const credentialsData = await response.json();
        const hasCreds = credentialsData.hasCredentials && !!credentialsData.instanceUrl && !!credentialsData.username;
        setHasServiceNowCredentials(hasCreds);

        if (hasCreds) {
          await connectAndFetchData();
        }
      } catch (err: any) {
        console.error("Initialization error:", err);
        setError(err.message || "Failed to initialize visualizer");
      } finally {
        setPageStatus('ready');
      }
    };

    initialize();
  }, [isAuthenticated, session, agenticData, connectAndFetchData]);

  // Redirect if not authenticated
  useEffect(() => {
    if (pageStatus === 'ready' && !isAuthenticated) {
      router.push(`/auth/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [pageStatus, isAuthenticated, router]);

  const handleError = (error: Error) => {
    console.error("Error in flow visualization:", error);
    setError(error.message || "An error occurred displaying the flow diagram");
  };

  const handleConnect = async () => {
    await connectAndFetchData();
  };

  const handleExpandAll = () => {
    flowVisualizerRef.current?.expandAllNodes();
  };

  const handleCollapseAll = () => {
    flowVisualizerRef.current?.collapseAllNodes();
  };

  const handleResetFlow = () => {
    flowVisualizerRef.current?.resetView();
  };

  const handleLayoutChange = (direction: 'LR' | 'TB') => {
    setLayout(direction);
    flowVisualizerRef.current?.setLayoutDirection(direction);
  };

  const handleToggleAutoFit = () => {
    setAutoFit(current => {
      const newState = !current;
      flowVisualizerRef.current?.setAutoFitEnabled(newState);
      return newState;
    });
  };

  const handleConfigureCredentials = () => {
    router.push('/admin');
  };

  if (pageStatus === 'loading') {
    return (
      <div className={styles.container}>
        <GlobalHeader />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Initializing Visualizer...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <main className={`${styles.main} ${agenticData ? styles.isVisualizing : ''}`}>
        {/* Flow Controls (shown when data is loaded) */}
        {agenticData && (
          <div className={styles.flowControls}>
            <div className={styles.controlsContainer}>
              <div className={styles.titleContainer}>
                <h2>ServiceNow Agentic AI Flow</h2>
                <p>Interactive visualization of AI agents, use cases, and tools</p>
              </div>

              <div className={styles.actionsContainer}>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.controlButton} ${layout === 'LR' ? styles.active : ''}`}
                    onClick={() => handleLayoutChange('LR')}
                  >
                    Horizontal Layout
                  </button>
                  <button
                    className={`${styles.controlButton} ${layout === 'TB' ? styles.active : ''}`}
                    onClick={() => handleLayoutChange('TB')}
                  >
                    Vertical Layout
                  </button>
                </div>
                <div className={styles.buttonGroup}>
                  <button className="btn btn-secondary" onClick={handleCollapseAll}>
                    Collapse All
                  </button>
                  <button className="btn btn-secondary" onClick={handleExpandAll}>
                    Expand All
                  </button>
                </div>
                <div className={styles.buttonGroup}>
                  <button className={`btn btn-secondary ${styles.controlButton}`} onClick={handleToggleAutoFit}>
                    Auto-Fit: {autoFit ? 'ON' : 'OFF'}
                  </button>
                  <button onClick={handleResetFlow} className="btn btn-danger">
                    Reset Flow
                  </button>
                </div>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="btn btn-primary"
                >
                  {isConnecting ? 'Refreshing...' : 'Refresh'}
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

        {/* Main Content */}
        <div className={styles.contentContainer}>
          {!agenticData ? (
            // Show connection status and setup
            <div className={styles.setupContainer}>
              {!hasServiceNowCredentials ? (
                // No credentials configured
                <div className={styles.noCredentialsCard}>
                  <div className={styles.statusIcon}>
                    <Settings size={48} />
                  </div>
                  <h3>ServiceNow Configuration Required</h3>
                  <p>
                    To visualize ServiceNow Agentic AI flows, you need to configure your 
                    ServiceNow instance credentials in the admin panel.
                  </p>
                  <button 
                    onClick={handleConfigureCredentials}
                    className="btn btn-primary"
                  >
                    <Settings size={18} />
                    Configure ServiceNow Credentials
                  </button>
                </div>
              ) : (
                // Credentials exist, show connection interface
                <div className={styles.connectorContainer}>
                  <div className={styles.connectorCard}>
                    <div className={styles.connectorHeader}>
                      <div className={styles.connectorIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white" fill="none" strokeWidth="1"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12" stroke="white" strokeWidth="1"></line>
                        </svg>
                      </div>
                      <h3>Connect to ServiceNow</h3>
                      <p>Your ServiceNow credentials are configured. Connect to start visualizing.</p>
                    </div>
                    
                    <button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="btn btn-primary"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect & Visualize'}
                    </button>
                    
                    <button 
                      onClick={handleConfigureCredentials}
                      className="btn btn-secondary"
                    >
                      <Settings size={18} />
                      Manage Credentials
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : error ? (
            // Error state
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
            // Flow visualization
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