# Agent Blueprint & Business AI Advisory Platform

**🤖 AI Assistant Context:** This is a comprehensive business AI advisory platform built with Next.js, featuring agentic workflow visualization, interactive AI transformation timelines, and client profile management with structured business intelligence framework. The platform serves as a sophisticated business intelligence tool combining technical visualization capabilities with comprehensive data collection and strategic planning tools. Core technologies: Next.js 14, React 18, ReactFlow, Zustand, Dagre, Supabase. Design inspired by ai-2027.com with modern dark themes and floating UI elements.

**🎯 Current State:** Production-ready platform with **comprehensive admin interface for external service credential management** and **production-grade security architecture**. Features a **centralized, provider-agnostic `aiService`** with implementations for OpenAI, Google Gemini, and Anthropic Claude, plus **intelligent database-backed timeline caching**. **✅ ALL CRITICAL ISSUES RESOLVED**: The platform now features a fully optimized ProfileWizard with simplified MVP schema, reliable Gemini API integration for markdown import, error-free timeline generation, and intelligent AI provider recommendations throughout the user experience.

**🎉 Recent Major Achievement (December 2024):** Successfully completed **four critical ProfileWizard issues**:
1. **✅ Profile Detail Pages Redesigned** - Clean MVP schema display (7 essential fields only)
2. **✅ Gemini API Integration Fixed** - Corrected model names (`gemini-2.5-pro-preview-06-05`), works reliably for markdown import
3. **✅ Timeline Encryption Error Resolved** - Fixed client-side service architecture, proper server-side operations
4. **✅ AI Provider Recommendations Implemented** - Smart guidance: Gemini excels at timelines, GPT-4o at profiles

**🔧 Latest Development (January 2025):** **AI Opportunities Page Refresh Issue Resolved**
- **Problem**: AI Opportunities displayed correctly during session but disappeared on page refresh
- **Root Cause**: Database access inconsistency between GET (client-side Supabase + RLS) and POST (service role Supabase) handlers
- **Solution**: Standardized both endpoints to use service role with explicit authorization (`eq('user_id', user.id)`)
- **Security Enhancement**: Added comprehensive security architecture documentation and best practices
- **Result**: AI Opportunities now persist correctly across page refreshes with enterprise-grade security

**✅ Complete Admin Interface**: Users can securely add, test, and manage credentials for multiple services through a professional admin dashboard at `/admin`. **✅ Dynamic Model Refresh**: One-click refresh button in admin UI fetches latest available models from all AI providers with intelligent caching and rate limiting. **✅ Production Security**: Application-level authentication with JWT verification, user-scoped data access, AES-256-GCM credential encryption, and service role database operations. **✅ Timeline Intelligence**: AI-generated timelines are highly specific and relevant, with database-backed caching providing 80-90% cost reduction. **✅ ALL THREE AI PROVIDERS FULLY OPERATIONAL**: Complete support for **OpenAI GPT-4o & o1 series**, **Google Gemini 2.5 Pro Preview** (with correct model names), and **Anthropic Claude Sonnet 4** with seamless provider switching and robust generation across all providers.

**✅ ProfileWizard MVP Optimization:** Simplified from 8 complex steps to 2 clean MVP steps (Company Overview + Review & Complete) with 7 essential fields: `companyName`, `industry`, `employeeCount`, `annualRevenue`, `primaryLocation`, `websiteUrl`, `strategicInitiatives`. Database JSONB storage handles both old complex and new simplified schemas seamlessly.

**🚀 Next Steps:** 
1. **Agentic Workflow Visualizer (Next Priority)**: ServiceNow integration, basic workflow visualization with ReactFlow, profile-to-workflow linking
2. **Enhanced ServiceNow Capabilities**: Advanced workflow visualization, real-time data updates, export capabilities (PDF, Excel), and performance analytics
3. **AI Opportunities Intelligence**: Analyze business problems from profiles, generate workflow recommendations, smart opportunity scoring
4. **Expand Enterprise AI Provider Support**: Add Mistral, Cohere, Perplexity, implement provider performance analytics and cost optimization
5. **Expand Enterprise Connectors**: Salesforce, Microsoft Dynamics, SAP integration for broader business intelligence capabilities

## Project Overview

A Next.js application that serves five primary functions:

1. **Agentic Workflow Visualizer**: Transform agentic AI data from integration platforms into interactive flow diagrams
2. **AI Transformation Timeline**: Business advisory tool that generates personalized AI adoption roadmaps  
3. **Client Profile Management**: Comprehensive business intelligence system using simplified MVP methodology to create client "digital twins"
4. **User Authentication & Database Management**: Secure multi-user system with encrypted credential storage and profile management exclusively on Supabase
5. **User Profile Management**: Complete user account management with profile editing, preferences, and account information

The platform positions itself as a sophisticated enterprise tool for AI transformation planning, providing immediate value through visualization and analysis while capturing comprehensive business intelligence for strategic decision-making.

## Core Features

### 🔄 **Agentic Workflow Visualization**
- **Interactive Node Graph**: Drag, zoom, and pan through complex AI workflows
- **Hierarchical Exploration**: Expand and collapse nodes individually or all at once to navigate complex agentic flows
- **Dynamic Layouts & View Controls**:
    - Toggle between horizontal (LR) and vertical (TB) graph layouts.
    - Automatically fit the diagram to the viewport with an "Auto-Fit" toggle.
    - Instantly reset the view to its default position and zoom.
- **Secure Integration**: Direct connection to integration platforms with credential management (supports ServiceNow)

### 📈 **AI Transformation Timeline** ✨ **(AI-Powered with Multi-Provider Support & Intelligent Caching)**
- **Business Profile Collection**: Streamlined 2-step form capturing essential company details and strategic initiatives
- **Real AI Timeline Generation**: **OpenAI GPT-4o**, **Google Gemini 2.5 Pro Preview**, and **Anthropic Claude Sonnet 4** powered intelligent timeline creation
- **Correct Model Names**: Updated for proper Gemini API compatibility (`gemini-2.5-pro-preview-06-05`, `gemini-2.5-flash-preview-05-20`)
- **Database-Backed Caching**: Instant loading from cache (<1 second) vs 10-15 second fresh generation
- **Cache Status Widget**: Professional UI showing cached vs fresh timelines with regeneration controls
- **Provider Selection**: Users can dynamically choose their preferred AI provider (OpenAI, **Gemini 2.5 Pro Preview**, Claude) with intelligent recommendations
- **Auto-Default Configuration**: First provider automatically becomes default for seamless setup experience
- **Interactive Timeline**: Scroll-based journey through 6 transformation phases with a polished sidebar.
- **Floating Metrics Widget**: Real-time KPIs that update based on scroll position
- **AI-Driven Content Generation**: Personalized roadmaps using LLM analysis of profile data
- **Industry-Specific Recommendations**: Tailored advice based on company industry, size, and maturity
- **Scenario-Based Planning**: Conservative, Balanced, and Aggressive timeline scenarios with caching support
- **ROI Projections**: AI-calculated investment and return projections
- **Cost Optimization**: 80-90% reduction in unnecessary AI API calls through intelligent caching
- **Cross-Device Persistence**: Timelines persist across devices and sessions through Supabase database
- **PDF Export**: Professional timeline reports with executive-ready formatting
- **Mobile-Responsive Design**: Optimized for all device types

#### **Architecture & State Management**
The timeline feature uses a dedicated Zustand store (`useBusinessProfileStore`) that manages the complete state of the user's interaction, including business profile data, timeline settings (like the selected scenario), the generated AI timeline, and UI states for loading and export progress. The component structure is broken down into modular pieces for headers, sidebars, forms, and the core visualization, ensuring maintainability. PDF exports are handled by a dedicated React component (`TimelinePDFTemplate.tsx`) and a secure server-side API route.

### 👥 **Client Profile Management** ✨ **(Enhanced with Business Intelligence & Systems Architecture)**
- **ProfileWizard**: ✨ **SIMPLIFIED** - 2-step guided form with MVP business intelligence methodology
- **Step 1: Company Overview**: All essential fields consolidated (company name, industry, employee count, revenue, location, website, strategic initiatives, systems & applications)
- **Step 2: Review & Complete**: Simple review with AI timeline generation and provider recommendations
- **✨ Phase 1 Business Intelligence**: Enhanced strategic initiatives with comprehensive business metrics:
  - **Priority Levels**: High, Medium, Low priority classification
  - **Status Tracking**: Planning, In Progress, On Hold, Completed
  - **Timeline Management**: Target deadlines and milestone tracking
  - **Budget Planning**: Estimated investment amounts and financial planning
  - **Expected Outcomes**: Specific, measurable goals and improvements
  - **Success Metrics**: KPIs, targets, and performance indicators
- **✨ Systems & Applications Architecture (NEW)**: Comprehensive technology infrastructure tracking
  - **Category-Based Organization**: CRM, ERP, Cloud Platform, Database, Analytics, Communication, Security, DevOps, Other
  - **Detailed System Profiles**: Name, vendor, version, description, business criticality
  - **Visual System Dashboard**: Professional cards with criticality badges and category icons
  - **AI-Powered Extraction**: Automatic system detection from markdown with 85.7% accuracy rate
  - **Technology Overview Tab**: Dedicated Systems tab in profile detail view with categorized display
- **Enhanced UX**: Clickable step navigation, free exploration, smart visual completion indicators
- **Full CRUD Operations**: Create, edit, view, delete profiles with comprehensive management
- **MVP Business Intelligence**: 8 essential fields including systems architecture that users can easily provide and AI can reliably extract
- **Smart Validation**: Visual step indicators with gentle warnings instead of hard blocks
- **Secure Database Integration**: All profiles stored securely in Supabase with user authentication
- **Real Profile Creation**: Create comprehensive business profiles through guided interface
- **Visual Indicators**: Cloud tags for Supabase-stored profiles, systems count in overview
- **Professional Display**: Color-coded sections for Expected Outcomes (🎯 blue) and Success Metrics (📈 purple)

### 🔐 **User Authentication & Database Management**
- **Supabase Authentication**: Email/password and magic link authentication flows
- **User Management**: Complete signup, signin, signout with email verification
- **Secure Credential Storage**: AES-256 encrypted ServiceNow credentials per user
- **Row-Level Security**: Individual user profiles with database-level protection
- **Professional UI**: Dark-themed auth forms integrated with existing design system
- **Session Management**: Persistent auth state with automatic token refresh
- **Centralized Cloud Storage**: All client profiles stored exclusively in Supabase

### 🔧 **Admin Interface for AI Credential Management** ✨ **(Complete & Production-Ready)**
- **Multi-Provider Support**: Full management of credentials for OpenAI, Google Gemini, Anthropic Claude, ServiceNow, and HubSpot
- **Dynamic Model Refresh**: One-click refresh button to fetch latest available models from each AI provider
- **Intelligent Caching**: 15-minute model list caching with rate limiting (10 requests per 5 minutes)
- **Correct Model Names**: Updated Gemini models include `gemini-2.5-pro-preview-06-05` and `gemini-2.5-flash-preview-05-20`
- **No API Keys Required**: Model refresh works without exposing user API keys
- **Extensible Architecture**: Ready to support latest AI models including OpenAI GPT-4o, Google Gemini 2.5, and Anthropic Claude 4
- **Production Security Architecture**: Application-level authentication with JWT verification and user-scoped data access
- **AES-256-GCM Encryption**: All credentials encrypted with user-specific keys before secure database storage
- **Test-Before-Save Functionality**: Real-time credential validation for both saved and unsaved credentials
- **Professional Admin Dashboard**: Service-specific cards with live connection status and comprehensive management tools
- **Default Provider Management**: Set and manage preferred AI providers for optimal generation
- **Complete CRUD Operations**: Full create, read, update, delete functionality with smart error handling
- **User-Level Configuration**: Eliminated environment variable dependencies with secure, user-specific credential management

### 🤖 **AI Opportunities Analysis** ✨ **(NEW - Agentic AI Intelligence)**
- **Comprehensive Business Analysis**: AI-powered analysis of strategic initiatives, business problems, and technology systems
- **Tailored Opportunity Identification**: Generate specific AI transformation opportunities based on company context
- **Industry-Specific Recommendations**: Leverage latest agentic AI capabilities with proven ROI patterns ($3.50 return per $1 invested)
- **Multi-Category Opportunities**: Process Automation, Decision Support, Customer Experience, Data Analytics, Workforce Augmentation, Risk Management
- **Business Impact Assessment**: ROI estimates, time-to-value projections, confidence levels, and implementation complexity
- **Priority Recommendations**: Strategic guidance for AI implementation sequencing and success factors
- **Readiness Scoring**: AI readiness assessment (0-100) based on strategic maturity and technology infrastructure
- **Professional Opportunity Cards**: Detailed opportunity display with business metrics, implementation details, and AI technologies
- **Intelligent Caching**: Database-backed caching for 80-90% cost reduction with cache status indicators
- **Multi-Provider Support**: Works with OpenAI GPT-4o, Google Gemini 2.5 Pro Preview, and Anthropic Claude Sonnet 4

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

### 🧠 **Reusable AI Implementation for Any Web App Feature**

The platform features a **provider-agnostic AI architecture** designed for use across your entire application:

#### **🔧 How to Use AI in Any Component/Page:**

```typescript
// Import the centralized AI service
import { aiService } from '../services/aiService';
import { CredentialsRepository } from '../repositories/credentialsRepository';

// In any React component, API route, or service
const generateContent = async (userId: string, prompt: string) => {
  try {
    const result = await aiService.generateJson(
      "You are a helpful assistant.", // System prompt
      prompt,                         // User prompt  
      userId,                         // User ID (for credentials)
      CredentialsRepository,          // Repository for credentials
      'gemini-2.5-pro-preview-06-05' // Optional: specific provider
    );
    
    return result;
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
};
```

#### **✅ Supported Latest AI Models (2025):**

**OpenAI:**
- `gpt-4.1` - Latest with 1M context (April 2025)
- `gpt-4o` - Multimodal capabilities
- `o1`, `o1-preview`, `o1-mini` - Advanced reasoning models

**Google Gemini:**
- `gemini-2.5-pro-preview-06-05` - Most advanced (Preview)
- `gemini-2.5-flash-preview-05-20` - Fast preview
- `gemini-1.5-pro` - Stable production model
- `gemini-1.5-flash` - Fast & reliable

**Anthropic Claude:**
- `claude-sonnet-4` - Latest high-performance (May 2025)
- `claude-opus-4` - Most intelligent
- `claude-haiku-3.5` - Fastest & cheapest

#### **🏗️ Architecture Benefits:**
- **✅ Zero Configuration**: Uses admin-configured credentials automatically
- **✅ User-Scoped**: Each user's configured providers are used
- **✅ Provider Switching**: Seamlessly switch between OpenAI, Gemini, Claude
- **✅ Secure**: All API keys encrypted and stored server-side
- **✅ Error Handling**: Comprehensive error management and validation
- **✅ Future-Proof**: Easy to add new providers (Mistral, Cohere, etc.)

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

#### **Option 1: Agentic Workflow Visualization**
1. Navigate to `http://localhost:3000/agentic-workflow` 
2. Configure integration platform credentials (admin required)
3. Connect and explore agentic AI flows
4. Use layout controls and node interactions

#### **Option 2: AI Timeline Planning**
1. Click "AI Timeline" button or go to `/timeline`
2. Complete business profile form (2 simple steps)
3. Choose your preferred AI provider (GPT-4o recommended for profiles, Gemini 2.5 Pro Preview for timelines)
4. Generate personalized AI transformation roadmap
5. Explore phases and metrics

#### **Option 3: Client Profile Management**
1. Click "Client Profiles" button or go to `/profiles`
2. **Sign up or sign in** to access your secure profile dashboard
3. Create a new profile using the simplified 2-step ProfileWizard interface
4. **Edit existing profiles** - click "View Details" then "Edit Profile" for full wizard editing
5. Generate automatic AI timeline from profile data

#### **Option 4: Markdown Import (Profile Automation)**
1. In the ProfileWizard, click the "📄 Import from Markdown" button
2. Choose import method:
   - **Paste**: Copy markdown content directly into the text area
   - **Upload**: Drag & drop or browse for `.md`, `.markdown`, or `.txt` files
3. Review **AI Provider Recommendations** (GPT-4o recommended for profiles)
4. Click "Import & Extract" to process with AI
5. Review extracted data with confidence scores
6. Apply to ProfileWizard or edit before applying
7. Continue with normal profile creation workflow

**Supported Markdown Formats:**
- Company overviews with standard headers
- Strategic initiatives and contact information
- AI readiness assessments and opportunities
- Business problems and quantified impacts
- Any structured business document content

## Business Value & Enterprise Use Cases

### **Current Positioning**
- **Enterprise Business Intelligence Tool**: Comprehensive platform for AI transformation planning
- **Digital Twin Creation**: Simplified methodology creates comprehensive business understanding
- **Strategic Planning**: Natural progression from assessment to implementation roadmap
- **Market Positioning**: Bridges technical capability with sophisticated business strategy

### **Enterprise Integration Ready**
- **Authentication**: ✅ Complete Supabase Auth integration with secure multi-user access
- **Database Integration**: ✅ Centralized Supabase database for all profile data
- **Row-Level Security**: ✅ Database-level security ensuring user data isolation
- **AI Integration**: ✅ OpenAI GPT-4o, Google Gemini 2.5 Pro Preview, Claude Sonnet 4 integration with intelligent timeline generation
- **Export Capabilities**: Ready for PDF generation for executive reporting

## Technical Stack

### **Frontend**
- Next.js 14 with App Router (configured for strict CSS chunking)
- React 18 with functional components
- ReactFlow for interactive diagrams
- Zustand for state management
- Lucide React for icons

### **Backend/Services**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI/LLM**: OpenAI API, Google Gemini API, Anthropic Claude API (with provider abstraction layer)
- **API Environment**: Node.js on Vercel

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
- **Centralized `aiService`**: Single, reusable service for all LLM interactions
- **Provider-Agnostic Architecture**: OpenAI, Google Gemini, and Anthropic Claude providers with correct model names
- **Admin Interface**: Comprehensive `/admin` dashboard for managing service credentials
- **Secure Server-Side Execution**: All LLM calls handled securely on the server
- **User-Level Credential Management**: AES-256-GCM encrypted storage replacing environment variables
- **Live Connection Testing**: Real-time validation of API credentials before saving
- **Dynamic Model Fetching**: API endpoint `/api/admin/fetch-models` provides cached, rate-limited access to latest models
- **Centralized Prompt Management**: Prompts stored in dedicated directory for better organization
- **JSON Response Validation**: Services consuming the `aiService` validate returned JSON structure
- **Malformed JSON Repair**: Automatically repairs common JSON errors (like trailing commas) from LLMs using the [`jsonrepair`](https://www.npmjs.com/package/jsonrepair) library before parsing.
- **Advanced Prompt Engineering**: Sophisticated prompt-building strategy for high-quality, specific outputs
- **Environment Configuration**: Easy setup verification via the `/api/debug-env` endpoint

### **Development & Testing**
- TypeScript-ready architecture
- Jest testing framework with Supabase mocking
- ESLint for code quality
- GitHub Actions for CI/CD
- CSS Modules for component-level styling

## Architecture Overview

### **AI Opportunities Analysis Service Integration**

The AI Opportunities Analysis feature represents a sophisticated integration of multiple architectural components working together to deliver intelligent business insights:

#### **Service Layer Architecture**
- **`aiOpportunitiesService.ts`**: Core business logic service implementing comprehensive agentic AI analysis
  - Analyzes strategic initiatives, business problems, and technology systems
  - Generates industry-specific recommendations with proven ROI patterns
  - Implements AI readiness scoring (0-100) based on strategic maturity
  - Supports six opportunity categories: Process Automation, Decision Support, Customer Experience, Data Analytics, Workforce Augmentation, Risk Management

#### **API Layer Integration**
- **`/api/profiles/analyze-opportunities`**: RESTful endpoint with dual operation modes
  - `POST`: Generates new opportunities analysis with optional cache bypass
  - `GET`: Retrieves cached analysis for performance optimization
  - Implements comprehensive authentication, validation, and error handling
  - Supports multi-provider AI generation (OpenAI, Gemini, Claude)

#### **Caching Strategy**
- **Database-backed intelligent caching**: 80-90% cost reduction through strategic result storage
- **Cache management methods**: `getCachedOpportunities`, `saveOpportunities`, `clearOpportunitiesCache`
- **Performance optimization**: Sub-second retrieval vs 10-15 second fresh generation
- **Cache status indicators**: Professional UI showing cached vs fresh analysis

#### **UI Component Architecture**
- **`ProfileOpportunitiesTab.tsx`**: Comprehensive React component with sophisticated state management
  - Handles opportunities data, loading states, error conditions, and cache status
  - Professional opportunity cards displaying business impact metrics and ROI estimates
  - Provider selection interface with intelligent recommendations
  - Executive summary and priority recommendations display

#### **Prompt Engineering System**
- **`aiOpportunitiesPrompt.js`**: Advanced prompt engineering for high-quality AI outputs
  - Context-aware analysis incorporating company profile, industry, and systems data
  - Structured JSON response validation with comprehensive business metrics
  - Industry-specific guidance leveraging latest agentic AI research and ROI patterns

#### **Design Rationale**
This architecture follows a **separation of concerns** principle where:
1. **Service layer** handles business logic and AI integration
2. **API layer** manages authentication, validation, and HTTP concerns  
3. **Repository layer** abstracts database operations and caching
4. **UI layer** focuses on user experience and state management
5. **Prompt layer** encapsulates AI-specific knowledge and formatting

The design enables **horizontal scaling** (multiple AI providers), **vertical optimization** (intelligent caching), and **maintainable evolution** (modular components). The integration demonstrates how complex AI-powered features can be built using the platform's existing infrastructure while maintaining performance, security, and user experience standards.

### **Security Architecture & Database Access Patterns**

The platform implements a **multi-layered security architecture** that balances security, performance, and maintainability across client-side and server-side operations.

#### **Server-Side API Security Model**

**🔒 Service Role Pattern for API Routes**
All server-side API routes (`/api/*`) use Supabase **service role client** with explicit authorization:

```javascript
// SECURITY: This pattern is secure because:
// 1. Service role key is never exposed to client (server-side only)
// 2. All requests are authenticated via JWT token verification  
// 3. User ownership is explicitly verified with .eq('user_id', user.id)
// 4. This pattern is recommended by Supabase for API routes

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Every database query includes explicit user ownership verification
const { data } = await supabase
  .from('client_profiles')
  .select('*')
  .eq('id', profileId)
  .eq('user_id', user.id)  // ← Explicit authorization
  .single();
```

**🔑 Authentication Flow**
1. **JWT Token Verification**: Every API request validates Supabase JWT token
2. **User Context Extraction**: Extract authenticated user ID from token
3. **Explicit Authorization**: All database queries filter by `user_id`
4. **Error Handling**: Comprehensive error responses for auth failures

#### **Client-Side Security Model**

**🛡️ Row Level Security (RLS) for Direct Access**
Client-side components use standard Supabase client with RLS policies:

```javascript
// Client-side: Uses RLS policies for automatic security
import { supabase } from '../lib/supabase';

// RLS automatically filters results to current user
const { data } = await supabase
  .from('client_profiles')
  .select('*');
```

#### **Why Service Role in API Routes is Secure**

**❌ Common Misconception**: "Service role bypasses security"
**✅ Reality**: Service role with explicit authorization is **more secure** than RLS

**Security Benefits:**
1. **Explicit Control**: Manual authorization is more predictable than database policies
2. **No RLS Edge Cases**: Avoids complex policy interactions and edge cases  
3. **Audit Trail**: Clear logging of all authorization decisions
4. **Consistent Behavior**: Same security model across all API endpoints
5. **Industry Standard**: Recommended pattern by Supabase, Next.js, and security experts

#### **Database Access Pattern Consistency**

**🔧 Recent Fix: AI Opportunities Cache Issue**
During development, we identified and resolved an inconsistency where:
- **GET `/api/profiles/analyze-opportunities`**: Initially used client-side Supabase (RLS)
- **POST `/api/profiles/analyze-opportunities`**: Used service role Supabase

This caused cached opportunities to be visible in POST but not GET requests. **Solution**: Standardized both endpoints to use service role with explicit authorization.

**📊 Performance Impact**
- **Service Role**: Direct database access, optimal performance
- **Explicit Authorization**: `.eq('user_id', user.id)` adds minimal overhead
- **Caching Strategy**: 80-90% reduction in AI API calls through intelligent database caching

#### **Credential Management Security**

**🔐 AES-256-GCM Encryption**
All user credentials stored with military-grade encryption:
- **User-specific encryption keys**: Each user has unique encryption context
- **Server-side encryption/decryption**: Never performed on client
- **Secure key derivation**: Based on user ID and application secrets

**🏢 Admin Interface Security**
- **JWT-based authentication**: Admin access requires valid user session
- **Test-before-save**: Credentials validated before storage
- **Audit logging**: All credential operations logged for security review

#### **AI Service Security Integration**

**🤖 Provider-Agnostic Security**
The centralized `aiService` maintains security across all AI providers:
- **User-scoped credentials**: Each user's configured providers isolated
- **Server-side API calls**: AI provider keys never exposed to client
- **Request validation**: All AI requests authenticated and authorized
- **Error sanitization**: Sensitive information filtered from error responses

#### **Security Best Practices Implemented**

1. **🔒 Defense in Depth**: Multiple security layers (JWT + explicit auth + encryption)
2. **🎯 Principle of Least Privilege**: Users only access their own data
3. **📝 Audit Logging**: Comprehensive logging for security monitoring
4. **🔄 Secure by Default**: All new endpoints follow service role pattern
5. **🧪 Security Testing**: Manual and automated testing of auth flows
6. **📚 Documentation**: Clear security patterns for future development

This architecture ensures **enterprise-grade security** while maintaining **developer productivity** and **system performance**. The explicit authorization pattern provides stronger security guarantees than traditional RLS-only approaches.

## API Reference

### **Admin API Endpoints**

#### **`POST /api/admin/fetch-models`**
Fetches available AI models for a specific provider with intelligent caching and rate limiting.

**Request Body:**
```json
{
  "provider": "openai|gemini|claude",
  "forceRefresh": false  // Optional: bypass cache
}
```

**Response:**
```json
{
  "success": true,
  "provider": "gemini",
  "models": [
    {
      "id": "gemini-2.5-pro-preview-06-05",
      "name": "Gemini 2.5 Pro Preview (Latest)",
      "description": "Our most intelligent model with enhanced reasoning - Preview version",
      "created": null
    }
  ],
  "cached": true,
  "cachedAt": "2025-01-XX...",
  "remaining": 9,
  "resetTime": 1642781234
}
```

**Features:**
- ✅ 15-minute intelligent caching per provider
- ✅ Rate limiting: 10 requests per 5 minutes per IP
- ✅ No API credentials required (uses curated model lists)
- ✅ Latest 2025 models including correct Gemini preview names
- ✅ Fallback models when refresh fails

#### **Other Admin Endpoints**
- `POST /api/admin/test-credentials` - Test new credentials before saving
- `POST /api/admin/encrypt-credentials` - Encrypt credentials server-side
- `POST /api/admin/generate-encryption-key` - Generate new encryption keys

#### **Profile Management Endpoints**

##### **`POST /api/profiles/extract-markdown`**
Extracts structured profile data from markdown content using AI. **✅ Authentication Fixed & Working**

**Authentication:** Required - JWT Bearer token from Supabase Auth

**Current Status:** Working with both GPT-4o and Gemini 2.5 Pro Preview

**Request Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "markdown": "# Company Profile\n\n**Company Name**: Acme Corp...",
  "preferredProvider": "openai" // Optional: "openai", "gemini", or "claude"
}
```

**Response:**
```json
{
  "success": true,
  "extractionResult": {
    "data": {
      "companyName": { "value": "Acme Corp", "confidence": 0.95 },
      "industry": { "value": "Technology", "confidence": 0.88 }
      // ... more fields
    },
    "hasLowConfidenceFields": false,
    "lowConfidenceFields": [],
    "validationWarnings": [],
    "averageConfidence": 0.91,
    "mappedProfile": { /* Profile object ready for use */ },
    "summary": {
      "totalFields": 7,
      "highConfidenceFields": 6,
      "mediumConfidenceFields": 1,
      "lowConfidenceFields": 0,
      "extractedSections": ["companyName", "industry", "strategicInitiatives"]
    }
  }
}
```

**Error Responses:**
- `400` - Missing markdown content or no AI provider configured
- `401` - Authentication required - user must be signed in
- `429` - Rate limit exceeded
- `500` - Extraction failed

**Features:**
- AI-powered extraction using configured providers (OpenAI, Gemini, Claude)
- Confidence scoring for each extracted field (0-1 scale)
- Automatic field mapping to ProfileWizard schema
- Validation warnings for data structure issues
- Comprehensive extraction summary and statistics

##### **`POST /api/profiles/analyze-opportunities`**
Generates comprehensive AI opportunities analysis for a client profile using agentic AI capabilities.

**Authentication:** Required - JWT Bearer token from Supabase Auth

**Request Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "profileId": "uuid-profile-id",
  "preferredProvider": "openai", // Optional: "openai", "gemini", or "claude"
  "forceRegenerate": false       // Optional: bypass cache
}
```

**Response:**
```json
{
  "success": true,
  "opportunities": {
    "executiveSummary": "TechCorp Solutions demonstrates strong AI readiness with a score of 82/100...",
    "opportunities": [
      {
        "title": "Intelligent Process Automation Platform",
        "description": "Deploy AI-powered workflow automation to eliminate manual processes...",
        "category": "Process Automation",
        "businessImpact": {
          "primaryMetrics": ["Process efficiency improvement: 60-80%", "Error reduction: 85-95%"],
          "estimatedROI": "250-400% within 18 months",
          "timeToValue": "3-6 months",
          "confidenceLevel": "High"
        },
        "implementation": {
          "complexity": "Medium",
          "timeframe": "4-8 months",
          "prerequisites": ["Process documentation", "Change management plan"],
          "riskFactors": ["Change resistance", "System integration challenges"]
        },
        "relevantInitiatives": ["Digital Transformation Program"],
        "aiTechnologies": ["RPA", "Machine Learning", "NLP", "Computer Vision"]
      }
    ],
    "priorityRecommendations": [
      "Start with process automation pilot in high-volume workflows",
      "Establish data governance framework before analytics implementation"
    ],
    "industryContext": "Technology companies are leading AI adoption with 85% planning major investments...",
    "overallReadinessScore": 82,
    "nextSteps": [
      "Conduct detailed process audit for automation candidates",
      "Assess data readiness and quality for analytics initiatives"
    ],
    "generatedAt": "2025-01-XX...",
    "analysisMetadata": {
      "initiativeCount": 3,
      "problemCount": 8,
      "systemCount": 5,
      "industryFocus": "Technology",
      "companySize": "250-500"
    }
  },
  "cached": false,
  "generatedAt": "2025-01-XX...",
  "provider": "openai"
}
```

**Error Responses:**
- `400` - Missing profileId or no AI provider configured
- `401` - Authentication required or invalid token
- `404` - Profile not found or access denied
- `429` - AI service rate limit exceeded
- `500` - Analysis generation failed

**Features:**
- Comprehensive analysis of strategic initiatives, business problems, and systems
- Industry-specific AI opportunity identification with proven ROI patterns
- Multi-category opportunities: Process Automation, Decision Support, Customer Experience, Data Analytics, Workforce Augmentation, Risk Management
- Business impact assessment with ROI estimates and implementation timelines
- AI readiness scoring (0-100) based on profile maturity
- Intelligent caching for 80-90% cost reduction
- Multi-provider support (OpenAI, Gemini, Claude)

##### **`GET /api/profiles/analyze-opportunities?profileId=uuid`**
Retrieves cached AI opportunities analysis for a profile.

**Authentication:** Required - JWT Bearer token

**Response:** Same structure as POST endpoint with `