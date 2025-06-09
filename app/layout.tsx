import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';
import DynamicEnvDebugger from './lib/DynamicEnvDebugger';
import React from 'react';

// Initialize the Inter font with the weights we need
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Agent Blueprint & Business AI Advisory Platform',
  description: 'Visualize ServiceNow agentic AI flow data as interactive flow diagrams',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <DynamicEnvDebugger />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 