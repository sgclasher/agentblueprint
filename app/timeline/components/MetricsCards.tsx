'use client';

import React from 'react';
import { CircleDollarSign, LineChart, Clock, AlertTriangle } from 'lucide-react';

interface Metric {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

interface MetricsCardsProps {
    summary: {
        totalInvestment: string;
        expectedROI: string;
        timeToValue: string;
        riskLevel: string;
    };
}

export default function MetricsCards({ summary }: MetricsCardsProps) {
  const metrics: Metric[] = [
    {
      label: 'Total Investment',
      value: summary.totalInvestment,
      icon: <CircleDollarSign size={24} />,
      color: '#3498db',
    },
    {
      label: 'Expected ROI',
      value: summary.expectedROI,
      icon: <LineChart size={24} />,
      color: '#10b981',
    },
    {
      label: 'Time to Value',
      value: summary.timeToValue,
      icon: <Clock size={24} />,
      color: '#f39c12',
    },
    {
      label: 'Risk Level',
      value: summary.riskLevel,
      icon: <AlertTriangle size={24} />,
      color: '#ef4444',
    },
  ];
  
  return (
    <div className="metrics-cards">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="metric-card"
          style={{ '--metric-color': metric.color } as any}
        >
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-content">
            <h4>{metric.label}</h4>
            <p className="metric-value">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 