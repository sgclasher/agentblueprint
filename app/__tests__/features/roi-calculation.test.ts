import { ROICalculationService } from '../../services/roiCalculationService';
import { StrategicInitiative, ROIProjection } from '../../services/types';

describe('ROICalculationService', () => {
  describe('calculateROIFromProcessMetrics', () => {
    it('should calculate high ROI for processes with high cost and long cycle time', () => {
      const processMetrics: StrategicInitiative['processMetrics'] = {
        currentCycleTime: '5 days',
        currentVolume: '1000 requests per month',
        currentErrorRate: '15%',
        currentCost: 'high',
        laborIntensity: 'high',
        processComplexity: 'complex'
      };

      const investmentContext: StrategicInitiative['investmentContext'] = {
        budgetRange: '$100K-500K',
        timeframePreference: '1 year',
        implementationReadiness: 'high',
        riskTolerance: 'moderate',
        successDefinition: 'efficiency gains',
        stakeholderBuyIn: 'high'
      };

      const result = ROICalculationService.calculateROIFromProcessMetrics(
        processMetrics,
        investmentContext,
        'Finance'
      );

      expect(result.roiPercentage).toBeGreaterThan(150);
      expect(result.paybackMonths).toBeLessThan(18);
      expect(result.confidenceLevel).toBe('High');
      expect(result.processCostSavings).toContain('$');
      expect(result.laborReallocation).toContain('$');
    });

    it('should calculate moderate ROI for processes with medium metrics', () => {
      const processMetrics: StrategicInitiative['processMetrics'] = {
        currentCycleTime: '2 hours',
        currentVolume: '50 requests per week',
        currentErrorRate: '5%',
        currentCost: 'medium',
        laborIntensity: 'medium',
        processComplexity: 'moderate'
      };

      const investmentContext: StrategicInitiative['investmentContext'] = {
        budgetRange: 'under $100K',
        timeframePreference: '6 months',
        implementationReadiness: 'medium',
        riskTolerance: 'conservative',
        successDefinition: 'cost reduction',
        stakeholderBuyIn: 'medium'
      };

      const result = ROICalculationService.calculateROIFromProcessMetrics(
        processMetrics,
        investmentContext,
        'Healthcare'
      );

      expect(result.roiPercentage).toBeGreaterThan(50);
      expect(result.roiPercentage).toBeLessThan(150);
      expect(result.paybackMonths).toBeGreaterThan(12);
      expect(result.confidenceLevel).toBe('Medium');
    });

    it('should include risk adjustments based on implementation readiness', () => {
      const processMetrics: StrategicInitiative['processMetrics'] = {
        currentCost: 'high',
        laborIntensity: 'high'
      };

      const lowReadinessContext: StrategicInitiative['investmentContext'] = {
        budgetRange: '$100K-500K',
        implementationReadiness: 'low',
        riskTolerance: 'conservative'
      };

      const result = ROICalculationService.calculateROIFromProcessMetrics(
        processMetrics,
        lowReadinessContext,
        'Manufacturing'
      );

      expect(result.riskFactors).toContain('Low organizational readiness');
      expect(result.contingencyPercentage).toBeGreaterThan(20);
      expect(result.confidenceLevel).toBe('Low');
    });
  });

  describe('getIndustryBenchmarks', () => {
    it('should return appropriate benchmarks for Technology industry', () => {
      const benchmarks = ROICalculationService.getIndustryBenchmarks('Technology');
      
      expect(benchmarks.typicalROI).toBeGreaterThan(150);
      expect(benchmarks.avgPaybackMonths).toBeLessThan(12);
      expect(benchmarks.adoptionRate).toBeGreaterThan(0.7);
    });

    it('should return conservative benchmarks for regulated industries', () => {
      const healthcareBenchmarks = ROICalculationService.getIndustryBenchmarks('Healthcare');
      const financeBenchmarks = ROICalculationService.getIndustryBenchmarks('Finance');
      
      expect(healthcareBenchmarks.typicalROI).toBeLessThan(200);
      expect(financeBenchmarks.avgPaybackMonths).toBeGreaterThan(12);
    });
  });

  describe('calculateInvestmentCost', () => {
    it('should estimate investment based on budget range and complexity', () => {
      const cost = ROICalculationService.calculateInvestmentCost(
        '$100K-500K',
        'complex',
        'high'
      );
      
      expect(cost).toContain('$');
      expect(parseInt(cost.replace(/\D/g, ''))).toBeGreaterThan(200000);
    });

    it('should scale investment with process complexity', () => {
      const simpleCost = ROICalculationService.calculateInvestmentCost(
        '$100K-500K',
        'simple',
        'medium'
      );
      
      const complexCost = ROICalculationService.calculateInvestmentCost(
        '$100K-500K',
        'complex',
        'medium'
      );
      
      const simpleAmount = parseInt(simpleCost.replace(/\D/g, ''));
      const complexAmount = parseInt(complexCost.replace(/\D/g, ''));
      
      expect(complexAmount).toBeGreaterThan(simpleAmount);
    });
  });

  describe('generateExecutiveSummary', () => {
    it('should generate compelling executive summary with key metrics', () => {
      const roiData = {
        roiPercentage: 229,
        paybackMonths: 11,
        annualValue: '$920K',
        totalInvestment: '$280K',
        businessObjective: 'Reduce invoice processing time by 40%'
      };

      const summary = ROICalculationService.generateExecutiveSummary(roiData);
      
      expect(summary).toContain('229%');
      expect(summary).toContain('11 months');
      expect(summary).toContain('$920K');
      expect(summary).toContain('invoice processing');
    });
  });

  describe('validateROIProjection', () => {
    it('should validate realistic ROI projections', () => {
      const realisticProjection = {
        roiPercentage: 180,
        paybackMonths: 14
      };

      const validation = ROICalculationService.validateROIProjection(
        realisticProjection,
        'Technology'
      );

      expect(validation.isValid).toBe(true);
      expect(validation.warnings).toHaveLength(0);
    });

    it('should flag unrealistic ROI projections', () => {
      const unrealisticProjection = {
        roiPercentage: 800,
        paybackMonths: 3
      };

      const validation = ROICalculationService.validateROIProjection(
        unrealisticProjection,
        'Healthcare'
      );

      expect(validation.isValid).toBe(false);
      expect(validation.warnings).toContain('ROI percentage exceeds industry benchmarks');
      expect(validation.warnings).toContain('Payback period is unrealistically short');
    });
  });

  describe('integrateWithStrategicInitiatives', () => {
    it('should aggregate ROI across multiple initiatives', () => {
      const initiatives: StrategicInitiative[] = [
        {
          initiative: 'Digital Transformation',
          businessProblems: ['Manual processes', 'Data silos'],
          contact: { name: '', title: '', email: '', linkedin: '', phone: '' },
          processMetrics: {
            currentCost: 'high',
            laborIntensity: 'high'
          },
          investmentContext: {
            budgetRange: '$100K-500K'
          }
        },
        {
          initiative: 'Customer Experience',
          businessProblems: ['Long wait times'],
          contact: { name: '', title: '', email: '', linkedin: '', phone: '' },
          processMetrics: {
            currentCost: 'medium',
            laborIntensity: 'medium'
          },
          investmentContext: {
            budgetRange: 'under $100K'
          }
        }
      ];

      const aggregatedROI = ROICalculationService.aggregateInitiativesROI(
        initiatives,
        'Technology'
      );

      expect(aggregatedROI.totalInvestment).toContain('$');
      expect(aggregatedROI.totalAnnualValue).toContain('$');
      expect(aggregatedROI.portfolioROI).toBeGreaterThan(100);
      expect(aggregatedROI.initiativeBreakdown).toHaveLength(2);
    });
  });
}); 