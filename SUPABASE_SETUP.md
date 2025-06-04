# 🔐 Supabase Authentication Setup Guide

This guide walks you through setting up Supabase authentication for the Agentic AI Flow Visualizer as part of **Phase 3: Authentication System**.

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account ([signup here](https://supabase.com))
- Basic understanding of SQL and environment variables

## 🚀 Step 1: Create Supabase Project

1. **Sign up/Login to Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Create account or sign in

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Set project name: `agentic-ai-flow`
   - Set database password (save this!)
   - Choose region closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 2-3 minutes
   - You'll get a dashboard with your project details

## 🔑 Step 2: Get API Keys and URLs

1. **Navigate to Settings**
   - In your Supabase dashboard, go to **Settings** → **API**

2. **Copy the following values:**
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 🔧 Step 3: Configure Environment Variables

1. **Create `.env.local` file** in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate this encryption key (see step 4)
ENCRYPTION_KEY=your_64_character_hex_encryption_key_here

# Existing ServiceNow configuration (if any)
SERVICENOW_INSTANCE_URL=
SERVICENOW_USERNAME=
SERVICENOW_PASSWORD=
```

2. **Add `.env.local` to `.gitignore`** (if not already there):
```gitignore
.env.local
.env.*.local
```

## 🔐 Step 4: Generate Encryption Key

The app uses AES-256 encryption for ServiceNow credentials. Generate a secure key:

### Option A: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option B: Using Online Tool
- Go to [Generate Random](https://generate-random.org/encryption-key-generator)
- Select "256-bit"
- Choose "Hexadecimal"
- Copy the generated key

### Option C: Using the App Utility
```javascript
// In Node.js console
const { generateEncryptionKey } = require('./app/utils/encryption');
console.log(generateEncryptionKey());
```

**⚠️ Important:** Store this key securely and never commit it to version control!

## 🗄️ Step 5: Set Up Database Schema

1. **Open Supabase SQL Editor**
   - In your Supabase dashboard, go to **SQL Editor**

2. **Run the Schema Script**
   - Copy the contents of `app/database/schema.sql`
   - Paste into the SQL Editor
   - Click "Run" to execute

3. **Verify Tables Created**
   - Go to **Table Editor**
   - You should see: `user_profiles`, `servicenow_connections`, `client_profiles`, `audit_logs`

## 📧 Step 6: Configure Authentication Settings

1. **Go to Authentication Settings**
   - In Supabase dashboard: **Authentication** → **Settings**

2. **Configure Email Settings**
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`

3. **Email Templates (Optional)**
   - Customize **Confirm signup**, **Magic Link**, **Reset Password** templates
   - Add your branding and styling

4. **Enable Email Confirmations**
   - Toggle **Enable email confirmations** ON
   - Users must verify email before signing in

## 🧪 Step 7: Test the Setup

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication Flow**
   - Go to `http://localhost:3000`
   - Click "Sign Up" in the header
   - Create a test account
   - Check your email for confirmation
   - Sign in with your credentials

3. **Verify Database**
   - Check Supabase **Table Editor** → **user_profiles**
   - Your user should appear automatically

4. **Run Smoke Tests**
   ```bash
   npm run test:smoke
   ```
   - All tests should pass ✅

## 🔧 Step 8: Production Configuration

### When deploying to production:

1. **Update Environment Variables**
   ```bash
   # Update site URL
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Update Supabase Settings**
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**: Add `https://yourdomain.com/auth/callback`

3. **Configure Custom Domain (Optional)**
   - In Supabase: **Settings** → **Custom Domains**
   - Add your custom domain for auth endpoints

## 🎛️ Step 9: Configure User Roles (Optional)

For advanced user management:

1. **Create Custom Roles**
   ```sql
   -- Run in Supabase SQL Editor
   CREATE TYPE user_role AS ENUM ('admin', 'user', 'viewer');
   
   ALTER TABLE user_profiles 
   ADD COLUMN role user_role DEFAULT 'user';
   ```

2. **Update RLS Policies**
   - Modify policies in `schema.sql` for role-based access

## 🔍 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists and has correct keys
   - Restart development server after adding env vars

2. **"ENCRYPTION_KEY environment variable is required"**
   - Generate and add encryption key to `.env.local`
   - Key must be 64 hex characters (32 bytes)

3. **"User already registered"**
   - Check email confirmation required
   - Look for confirmation email in spam folder

4. **Database connection errors**
   - Verify Supabase project is running
   - Check API keys are correct

5. **Auth state not persisting**
   - Clear browser localStorage
   - Check Supabase client configuration

### Debug Steps:

1. **Check Browser Console**
   - Look for authentication errors
   - Verify API calls are successful

2. **Check Supabase Logs**
   - Go to **Logs** → **Auth** in Supabase dashboard
   - Look for failed authentication attempts

3. **Verify Database Setup**
   - Check tables exist and have correct policies
   - Test RLS policies with test data

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🎯 Next Steps

Once authentication is working:

1. **Phase 4: Database Migration** - Move client profiles from localStorage to Supabase
2. **Phase 5: AI Integration** - Add ChatGPT 4o for timeline generation
3. **Phase 6: PDF Export** - Implement professional document generation

## 🆘 Need Help?

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Review Supabase documentation**
3. **Test with minimal configuration first**
4. **Verify each step was completed correctly**

---

**✅ Success Criteria:**
- [ ] Users can sign up and sign in
- [ ] Email verification works
- [ ] User profiles are created automatically
- [ ] Auth state persists across page refreshes
- [ ] Smoke tests pass
- [ ] No existing functionality is broken

**🔒 Security Notes:**
- Never commit `.env.local` to version control
- Use strong, unique encryption keys
- Enable email verification in production
- Regularly rotate API keys and encryption keys
- Monitor auth logs for suspicious activity 