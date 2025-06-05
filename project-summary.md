Directory structure:
└── sgclasher-agentblueprint/
    ├── README.md
    ├── CLIENT_PROFILE_SYSTEM.md
    ├── COMPREHENSIVE_TESTING_CHECKLIST.md
    ├── database-migration-plan.md
    ├── DATABASE_MIGRATION_GUIDE.md
    ├── instructions.md
    ├── jest.config.js
    ├── jest.setup.js
    ├── MODULAR_FORMS_COMPLETE.md
    ├── MVP_TESTING_SUMMARY.md
    ├── next.config.js
    ├── package.json
    ├── project-summary.md
    ├── SUPABASE_SETUP.md
    ├── test-parse-overview.js
    ├── test-regex.js
    ├── .cursorignore
    ├── .cursorrules
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── __mocks__/
    │   │   └── @supabase/
    │   │       └── supabase-js.js
    │   ├── __tests__/
    │   │   └── features/
    │   │       ├── ai-timeline.test.js
    │   │       ├── client-profiles.test.js
    │   │       ├── database-migration.test.js
    │   │       ├── manual-test-checklist.md
    │   │       ├── run-all-features.test.js
    │   │       ├── servicenow-flow.test.js
    │   │       └── simple-smoke-tests.js
    │   ├── api/
    │   │   ├── servicenow/
    │   │   │   ├── route.js
    │   │   │   ├── fetch-agentic-data/
    │   │   │   │   └── route.js
    │   │   │   └── get-credentials/
    │   │   │       └── route.js
    │   │   └── timeline/
    │   │       └── generate/
    │   │           └── route.js
    │   ├── auth/
    │   │   ├── callback/
    │   │   │   └── page.js
    │   │   ├── signin/
    │   │   │   └── page.js
    │   │   └── signup/
    │   │       └── page.js
    │   ├── components/
    │   │   ├── FlowVisualizer.js
    │   │   ├── GlobalHeader.js
    │   │   ├── Header.js
    │   │   ├── NodeIcons.js
    │   │   ├── ServiceNowConnector.js
    │   │   ├── auth/
    │   │   │   ├── AuthModal.js
    │   │   │   ├── AuthProvider.js
    │   │   │   ├── LoginForm.js
    │   │   │   ├── SignupForm.js
    │   │   │   └── UserMenu.js
    │   │   ├── flow/
    │   │   │   └── FlowCanvas.js
    │   │   ├── migration/
    │   │   │   ├── DatabaseSetupCheck.js
    │   │   │   ├── MigrationBanner.js
    │   │   │   └── SupabaseSetupCheck.js
    │   │   ├── nodes/
    │   │   │   ├── AgentNode.js
    │   │   │   ├── ToolNode.js
    │   │   │   ├── TriggerNode.js
    │   │   │   └── UseCaseNode.js
    │   │   └── theme/
    │   │       └── ThemeProvider.js
    │   ├── database/
    │   │   └── schema.sql
    │   ├── hooks/
    │   │   ├── useFlowData.js
    │   │   └── useFlowLayout.js
    │   ├── lib/
    │   │   ├── debug-supabase.js
    │   │   ├── env-check.js
    │   │   └── supabase.js
    │   ├── profile/
    │   │   └── page.js
    │   ├── profiles/
    │   │   ├── page.js
    │   │   ├── profile-detail.css
    │   │   ├── [id]/
    │   │   │   ├── page.js
    │   │   │   └── __tests__/
    │   │   │       └── page.test.js
    │   │   └── components/
    │   │       ├── ProblemsOpportunitiesForm.js
    │   │       ├── ProfileWizard.js
    │   │       ├── StrategicInitiativesForm.js
    │   │       └── __tests__/
    │   │           └── ProfileWizard.test.js
    │   ├── repositories/
    │   │   └── profileRepository.js
    │   ├── services/
    │   │   ├── demoDataService.js
    │   │   ├── markdownService.js
    │   │   ├── profileService.js
    │   │   ├── timelineService.js
    │   │   └── __tests__/
    │   │       ├── markdownService.test.js
    │   │       └── profileService.test.js
    │   ├── store/
    │   │   ├── useAgenticStore.js
    │   │   ├── useAuthStore.js
    │   │   └── useBusinessProfileStore.js
    │   ├── timeline/
    │   │   ├── README.md
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   ├── timeline.css
    │   │   └── components/
    │   │       ├── BusinessProfileForm.js
    │   │       ├── BusinessProfileModal.js
    │   │       ├── MetricsCards.js
    │   │       ├── MetricsWidget.js
    │   │       ├── ScenarioSelector.js
    │   │       ├── TimelineContent.js
    │   │       ├── TimelineHeader.js
    │   │       ├── TimelineSidebar.js
    │   │       └── TimelineVisualization.js
    │   └── utils/
    │       ├── encryption.js
    │       ├── layoutGraph.js
    │       ├── nodeUtils.js
    │       ├── transformAgenticData.js
    │       └── validation.js
    ├── public/
    │   └── images/
    └── .github/
        └── workflows/
            └── test.yml



Here is a list of each file in the `/app` directory and a brief description of its purpose:

### **Root**

* **`globals.css`**: Defines global CSS variables for the entire application, including comprehensive light and dark theme palettes for backgrounds, text, borders, and accents. [cite_start]It ensures a consistent and professional look across all components and pages[cite: 184, 188].
* **`layout.js`**: The root layout for the application, wrapping all pages. [cite_start]It sets up the primary HTML structure, imports the global `ThemeProvider` and `AuthProvider`, and includes a `DatabaseSetupCheck` component to verify database configuration[cite: 242, 243].
* **`page.js`**: The main landing page of the application, responsible for the ServiceNow Agentic AI Flow Visualizer. [cite_start]It manages the state for the flow visualizer and the ServiceNow connector, allowing users to connect and view their AI workflows[cite: 244, 247, 251].

### **`__mocks__`**

* **`__mocks__/@supabase/supabase-js.js`**: A mock of the Supabase client used for testing purposes. [cite_start]It simulates Supabase's authentication and database functions, allowing for isolated testing without making actual database calls[cite: 269].

### **`__tests__`**

* [cite_start]**`__tests__/features/ai-timeline.test.js`**: Contains feature tests for the AI Transformation Timeline, verifying the user journey from generating a timeline to interacting with different scenarios and metrics[cite: 270, 273, 279, 282].
* **`__tests__/features/client-profiles.test.js`**: Holds feature tests for the Client Profile Management system. [cite_start]It covers creating new profiles, loading demo data, viewing existing profiles, and handling errors[cite: 286, 289, 292, 295].
* [cite_start]**`__tests__/features/database-migration.test.js`**: Includes tests for the database migration feature, ensuring that client profiles can be successfully moved from local storage to Supabase[cite: 296, 299, 303, 307].
* [cite_start]**`__tests__/features/manual-test-checklist.md`**: A checklist for manually testing the application's core features, including the ServiceNow visualizer, client profile management, and AI timeline generation[cite: 308, 309].
* [cite_start]**`__tests__/features/run-all-features.test.js`**: A summary test file that provides a high-level overview of the feature tests, confirming that tests exist for all major functionalities[cite: 311].
* **`__tests__/features/servicenow-flow.test.js`**: Contains tests specifically for the ServiceNow Flow Visualization feature. [cite_start]It verifies the connection process, data display, and user interactions like node expansion and layout changes[cite: 312, 315, 318, 322].
* **`__tests__/features/simple-smoke-tests.js`**: A set of quick, basic tests to verify that key application components and services can be imported and have basic functionality. [cite_start]These tests are designed to run quickly to catch major issues[cite: 323, 324, 327, 330].

### **`api`**

* **`api/servicenow/route.js`**: A server-side proxy API route that forwards requests to a ServiceNow instance. [cite_start]This is designed to avoid CORS issues by making server-to-server requests and can handle various queries to the ServiceNow Table API[cite: 331, 333].
* **`api/servicenow/fetch-agentic-data/route.js`**: A specialized API endpoint that securely fetches all the necessary data from a ServiceNow instance to build the agentic AI flow visualization. [cite_start]It uses server-side credentials and includes validation and rate-limiting[cite: 337, 339, 341].
* [cite_start]**`api/servicenow/get-credentials/route.js`**: An API route that provides non-sensitive connection details to the frontend, such as the ServiceNow instance URL and scope ID, while keeping actual authentication credentials on the server[cite: 344].
* **`api/timeline/generate/route.js`**: The backend endpoint responsible for generating the AI Transformation Timeline. [cite_start]It receives a client's business profile, validates the data, and then uses the `TimelineService` to create the timeline[cite: 345, 347, 348].

### **`auth`**

* **`auth/callback/page.js`**: Handles the authentication callback from Supabase. [cite_start]After a user signs in or confirms their email, this page processes the authentication code or token and redirects the user back to the application[cite: 350, 351, 353].
* **`auth/signin/page.js`**: The user sign-in page. [cite_start]It provides forms for both password-based and magic link (OTP) authentication and redirects authenticated users to their profiles[cite: 361, 363, 369].
* **`auth/signup/page.js`**: The user registration page. [cite_start]It includes a form for users to create a new account with their email and password, along with form validation to ensure data integrity[cite: 408, 410, 411].

### **`components`**

* **`components/FlowVisualizer.js`**: The main component for rendering the interactive flow diagrams. [cite_start]It uses custom hooks to manage data transformation and layout, displaying nodes and edges based on the agentic AI data received from ServiceNow[cite: 457, 458, 461].
* **`components/GlobalHeader.js`**: The primary header component used across the entire application. [cite_start]It includes navigation links, a theme toggle for light/dark mode, and user authentication status with sign-in/sign-out actions[cite: 462, 464, 466, 468].
* [cite_start]**`components/Header.js`**: A header component that includes navigation to the main features and handles user authentication state by showing either a `UserMenu` for logged-in users or a login/signup `AuthModal` for guests[cite: 476, 482, 495].
* **`components/NodeIcons.js`**: Provides reusable icon components for the flow visualization. [cite_start]It includes the `ExternalLinkIcon` and the `NodeHeaderButtons` component for node interactions like expanding, collapsing, and linking to ServiceNow[cite: 516, 518].
* **`components/ServiceNowConnector.js`**: The user interface component that allows users to input their ServiceNow instance details. [cite_start]It handles fetching the connection credentials and initiating the data fetch to visualize the AI flow[cite: 520, 522, 524].
* **`components/auth/AuthModal.js`**: A modal component that houses the login and signup forms. [cite_start]It can be opened to either the "login" or "signup" view and manages its own visibility and state[cite: 565, 567, 569].
* [cite_start]**`components/auth/AuthProvider.js`**: A client-side component that initializes the authentication state for the application by calling the `initialize` function from the `useAuthStore` when the app loads[cite: 570].
* **`components/auth/LoginForm.js`**: A form component for user sign-in, supporting both email/password and magic link authentication methods. [cite_start]It interacts with the `useAuthStore` to handle the login process[cite: 571, 582, 586].
* **`components/auth/SignupForm.js`**: A form used for new user registration. [cite_start]It includes fields for name, email, and password, performs validation, and uses the `useAuthStore` to handle the sign-up process[cite: 589, 591, 605].
* **`components/auth/UserMenu.js`**: A dropdown menu component for authenticated users. [cite_start]It displays the user's name and email and provides options for signing out and accessing account settings[cite: 611, 613, 620].
* **`components/flow/FlowCanvas.js`**: Encapsulates the core `ReactFlow` component, configuring its setup, controls, and custom node types. [cite_start]It is responsible for rendering the main canvas where the flow diagram is displayed[cite: 634, 635, 638].
* **`components/migration/DatabaseSetupCheck.js`**: A utility component that checks if the Supabase database is correctly configured for the application. [cite_start]It provides visual feedback on the connection status and guides the user if setup is required[cite: 643, 645, 655].
* **`components/migration/MigrationBanner.js`**: A UI component that appears for authenticated users when it detects they have client profiles stored in local storage. [cite_start]It provides a one-click process to migrate this data to their Supabase account[cite: 677, 681, 685].
* [cite_start]**`components/migration/SupabaseSetupCheck.js`**: A client-side component that verifies if the necessary Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are correctly set up, displaying an error if they are missing or invalid[cite: 698, 702, 706].
* **`components/nodes/AgentNode.js`**: Defines the visual representation and behavior for "Agent" nodes within the flow diagram. [cite_start]It displays agent-specific information and includes controls for node interaction and linking back to ServiceNow[cite: 714, 718, 722].
* **`components/nodes/ToolNode.js`**: Defines the appearance and functionality of "Tool" nodes in the flow visualization. [cite_start]It shows tool-specific data and provides interaction buttons for expanding the node or navigating to the tool's record in ServiceNow[cite: 724, 728, 731].
* **`components/nodes/TriggerNode.js`**: Specifies the visual representation for "Trigger" nodes in the flow diagram. [cite_start]It displays the trigger's objective and condition and includes a link to view the trigger's details in ServiceNow[cite: 733, 737, 741].
* **`components/nodes/UseCaseNode.js`**: This component defines the visual representation for "Use Case" nodes in the flow diagram. [cite_start]It displays the use case label and description and includes header buttons for node interactions[cite: 744, 747, 748].
* **`components/theme/ThemeProvider.js`**: A React context provider that manages the application's theme (light or dark). [cite_start]It persists the user's theme preference in local storage and applies the corresponding `data-theme` attribute to the HTML document[cite: 751, 752].

### **`database`**

* **`database/schema.sql`**: Contains the complete SQL schema for setting up the Supabase database. [cite_start]This includes tables for user profiles, encrypted ServiceNow credentials, client profiles for migration, and audit logs, along with row-level security policies to ensure data privacy[cite: 753, 755, 756, 758].

### **`hooks`**

* **`hooks/useFlowData.js`**: A custom React hook responsible for transforming the raw agentic AI data from ServiceNow into the node and edge structure required by ReactFlow. [cite_start]It applies an initial layout and sets the visibility of nodes[cite: 763, 765, 769, 772].
* **`hooks/useFlowLayout.js`**: A custom hook that manages the dynamic layout and interactions of the flow diagram. [cite_start]It handles expanding and collapsing nodes, toggling layout direction (horizontal/vertical), and re-applying the layout when the graph structure changes[cite: 774, 778, 789, 791].

### **`lib`**

* **`lib/debug-supabase.js`**: A client-side utility for debugging the Supabase connection. [cite_start]It checks for the existence of required tables and can verify access to specific profiles, helping diagnose configuration and security rule issues[cite: 805, 806, 811].
* **`lib/env-check.js`**: A utility that checks for the presence and validity of required environment variables, particularly for Supabase configuration. [cite_start]It includes a client-side component to display warnings if the environment is not set up correctly[cite: 813, 814, 816].
* **`lib/supabase.js`**: Initializes and exports the Supabase client for the application. [cite_start]It uses environment variables to configure the connection and includes helper functions to get the current user and session on the client-side[cite: 817].

### **`profile`**

* **`profile/page.js`**: The user profile management page. It allows authenticated users to view their account information, edit their display name, and manage preferences. [cite_start]It also provides the option to sign out[cite: 818, 819, 824, 878].

### **`profiles`**

* **`profiles/page.js`**: The main page for the Client Profile Management feature. It displays a list of existing profiles and provides options to create a new profile or load demo data. [cite_start]It also integrates a migration banner for authenticated users[cite: 880, 881, 888, 892].
* [cite_start]**`profiles/profile-detail.css`**: This CSS file provides the styling for the profile detail page, including a professional dark theme with glass morphism effects, consistent typography, and a responsive layout for various screen sizes[cite: 940, 943, 947, 958].
* **`profiles/[id]/page.js`**: A dynamic route that displays the detailed view of a single client profile. [cite_start]It fetches the profile data based on the ID from the URL and presents it in a tabbed interface for overview, analysis, and AI opportunities[cite: 963, 966, 970, 994].
* **`profiles/[id]/__tests__/page.test.js`**: Contains tests for the profile detail page. [cite_start]It verifies that profile data is displayed correctly across different tabs, handles loading and error states, and ensures that navigation and actions work as expected[cite: 1043, 1051, 1054, 1069].
* **`profiles/components/ProblemsOpportunitiesForm.js`**: A form component for mapping business problems to agentic AI solutions. [cite_start]It allows users to input current challenges and corresponding AI workflow opportunities, with suggestions for common scenarios[cite: 1075, 1078, 1081, 1091].
* **`profiles/components/ProfileWizard.js`**: A multi-step wizard that guides users through creating a detailed client profile. [cite_start]It includes steps for company overview, strategic initiatives, problems, and more, using modular form components to capture the data[cite: 1112, 1119, 1123, 1126].
* **`profiles/components/StrategicInitiativesForm.js`**: A form component for defining a client's strategic initiatives and the executive contacts responsible for them. [cite_start]It is a key part of capturing the "Expected Business Outcome" in the profile wizard[cite: 1270, 1272, 1275].
* **`profiles/components/__tests__/ProfileWizard.test.js`**: Contains tests for the `ProfileWizard` component. [cite_start]It verifies that all steps of the wizard render correctly, that form validation works as expected, and that the wizard successfully completes the profile creation process[cite: 1306, 1308, 1311, 1318].

### **`repositories`**

* **`repositories/profileRepository.js`**: An abstraction layer for data access that handles client profiles. [cite_start]It automatically routes requests to either Supabase for authenticated users or local storage for guests, and includes logic for migrating data between the two[cite: 1330, 1331, 1335, 1339].

### **`services`**

* **`services/demoDataService.js`**: Provides a set of realistic, sample client profiles for different industries like Technology, Manufacturing, Healthcare, and Finance. [cite_start]This allows users to quickly explore the application's features without creating a profile from scratch[cite: 1362, 1363, 1379, 1393].
* **`services/markdownService.js`**: A service dedicated to converting the structured JSON data of a client profile into a standardized, human-readable Markdown format. [cite_start]This structured output is designed to be easily parseable, which helps prevent AI hallucinations when the data is used for analysis[cite: 1422, 1423, 1424].
* **`services/profileService.js`**: The core service for managing all business logic related to client profiles. [cite_start]It handles creating, reading, updating, and deleting profiles, and it uses the `ProfileRepository` to seamlessly interact with either local storage or Supabase depending on the user's authentication state[cite: 1464, 1465, 1467, 1472].
* **`services/timelineService.js`**: A service responsible for generating the AI Transformation Timeline. [cite_start]It takes a business profile and a scenario type (e.g., conservative, balanced) as input and produces a structured timeline with multiple phases and initiatives[cite: 1487, 1488, 1490].
* **`services/__tests__/markdownService.test.js`**: Contains unit tests for the `markdownService`. [cite_start]These tests ensure that the service correctly generates Markdown from various profile data structures and handles missing data gracefully[cite: 1514, 1519, 1522, 1525].
* **`services/__tests__/profileService.test.js`**: Includes unit tests for the `ProfileService`. [cite_start]These tests verify that profile creation, timeline generation, and data extraction logic all function correctly and handle different profile scenarios as expected[cite: 1537, 1539, 1544, 1553].

### **`store`**

* **`store/useAgenticStore.js`**: A Zustand store for managing the global state related to the ServiceNow Agentic AI Flow visualization. [cite_start]It holds the fetched AI data, connection details, and loading status, and provides actions to manage this state[cite: 1561, 1563, 1565, 1568].
* **`store/useAuthStore.js`**: A Zustand store that manages the application's authentication state. [cite_start]It handles user sessions, sign-up, sign-in, and sign-out processes by interacting with the Supabase client[cite: 1571, 1574, 1576, 1578].
* **`store/useBusinessProfileStore.js`**: A Zustand store used for managing the state of the AI Transformation Timeline feature. [cite_start]It holds the user's business profile data, timeline settings, and the generated timeline itself, persisting the information to local storage[cite: 1581, 1583, 1586, 1588].

### **`timeline`**

* **`timeline/README.md`**: Provides specific documentation for the AI Transformation Timeline feature, outlining its architecture, key features, and how to extend it. [cite_start]It serves as a guide for developers working on this part of the application[cite: 1589, 1591, 1592, 1594].
* [cite_start]**`timeline/layout.js`**: A simple layout component specifically for the timeline pages, ensuring a consistent structure for this feature[cite: 1596].
* **`timeline/page.js`**: The main page for the AI Transformation Timeline. [cite_start]It orchestrates the display of the timeline, manages the active section based on scroll position, and handles the initial loading of profile data to generate the timeline[cite: 1597, 1601, 1603, 1609].
* **`timeline/timeline.css`**: Contains the CSS styles specifically for the AI Transformation Timeline feature. [cite_start]It defines a professional dark theme with variables for colors, fonts, and spacing, and includes responsive styles for different screen sizes[cite: 1621, 1623, 1629, 1633].
* **`timeline/components/BusinessProfileForm.js`**: A form used to collect detailed business information from the user, which is then used to generate a personalized AI Transformation Timeline. [cite_start]It captures data such as company name, industry, AI maturity, and primary goals[cite: 1648, 1650, 1652, 1658].
* **`timeline/components/BusinessProfileModal.js`**: A multi-step modal that houses the business profile form. [cite_start]It guides the user through the process of providing the necessary information before generating an AI transformation timeline[cite: 1672, 1674, 1676, 1680].
* [cite_start]**`timeline/components/MetricsCards.js`**: A component that displays key metrics for the AI transformation journey, such as total investment, expected ROI, and time to value, in a visually appealing card format[cite: 1712, 1713].
* [cite_start]**`timeline/components/MetricsWidget.js`**: The floating widget that displays real-time Key Performance Indicators (KPIs) that update as the user scrolls through the different phases of the AI timeline[cite: 1715, 1718, 1722, 1727].
* [cite_start]**`timeline/components/ScenarioSelector.js`**: Allows users to choose between different AI adoption scenarios, such as "Conservative," "Balanced," or "Aggressive," which then adjusts the generated timeline accordingly[cite: 1734, 1735].
* [cite_start]**`timeline/components/TimelineContent.js`**: The main component responsible for rendering the scrollable content of the AI Transformation Timeline, displaying the different phases, initiatives, and details of the roadmap[cite: 1737, 1740, 1743, 1747].
* **`timeline/components/TimelineHeader.js`**: The header component for the timeline page. [cite_start]It includes the page title and action buttons for sharing or exporting the timeline report[cite: 1759, 1760].
* **`timeline/components/TimelineSidebar.js`**: Provides the main navigation for the timeline page. [cite_start]It displays the different phases of the AI journey and includes a progress bar that updates as the user scrolls[cite: 1762, 1763, 1766, 1768].
* **`timeline/components/TimelineVisualization.js`**: A component responsible for rendering the interactive events of the AI timeline. [cite_start]It includes functionality for expanding and collapsing event details to show more information about each phase[cite: 1778, 1781, 1785, 1788].

### **`utils`**

* **`utils/encryption.js`**: A server-side utility for handling AES-256-GCM encryption and decryption of sensitive credentials, such as those for ServiceNow. [cite_start]It ensures that sensitive data is stored securely[cite: 1809, 1811, 1812, 1816].
* **`utils/layoutGraph.js`**: Provides a function to automatically arrange nodes and edges in the flow diagram using the Dagre.js library. [cite_start]It supports different layout directions and helps create a clean, organized visualization[cite: 1817, 1819, 1822, 1825].
* [cite_start]**`utils/nodeUtils.js`**: Contains helper functions related to the nodes in the flow diagram, including a function to generate the correct ServiceNow URL for a given node type and its system ID[cite: 1826, 1828].
* **`utils/transformAgenticData.js`**: A crucial utility that transforms the raw JSON data fetched from ServiceNow into the specific node and edge objects that the ReactFlow library can render. [cite_start]It maps ServiceNow records to visual elements in the diagram[cite: 1829, 1831, 1838, 1843].
* **`utils/validation.js`**: Contains various functions for validating user input and API requests. [cite_start]This includes validating ServiceNow URLs, scope IDs, business profile data, and timeline scenarios, as well as providing a basic rate-limiting mechanism[cite: 1852, 1855, 1856, 1861].