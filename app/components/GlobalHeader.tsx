'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './theme/ThemeProvider';
import useAuthStore from '../store/useAuthStore';
import { 
  TrendingUp, 
  Users, 
  Monitor, 
  Sun, 
  Moon, 
  Menu, 
  X,
  LogIn,
  LogOut,
  User,
  Settings,
  GitBranch,
  FileText,
  LucideIcon
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
    description: string;
}

export default function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Monitor,
      description: 'Platform overview and quick actions'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Manage your business profile'
    },
    {
      name: 'Executive Summary',
      href: '/executive-summary',
      icon: FileText,
      description: 'AI transformation executive overview'
    },
    {
      name: 'AI Timeline',
      href: '/timeline',
      icon: TrendingUp,
      description: 'Generate transformation roadmaps'
    },
    {
      name: 'Agentic Workflow',
      href: '/agentic-workflow',
      icon: GitBranch,
      description: 'Visualize agentic AI flows'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="global-header">
      <div className="header-container">
        <div className="header-brand">
          <Link href="/" className="brand-link">
            <h1 className="app-title">Agent Blueprint</h1>
          </Link>
        </div>

        <nav className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActiveRoute(item.href) ? 'active' : ''}`}
              title={item.description}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="action-btn theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>

          <Link
            href="/admin"
            className="action-btn theme-toggle"
            title="Settings"
          >
            <Settings className="icon" />
          </Link>

          {user ? (
            <div className="user-menu">
              <Link href="/profile" className="user-info" title="View profile">
                <User className="icon" />
                <span className="user-email">{user.email}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="action-btn sign-out"
                title="Sign out"
              >
                <LogOut className="icon" />
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="action-btn sign-in">
              <LogIn className="icon" />
              <span>Sign In</span>
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-nav-link ${isActiveRoute(item.href) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="nav-icon" />
              <div className="nav-content">
                <span className="nav-name">{item.name}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
} 