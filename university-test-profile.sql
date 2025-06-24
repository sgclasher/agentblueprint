INSERT INTO "public"."profiles" (
    "id", 
    "user_id", 
    "profile_data", 
    "markdown_content", 
    "timeline_cache", 
    "ai_opportunities_cache", 
    "created_at", 
    "updated_at", 
    "timeline_data", 
    "last_timeline_generated_at", 
    "agentic_blueprint_cache"
) VALUES (
    'a1b2c3d4-e5f6-7890-1234-567890abcdef', 
    '94c6d2fd-6f3c-4dda-ac9b-4014a5a6aced', 
    '{
        "status": "complete",
        "industry": "Higher Education",
        "createdAt": "2025-01-15T14:30:00.000Z",
        "updatedAt": "2025-01-15T14:30:00.000Z",
        "websiteUrl": "https://www.metropolitanstate.edu",
        "companyName": "Metropolitan State University",
        "annualRevenue": 320000000,
        "employeeCount": 4200,
        "primaryLocation": "Denver, Colorado",
        "strategicInitiatives": [
            {
                "status": "In Progress",
                "contact": {
                    "name": "Dr. Sarah Martinez",
                    "email": "s.martinez@metropolitanstate.edu",
                    "phone": "+1-303-555-0198",
                    "title": "Provost and Vice President for Academic Affairs",
                    "linkedin": "https://linkedin.com/in/dr-sarah-martinez-provost"
                },
                "priority": "High",
                "initiative": "Digital Learning Transformation",
                "successMetrics": [
                    "Student engagement scores > 85%",
                    "Course completion rates > 92%",
                    "Time-to-degree reduction by 15%"
                ],
                "targetTimeline": "Fall 2025",
                "estimatedBudget": "$4.2M",
                "businessProblems": [
                    "30% of courses still using traditional lecture-only format",
                    "Student engagement dropping 15% in online courses compared to in-person",
                    "Faculty spending 25+ hours weekly on manual grading and feedback"
                ],
                "expectedOutcomes": [
                    "Increase student retention rate to 88%",
                    "Reduce faculty administrative burden by 40%",
                    "Achieve 95% student satisfaction with digital learning experience"
                ]
            },
            {
                "status": "Planning",
                "contact": {
                    "name": "Michael Chen",
                    "email": "m.chen@metropolitanstate.edu",
                    "phone": "+1-303-555-0167",
                    "title": "Vice President for Student Affairs",
                    "linkedin": "https://linkedin.com/in/michael-chen-vp-student-affairs"
                },
                "priority": "High",
                "initiative": "Student Success Analytics Platform",
                "successMetrics": [
                    "Early intervention success rate > 75%",
                    "At-risk student identification accuracy > 90%",
                    "Graduation rate increase by 12%"
                ],
                "targetTimeline": "Spring 2026",
                "estimatedBudget": "$2.8M",
                "businessProblems": [
                    "22% student attrition rate in first two years",
                    "Advisors manually tracking 400+ students each with limited data visibility",
                    "Late identification of at-risk students leading to poor intervention outcomes"
                ],
                "expectedOutcomes": [
                    "Reduce student attrition by 30%",
                    "Increase on-time graduation rate to 65%",
                    "Improve student satisfaction with academic support to 90%"
                ]
            },
            {
                "status": "Planning",
                "contact": {
                    "name": "Dr. Jennifer Wong",
                    "email": "j.wong@metropolitanstate.edu",
                    "phone": "+1-303-555-0143",
                    "title": "Vice President for Research",
                    "linkedin": "https://linkedin.com/in/dr-jennifer-wong-research"
                },
                "priority": "Medium",
                "initiative": "Research Innovation Hub",
                "successMetrics": [
                    "Research funding increase by 40%",
                    "Publication output increase by 25%",
                    "Industry collaboration partnerships > 50"
                ],
                "targetTimeline": "Academic Year 2025-26",
                "estimatedBudget": "$1.5M",
                "businessProblems": [
                    "Research proposal success rate only 18% due to limited grant writing support",
                    "Faculty spending 35% of time on administrative research tasks",
                    "Difficulty tracking and showcasing research impact to secure funding"
                ],
                "expectedOutcomes": [
                    "Increase grant proposal success rate to 35%",
                    "Reduce research administrative overhead by 50%",
                    "Establish 25 new industry research partnerships"
                ]
            },
            {
                "status": "Approved",
                "contact": {
                    "name": "Robert Thompson",
                    "email": "r.thompson@metropolitanstate.edu",
                    "phone": "+1-303-555-0189",
                    "title": "Chief Procurement Officer",
                    "linkedin": "https://linkedin.com/in/robert-thompson-cpo"
                },
                "priority": "High",
                "initiative": "Strategic Procurement Modernization",
                "successMetrics": [
                    "Procurement cycle time reduction by 60%",
                    "Vendor evaluation consistency improvement by 85%",
                    "Compliance adherence rate > 96%",
                    "Cost savings increase by 80%"
                ],
                "targetTimeline": "Fall 2026 (18 months)",
                "estimatedBudget": "$1.8M",
                "businessProblems": [
                    "Average procurement cycle time of 45 days delaying critical research and campus projects",
                    "65% inconsistency in vendor evaluation across departments leading to suboptimal selections",
                    "Manual RFx processes consuming 40+ hours per procurement for staff",
                    "78% compliance rate with university procurement policies creating audit risks",
                    "Fragmented vendor communication causing delays and dissatisfaction"
                ],
                "expectedOutcomes": [
                    "Reduce procurement cycle time from 45 days to 18 days average",
                    "Achieve 96% compliance with all university procurement policies",
                    "Increase vendor evaluation consistency to 92% across all departments",
                    "Generate $1.2M annual savings through improved vendor selection and process efficiency",
                    "Improve vendor satisfaction scores from 7.2/10 to 8.8/10"
                ]
            }
        ],
        "systemsAndApplications": [
            {
                "name": "Banner ERP",
                "vendor": "Ellucian",
                "version": "9.4",
                "category": "Student Information System",
                "criticality": "High",
                "description": "Core system managing student records, registration, financial aid, and academic programs."
            },
            {
                "name": "Canvas LMS",
                "vendor": "Instructure",
                "version": "Cloud",
                "category": "Learning Management",
                "criticality": "High",
                "description": "Primary platform for course delivery, assignments, and student-faculty interaction."
            },
            {
                "name": "PeopleSoft HCM",
                "vendor": "Oracle",
                "version": "9.2",
                "category": "Human Resources",
                "criticality": "High",
                "description": "Manages faculty and staff employment, payroll, and benefits administration."
            },
            {
                "name": "Microsoft 365 Education",
                "vendor": "Microsoft",
                "version": "Cloud",
                "category": "Productivity & Communication",
                "criticality": "High",
                "description": "Email, collaboration tools (Teams), and document management for entire university community."
            },
            {
                "name": "Tableau Server",
                "vendor": "Salesforce",
                "version": "2023.3",
                "category": "Analytics & Reporting",
                "criticality": "Medium",
                "description": "Primary business intelligence platform for institutional research and reporting."
            },
            {
                "name": "Blackboard Collaborate",
                "vendor": "Blackboard",
                "version": "Cloud",
                "category": "Virtual Classroom",
                "criticality": "Medium",
                "description": "Video conferencing and virtual classroom technology for remote learning."
            },
            {
                "name": "ORCID Integration",
                "vendor": "ORCID",
                "version": "API v3.0",
                "category": "Research Management",
                "criticality": "Low",
                "description": "Faculty research profile and publication tracking system."
            }
        ]
    }',
    '# Client Profile: Metropolitan State University
---

## University Overview
**Institution Name**: Metropolitan State University
**Sector**: Higher Education
**Total Personnel**: 4,200 (Faculty: 1,800, Staff: 2,400)
**Annual Budget**: $320,000,000
**Primary Campus**: Denver, Colorado
**Student Enrollment**: 18,500 (Undergraduate: 14,200, Graduate: 4,300)
**Website**: https://www.metropolitanstate.edu
---

## Strategic Initiatives

### 1. Digital Learning Transformation
**Status**: In Progress
**Priority**: High
**Timeline**: Fall 2025
**Budget**: $4.2M
**Leader**: Dr. Sarah Martinez (Provost and Vice President for Academic Affairs)

#### Educational Challenges
- 30% of courses still using traditional lecture-only format
- Student engagement dropping 15% in online courses compared to in-person
- Faculty spending 25+ hours weekly on manual grading and feedback

#### Expected Outcomes
- Increase student retention rate to 88%
- Reduce faculty administrative burden by 40%
- Achieve 95% student satisfaction with digital learning experience

#### Success Metrics
- Student engagement scores > 85%
- Course completion rates > 92%
- Time-to-degree reduction by 15%

### 2. Student Success Analytics Platform
**Status**: Planning
**Priority**: High
**Timeline**: Spring 2026
**Budget**: $2.8M
**Leader**: Michael Chen (Vice President for Student Affairs)

#### Student Support Challenges
- 22% student attrition rate in first two years
- Advisors manually tracking 400+ students each with limited data visibility
- Late identification of at-risk students leading to poor intervention outcomes

#### Expected Outcomes
- Reduce student attrition by 30%
- Increase on-time graduation rate to 65%
- Improve student satisfaction with academic support to 90%

#### Success Metrics
- Early intervention success rate > 75%
- At-risk student identification accuracy > 90%
- Graduation rate increase by 12%

### 3. Research Innovation Hub
**Status**: Planning
**Priority**: Medium
**Timeline**: Academic Year 2025-26
**Budget**: $1.5M
**Leader**: Dr. Jennifer Wong (Vice President for Research)

#### Research Operations Challenges
- Research proposal success rate only 18% due to limited grant writing support
- Faculty spending 35% of time on administrative research tasks
- Difficulty tracking and showcasing research impact to secure funding

#### Expected Outcomes
- Increase grant proposal success rate to 35%
- Reduce research administrative overhead by 50%
- Establish 25 new industry research partnerships

#### Success Metrics
- Research funding increase by 40%
- Publication output increase by 25%
- Industry collaboration partnerships > 50

### 4. Strategic Procurement Modernization
**Status**: Approved
**Priority**: High
**Timeline**: Fall 2026 (18 months)
**Budget**: $1.8M
**Leader**: Robert Thompson (Chief Procurement Officer)

#### Procurement Operations Challenges
- Average procurement cycle time of 45 days delaying critical research and campus projects
- 65% inconsistency in vendor evaluation across departments leading to suboptimal selections
- Manual RFx processes consuming 40+ hours per procurement for staff
- 78% compliance rate with university procurement policies creating audit risks
- Fragmented vendor communication causing delays and dissatisfaction

#### Expected Outcomes
- Reduce procurement cycle time from 45 days to 18 days average
- Achieve 96% compliance with all university procurement policies
- Increase vendor evaluation consistency to 92% across all departments
- Generate $1.2M annual savings through improved vendor selection and process efficiency
- Improve vendor satisfaction scores from 7.2/10 to 8.8/10

#### Success Metrics
- Procurement cycle time reduction by 60%
- Vendor evaluation consistency improvement by 85%
- Compliance adherence rate > 96%
- Cost savings increase by 80%

---

## Technology Systems & Applications

### Banner ERP
**Category**: Student Information System
**Vendor**: Ellucian
**Version**: 9.4
**Criticality**: High
> Core system managing student records, registration, financial aid, and academic programs.

### Canvas LMS
**Category**: Learning Management
**Vendor**: Instructure
**Version**: Cloud
**Criticality**: High
> Primary platform for course delivery, assignments, and student-faculty interaction.

### PeopleSoft HCM
**Category**: Human Resources
**Vendor**: Oracle
**Version**: 9.2
**Criticality**: High
> Manages faculty and staff employment, payroll, and benefits administration.

### Microsoft 365 Education
**Category**: Productivity & Communication
**Vendor**: Microsoft
**Version**: Cloud
**Criticality**: High
> Email, collaboration tools (Teams), and document management for entire university community.

### Tableau Server
**Category**: Analytics & Reporting
**Vendor**: Salesforce
**Version**: 2023.3
**Criticality**: Medium
> Primary business intelligence platform for institutional research and reporting.

### Blackboard Collaborate
**Category**: Virtual Classroom
**Vendor**: Blackboard
**Version**: Cloud
**Criticality**: Medium
> Video conferencing and virtual classroom technology for remote learning.

### ORCID Integration
**Category**: Research Management
**Vendor**: ORCID
**Version**: API v3.0
**Criticality**: Low
> Faculty research profile and publication tracking system.
',
    null,
    null,
    '2025-01-15 14:30:00.000+00',
    '2025-01-15 14:30:00.000+00',
    null,
    null,
    null
); 