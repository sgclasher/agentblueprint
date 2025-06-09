'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(55, 65, 81, 0.5)',
          border: '1px solid rgb(75, 85, 99)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgba(55, 65, 81, 0.7)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#2563eb',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {initials}
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'left' 
        }} className="hidden-mobile">
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayName}</div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
        </div>
        
        <ChevronDown 
          style={{ 
            width: '16px', 
            height: '16px', 
            color: '#9ca3af',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: '8px',
          width: '256px',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgb(55, 65, 81)',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '8px 0',
          zIndex: 50
        }}>
          <div style={{ 
            padding: '12px 16px',
            borderBottom: '1px solid rgb(55, 65, 81)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '500'
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{displayName}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '8px 0' }}>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                opacity: 0.5
              }}
              disabled
            >
              <Settings style={{ width: '16px', height: '16px' }} />
              <span>Settings</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>(Soon)</span>
            </button>

            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(153, 27, 27, 0.2)';
                (e.target as HTMLElement).style.color = '#f87171';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = '#9ca3af';
              }}
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 