import React from 'react';
import GlobalHeader from '../components/GlobalHeader';
import { 
  TrendingUp, 
  Workflow, 
  DollarSign, 
  BarChart3, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import styles from './ExecutiveSummary.module.css';

export default function ExecutiveSummaryPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'Company-specific AI opportunities',
      description: 'Tailored AI solutions mapped to your unique business challenges and objectives'
    },
    {
      icon: Workflow,
      title: 'Visual workflow diagrams showing how AI agents will work',
      description: 'Interactive diagrams illustrating AI agent interactions and process automation'
    },
    {
      icon: DollarSign,
      title: 'ROI projections with implementation timeline',
      description: 'Detailed financial analysis with phased implementation roadmaps'
    },
    {
      icon: BarChart3,
      title: 'Industry benchmarks and success patterns',
      description: 'Data-driven insights from successful AI transformations in your sector'
    },
    {
      icon: CheckCircle,
      title: 'Next steps and action items',
      description: 'Clear, prioritized recommendations for immediate implementation'
    }
  ];

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Executive Summary
            </h1>
            <p className={styles.subtitle}>
              Comprehensive AI transformation overview for executive decision-making
            </p>
            
            <div className={styles.comingSoon}>
              <Clock className={styles.clockIcon} />
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>What to Expect</h2>
            <p className={styles.sectionDescription}>
              The Executive Summary will provide a comprehensive, executive-level view of your AI transformation journey, 
              designed specifically for C-suite decision-making and strategic planning.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon />
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
              <p className={styles.ctaDescription}>
                Complete your business profile to unlock personalized AI insights and transformation roadmaps.
              </p>
              <div className={styles.ctaButtons}>
                <a href="/profile" className={styles.primaryButton}>
                  Complete Profile
                </a>
                <a href="/timeline" className={styles.secondaryButton}>
                  Generate Timeline
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 