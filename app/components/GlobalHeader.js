'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Settings
} from 'lucide-react';

export default function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'ServiceNow Flows',
      href: '/',
      icon: Monitor,
      description: 'Visualize agentic AI flows'
    },
    {
      name: 'Client Profiles',
      href: '/profiles',
      icon: Users,
      description: 'Manage client intelligence'
    },
    {
      name: 'AI Timeline',
      href: '/timeline',
      icon: TrendingUp,
      description: 'Generate transformation roadmaps'
    },
    {
      name: 'Settings',
      href: '/admin',
      icon: Settings,
      description: 'Configure services and credentials'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="global-header">
      <div className="header-container">
        {/* Logo and Title */}
        <div className="header-brand">
          <Link href="/" className="brand-link">
            <div className="logo-wrapper">
              <img 
                src={theme === 'dark' ? "/images/Full Logo Dark.png" : "/images/Full Logo Light.png"}
                alt="Nowgentic Logo" 
                className="nowgentic-logo"
              />
            </div>
            <h1 className="app-title">Agent Blueprint</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
              title={item.description}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action-btn theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>

          {/* User Menu */}
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="mobile-nav-link"
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