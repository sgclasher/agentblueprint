# AI Integration Setup Guide

## Phase 6: OpenAI Integration Configuration

### Prerequisites
1. **OpenAI API Account**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **API Key**: Generate your secret key from the API keys section
3. **Node.js Dependencies**: Run `npm install` to install new AI packages

### Environment Variables Setup

Create or update your `.env.local` file with:

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key

# Optional: Organization ID for team usage tracking
OPENAI_ORGANIZATION_ID=org-your-organization-id

# AI Feature Flags
ENABLE_AI_TIMELINE_GENERATION=true
ENABLE_AI_STREAMING=true

# Existing Supabase Configuration (keep these)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Security Best Practices

⚠️ **CRITICAL SECURITY NOTES:**
- Never commit API keys to git
- Use different keys for development/production
- Monitor usage in OpenAI dashboard
- Set up billing alerts to avoid surprise charges
- Use environment variables exclusively (never hardcode keys)

### Installation Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Test AI Integration**:
   ```bash
   npm run dev
   # Navigate to /profiles and create a test profile
   # Generate timeline to test AI functionality
   ```

4. **Verify Setup**:
   ```bash
   npm run test:smoke
   # All tests should pass including new AI features
   ```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/timeline/generate` | POST | Generate timeline (AI + fallback) |
| `/api/timeline/stream` | POST | Real-time streaming timeline generation |

### Request Format

```javascript
// Standard timeline generation
const response = await fetch('/api/timeline/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    businessProfile: profileData,
    scenarioType: 'balanced', // 'conservative', 'balanced', 'aggressive'
    useAI: true // Set to false to force rule-based generation
  })
});

// Streaming timeline generation
const eventSource = new EventSource('/api/timeline/stream');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Timeline chunk:', data);
};
```

### Cost Management

**Expected Token Usage:**
- Timeline Generation: ~2,000-3,000 tokens per request
- GPT-4o Cost: ~$0.01-0.015 per timeline
- Monthly Budget: $50-100 for moderate usage (500-1000 timelines)

**Optimization Features:**
- ✅ Intelligent caching (1 hour duration)
- ✅ Rate limiting (5 requests/minute)
- ✅ Fallback to rule-based generation
- ✅ Token optimization in prompts
- ✅ Error handling and retries

### Testing the Integration

1. **Create a Test Profile**:
   - Company: "TechFlow Solutions"
   - Industry: "Technology"
   - Size: "51-200 employees"

2. **Generate AI Timeline**:
   - Should take 10-30 seconds
   - Look for "AI Generated" badge
   - Verify industry-specific recommendations

3. **Test Fallback**:
   - Set `useAI: false` in request
   - Should generate rule-based timeline
   - Verify "fallbackReason" in response

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "OpenAI API key not configured" | Add OPENAI_API_KEY to .env.local |
| Rate limit exceeded | Wait 1 minute or upgrade OpenAI plan |
| AI generation fails | Check API key permissions and credits |
| Slow responses | Normal for first request (caching helps) |
| Invalid JSON from AI | Fallback kicks in automatically |

### Monitoring & Analytics

Monitor in OpenAI Dashboard:
- Token usage trends
- Error rates
- Response times
- Cost analysis

Track in application:
- AI vs fallback usage ratio
- User satisfaction with AI timelines
- Cache hit rates
- Timeline generation success rates

### Next Steps

Once AI integration is working:
1. **PDF Export**: Add AI-enhanced PDF generation
2. **Multi-Provider**: Integrate Claude/Gemini as alternatives
3. **Custom Models**: Fine-tune for industry-specific use cases
4. **Voice Integration**: Add voice-to-timeline capabilities

### Support

For issues:
1. Check logs in browser console
2. Verify environment variables
3. Test with curl/Postman
4. Review OpenAI dashboard for errors
5. Check rate limits and quotas 