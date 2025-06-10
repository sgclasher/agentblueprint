'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Based on the structure observed in transformAgenticData.js and other parts of the app
interface Tool {
  sys_id: string;
  name: string;
  description: string;
  type: string;
  [key: string]: any;
}

interface Agent {
  sys_id: string;
  name: string;
  description: string;
  role: string;
  instructions: string;
  tools: Tool[];
  [key: string]: any;
}

interface Trigger {
  sys_id: string;
  name: string;
  objective_template: string;
  target_table: string;
  condition: string;
  [key: string]: any;
}

export interface UseCase {
  sys_id: string;
  name: string;
  description: string;
  agents: Agent[];
  triggers: Trigger[];
  [key: string]: any;
}

export interface AgenticData {
  use_cases: UseCase[];
  [key: string]: any;
}

interface ConnectionDetails {
  instanceUrl: string;
  scopeId: string;
}

interface AgenticStoreState {
  agenticData: AgenticData | null;
  connectionDetails: ConnectionDetails | null;
  serviceNowUrl: string;
  isLoading: boolean;
  error: string | null;
  layoutDirection: 'LR' | 'TB';
}

interface AgenticStoreActions {
  setAgenticData: (data: AgenticData | null) => void;
  setConnectionDetails: (details: ConnectionDetails) => void;
  clearAgenticData: () => void;
  resetData: () => void;
  refreshData: (accessToken?: string) => Promise<AgenticData | undefined>;
  setLayoutDirection: (direction: 'LR' | 'TB') => void;
}

type AgenticStore = AgenticStoreState & AgenticStoreActions;

const useAgenticStore = create<AgenticStore>()(
  persist(
    (set, get) => ({
      agenticData: null,
      connectionDetails: null,
      serviceNowUrl: '',
      isLoading: false,
      error: null,
      layoutDirection: 'LR',

      setAgenticData: (data) => set({ agenticData: data }),

      setConnectionDetails: (details) => {
        const { instanceUrl } = details;
        set({
          connectionDetails: details,
          serviceNowUrl: instanceUrl,
        });
      },

      clearAgenticData: () =>
        set({
          agenticData: null,
          connectionDetails: null,
          serviceNowUrl: '',
          error: null,
        }),

      resetData: () =>
        set({
          agenticData: null,
          error: null,
        }),

      refreshData: async (accessToken?: string) => {
        const { connectionDetails } = get();

        if (!connectionDetails) {
          throw new Error('No connection details available for refresh');
        }

        set({ isLoading: true, error: null });

        try {
          const { instanceUrl, scopeId } = connectionDetails;

          set({ serviceNowUrl: instanceUrl });

          const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
          };

          // Add authentication header if access token is provided
          if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
          }

          const response = await fetch('/api/servicenow/fetch-agentic-data', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              instanceUrl,
              scopeId,
            }),
          });

          if (!response.ok) {
            let errorMessage = 'Failed to refresh data from ServiceNow';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
            } catch (e) {
              errorMessage = `${errorMessage}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
          }

          const data: AgenticData = await response.json();
          console.log('Data refreshed successfully:', data);

          set({ agenticData: data, isLoading: false });
          return data;
        } catch (err: any) {
          console.error('Error refreshing ServiceNow data:', err);
          set({
            error: err.message || 'An unknown error occurred while refreshing data',
            isLoading: false,
          });
          throw err;
        }
      },

      setLayoutDirection: (direction) => set({ layoutDirection: direction }),
    }),
    {
      name: 'agentic-flow-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        layoutDirection: state.layoutDirection,
        serviceNowUrl: state.serviceNowUrl,
        connectionDetails: state.connectionDetails,
      }),
    }
  )
);

export default useAgenticStore; 