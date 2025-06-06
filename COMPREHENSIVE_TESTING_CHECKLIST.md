# 🧪 Comprehensive Testing Checklist - Phases 1-4

## ✅ **Automated Tests Status**
- [x] **Smoke Tests**: 9/9 passing ✅
- [ ] **Migration Tests**: (Removed - feature is obsolete)

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

### **PHASE 4: Client Profile Management (Authentication Required)**

#### **4.1 Unauthenticated Access**
- [ ] Navigate to `/profiles` while signed out.
- [ ] Verify the "Authentication Required" message appears.
- [ ] Click the "Sign In" button and verify it navigates to `/auth/signin`.
- [ ] Go back, click the "Sign Up" button and verify it navigates to `/auth/signup`.
- [ ] Verify no profile data or creation tools are visible.

#### **4.2 Authenticated Access & Profile Creation**
- [ ] Sign into an account.
- [ ] Navigate to `/profiles`.
- [ ] If no profiles exist, verify the "No Client Profiles Yet" message appears.
- [ ] Click "Create Your First Profile" or "New Profile".
- [ ] The ProfileWizard should open.
- [ ] Complete all 8 steps of the wizard.
- [ ] Verify the new profile appears on the dashboard after creation.
- [ ] Verify the profile data is saved correctly by navigating to the detail page.

#### **4.3 Demo Profile Loading**
- [ ] On the profiles dashboard, click "Load Demo Profiles".
- [ ] Verify 4 new demo profiles are created and appear in the list.
  - [ ] TechFlow Solutions (Technology)
  - [ ] PrecisionParts Manufacturing
  - [ ] Regional Medical Center (Healthcare)
  - [ ] Community Trust Bank (Finance)
- [ ] Verify the profiles are associated with your user account (e.g., they persist after logging out and back in).

#### **4.4 Profile Detail & Edit**
- [ ] Click "View Details" on any profile.
- [ ] Profile detail page loads (`/profiles/[id]`).
- [ ] All profile data displays correctly.
- [ ] (Future) Click "Edit Profile" and verify the wizard opens with the existing data.
- [ ] "Generate AI Timeline" button works and navigates to the timeline page.

#### **4.5 Data Persistence & Security**
- [ ] Create a new profile while signed in.
- [ ] Sign out and sign back in.
- [ ] Verify the created profile persists.
- [ ] Create a second user account.
- [ ] Verify the second user cannot see the first user's profiles.

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

#### **5.4 Complete User Journey**
- [ ] **Complete User Journey**:
  1. Sign up for account
  2. Create client profile
  3. Generate timeline from profile
  4. Sign out and sign back in
  5. Verify all data persists
  
- [ ] **Demo Data Workflow**:
  1. Sign into an account.
  2. Load demo profiles into the account.
  3. Generate timelines from the created demo profiles.
  4. Verify everything works as expected.

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
  1. Sign into an account.
  2. Load demo profiles into the account.
  3. Generate timelines from the created demo profiles.
  4. Verify everything works as expected.

#### **6.2 Multi-User Testing**
- [ ] Create Account A, add profiles
- [ ] Create Account B, add different profiles
- [ ] Verify Account A can't see Account B's profiles
- [ ] Verify both accounts work independently

#### **6.3 Data Persistence Testing**
- [ ] Create profiles while authenticated in Supabase.
- [ ] Close browser completely
- [ ] Reopen and verify all data persists correctly for the logged-in user.

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

#### **8.1 Authentication Security**
- [ ] Can't access other users' data
- [ ] Direct URL access blocked for unauthorized profiles
- [ ] Session expires appropriately
- [ ] Password requirements enforced
- [ ] SQL injection protection (try malicious inputs)

#### **8.2 Data Privacy**
- [ ] Verify `localStorage` is not used for profile storage.
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
- [ ] Test Supabase connection failures (if possible)
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
- [ ] Test both auth and non-auth workflows for the `/profiles` page.
- [ ] Verify database persistence works as expected.

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
   npm test -- app/services/__tests__/profileService.test.js
   ```

### **Common Issues & Solutions**
- **Profiles Not Persisting**: Verify Supabase environment variables and RLS policies.
- **Auth Issues**: Check Supabase Auth configuration.
- **Performance Issues**: Check for console errors and network failures.

---

## 🎉 **Success Criteria**

**All Phases Working** when:
- ✅ All automated tests pass
- ✅ Authentication flows work smoothly
- ✅ Profiles persist correctly in Supabase
- ✅ Unauthenticated users are properly restricted from profile features.
- ✅ Timeline generation works
- ✅ No critical errors in any workflow
- ✅ Multi-user isolation maintained
- ✅ Performance is acceptable

**Ready for Phase 5: AI Integration!** 🤖 