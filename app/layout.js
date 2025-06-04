import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './components/auth/AuthProvider';
import { EnvDebugger } from './lib/env-check';

// Initialize the Inter font with the weights we need
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Agentic AI Flow Visualizer',
  description: 'Visualize ServiceNow agentic AI flow data as interactive flow diagrams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <EnvDebugger />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 