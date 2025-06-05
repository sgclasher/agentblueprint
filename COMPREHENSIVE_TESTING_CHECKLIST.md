# 🧪 Comprehensive Testing Checklist - Phases 1-4

## ✅ **Automated Tests Status**
- [x] **Smoke Tests**: 9/9 passing ✅
- [x] **Migration Tests**: 8/8 passing ✅

## 🚀 **Manual Testing Plan**

### **PHASE 1: Basic Application Setup**

#### **1.1 Application Startup**
- [ ] Run `npm run dev` successfully
- [ ] Navigate to `http://localhost:3000`
- [ ] No console errors in browser DevTools
- [ ] Page loads within 3 seconds
- [ ] Professional dark theme displays correctly

#### **1.2 Navigation & Layout**
- [ ] Header displays with proper branding
- [ ] Navigation buttons work (ServiceNow, AI Timeline, Client Profiles)
- [ ] Footer displays correctly
- [ ] Mobile responsive design works (test on phone/tablet)

---

### **PHASE 2: ServiceNow Flow Visualization**

#### **2.1 ServiceNow Connector**
- [ ] Navigate to main page (`/`)
- [ ] ServiceNow connection form displays
- [ ] Can enter instance URL and credentials
- [ ] Form validation works (try invalid URLs)
- [ ] Connection status shows appropriately

#### **2.2 Flow Visualization**
- [ ] If you have ServiceNow access:
  - [ ] Can connect to real instance
  - [ ] Flow data loads and displays
  - [ ] Interactive graph shows nodes/edges
  - [ ] Can drag and zoom the visualization
  - [ ] Layout toggle (LR/TB) works
  - [ ] Node expansion/collapse works

#### **2.3 Demo/Mock Data**
- [ ] If no ServiceNow access, mock data displays
- [ ] Graph layout is readable and organized
- [ ] Hover effects work on nodes
- [ ] Graph controls (zoom, pan) function properly

---

### **PHASE 3: Authentication System**

#### **3.1 Sign Up Flow**
- [ ] Click Sign Up in header
- [ ] Enter email and password
- [ ] Form validation works (try weak passwords)
- [ ] Success message appears
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Account becomes active

#### **3.2 Sign In Flow**
- [ ] Click Sign In in header
- [ ] Enter valid credentials
- [ ] Sign in succeeds
- [ ] User name appears in header
- [ ] User menu dropdown works

#### **3.3 Magic Link Authentication**
- [ ] Click "Sign In" 
- [ ] Toggle to "Magic Link" option
- [ ] Enter email address
- [ ] Receive magic link email
- [ ] Click magic link
- [ ] Automatically signed in

#### **3.4 User Session Management**
- [ ] Refresh page while signed in
- [ ] User remains authenticated
- [ ] Sign out works properly
- [ ] Sign out redirects appropriately
- [ ] Session persists across browser tabs

#### **3.5 Password Reset**
- [ ] Click "Forgot Password"
- [ ] Enter email address
- [ ] Receive reset email
- [ ] Click reset link
- [ ] Set new password
- [ ] Can sign in with new password

---

### **PHASE 4: Client Profile Management (No Auth)**

#### **4.1 Profile List Page (Unauthenticated)**
- [ ] Navigate to `/profiles` while signed out
- [ ] Page loads without auth requirement
- [ ] "No profiles" empty state displays
- [ ] "Create Your First Profile" button works
- [ ] "Load Demo Profiles" button works

#### **4.2 Demo Profile Loading**
- [ ] Click "Load Demo Profiles"
- [ ] 4 demo profiles appear:
  - [ ] TechFlow Solutions (Technology)
  - [ ] PrecisionParts Manufacturing
  - [ ] Regional Medical Center (Healthcare)
  - [ ] Community Trust Bank (Finance)
- [ ] Each profile card shows correct industry icon
- [ ] Profile metadata displays correctly
- [ ] "Clear Demo Data" button appears

#### **4.3 Profile Creation (ProfileWizard)**
- [ ] Click "New Profile" or "Create Your First Profile"
- [ ] Profile wizard opens
- [ ] Step 1: Company Info
  - [ ] Company name, industry, size fields work
  - [ ] Revenue and location fields work
  - [ ] Next button advances to step 2
- [ ] Step 2: Expected Outcomes
  - [ ] Strategic initiatives section works
  - [ ] Contact information fields work
  - [ ] Add multiple contacts works
  - [ ] Business objectives textarea works
- [ ] Continue through all 8 steps
- [ ] Each step validates required fields
- [ ] Final step shows summary
- [ ] "Complete Profile" creates profile

#### **4.4 Profile Detail View**
- [ ] Click "View Details" on any profile
- [ ] Profile detail page loads (`/profiles/[id]`)
- [ ] All profile data displays correctly
- [ ] Contact information shows properly
- [ ] Back button returns to profiles list
- [ ] "Generate AI Timeline" button works

#### **4.5 Demo Data Management**
- [ ] Load demo profiles
- [ ] Verify "Clear Demo Data" appears
- [ ] Click "Clear Demo Data"
- [ ] All profiles disappear
- [ ] Returns to empty state
- [ ] Demo profiles can be reloaded

---

### **PHASE 4: Database Migration (With Auth)**

#### **4.6 Migration Banner Testing**
- [ ] **Setup**: Sign out, create some profiles (localStorage)
- [ ] Sign in to account
- [ ] Navigate to `/profiles`
- [ ] Migration banner appears
- [ ] Banner shows correct count of local profiles
- [ ] Banner has clear migration message

#### **4.7 Profile Migration**
- [ ] Click "Migrate Now" in banner
- [ ] Migration process shows loading state
- [ ] Success message appears
- [ ] Banner disappears after migration
- [ ] Profiles now show in authenticated state
- [ ] localStorage profiles are cleared

#### **4.8 Migration Banner Controls**
- [ ] Click "Skip" - banner disappears
- [ ] Reload page - banner doesn't reappear (skip persisted)
- [ ] Click "X" to dismiss
- [ ] Reload page - banner reappears (temporary dismiss)

#### **4.9 Authenticated Profile Management**
- [ ] Create new profile while signed in
- [ ] Profile saves to Supabase (not localStorage)
- [ ] Sign out and sign back in
- [ ] Profiles persist across sessions
- [ ] Multiple users can't see each other's profiles

#### **4.10 Error Handling & Fallbacks**
- [ ] Disconnect internet briefly
- [ ] Create profile - should fallback to localStorage
- [ ] Reconnect internet
- [ ] App continues working normally
- [ ] No error messages shown to user

---

### **PHASE 5 PREP: AI Timeline Generation**

#### **5.1 Timeline from Home Page**
- [ ] Navigate to main page
- [ ] Click "AI Timeline" button
- [ ] Timeline page loads (`/timeline`)
- [ ] Business profile form appears
- [ ] Fill out company details
- [ ] Generate timeline works
- [ ] Timeline phases display
- [ ] Floating metrics widget appears
- [ ] Scroll interaction works

#### **5.2 Timeline from Profile**
- [ ] View any profile detail page
- [ ] Click "Generate AI Timeline"
- [ ] Timeline generates using profile data
- [ ] Timeline phases match profile industry
- [ ] Scenario switching works (Conservative/Balanced/Aggressive)
- [ ] Metrics update when switching scenarios

#### **5.3 Timeline Interactivity**
- [ ] Scroll through timeline phases
- [ ] Floating widget updates as you scroll
- [ ] Phase cards expand/collapse
- [ ] Investment amounts display correctly
- [ ] ROI calculations show properly

---

### **INTEGRATION TESTING**

#### **6.1 Cross-Feature Workflows**
- [ ] **Complete User Journey**:
  1. Sign up for account
  2. Create client profile
  3. Generate timeline from profile
  4. Sign out and sign back in
  5. Verify all data persists
  
- [ ] **Demo Data Workflow**:
  1. Load demo profiles
  2. Generate timelines from demo profiles
  3. Create additional custom profile
  4. Sign in (migration banner appears)
  5. Migrate demo data to account
  6. Verify all profiles and timelines work

#### **6.2 Multi-User Testing**
- [ ] Create Account A, add profiles
- [ ] Create Account B, add different profiles
- [ ] Verify Account A can't see Account B's profiles
- [ ] Verify both accounts work independently

#### **6.3 Data Persistence Testing**
- [ ] Create profiles in various states:
  - [ ] Unauthenticated (localStorage)
  - [ ] Authenticated (Supabase)
  - [ ] Migrated from localStorage
- [ ] Close browser completely
- [ ] Reopen and verify all data persists correctly

---

### **PERFORMANCE & RELIABILITY**

#### **7.1 Performance Testing**
- [ ] Page load times < 3 seconds
- [ ] Profile creation < 2 seconds
- [ ] Timeline generation < 5 seconds
- [ ] No memory leaks (check DevTools)
- [ ] Smooth animations and transitions

#### **7.2 Browser Compatibility**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)
- [ ] Edge (if available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### **7.3 Network Conditions**
- [ ] Fast connection (normal operation)
- [ ] Slow connection (3G simulation)
- [ ] Intermittent connection (disconnect/reconnect)
- [ ] Offline behavior (graceful degradation)

---

### **SECURITY TESTING**

#### **8.1 Authentication Security**
- [ ] Can't access other users' data
- [ ] Direct URL access blocked for unauthorized profiles
- [ ] Session expires appropriately
- [ ] Password requirements enforced
- [ ] SQL injection protection (try malicious inputs)

#### **8.2 Data Privacy**
- [ ] localStorage cleared after migration
- [ ] No sensitive data in browser console
- [ ] Network requests use HTTPS
- [ ] No credentials in URL parameters

---

### **ERROR SCENARIOS**

#### **9.1 Form Validation**
- [ ] Empty required fields show errors
- [ ] Invalid email formats rejected
- [ ] Weak passwords rejected
- [ ] Invalid URLs rejected
- [ ] Long text inputs handled gracefully

#### **9.2 Network Errors**
- [ ] Offline state handled gracefully
- [ ] Supabase connection failures fallback to localStorage
- [ ] Timeout errors show user-friendly messages
- [ ] Retry mechanisms work properly

#### **9.3 Edge Cases**
- [ ] Very long company names
- [ ] Special characters in profile data
- [ ] Large amounts of profile data
- [ ] Multiple browser tabs open simultaneously

---

## 🎯 **Testing Completion Checklist**

### **Quick Verification (10 minutes)**
- [ ] `npm run test:smoke` passes
- [ ] App starts without errors
- [ ] Can create and view profiles
- [ ] Authentication sign-up/sign-in works
- [ ] Timeline generation works

### **Full Testing (30-45 minutes)**
- [ ] Complete all sections above
- [ ] Test at least 2 browsers
- [ ] Test mobile responsiveness
- [ ] Test both auth and non-auth workflows
- [ ] Verify database migration works

### **Production Readiness**
- [ ] All automated tests passing
- [ ] Manual testing completed
- [ ] Performance acceptable
- [ ] Error handling working
- [ ] Multi-user isolation verified

---

## 🚨 **If You Find Issues**

### **Debugging Steps**
1. **Check Browser Console** for JavaScript errors
2. **Check Network Tab** for failed API calls
3. **Check Supabase Logs** for database errors
4. **Run Tests** to identify specific failures:
   ```bash
   npm run test:smoke
   npm test -- app/__tests__/features/database-migration.test.js
   npm test -- app/services/__tests__/profileService.test.js
   ```

### **Common Issues & Solutions**
- **Migration Banner Not Appearing**: Check localStorage for existing profiles
- **Profiles Not Persisting**: Verify Supabase environment variables
- **Auth Issues**: Check Supabase Auth configuration
- **Performance Issues**: Check for console errors and network failures

---

## 🎉 **Success Criteria**

**All Phases Working** when:
- ✅ All automated tests pass
- ✅ Authentication flows work smoothly
- ✅ Profiles persist correctly
- ✅ Migration banner functions properly
- ✅ Timeline generation works
- ✅ No critical errors in any workflow
- ✅ Multi-user isolation maintained
- ✅ Performance is acceptable

**Ready for Phase 5: AI Integration!** 🤖 