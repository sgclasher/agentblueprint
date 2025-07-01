# Testing Guide: KB-Aligned Pattern System

## Quick Start

1. **Set Environment Variable**
```bash
# In your .env.local file:
USE_KB_ALIGNED_PATTERNS=true
```

2. **Restart Development Server**
```bash
npm run dev
```

## Test Scenarios

### 1. Basic Manager-Workers Pattern
- Create a profile with "process automation" in business problems
- Generate blueprint
- **Expected**: 3-6 agents with flexible coordination
- **Quality Score**: Should be 70+ if business-aligned

### 2. Research Pattern (Plan-Act-Reflect)
- Create profile with "research" or "analysis" problems
- Generate blueprint
- **Expected**: 3-5 agents in iterative cycle
- **Validation**: Should show warnings, not errors

### 3. Tool-Use Pattern
- Create profile with "data integration" or "API" needs
- Generate blueprint
- **Expected**: Single agent with tool orchestration
- **Business Value**: Clear efficiency gains

### 4. Complex Hierarchical Pattern
- Create profile with "enterprise scale" challenges
- Generate blueprint
- **Expected**: 4-8 agents in hierarchical structure
- **Coordination**: Clear command chains

## What to Look For

### ✅ Success Indicators
- Quality scores above 60
- Warnings (yellow) not errors (red)
- Business-focused objectives
- Flexible agent counts
- Clear coordination mechanisms

### ⚠️ Warning Signs
- Quality scores below 40
- Generic agent names
- No business value articulated
- Rigid structure over function

### ❌ Failure Indicators
- Validation errors blocking generation
- Empty blueprint responses
- System crashes or hangs

## Console Monitoring

Watch browser console for:
```
[Feature Flag] USE_KB_ALIGNED_PATTERNS: true
[Pattern Selection] Using KB-aligned pattern selection
[Prompt Generation] Using KB-aligned flexible prompts
[Enhanced Validation] Using KB-aligned business validation
[Enhanced Validation] Quality score: XX
```

## Troubleshooting

### If validation fails:
1. Check console for specific warnings
2. Review business context in profile
3. Ensure strategic initiatives have problems defined

### If quality scores are low:
1. Add more business context to profile
2. Define clearer business problems
3. Include process metrics if available

### If patterns seem wrong:
1. Check opportunity category mapping
2. Review business problem keywords
3. Consider manual pattern selection

## Comparing Old vs New

### Test same profile with flag on/off:
```bash
# Test 1: Old system
USE_KB_ALIGNED_PATTERNS=false

# Test 2: New system  
USE_KB_ALIGNED_PATTERNS=true
```

### Expected Differences:
- **Old**: Rigid 5 agents, exact structures
- **New**: Flexible 3-6 agents, business focus
- **Old**: Hard validation failures
- **New**: Warnings with quality scores

## Reporting Issues

When reporting issues, include:
1. Feature flag status
2. Console logs
3. Quality score
4. Pattern selected
5. Any validation warnings

## Success Metrics

The new system is working well if:
- 90%+ blueprints generate successfully
- Average quality score > 65
- No hard validation failures
- Business value clearly articulated
- Agent counts vary based on need

---

**Remember**: The goal is intelligent, business-focused blueprints, not filling templates! 