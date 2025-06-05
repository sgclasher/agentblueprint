# Agent Blueprint & Business AI Advisory Platform

**🤖 AI Assistant Context:** This is a comprehensive business AI advisory platform built with Next.js, featuring ServiceNow agentic AI flow visualization, interactive AI transformation timelines, and client profile management with structured business intelligence framework. The platform serves as a sophisticated business intelligence tool combining technical visualization capabilities with comprehensive data collection and strategic planning tools. Core technologies: Next.js 15, React 19, ReactFlow, Zustand, Dagre, Supabase. Design inspired by ai-2027.com with modern dark themes and floating UI elements.

**🎯 Current State:** Fully functional four-feature platform with consistent UI theming across all pages. Recent major addition: **Phase 5 UI Consistency & Design System** with global CSS variables, theme provider, and standardized GlobalHeader. All pages (ServiceNow, Profiles, Timeline, Auth) now have consistent professional theming with working light/dark mode toggle. Recent updates include user profile management page, improved tag readability in light mode, and enhanced header navigation with clickable user profiles. Complete with ServiceNow visualization, AI transformation timeline, comprehensive client profile management system, complete user authentication, and seamless database migration. The platform features sophisticated UI inspired by ai-2027.com with backdrop blur effects, gradient backgrounds, professional typography, and responsive mobile-optimized layouts. Architecture includes robust service layers with secure multi-user authentication and row-level security. Ready for production deployment and enterprise use.

**🚀 Next Steps:** AI-powered timeline generation using ChatGPT 4o, PDF export capabilities, and multi-platform connectors. Focus on creating a scalable, secure platform for enterprise business intelligence and AI transformation planning.

## Project Overview

A Next.js application that serves five primary functions:

1. **ServiceNow Agentic AI Visualizer**: Transform ServiceNow agentic AI data into interactive flow diagrams
2. **AI Transformation Timeline**: Business advisory tool that generates personalized AI adoption roadmaps  
3. **Client Profile Management**: Comprehensive business intelligence system using structured methodology to create client "digital twins"
4. **User Authentication & Database Management**: Secure multi-user system with encrypted credential storage, profile management, and seamless localStorage/Supabase migration
5. **User Profile Management**: Complete user account management with profile editing, preferences, and account information

The platform positions itself as a sophisticated enterprise tool for AI transformation planning, providing immediate value through visualization and analysis while capturing comprehensive business intelligence for strategic decision-making.

## Core Features

### 🔄 **ServiceNow Flow Visualization**
- **Interactive Node Graph**: Drag, zoom, and pan through complex AI workflows
- **Hierarchical Exploration**: Expand/collapse nodes to explore use cases → agents → tools
- **Dynamic Layouts**: Toggle between horizontal (LR) and vertical (TB) orientations
- **Real-time Collaboration**: Multiple layout options and live data refresh
- **Secure Integration**: Direct connection to ServiceNow instances with credential management

### 📈 **AI Transformation Timeline**
- **Business Profile Collection**: Multi-step form capturing company details, AI maturity, goals
- **Interactive Timeline**: Scroll-based journey through 6 transformation phases
- **Floating Metrics Widget**: Real-time KPIs that update based on scroll position (ai-2027.com inspired)
- **Dynamic Content Generation**: Personalized roadmaps based on industry and company size
- **ROI Projections**: Detailed investment and return calculations
- **Mobile-Responsive Design**: Optimized for all device types

### 👥 **Client Profile Management**
- **ProfileWizard**: 8-step guided form implementing structured business intelligence methodology
- **Business Intelligence Capture**: Company overview, strategic issues, quantified impact analysis
- **Structured Framework**: Expected Outcomes → Problems & Opportunities → Solutions & Value → Architecture Assessment
- **Database Integration**: Seamless localStorage/Supabase storage based on user authentication
- **Demo Data System**: 4 realistic industry profiles (Technology, Manufacturing, Healthcare, Finance)
- **Migration Tools**: One-click migration from localStorage to cloud storage
- **Visual Indicators**: Cloud tags for Supabase-stored profiles

### 🔐 **User Authentication & Database Management**
- **Supabase Authentication**: Email/password and magic link authentication flows
- **User Management**: Complete signup, signin, signout with email verification
- **Secure Credential Storage**: AES-256 encrypted ServiceNow credentials per user
- **Row-Level Security**: Individual user profiles with database-level protection
- **Professional UI**: Dark-themed auth forms integrated with existing design system
- **Session Management**: Persistent auth state with automatic token refresh
- **Migration System**: Automatic detection and migration of localStorage profiles to Supabase
- **Database Verification**: Built-in tools to verify Supabase configuration and connectivity

### 👤 **User Profile Management**
- **Personal Profile Page**: Dedicated `/profile` page for user account management
- **Profile Editing**: Editable display name, notification preferences, and account settings
- **Account Information**: View account type, data storage details, and membership information
- **Clickable User Header**: Navigate to profile page by clicking user info in the global header
- **Theme-Aware Design**: Consistent styling with the global design system
- **Account Actions**: Secure sign-out functionality and account management options

### 🎨 **Design System (ai-2027.com Inspired)**
- **Professional Dark Theme**: Enterprise-grade #0a0e27 background with sophisticated color palette
- **Glass Morphism Effects**: Backdrop blur throughout with rgba overlays and subtle transparency
- **Professional Typography**: Carefully designed text hierarchy with gradient effects for emphasis
- **Smart Animations**: Hover effects with lift/glow, smooth transitions, and interactive feedback
- **Modular Component Design**: Independent form components with consistent styling patterns
- **Enterprise Color Scheme**: Professional slate colors (#f1f5f9, #e2e8f0, #cbd5e1, #94a3b8)
- **Theme-Aware Components**: Profile tags with optimized contrast for both light and dark modes
- **Responsive Excellence**: Mobile-optimized layouts with professional spacing and hierarchy
- **Migration UI**: User-friendly banners and setup verification tools

## Getting Started

### **Prerequisites**
- Node.js 18+
- ServiceNow instance with Agentic AI framework (for visualization features)
- Modern browser (Chrome, Firefox, Safari, Edge)

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd agentic-ai-flow

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Quick Testing**
```bash
# Run quick smoke tests (3 seconds)
npm run test:smoke

# Run all tests
npm test
```

### **Usage Options**

#### **Option 1: ServiceNow Visualization**
1. Navigate to `http://localhost:3000`
2. Enter ServiceNow instance details
3. Connect and explore agentic AI flows
4. Use layout controls and node interactions

#### **Option 2: AI Timeline Planning**
1. Click "AI Timeline" button or go to `/timeline`
2. Complete business profile form
3. Generate personalized AI transformation roadmap
4. Explore phases and metrics

#### **Option 3: Client Profile Management**
1. Click "Client Profiles" button or go to `/profiles`
2. Sign up/sign in for cloud storage (optional - localStorage works without auth)
3. Create new profile or load demo data (4 industry scenarios available)
4. Complete 8-step business intelligence assessment
5. Migrate localStorage profiles to cloud with one-click migration
6. Generate automatic AI timeline from profile data

## Business Value & Enterprise Use Cases

### **Current Positioning**
- **Enterprise Business Intelligence Tool**: Comprehensive platform for AI transformation planning
- **Digital Twin Creation**: Structured markdown profiles create comprehensive business understanding
- **Strategic Planning**: Natural progression from assessment to implementation roadmap
- **Market Positioning**: Bridges technical capability with sophisticated business strategy

### **Enterprise Integration Ready**
- **Authentication**: ✅ Complete Supabase Auth integration with secure multi-user access
- **Database Migration**: ✅ Seamless localStorage to Supabase migration with user-friendly tools
- **Row-Level Security**: ✅ Database-level security ensuring user data isolation
- **AI Integration**: Ready for ChatGPT 4o integration for intelligent timeline generation
- **Export Capabilities**: Ready for PDF generation for executive reporting

## Technical Stack

### **Frontend**
- Next.js 15 with App Router
- React 19 with functional components
- ReactFlow for interactive diagrams
- Zustand for state management
- Lucide React for icons

### **Visualization**
- Dagre.js for automatic graph layout
- Custom node types with expand/collapse
- Responsive design with mobile support

### **Authentication & Data Management**
- Supabase Authentication with email verification
- User profiles with encrypted credential storage
- ProfileService with automatic localStorage/Supabase routing
- ProfileRepository with fallback mechanisms
- Migration tools with progress tracking
- Structured markdown for profile storage

### **Development**
- TypeScript-ready architecture
- Jest testing framework with Supabase mocking
- ESLint for code quality
- GitHub Actions for CI/CD

## Testing

The project uses a pragmatic MVP testing approach:

```bash
npm run test:smoke    # Quick 3-second verification
npm test             # Full test suite
npm run test:watch   # Development mode
```

See `MVP_TESTING_SUMMARY.md` for complete testing strategy.

## Contributing

1. Run `npm run test:smoke` before committing
2. Follow existing code patterns
3. Update documentation for new features
4. Test manually using the checklist in `app/__tests__/features/manual-test-checklist.md`

## Development Guidelines

- Functional components with hooks
- 200-line component limit
- Comprehensive error handling
- Clear separation of concerns between visualization, advisory, and profile features

---

**📞 Ready for Enterprise Deployment**: The platform successfully combines technical demonstration, strategic planning tools, comprehensive business intelligence collection, secure user authentication, seamless database migration, and consistent professional theming across all pages, providing a sophisticated foundation for enterprise AI transformation planning. With the addition of the structured business intelligence profile system, complete authentication infrastructure, automatic database migration tools, and global design system, the platform now captures the depth of business intelligence needed for strategic decision-making while providing immediate value through automated timeline generation and opportunity analysis.

**🎨 UI Consistency Status**: Complete global design system with CSS variables, theme provider, and professional theming across all pages. Light/dark mode toggle works globally with localStorage persistence.

**🔐 Authentication Status**: Complete Supabase integration with user management, encrypted credential storage, and enterprise-grade security features.

**🗄️ Database Migration Status**: Completed with ProfileService using ProfileRepository for automatic localStorage/Supabase routing, one-click migration tools, and database setup verification.

**🧪 Testing Status**: Simple MVP testing approach with 9 passing smoke tests including Supabase mocking. All tests continue to pass with UI consistency updates. See `MVP_TESTING_SUMMARY.md` for details.
