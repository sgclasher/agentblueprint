'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {mode === 'login' ? (
          <LoginForm 
            onToggleMode={handleToggleMode}
            onSuccess={handleSuccess}
          />
        ) : (
          <SignupForm 
            onToggleMode={handleToggleMode}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
} 