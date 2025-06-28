# AI Business Advisory Platform - Development Instructions

## 🎯 **Current Task: Inline Blueprint Generation System** (January 2025)

**Objective**: Transform the AI Opportunities → Blueprint workflow from a confusing dual-path system into a seamless inline experience with robust testing, logging, and modular prompt architecture.

**Problem Statement**: Users are confused by competing workflows (Initiative selector vs. Opportunity-based blueprints). Need single-path, inline blueprint generation with comprehensive comparison capabilities.

**Target Outcome**: AI Opportunities tab becomes the primary blueprint interface with inline generation, progressive disclosure, and side-by-side comparison capabilities.

---

## 🚀 **Implementation Game Plan: 5-Phase Approach**

### **Phase 1: Foundation & Infrastructure** (Days 1-2)
**Goal**: Set up robust foundation for inline functionality

#### **1.1 Enhanced Logging System**
```typescript
// New logging utility: app/utils/inlineLogger.ts
export class InlineLogger {
  static logOpportunityAction(action: string, opportunity: AIOpportunity, metadata?: any) {
    console.group(`🎯 [Opportunity: ${opportunity.title}]`);
    console.log(`📊 Action: ${action}`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    console.log(`📋 Opportunity:`, opportunity);
    if (metadata) console.log(`🔍 Metadata:`, metadata);
    console.groupEnd();
  }
  
  static logBlueprintGeneration(phase: string, data?: any) {
    console.group(`🤖 [Blueprint Generation: ${phase}]`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    if (data) console.log(`📊 Data:`, data);
    console.groupEnd();
  }
  
  static logError(context: string, error: any, additionalData?: any) {
    console.group(`❌ [Error: ${context}]`);
    console.error(`💥 Error:`, error);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    if (additionalData) console.log(`🔍 Context:`, additionalData);
    console.groupEnd();
  }
}
```

#### **1.2 Modular Prompt System Architecture**
```typescript
// New file: app/lib/llm/prompts/inlineBlueprintPrompts.ts
export interface InlineBlueprintPromptConfig {
  opportunity: AIOpportunity;
  profile: Profile;
  provider: 'openai' | 'claude' | 'gemini';
  version: string;
  customInstructions?: string;
  focusMode: 'opportunity-only' | 'initiative-related' | 'comprehensive';
}

export class InlineBlueprintPromptBuilder {
  private static promptVersions = {
    'v1.0': 'Base inline prompt',
    'v1.1': 'Enhanced domain intelligence',
    'v1.2': 'Cross-provider optimization'
  };
  
  static buildSystemPrompt(config: InlineBlueprintPromptConfig): string {
    // Provider-specific optimizations
    const providerOptimizations = this.getProviderOptimizations(config.provider);
    const domainContext = this.extractDomainContext(config.opportunity, config.profile);
    const focusInstructions = this.getFocusInstructions(config.focusMode);
    
    return this.combinePromptSections([
      providerOptimizations,
      domainContext,
      focusInstructions,
      config.customInstructions
    ]);
  }
}
```

#### **1.3 State Management Setup**
```typescript
// Extended state for AIOpportunitiesTab.tsx
interface OpportunityBlueprintState {
  opportunity: AIOpportunity;
  blueprint: AgenticBlueprint | null;
  isGenerating: boolean;
  generationProgress: number; // 0-100
  error: string | null;
  generatedAt: string | null;
  isExpanded: boolean;
  promptVersion: string;
  aiProvider: string;
}

const [opportunityBlueprints, setOpportunityBlueprints] = useState<Map<string, OpportunityBlueprintState>>(new Map());
const [selectedBlueprintsForComparison, setSelectedBlueprintsForComparison] = useState<Set<string>>(new Set());
```

**Testing Checkpoint 1**: Verify logging works, prompt system loads, state initializes correctly

---

### **Phase 2: Core Inline Functionality** (Days 3-4)
**Goal**: Implement basic inline blueprint generation with robust error handling

#### **2.1 API Enhancement**
```typescript
// Extended API: app/api/profiles/generate-inline-blueprint/route.ts
export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    console.log('🚀 [API] Inline blueprint generation started');
    
    const { opportunity, profile, customInstructions, focusMode } = await request.json();
    
    // Progress tracking simulation
    const progressCallback = (progress: number, phase: string) => {
      console.log(`📊 [API] Progress: ${progress}% - ${phase}`);
      // Future: WebSocket or SSE for real-time progress
    };
    
    const blueprint = await AgenticBlueprintService.generateInlineBlueprint(
      opportunity,
      profile,
      userId,
      credentialsRepo,
      { customInstructions, focusMode, progressCallback }
    );
    
    const duration = Date.now() - startTime;
    console.log(`✅ [API] Blueprint generated in ${duration}ms`);
    
    return NextResponse.json({
      success: true,
      blueprint,
      metadata: { duration, promptVersion: '1.0', provider: 'auto' }
    });
    
  } catch (error) {
    console.error('❌ [API] Blueprint generation failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

#### **2.2 Inline Generation Logic**
```typescript
// Enhanced AIOpportunitiesTab.tsx
const generateInlineBlueprint = async (opportunity: AIOpportunity, opportunityIndex: number) => {
  const opportunityKey = `${opportunity.title}-${opportunityIndex}`;
  
  InlineLogger.logOpportunityAction('BLUEPRINT_GENERATION_START', opportunity, { opportunityIndex });
  
  // Update state to show loading
  setOpportunityBlueprints(prev => new Map(prev).set(opportunityKey, {
    opportunity,
    blueprint: null,
    isGenerating: true,
    generationProgress: 0,
    error: null,
    generatedAt: null,
    isExpanded: false,
    promptVersion: '1.0',
    aiProvider: 'auto'
  }));
  
  try {
    // Simulate progress updates (future: real WebSocket updates)
    const progressUpdates = [
      { progress: 20, phase: 'Analyzing opportunity requirements' },
      { progress: 40, phase: 'Selecting optimal agentic pattern' },
      { progress: 60, phase: 'Generating agent roles and responsibilities' },
      { progress: 80, phase: 'Calculating ROI projections' },
      { progress: 100, phase: 'Finalizing blueprint' }
    ];
    
    for (const update of progressUpdates) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
      setOpportunityBlueprints(prev => {
        const current = prev.get(opportunityKey);
        if (current) {
          return new Map(prev).set(opportunityKey, {
            ...current,
            generationProgress: update.progress
          });
        }
        return prev;
      });
      
      InlineLogger.logBlueprintGeneration('PROGRESS_UPDATE', update);
    }
    
    // Actual API call
    const response = await fetch('/api/profiles/generate-inline-blueprint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        opportunity,
        profile,
        customInstructions: '',
        focusMode: 'opportunity-only'
      })
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Blueprint generation failed');
    }
    
    // Update state with generated blueprint
    setOpportunityBlueprints(prev => new Map(prev).set(opportunityKey, {
      opportunity,
      blueprint: result.blueprint,
      isGenerating: false,
      generationProgress: 100,
      error: null,
      generatedAt: new Date().toISOString(),
      isExpanded: true, // Auto-expand on success
      promptVersion: result.metadata.promptVersion,
      aiProvider: result.metadata.provider
    }));
    
    InlineLogger.logBlueprintGeneration('GENERATION_SUCCESS', {
      blueprintId: result.blueprint.id,
      duration: result.metadata.duration,
      provider: result.metadata.provider
    });
    
  } catch (error) {
    InlineLogger.logError('BLUEPRINT_GENERATION', error, { opportunity, opportunityIndex });
    
    setOpportunityBlueprints(prev => new Map(prev).set(opportunityKey, {
      opportunity,
      blueprint: null,
      isGenerating: false,
      generationProgress: 0,
      error: error.message,
      generatedAt: null,
      isExpanded: false,
      promptVersion: '1.0',
      aiProvider: 'auto'
    }));
  }
};
```

**Testing Checkpoint 2**: Generate single inline blueprint, verify state management, check error handling

---

### **Phase 3: Enhanced UX & Multiple Blueprints** (Days 5-6)
**Goal**: Polish user experience and enable multiple blueprint comparison

#### **3.1 Progressive Loading UI**
```typescript
// New component: app/profile/components/InlineBlueprintGenerator.tsx
const InlineBlueprintGenerator: FC<{
  opportunity: AIOpportunity;
  blueprintState: OpportunityBlueprintState;
  onGenerate: () => void;
  onToggleExpansion: () => void;
}> = ({ opportunity, blueprintState, onGenerate, onToggleExpansion }) => {
  
  if (!blueprintState.blueprint && !blueprintState.isGenerating) {
    return (
      <div className="blueprint-generator">
        <button 
          className="btn-primary generate-blueprint-btn"
          onClick={onGenerate}
        >
          🤖 Generate AI Digital Team Blueprint
          <span className="btn-subtitle">
            Specialized agents for this opportunity using {opportunity.agenticPattern?.recommendedPattern} pattern
          </span>
        </button>
      </div>
    );
  }
  
  if (blueprintState.isGenerating) {
    return (
      <div className="blueprint-generating">
        <div className="generation-header">
          <RefreshCw className="animate-spin" />
          <span>Generating specialized AI team for this opportunity...</span>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${blueprintState.generationProgress}%` }}
            />
          </div>
          <span className="progress-text">{blueprintState.generationProgress}%</span>
        </div>
        
        <div className="generation-steps">
          <div className={blueprintState.generationProgress >= 20 ? 'step completed' : 'step pending'}>
            ✓ Analyzing business requirements
          </div>
          <div className={blueprintState.generationProgress >= 40 ? 'step completed' : 'step pending'}>
            {blueprintState.generationProgress >= 40 ? '✓' : '⟳'} Selecting optimal agentic pattern
          </div>
          <div className={blueprintState.generationProgress >= 60 ? 'step completed' : 'step pending'}>
            {blueprintState.generationProgress >= 60 ? '✓' : '⧖'} Designing agent roles and interactions
          </div>
          <div className={blueprintState.generationProgress >= 80 ? 'step completed' : 'step pending'}>
            {blueprintState.generationProgress >= 80 ? '✓' : '⧖'} Calculating ROI projections
          </div>
        </div>
        
        <div className="estimated-time">
          Estimated time remaining: {Math.max(0, 3 - Math.floor(blueprintState.generationProgress / 33))} minutes
        </div>
      </div>
    );
  }
  
  // Blueprint generated - show summary
  return (
    <div className="blueprint-generated">
      <BlueprintInlineSummary 
        blueprint={blueprintState.blueprint!}
        isExpanded={blueprintState.isExpanded}
        onToggleExpansion={onToggleExpansion}
        metadata={{
          generatedAt: blueprintState.generatedAt!,
          promptVersion: blueprintState.promptVersion,
          aiProvider: blueprintState.aiProvider
        }}
      />
    </div>
  );
};
```

#### **3.2 Blueprint Comparison System**
```typescript
// New component: app/profile/components/BlueprintComparison.tsx
const BlueprintComparison: FC<{
  blueprints: Map<string, OpportunityBlueprintState>;
  selectedForComparison: Set<string>;
  onToggleSelection: (key: string) => void;
}> = ({ blueprints, selectedForComparison, onToggleSelection }) => {
  
  const selectedBlueprints = Array.from(selectedForComparison)
    .map(key => blueprints.get(key))
    .filter(bp => bp?.blueprint);
  
  if (selectedBlueprints.length === 0) return null;
  
  return (
    <div className="blueprint-comparison">
      <div className="comparison-header">
        <h4>🔀 Blueprint Comparison ({selectedBlueprints.length})</h4>
        <button onClick={() => selectedForComparison.clear()}>
          Clear All
        </button>
      </div>
      
      <div className="comparison-grid">
        {selectedBlueprints.map((blueprintState, index) => (
          <div key={index} className="comparison-card">
            <BlueprintComparisonCard 
              blueprint={blueprintState!.blueprint!}
              opportunity={blueprintState!.opportunity}
              metadata={{
                aiProvider: blueprintState!.aiProvider,
                promptVersion: blueprintState!.promptVersion
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="comparison-actions">
        <button className="btn-primary">
          📊 Export Comparison Report
        </button>
        <button className="btn-secondary">
          📋 Create Implementation Roadmap
        </button>
      </div>
    </div>
  );
};
```

**Testing Checkpoint 3**: Generate multiple blueprints, test comparison UI, verify responsive design

---

### **Phase 4: Advanced Features & Polish** (Days 7-8)
**Goal**: Add sophisticated features and optimize performance

#### **4.1 Blueprint Regeneration with Options**
```typescript
// Advanced generation options
const regenerateBlueprintWithOptions = async (
  opportunity: AIOpportunity, 
  options: {
    focusMode: 'opportunity-only' | 'initiative-related' | 'comprehensive';
    customInstructions?: string;
    aiProvider?: string;
    agenticPattern?: string; // Override recommended pattern
  }
) => {
  InlineLogger.logOpportunityAction('BLUEPRINT_REGENERATION', opportunity, options);
  
  // Show regeneration modal with options
  setRegenerationModal({
    visible: true,
    opportunity,
    options: {
      focusMode: options.focusMode || 'opportunity-only',
      availablePatterns: ['Manager-Workers', 'ReAct', 'Plan-Act-Reflect', 'Tool-Use'],
      availableProviders: ['openai', 'claude', 'gemini'],
      customInstructions: options.customInstructions || ''
    }
  });
};
```

#### **4.2 Performance Optimization**
```typescript
// Memoization for expensive operations
const memoizedBlueprintSummary = useMemo(() => {
  return Array.from(opportunityBlueprints.entries())
    .filter(([, state]) => state.blueprint)
    .map(([key, state]) => ({
      key,
      opportunity: state.opportunity,
      blueprint: state.blueprint!,
      roi: state.blueprint!.roiProjection?.roiPercentage || 0,
      agents: state.blueprint!.digitalTeam.length,
      pattern: state.blueprint!.selectedPattern
    }));
}, [opportunityBlueprints]);

// Virtual scrolling for large numbers of opportunities
const virtualizationConfig = {
  itemHeight: 400, // Average opportunity card height
  overscan: 2,     // Render 2 extra items for smooth scrolling
  threshold: 10    // Enable virtualization after 10 opportunities
};
```

**Testing Checkpoint 4**: Test advanced options, verify performance with multiple blueprints, check mobile responsiveness

---

### **Phase 5: Integration & Production Readiness** (Days 9-10)
**Goal**: Integrate with existing systems and prepare for production

#### **5.1 Blueprint Tab Transformation**
```typescript
// Redesigned AIBlueprintTab.tsx as "Blueprint Library"
const BlueprintLibrary: FC = () => {
  const [blueprintHistory, setBlueprintHistory] = useState<AgenticBlueprint[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({
    pattern: 'all',
    roiRange: [0, 1000],
    dateRange: 'all'
  });
  
  return (
    <div className="blueprint-library">
      <div className="library-header">
        <h3>📚 Generated Blueprint Library</h3>
        <p>Archive and comparison view of all your generated AI blueprints</p>
      </div>
      
      <div className="library-filters">
        <BlueprintFilter 
          criteria={filterCriteria}
          onChange={setFilterCriteria}
        />
      </div>
      
      <div className="library-grid">
        <BlueprintHistoryView 
          blueprints={blueprintHistory}
          onExport={exportBlueprint}
          onDuplicate={duplicateBlueprint}
          onArchive={archiveBlueprint}
        />
      </div>
    </div>
  );
};
```

#### **5.2 Analytics & Usage Tracking**
```typescript
// New service: app/services/blueprintAnalyticsService.ts
export class BlueprintAnalyticsService {
  static trackBlueprintGeneration(
    opportunity: AIOpportunity,
    blueprint: AgenticBlueprint,
    metadata: {
      duration: number;
      provider: string;
      promptVersion: string;
    }
  ) {
    const analyticsEvent = {
      event: 'blueprint_generated',
      timestamp: new Date().toISOString(),
      opportunity_category: opportunity.category,
      agentic_pattern: blueprint.selectedPattern,
      roi_percentage: blueprint.roiProjection?.roiPercentage,
      generation_duration: metadata.duration,
      ai_provider: metadata.provider,
      prompt_version: metadata.promptVersion
    };
    
    console.log('📊 [Analytics]', analyticsEvent);
    
    // Future: Send to analytics service
    // await sendAnalytics(analyticsEvent);
  }
  
  static trackBlueprintComparison(blueprints: AgenticBlueprint[]) {
    console.log('📊 [Analytics] Blueprint comparison:', {
      comparison_count: blueprints.length,
      patterns_compared: blueprints.map(bp => bp.selectedPattern),
      roi_range: {
        min: Math.min(...blueprints.map(bp => bp.roiProjection?.roiPercentage || 0)),
        max: Math.max(...blueprints.map(bp => bp.roiProjection?.roiPercentage || 0))
      }
    });
  }
}
```

**Testing Checkpoint 5**: End-to-end user journey testing, performance validation, analytics verification

---

## 🧪 **Testing Strategy**

### **Automated Testing**
```typescript
// New test file: app/__tests__/features/inline-blueprint-generation.test.tsx
describe('Inline Blueprint Generation', () => {
  
  test('should generate blueprint inline without navigation', async () => {
    // Setup: Mock opportunity and profile
    // Action: Click generate blueprint
    // Assert: Blueprint appears inline, no navigation occurs
  });
  
  test('should handle multiple blueprint generation', async () => {
    // Setup: Multiple opportunities
    // Action: Generate blueprints for each
    // Assert: Each blueprint is independent and cached correctly
  });
  
  test('should support blueprint comparison', async () => {
    // Setup: Multiple generated blueprints
    // Action: Select for comparison
    // Assert: Comparison view shows side-by-side analysis
  });
});
```

### **Manual Testing Checklist**
- [ ] Single blueprint generation works end-to-end
- [ ] Multiple blueprints can be generated simultaneously
- [ ] Loading states are clear and informative
- [ ] Error handling gracefully recovers
- [ ] Mobile experience is responsive
- [ ] Blueprint comparison functions correctly
- [ ] Performance remains smooth with 5+ blueprints
- [ ] Logging provides actionable debugging information

---

## 🔧 **Configuration & Modularity**

### **Prompt Configuration System**
```typescript
// app/config/inlineBlueprintConfig.ts
export const INLINE_BLUEPRINT_CONFIG = {
  prompts: {
    versions: ['1.0', '1.1', '1.2'],
    defaultVersion: '1.2',
    providers: {
      openai: {
        systemPromptTemplate: 'openai_inline_blueprint_v1_2.txt',
        maxTokens: 4000,
        temperature: 0.7
      },
      claude: {
        systemPromptTemplate: 'claude_inline_blueprint_v1_2.txt',
        maxTokens: 4000,
        temperature: 0.7
      },
      gemini: {
        systemPromptTemplate: 'gemini_inline_blueprint_v1_2.txt',
        maxTokens: 4000,
        temperature: 0.7
      }
    }
  },
  ui: {
    enableProgressAnimation: true,
    autoExpandOnGeneration: true,
    maxConcurrentGenerations: 3,
    enableComparison: true
  },
  performance: {
    enableVirtualization: true,
    virtualizationThreshold: 10,
    cacheSize: 50
  }
};
```

### **Feature Flags**
```typescript
// app/utils/featureFlags.ts
export const FEATURE_FLAGS = {
  INLINE_BLUEPRINT_GENERATION: true,
  BLUEPRINT_COMPARISON: true,
  ADVANCED_REGENERATION_OPTIONS: true,
  BLUEPRINT_ANALYTICS: true,
  VIRTUAL_SCROLLING: false // Enable after performance testing
};
```

---

## 🎯 **Success Metrics**

### **User Experience Metrics**
- **Time to Blueprint**: < 2 minutes from opportunity to generated blueprint
- **User Confusion**: Zero "Where do I generate blueprints?" support requests
- **Completion Rate**: >90% of users who start blueprint generation complete it
- **Comparison Usage**: >40% of users compare multiple blueprints

### **Technical Metrics**
- **Performance**: Page remains responsive during blueprint generation
- **Error Rate**: <2% blueprint generation failures
- **Cache Hit Rate**: >80% for subsequent blueprint views
- **Mobile Experience**: Full functionality on mobile devices

---

## 📝 **Implementation Notes**

### **Prompt Evolution Strategy**
1. **A/B Testing**: Compare prompt versions with real users
2. **Provider Optimization**: Custom prompts for each AI provider
3. **Domain Intelligence**: Specialized prompts for different business domains
4. **Feedback Loop**: User rating system to improve prompt quality

### **Future Enhancements** (Post-Launch)
- Real-time collaboration (multiple users comparing blueprints)
- Blueprint marketplace (share successful patterns)
- Integration with project management tools
- Advanced analytics and ROI tracking
- Custom agentic pattern designer

---

**Ready to start Phase 1! 🚀**

**Next Steps Tomorrow:**
1. Implement Phase 1 logging and prompt system
2. Test foundation with existing opportunities
3. Verify state management works correctly
4. Begin Phase 2 core functionality

**Estimated Timeline**: 10 days with daily testing checkpoints
**Risk Mitigation**: Each phase builds incrementally, allowing rollback if needed
**Success Criteria**: Seamless inline experience that eliminates user confusion and increases blueprint generation rate