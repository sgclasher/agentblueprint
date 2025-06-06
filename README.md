# Agent Blueprint & Business AI Advisory Platform

**🤖 AI Assistant Context:** This is a comprehensive business AI advisory platform built with Next.js, featuring ServiceNow agentic AI flow visualization, interactive AI transformation timelines, and client profile management with structured business intelligence framework. The platform serves as a sophisticated business intelligence tool combining technical visualization capabilities with comprehensive data collection and strategic planning tools. Core technologies: Next.js 15, React 19, ReactFlow, Zustand, Dagre, Supabase. Design inspired by ai-2027.com with modern dark themes and floating UI elements.

**🎯 Current State:** Fully functional platform with **Phase 6 AI Integration** mostly complete! Features real OpenAI GPT-4o powered timeline generation with intelligent, industry-specific business transformation roadmaps. **Client profiles are now exclusively stored in Supabase, requiring user authentication for all profile-related features.** This change removes all `localStorage` fallback and data migration logic, streamlining the architecture. **⚠️ Two urgent issues need fixing: timeline progress bar not updating with scroll, and missing timeline caching (regenerates on every page refresh).** All four core features have consistent UI theming across all pages with **Phase 5 UI Consistency & Design System** including global CSS variables, theme provider, and standardized GlobalHeader. All pages (ServiceNow, Profiles, Timeline, Auth) have consistent professional theming with working light/dark mode toggle. The core `ProfileWizard` component has been refactored to use CSS Modules, eliminating inline styles for robust, theme-aware consistency. **Latest enhancements include AI-powered timeline generation, working edit profile functionality, ProfileWizard UX improvements with clickable step navigation and free exploration, and enhanced visual indicators for completion status.** Recent updates include user profile management page, improved tag readability in light mode, and enhanced header navigation with clickable user profiles. Complete with ServiceNow visualization, **AI-powered transformation timeline**, comprehensive client profile management system with full edit capability, complete user authentication, and a secure Supabase database backend. The platform features sophisticated UI inspired by ai-2027.com with backdrop blur effects, gradient backgrounds, professional typography, and responsive mobile-optimized layouts. Architecture includes robust service layers with secure multi-user authentication and row-level security. Ready for production deployment and enterprise use.

**🚀 Next Steps:** 
1. **URGENT**: Fix timeline progress bar not updating with scroll (left sidebar issue)
2. **URGENT**: Implement timeline caching to prevent regeneration on page refresh + add "Regenerate Timeline" button
3. PDF export capabilities, multi-platform connectors, and timeline collaboration features
4. Focus on creating a scalable, secure platform for enterprise business intelligence and AI transformation planning

## Project Overview

A Next.js application that serves five primary functions:

1. **ServiceNow Agentic AI Visualizer**: Transform ServiceNow agentic AI data into interactive flow diagrams
2. **AI Transformation Timeline**: Business advisory tool that generates personalized AI adoption roadmaps  
3. **Client Profile Management**: Comprehensive business intelligence system using structured methodology to create client "digital twins"
4. **User Authentication & Database Management**: Secure multi-user system with encrypted credential storage and profile management exclusively on Supabase
5. **User Profile Management**: Complete user account management with profile editing, preferences, and account information

The platform positions itself as a sophisticated enterprise tool for AI transformation planning, providing immediate value through visualization and analysis while capturing comprehensive business intelligence for strategic decision-making.

## Core Features

### 🔄 **ServiceNow Flow Visualization**
- **Interactive Node Graph**: Drag, zoom, and pan through complex AI workflows
- **Hierarchical Exploration**: Expand/collapse nodes to explore use cases → agents → tools
- **Dynamic Layouts**: Toggle between horizontal (LR) and vertical (TB) orientations
- **Real-time Collaboration**: Multiple layout options and live data refresh
- **Secure Integration**: Direct connection to ServiceNow instances with credential management

### 📈 **AI Transformation Timeline** ✨ **(AI-Powered with OpenAI GPT-4o)**
- **Business Profile Collection**: Multi-step form capturing company details, AI maturity, goals
- **Real AI Timeline Generation**: OpenAI GPT-4o powered intelligent timeline creation
- **Interactive Timeline**: Scroll-based journey through 6 transformation phases
- **Floating Metrics Widget**: Real-time KPIs that update based on scroll position (ai-2027.com inspired)
- **AI-Driven Content Generation**: Personalized roadmaps using LLM analysis of profile data
- **Industry-Specific Recommendations**: Tailored advice based on company industry, size, and maturity
- **Scenario-Based Planning**: Conservative, Balanced, and Aggressive timeline scenarios
- **ROI Projections**: AI-calculated investment and return projections
- **Structured Validation**: Comprehensive timeline structure validation and error handling
- **Mobile-Responsive Design**: Optimized for all device types

### 👥 **Client Profile Management**
- **ProfileWizard**: 8-step guided form implementing structured business intelligence methodology
- **Enhanced UX**: Clickable step navigation, free exploration without field blocking, smart visual completion indicators
- **Full CRUD Operations**: Create new profiles, edit existing profiles, view detailed breakdowns, delete as needed
- **Business Intelligence Capture**: Company overview, strategic issues, quantified impact analysis
- **Structured Framework**: Expected Outcomes → Problems & Opportunities → Solutions & Value → Architecture Assessment
- **Smart Validation**: Visual step indicators (completed ✓, current, incomplete) with gentle warnings instead of hard blocks
- **Secure Database Integration**: All profiles are stored securely in Supabase, requiring user authentication.
- **Demo Data System**: Load 4 realistic industry profiles directly into your authenticated account.
- **Visual Indicators**: Cloud tags for Supabase-stored profiles

### 🔐 **User Authentication & Database Management**
- **Supabase Authentication**: Email/password and magic link authentication flows
- **User Management**: Complete signup, signin, signout with email verification
- **Secure Credential Storage**: AES-256 encrypted ServiceNow credentials per user
- **Row-Level Security**: Individual user profiles with database-level protection
- **Professional UI**: Dark-themed auth forms integrated with existing design system
- **Session Management**: Persistent auth state with automatic token refresh
- **Centralized Cloud Storage**: All client profiles are stored exclusively in Supabase, ensuring data integrity and security.

### 👤 **User Profile Management**
- **Personal Profile Page**: Dedicated `/profile` page for user account management
- **Profile Editing**: Editable display name, notification preferences, and account settings
- **Account Information**: View account type, data storage details, and membership information
- **Clickable User Header**: Navigate to profile page by clicking user info in the global header
- **Theme-Aware Design**: Consistent styling with the global design system
- **Account Actions**: Secure sign-out functionality and account management options
- **Theme-Aware Components**: Profile tags with optimized contrast for both light and dark modes
- **Responsive Excellence**: Mobile-optimized layouts with professional spacing and hierarchy

### 🎨 **Design System (ai-2027.com Inspired)**
- **Professional Dark Theme**: Enterprise-grade #0a0e27 background with sophisticated color palette
- **Glass Morphism Effects**: Backdrop blur throughout with rgba overlays and subtle transparency
- **Professional Typography**: Carefully designed text hierarchy with gradient effects for emphasis
- **Smart Animations**: Hover effects with lift/glow, smooth transitions, and interactive feedback
- **Modular Component Design**: Independent form components with consistent styling patterns
- **Enterprise Color Scheme**: Professional slate colors (#f1f5f9, #e2e8f0, #cbd5e1, #94a3b8)
- **Theme-Aware Components**: Profile tags with optimized contrast for both light and dark modes
- **Responsive Excellence**: Mobile-optimized layouts with professional spacing and hierarchy

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

# Configure AI Integration (required for timeline generation)
# Create .env.local file:
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local

# Start development server
npm run dev

# Verify AI integration (optional)
curl http://localhost:3000/api/debug-env
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
2. **Sign up or sign in** to access your secure profile dashboard.
3. Create a new profile or load demo data (4 industry scenarios available) into your account.
4. Complete 8-step business intelligence assessment (click any step to jump around freely).
5. **Edit existing profiles** - click "View Details" then "Edit Profile" for full wizard editing.
6. Generate automatic AI timeline from profile data.

## Business Value & Enterprise Use Cases

### **Current Positioning**
- **Enterprise Business Intelligence Tool**: Comprehensive platform for AI transformation planning
- **Digital Twin Creation**: Structured markdown profiles create comprehensive business understanding
- **Strategic Planning**: Natural progression from assessment to implementation roadmap
- **Market Positioning**: Bridges technical capability with sophisticated business strategy

### **Enterprise Integration Ready**
- **Authentication**: ✅ Complete Supabase Auth integration with secure multi-user access
- **Database Integration**: ✅ Centralized Supabase database for all profile data.
- **Row-Level Security**: ✅ Database-level security ensuring user data isolation
- **AI Integration**: ✅ OpenAI GPT-4o integration with intelligent timeline generation
- **Export Capabilities**: Ready for PDF generation for executive reporting

## Technical Stack

### **Frontend**
- Next.js 15 with App Router (configured for strict CSS chunking)
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
- ProfileService using ProfileRepository for direct Supabase interaction
- Structured markdown for profile storage

### **AI Integration & LLM Services**
- OpenAI GPT-4o integration for timeline generation
- LLM provider architecture with extensible design
- Structured prompt engineering for business scenarios
- Profile-to-markdown conversion pipeline
- JSON response validation and error handling
- Environment configuration with debug endpoints

### **Development**
- TypeScript-ready architecture
- Jest testing framework with Supabase mocking
- ESLint for code quality
- GitHub Actions for CI/CD
- CSS Modules for component-level styling, ensuring a scalable and conflict-free architecture

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

**📞 Ready for Enterprise Deployment**: The platform successfully combines technical demonstration, strategic planning tools, comprehensive business intelligence collection, secure user authentication, a centralized Supabase database, and consistent professional theming across all pages, providing a sophisticated foundation for enterprise AI transformation planning. With the addition of **Phase 6 AI Integration**, the platform now features real OpenAI GPT-4o powered timeline generation with intelligent, industry-specific recommendations. Combined with the structured business intelligence profile system, complete authentication infrastructure, secure cloud database, global design system, and enhanced ProfileWizard with full edit capabilities and intuitive navigation, the platform now captures the depth of business intelligence needed for strategic decision-making while providing immediate value through **AI-powered timeline generation** and opportunity analysis.

**🎨 UI Consistency Status**: Complete global design system with CSS variables, theme provider, and professional theming across all pages. Light/dark mode toggle works globally with localStorage persistence.

**🔐 Authentication Status**: Complete Supabase integration with user management, encrypted credential storage, and enterprise-grade security features.

**🗄️ Database Status**: All client profile data is now exclusively stored in Supabase, with all `localStorage` fallbacks and migration code removed. This provides a more secure, scalable, and centralized data architecture.

**🤖 AI Integration Status**: ✅ Mostly Complete OpenAI GPT-4o integration with intelligent timeline generation, structured prompt engineering, transparent error handling, and comprehensive validation. Environment configuration verified via debug endpoint. **⚠️ Missing timeline caching - regenerates on every page refresh (wasteful). Progress bar scroll sync still broken on left sidebar.**

**🧪 Testing Status**: Simple MVP testing approach with 9 passing smoke tests including Supabase mocking and AI integration error handling. All tests continue to pass with AI integration updates. See `MVP_TESTING_SUMMARY.md` for details.
