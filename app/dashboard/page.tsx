'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import { 
  Users, 
  Calendar, 
  Settings, 
  GitBranch, 
  TrendingUp, 
  Activity,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();

  const navigationCards = [
    {
      title: 'Client Profiles',
      description: 'Manage business intelligence profiles and assessments',
      icon: <Users size={24} />,
      path: '/profiles',
      color: 'blue'
    },
    {
      title: 'AI Timeline',
      description: 'Generate AI transformation roadmaps',
      icon: <Calendar size={24} />,
      path: '/timeline',
      color: 'green'
    },
    {
      title: 'ServiceNow Visualizer',
      description: 'Visualize agentic AI workflows and processes',
      icon: <GitBranch size={24} />,
      path: '/servicenow-visualizer',
      color: 'purple'
    },
    {
      title: 'Settings',
      description: 'Manage credentials and platform configurations',
      icon: <Settings size={24} />,
      path: '/admin',
      color: 'orange'
    }
  ];

  const quickStats = [
    { label: 'Active Profiles', value: '12', icon: <Users size={20} />, trend: '+3' },
    { label: 'Generated Timelines', value: '8', icon: <Calendar size={20} />, trend: '+2' },
    { label: 'AI Providers', value: '3', icon: <Activity size={20} />, trend: '100%' },
    { label: 'Recent Activity', value: '5min', icon: <Clock size={20} />, trend: 'ago' }
  ];

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>
              Welcome to Agent Blueprint
            </h1>
            <p className={styles.welcomeSubtitle}>
              Your comprehensive platform for AI transformation planning, client intelligence, 
              and enterprise workflow visualization.
            </p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                {stat.icon}
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statTrend}>{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.navigationSection}>
          <h2 className={styles.sectionTitle}>Platform Features</h2>
          <div className={styles.navigationGrid}>
            {navigationCards.map((card, index) => (
              <div 
                key={index} 
                className={`${styles.navigationCard} ${styles[card.color]}`}
                onClick={() => router.push(card.path)}
              >
                <div className={styles.cardIcon}>
                  {card.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
                <div className={styles.cardArrow}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.placeholderSection}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.quickActionsGrid}>
            <div className={styles.actionCard}>
              <TrendingUp size={32} className={styles.actionIcon} />
              <h3>Generate New Timeline</h3>
              <p>Create AI transformation roadmap from existing profile</p>
              <button 
                className={styles.actionButton}
                onClick={() => router.push('/timeline')}
              >
                Get Started
              </button>
            </div>
            
            <div className={styles.actionCard}>
              <BarChart3 size={32} className={styles.actionIcon} />
              <h3>Analytics Dashboard</h3>
              <p>View insights and trends across client profiles</p>
              <button className={styles.actionButton} disabled>
                Coming Soon
              </button>
            </div>
            
            <div className={styles.actionCard}>
              <CheckCircle size={32} className={styles.actionIcon} />
              <h3>Assessment Tools</h3>
              <p>Advanced AI readiness and maturity assessments</p>
              <button className={styles.actionButton} disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 