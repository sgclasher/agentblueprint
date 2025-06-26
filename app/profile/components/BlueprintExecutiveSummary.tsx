'use client';

import React from 'react';
import { ROIProjection } from '../../services/types';
import { TrendingUp, DollarSign, Clock, Target, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import styles from './BlueprintExecutiveSummary.module.css';

interface BlueprintExecutiveSummaryProps {
  roiProjection: ROIProjection;
  businessObjective?: string;
  companyName?: string;
}

export default function BlueprintExecutiveSummary({ 
  roiProjection, 
  businessObjective,
  companyName 
}: BlueprintExecutiveSummaryProps) {
  
  // Format currency values for display
  const formatCurrency = (value: string): string => {
    // Extract numeric value and unit (K, M, etc.) - updated regex to include decimals
    const match = value.match(/\$?([\d,.]+)(K|M)?/);
    if (!match) return value;
    
    const [, number, unit] = match;
    const numericValue = parseFloat(number.replace(/,/g, ''));
    
    if (unit === 'K') {
      return `$${numericValue.toLocaleString()}K`;
    } else if (unit === 'M') {
      return `$${numericValue.toLocaleString()}M`;
    }
    return `$${numericValue.toLocaleString()}`;
  };
  
  // Determine color scheme based on confidence level
  const getConfidenceColor = (level: string): string => {
    switch (level) {
      case 'High':
        return 'var(--color-success)';
      case 'Medium':
        return 'var(--color-warning)';
      case 'Low':
        return 'var(--color-danger)';
      default:
        return 'var(--text-secondary)';
    }
  };
  
  // Calculate monthly value for visual display
  const getMonthlyValue = (): string => {
    const annualMatch = roiProjection.annualValue.match(/\$?([\d,.]+)(K|M)?/);
    if (!annualMatch) return '$0';
    
    const [, number, unit] = annualMatch;
    const annualNumeric = parseFloat(number.replace(/,/g, ''));
    const monthlyNumeric = Math.round(annualNumeric / 12);
    
    if (unit === 'K') {
      return `$${monthlyNumeric}K`;
    } else if (unit === 'M') {
      return `$${(monthlyNumeric / 1000).toFixed(1)}M`;
    }
    return `$${monthlyNumeric.toLocaleString()}`;
  };

  return (
    <div className={styles.executiveSummary}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <TrendingUp size={24} />
          Executive ROI Summary
        </h2>
        {businessObjective && (
          <p className={styles.objective}>
            <Target size={16} />
            {businessObjective}
          </p>
        )}
      </div>

      {/* Key Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <TrendingUp size={24} color="rgb(59, 130, 246)" />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>ROI</span>
            <span className={styles.metricValue}>{roiProjection.roiPercentage}%</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <Clock size={24} color="rgb(16, 185, 129)" />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Payback Period</span>
            <span className={styles.metricValue}>{roiProjection.paybackMonths} months</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
            <DollarSign size={24} color="rgb(99, 102, 241)" />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Annual Value</span>
            <span className={styles.metricValue}>{formatCurrency(roiProjection.annualValue)}</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: 'rgba(251, 146, 60, 0.1)' }}>
            <Target size={24} color="rgb(251, 146, 60)" />
          </div>
          <div className={styles.metricContent}>
            <span className={styles.metricLabel}>Investment</span>
            <span className={styles.metricValue}>{formatCurrency(roiProjection.totalInvestment)}</span>
          </div>
        </div>
      </div>

      {/* Executive Summary Text */}
      <div className={styles.summarySection}>
        <h3 className={styles.sectionTitle}>Executive Summary</h3>
        <p className={styles.summaryText}>{roiProjection.executiveSummary}</p>
        <div className={styles.recommendedAction}>
          <CheckCircle size={20} />
          <span>Recommended Action: {roiProjection.recommendedAction}</span>
        </div>
      </div>

      {/* Value Breakdown */}
      <div className={styles.valueBreakdown}>
        <h3 className={styles.sectionTitle}>Value Creation Breakdown</h3>
        <div className={styles.valueItems}>
          <div className={styles.valueItem}>
            <div className={styles.valueBar} style={{ width: '45%', backgroundColor: 'rgb(59, 130, 246)' }} />
            <div className={styles.valueDetails}>
              <span className={styles.valueLabel}>Process Cost Savings</span>
              <span className={styles.valueAmount}>{formatCurrency(roiProjection.processCostSavings)}</span>
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueBar} style={{ width: '40%', backgroundColor: 'rgb(16, 185, 129)' }} />
            <div className={styles.valueDetails}>
              <span className={styles.valueLabel}>Labor Reallocation</span>
              <span className={styles.valueAmount}>{formatCurrency(roiProjection.laborReallocation)}</span>
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueBar} style={{ width: '15%', backgroundColor: 'rgb(99, 102, 241)' }} />
            <div className={styles.valueDetails}>
              <span className={styles.valueLabel}>Risk Avoidance</span>
              <span className={styles.valueAmount}>{formatCurrency(roiProjection.riskAvoidance)}</span>
            </div>
          </div>
          {roiProjection.revenueEnablement && (
            <div className={styles.valueItem}>
              <div className={styles.valueBar} style={{ width: '20%', backgroundColor: 'rgb(251, 146, 60)' }} />
              <div className={styles.valueDetails}>
                <span className={styles.valueLabel}>Revenue Enablement</span>
                <span className={styles.valueAmount}>{formatCurrency(roiProjection.revenueEnablement)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment & Timeline */}
      <div className={styles.investmentSection}>
        <h3 className={styles.sectionTitle}>Investment & Timeline</h3>
        <div className={styles.investmentGrid}>
          <div className={styles.investmentItem}>
            <span className={styles.investmentLabel}>Initial Investment</span>
            <span className={styles.investmentValue}>{formatCurrency(roiProjection.totalInvestment)}</span>
          </div>
          <div className={styles.investmentItem}>
            <span className={styles.investmentLabel}>Ongoing Costs</span>
            <span className={styles.investmentValue}>{formatCurrency(roiProjection.ongoingCosts)}/year</span>
          </div>
          <div className={styles.investmentItem}>
            <span className={styles.investmentLabel}>Break-even</span>
            <span className={styles.investmentValue}>Month {roiProjection.paybackMonths}</span>
          </div>
          <div className={styles.investmentItem}>
            <span className={styles.investmentLabel}>3-Year Value</span>
            <span className={styles.investmentValue}>
              {roiProjection.threeYearValue || (() => {
                const match = roiProjection.annualValue.match(/\$?([\d,.]+)(K|M)?/);
                if (!match) return '~$0K';
                const [, number, unit] = match;
                const annualNumeric = parseFloat(number.replace(/,/g, ''));
                const threeYearValue = annualNumeric * 3;
                return `~${formatCurrency(`$${threeYearValue}${unit || 'K'}`)}`;
              })()}
            </span>
          </div>
        </div>
      </div>

      {/* Confidence & Assumptions */}
      <div className={styles.confidenceSection}>
        <div className={styles.confidenceHeader}>
          <h3 className={styles.sectionTitle}>Confidence Assessment</h3>
          <div 
            className={styles.confidenceBadge} 
            style={{ backgroundColor: getConfidenceColor(roiProjection.confidenceLevel) }}
          >
            {roiProjection.confidenceLevel === 'High' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {roiProjection.confidenceLevel} Confidence
          </div>
        </div>
        
        <div className={styles.assumptionsGrid}>
          <div className={styles.assumptionsColumn}>
            <h4 className={styles.columnTitle}>Key Assumptions</h4>
            <ul className={styles.assumptionsList}>
              {roiProjection.keyAssumptions.map((assumption, index) => (
                <li key={index} className={styles.assumptionItem}>
                  <Shield size={14} />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.assumptionsColumn}>
            <h4 className={styles.columnTitle}>Confidence Factors</h4>
            <ul className={styles.assumptionsList}>
              {roiProjection.confidenceFactors.map((factor, index) => (
                <li key={index} className={styles.assumptionItem}>
                  <CheckCircle size={14} />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {roiProjection.riskFactors && roiProjection.riskFactors.length > 0 && (
          <div className={styles.riskFactors}>
            <h4 className={styles.columnTitle}>Risk Factors</h4>
            <ul className={styles.riskList}>
              {roiProjection.riskFactors.map((risk, index) => (
                <li key={index} className={styles.riskItem}>
                  <AlertTriangle size={14} />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ROI Visualization */}
      <div className={styles.roiVisualization}>
        <h3 className={styles.sectionTitle}>ROI Timeline</h3>
        <div className={styles.timeline}>
          <div className={styles.timelineBar}>
            <div 
              className={styles.breakEvenPoint} 
              style={{ left: `${(roiProjection.paybackMonths / 36) * 100}%` }}
            >
              <div className={styles.breakEvenMarker} />
              <span className={styles.breakEvenLabel}>Break-even</span>
            </div>
          </div>
          <div className={styles.timelineLabels}>
            <span>Month 0</span>
            <span>Month 12</span>
            <span>Month 24</span>
            <span>Month 36</span>
          </div>
          <div className={styles.timelineValues}>
            <span>-{formatCurrency(roiProjection.totalInvestment)}</span>
            <span>{getMonthlyValue()} × 12</span>
            <span>{formatCurrency(roiProjection.annualValue)} × 2</span>
            <span>{roiProjection.threeYearValue || (() => {
              const match = roiProjection.annualValue.match(/\$?([\d,.]+)(K|M)?/);
              if (!match) return '~$0K';
              const [, number, unit] = match;
              const annualNumeric = parseFloat(number.replace(/,/g, ''));
              const threeYearValue = annualNumeric * 3;
              return `~${formatCurrency(`$${threeYearValue}${unit || 'K'}`)}`;
            })()}</span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className={styles.footerNote}>
        <p>
          * ROI projections are based on industry benchmarks and process metrics provided. 
          Actual results may vary based on implementation quality and organizational factors.
          {roiProjection.contingencyPercentage && 
            ` A ${roiProjection.contingencyPercentage}% contingency has been applied to account for implementation risks.`
          }
        </p>
      </div>
    </div>
  );
} 