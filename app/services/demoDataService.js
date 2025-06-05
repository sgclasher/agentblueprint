'use client';

/**
 * Demo Data Service
 * 
 * Provides realistic sample client profiles focused on agentic AI opportunity identification.
 * Uses streamlined business outcome framework for digital twin creation.
 */

export const demoDataService = {
  /**
   * Get a collection of demo profiles
   * @returns {Array} Array of demo profile objects
   */
  getDemoProfiles() {
    return [
      this.getTechStartupProfile(),
      this.getManufacturingProfile(), 
      this.getHealthcareProfile(),
      this.getFinanceProfile()
    ];
  },

  /**
   * Get a specific demo profile by type
   * @param {string} type - Type of demo profile
   * @returns {Object} Demo profile data
   */
  getDemoProfile(type = 'tech-startup') {
    const profiles = {
      'tech-startup': this.getTechStartupProfile(),
      'manufacturing': this.getManufacturingProfile(),
      'healthcare': this.getHealthcareProfile(),
      'finance': this.getFinanceProfile()
    };
    return profiles[type] || profiles['tech-startup'];
  },

  /**
   * Technology startup profile - TechFlow Solutions
   */
  getTechStartupProfile() {
    return {
      companyName: 'TechFlow Solutions',
      industry: 'Technology - SaaS',
      size: '120 employees',
      annualRevenue: '$15M',
      location: 'Austin, Texas',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Reduce operational costs by 35% while scaling to $25M revenue",
            contact: {
              name: "Sarah Chen",
              title: "CEO & Co-Founder",
              email: "sarah.chen@techflow.com",
              linkedin: "linkedin.com/in/sarahchen-ceo",
              phone: "(512) 555-0123"
            }
          },
          {
            initiative: "Improve customer response times from 4 hours to 30 minutes",
            contact: {
              name: "Lisa Park",
              title: "VP of Customer Success", 
              email: "lisa.park@techflow.com",
              linkedin: "linkedin.com/in/lisakpark",
              phone: "(512) 555-0156"
            }
          },
          {
            initiative: "Scale technical operations without proportional headcount increase",
            contact: {
              name: "Mike Rodriguez",
              title: "CTO",
              email: "mike.rodriguez@techflow.com",
              linkedin: "linkedin.com/in/mikerodrtech",
              phone: "(512) 555-0189"
            }
          }
        ],
        businessObjectives: "Achieve profitable growth to $25M revenue while maintaining 85%+ customer satisfaction and <2% churn rate. Prepare for Series B funding round in 12 months."
      },
      
      problems: {
        businessProblems: [
          "Customer support tickets manually triaged - 4+ hour response times",
          "Invoice processing and approvals take 2-3 weeks",
          "Sales leads manually qualified - missing 40% of warm prospects",
          "Employee onboarding takes 2 weeks with 15+ manual steps",
          "Customer data scattered across 12+ tools - no unified view",
          "Engineering team spends 30% time on operational tasks vs product development"
        ],
        agenticOpportunities: [
          "Intelligent ticket classification and auto-routing to specialists",
          "Automated invoice processing with approval workflows",
          "AI-powered lead scoring and qualification",
          "Conversational onboarding assistant for new employees",
          "Unified customer health scoring across all touchpoints",
          "Automated incident response and system monitoring"
        ]
      },
      
      solutions: {
        capabilities: [
          "ServiceNow-native agentic workflows for ticket automation",
          "Intelligent document processing and approval routing",
          "Real-time customer health monitoring with predictive alerts",
          "Conversational AI for employee and customer self-service",
          "Integration platform connecting all business systems"
        ],
        differentiators: [
          "No-code workflow designer - business users can modify",
          "Native ServiceNow integration - no vendor lock-in",
          "Proven ROI with similar SaaS companies (8-month payback)",
          "Rapid deployment - functional workflows in 30 days"
        ],
        competitorGaps: [
          "Other solutions require 6+ month implementations",
          "Most require dedicated AI/ML engineering team",
          "Custom solutions create technical debt and maintenance burden"
        ]
      },
      
      value: {
        businessValue: {
          revenueImpact: "Reduce customer churn by 35% = $425K annual revenue retention",
          costReduction: "Save 480 hours/month manual work = $240K annual labor savings", 
          operationalEfficiency: "Support team handles 3x ticket volume with same headcount",
          kpiImprovements: [
            "Customer response time: 4 hours → 30 minutes",
            "Invoice processing: 18 days → 3 days", 
            "Lead qualification accuracy: 60% → 90%",
            "Employee onboarding: 14 days → 3 days"
          ],
          totalAnnualImpact: "$665K cost savings + $425K revenue protection = $1.09M"
        },
        personalValue: {
          executiveWin: "Sarah (CEO): Board recognition for operational excellence and scalability preparation",
          teamWin: "Lisa (Customer Success): Transforms from reactive firefighting to proactive strategy",
          careerImpact: "Mike (CTO): Recognized as innovation leader, engineering team focuses on product vs ops",
          organizationalBenefit: "Company culture shifts from manual/reactive to automated/proactive"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "ServiceNow (IT Service Management)",
          "HubSpot (CRM & Marketing)",
          "QuickBooks Online (Financial)",
          "Slack (Communication)",
          "Notion (Documentation)",
          "GitHub (Development)"
        ],
        integrations: "Basic Zapier connections between 3-4 systems",
        dataQuality: "Fair - customer data exists but scattered across systems",
        technicalDebt: "Spreadsheet-heavy processes, manual data entry, inconsistent workflows",
        aiReadiness: "Medium - good data foundation but limited automation experience"
      }
    };
  },

  /**
   * Manufacturing company profile - PrecisionParts Manufacturing
   */
  getManufacturingProfile() {
    return {
      companyName: 'PrecisionParts Manufacturing',
      industry: 'Manufacturing - Aerospace Components',
      size: '450 employees',
      annualRevenue: '$85M',
      location: 'Cleveland, Ohio',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Achieve 25% cost reduction to compete with overseas manufacturers",
            contact: {
              name: "Robert Chen",
              title: "President & COO",
              email: "rchen@precisionparts.com", 
              linkedin: "linkedin.com/in/robertchen-manufacturing",
              phone: "(216) 555-0234"
            }
          },
          {
            initiative: "Reduce waste and quality defects from 15% to under 5%",
            contact: {
              name: "Maria Santos",
              title: "VP Quality & Operations",
              email: "msantos@precisionparts.com",
              linkedin: "linkedin.com/in/mariasantos-quality",
              phone: "(216) 555-0267"
            }
          },
          {
            initiative: "Implement predictive maintenance to eliminate unplanned downtime",
            contact: {
              name: "David Kim",
              title: "Director of Manufacturing Engineering",
              email: "dkim@precisionparts.com",
              linkedin: "linkedin.com/in/davidkim-mfgeng",
              phone: "(216) 555-0298"
            }
          }
        ],
        businessObjectives: "Maintain domestic manufacturing competitiveness through operational excellence. Achieve ISO certification and prepare for aerospace industry consolidation."
      },
      
      problems: {
        businessProblems: [
          "Quality inspections are 100% manual - miss defects until final assembly",
          "Machine maintenance is calendar-based - leads to unexpected failures",
          "Production planning relies on Excel - poor demand forecasting",
          "Compliance documentation is paper-based and error-prone",
          "Supply chain disruptions not detected until shortages occur",
          "Worker safety incidents not tracked systematically"
        ],
        agenticOpportunities: [
          "Computer vision quality inspection with real-time feedback",
          "Predictive maintenance based on sensor data and patterns",
          "Intelligent production scheduling with demand forecasting",
          "Automated compliance reporting and audit trail generation",
          "Supply chain risk monitoring with alternative sourcing",
          "Safety incident prediction and prevention workflows"
        ]
      },
      
      solutions: {
        capabilities: [
          "AI-powered visual quality inspection systems",
          "Predictive maintenance with IoT sensor integration",
          "Intelligent supply chain monitoring and risk assessment", 
          "Automated compliance documentation and reporting",
          "Real-time production optimization based on demand signals"
        ],
        differentiators: [
          "Industry-specific manufacturing workflows pre-built",
          "Integration with existing MES/ERP systems",
          "Proven ROI in similar manufacturing environments",
          "Phased implementation minimizes production disruption"
        ],
        competitorGaps: [
          "Most solutions require complete system replacement",
          "Generic AI tools don't understand manufacturing processes",
          "High implementation risk during production periods"
        ]
      },
      
      value: {
        businessValue: {
          costReduction: "Reduce waste from 15% to 5% = $850K annual materials savings",
          qualityImpact: "Prevent quality escapes = $300K annual warranty/rework costs",
          maintenanceOptimization: "Reduce unplanned downtime 80% = $420K annual productivity gain",
          laborEfficiency: "Automate quality inspections = $180K annual labor savings",
          totalAnnualImpact: "$1.75M cost reduction + improved competitive positioning"
        },
        personalValue: {
          executiveWin: "Robert (President): Demonstrates cost leadership to board and customers",
          teamWin: "Maria (Quality): Transforms from reactive problem-solving to preventive excellence",
          careerImpact: "David (Engineering): Recognized as Industry 4.0 leader in manufacturing",
          organizationalBenefit: "Workforce upskilled on modern technology, improved job satisfaction"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "SAP ERP (Finance & Materials)",
          "Wonderware MES (Manufacturing Execution)",
          "QAD (Production Planning)",
          "Minitab (Quality Analysis)",
          "AutoCAD (Engineering)",
          "Excel (Everywhere else)"
        ],
        integrations: "Limited EDI with key suppliers, mostly manual data transfer",
        dataQuality: "Good production data but poor historical analysis capabilities",
        technicalDebt: "Legacy systems from 2010s, minimal automation, paper-heavy processes",
        aiReadiness: "Low - strong operational data but limited technology adoption experience"
      }
    };
  },

  /**
   * Healthcare organization profile - Regional Medical Center
   */
  getHealthcareProfile() {
    return {
      companyName: 'Regional Medical Center',
      industry: 'Healthcare - Regional Hospital System',
      size: '2,100 employees',
      annualRevenue: '$320M',
      location: 'Phoenix, Arizona',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Reduce nurse burnout and improve patient outcomes through workflow optimization",
            contact: {
              name: "Dr. Jennifer Walsh",
              title: "Chief Medical Officer",
              email: "jwalsh@regionalmed.org",
              linkedin: "linkedin.com/in/drjenniferwalsh",
              phone: "(602) 555-0345"
            }
          },
          {
            initiative: "Decrease average patient wait times from 45 minutes to under 15 minutes",
            contact: {
              name: "Marcus Thompson",
              title: "VP Patient Experience",
              email: "mthompson@regionalmed.org",
              linkedin: "linkedin.com/in/marcusthompson-healthcare",
              phone: "(602) 555-0378"
            }
          },
          {
            initiative: "Achieve $5M annual cost reduction while maintaining care quality",
            contact: {
              name: "Patricia Davis",
              title: "CFO",
              email: "pdavis@regionalmed.org",
              linkedin: "linkedin.com/in/patriciadavis-healthcare-finance",
              phone: "(602) 555-0401"
            }
          }
        ],
        businessObjectives: "Transform from volume-based to value-based care model. Improve patient satisfaction scores to top quartile while achieving sustainable financial performance."
      },
      
      problems: {
        businessProblems: [
          "Nurses spend 60% of time on documentation vs patient care",
          "Patient discharge planning delayed due to manual coordination",
          "Medication errors from illegible prescriptions and manual entry",
          "OR scheduling conflicts and delays impact surgeon productivity",
          "Insurance pre-authorization delays patient treatment",
          "Emergency department overcrowding from poor patient flow"
        ],
        agenticOpportunities: [
          "Automated clinical documentation using voice recognition",
          "Intelligent discharge planning with real-time bed management",
          "Clinical decision support for medication management", 
          "AI-powered scheduling optimization for OR and procedures",
          "Automated insurance verification and pre-authorization",
          "Patient flow orchestration across departments"
        ]
      },
      
      solutions: {
        capabilities: [
          "Clinical workflow automation with EHR integration",
          "Intelligent patient flow management and bed optimization",
          "AI-powered clinical decision support systems",
          "Automated administrative task processing",
          "Real-time resource allocation and scheduling optimization"
        ],
        differentiators: [
          "HIPAA-compliant healthcare-specific workflows",
          "Deep EHR integration (Epic, Cerner, Allscripts)",
          "Proven clinical outcomes improvement",
          "Nurse and physician-friendly interface design"
        ],
        competitorGaps: [
          "Most solutions don't integrate deeply with existing EHR",
          "Generic automation doesn't understand clinical workflows",
          "Complex implementations disrupt patient care"
        ]
      },
      
      value: {
        businessValue: {
          laborOptimization: "Nurses spend 40% more time on patient care = improved outcomes",
          operationalEfficiency: "Reduce average length of stay by 0.5 days = $2.3M annual savings",
          revenueOptimization: "Increase OR utilization 15% = $1.8M additional revenue",
          qualityImprovement: "Reduce medication errors 75% = $800K risk mitigation",
          totalAnnualImpact: "$4.9M operational improvement + immeasurable patient outcome benefits"
        },
        personalValue: {
          executiveWin: "Dr. Walsh (CMO): Recognized for clinical innovation and patient outcome leadership",
          teamWin: "Marcus (Patient Experience): Transforms patient satisfaction scores and hospital reputation",
          careerImpact: "Patricia (CFO): Achieves cost targets while improving clinical metrics",
          organizationalBenefit: "Staff satisfaction improves, turnover reduces, better work-life balance"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "Epic EHR (Electronic Health Records)",
          "McKesson (Pharmacy Management)",
          "GE Healthcare (Medical Devices)",
          "Philips (Patient Monitoring)",
          "Cerner PowerChart (Clinical Documentation)",
          "Oracle (Financial Management)"
        ],
        integrations: "HL7 interfaces between clinical systems, manual processes for admin workflows",
        dataQuality: "Excellent clinical data but poor operational analytics",
        technicalDebt: "Fragmented point solutions, heavy manual coordination between departments",
        aiReadiness: "Medium - strong data foundation but conservative technology adoption"
      }
    };
  },

  /**
   * Financial services profile - Community Trust Bank
   */
  getFinanceProfile() {
    return {
      companyName: 'Community Trust Bank',
      industry: 'Financial Services - Regional Banking',
      size: '380 employees',
      annualRevenue: '$180M',
      location: 'Charlotte, North Carolina',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Compete with fintech companies by reducing loan approval time from 3 weeks to 24 hours",
            contact: {
              name: "Michael Foster",
              title: "Chief Lending Officer",
              email: "mfoster@communitytrust.bank",
              linkedin: "linkedin.com/in/michaelfoster-banking",
              phone: "(704) 555-0456"
            }
          },
          {
            initiative: "Reduce operational costs by 30% while maintaining personalized service",
            contact: {
              name: "Angela Martinez",
              title: "Chief Operating Officer",
              email: "amartinez@communitytrust.bank",
              linkedin: "linkedin.com/in/angelamartinez-bankingops",
              phone: "(704) 555-0489"
            }
          },
          {
            initiative: "Enhance fraud detection and regulatory compliance automation",
            contact: {
              name: "James Liu",
              title: "Chief Risk Officer",
              email: "jliu@communitytrust.bank",
              linkedin: "linkedin.com/in/jamesliu-banking-risk",
              phone: "(704) 555-0512"
            }
          }
        ],
        businessObjectives: "Maintain community banking values while achieving digital-first efficiency. Grow market share among small businesses and young professionals through superior customer experience."
      },
      
      problems: {
        businessProblems: [
          "Loan underwriting requires 15+ manual steps and 3 weeks processing",
          "Customer onboarding takes 5 business days with multiple forms",
          "Fraud detection relies on rule-based systems with high false positives",
          "Regulatory reporting is manual and error-prone",
          "Customer service inquiries require multiple department transfers",
          "Small business lending loses deals to online competitors"
        ],
        agenticOpportunities: [
          "Automated loan underwriting with risk assessment",
          "Digital customer onboarding with identity verification",
          "AI-powered fraud detection with behavioral analysis",
          "Automated regulatory reporting and compliance monitoring",
          "Intelligent customer service routing and resolution",
          "Real-time credit decision making for small business loans"
        ]
      },
      
      solutions: {
        capabilities: [
          "Automated lending workflows with risk-based decision making",
          "Digital customer onboarding with KYC/AML compliance",
          "Advanced fraud detection using machine learning",
          "Automated regulatory reporting and audit trail generation",
          "Intelligent customer service with omnichannel support"
        ],
        differentiators: [
          "Banking-specific compliance and regulatory workflows",
          "Integration with core banking systems (FIS, Jack Henry)",
          "Proven ROI with similar community banks",
          "Maintains personal touch while adding digital efficiency"
        ],
        competitorGaps: [
          "Fintech solutions lack regulatory compliance depth",
          "Big bank solutions too complex and expensive",
          "Custom development creates regulatory risk"
        ]
      },
      
      value: {
        businessValue: {
          revenueGrowth: "Process 3x more loan applications = $2.4M additional interest income",
          costReduction: "Automate 60% of manual processes = $840K annual labor savings",
          riskMitigation: "Reduce fraud losses 80% = $320K annual savings",
          complianceEfficiency: "Automated reporting = $180K annual compliance cost reduction",
          totalAnnualImpact: "$3.74M financial improvement + competitive positioning"
        },
        personalValue: {
          executiveWin: "Michael (CLO): Transforms lending from cost center to profit driver",
          teamWin: "Angela (COO): Achieves operational excellence while maintaining service quality",
          careerImpact: "James (CRO): Recognized for innovative risk management approach",
          organizationalBenefit: "Staff focuses on relationship building vs paperwork processing"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "Jack Henry SilverLake (Core Banking)",
          "FIS (Loan Origination)",
          "Salesforce (CRM)",
          "ADP (HR & Payroll)",
          "Microsoft 365 (Productivity)",
          "Symitar (Member Management)"
        ],
        integrations: "Limited API connections, mostly file-based data transfer",
        dataQuality: "Good customer and transaction data but poor analytics capabilities",
        technicalDebt: "Legacy systems with limited automation, paper-heavy processes",
        aiReadiness: "Low-Medium - good data foundation but conservative about new technology adoption"
      }
    };
  }
}; 