'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import useAuthStore from '../store/useAuthStore';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  Database,
  LogOut,
  Edit,
  Save,
  X
} from 'lucide-react';

interface ProfileData {
    displayName: string;
    email: string;
    timezone: string;
    notifications: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut, isLoading, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    email: '',
    timezone: 'UTC',
    notifications: true
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      setProfileData({
        displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        email: user.email || '',
        timezone: user.user_metadata?.timezone || 'UTC',
        notifications: user.user_metadata?.notifications !== false
      });
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleSaveProfile = async () => {
    try {
        await updateProfile({
            data: {
                full_name: profileData.displayName,
                timezone: profileData.timezone,
                notifications: profileData.notifications
            }
        });
        setIsEditing(false);
    } catch(error) {
        console.error("Failed to update profile", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setProfileData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }));
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-secondary)'
        }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <GlobalHeader />
      
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-lg)'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>User Profile</h1>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--text-secondary)'
            }}>
              Manage your account settings and preferences
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            {isEditing ? (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={18} />
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'var(--spacing-xl)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-xl)'
      }}>
        
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xl)',
          border: '1px solid var(--border-primary)',
          height: 'fit-content'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-xl)',
            paddingBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border-primary)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--border-radius-full)',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <User size={28} />
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {profileData.displayName || 'User'}
              </h2>
              <p style={{
                margin: 0,
                color: 'var(--text-secondary)'
              }}>
                Agent Blueprint User
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    background: 'var(--btn-secondary-bg)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <p style={{
                  margin: 0,
                  padding: 'var(--spacing-md)',
                  background: 'var(--btn-secondary-bg)',
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)'
                }}>
                  {profileData.displayName || 'Not set'}
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Email Address
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--text-primary)'
              }}>
                <Mail size={18} />
                <span>{profileData.email}</span>
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Member Since
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--text-primary)'
              }}>
                <Calendar size={18} />
                <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              paddingBottom: 'var(--spacing-md)',
              borderBottom: '1px solid var(--border-primary)'
            }}>
              <Settings size={24} color="var(--accent-blue)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Account Settings
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <div>
                  <p style={{
                    margin: 0,
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-primary)'
                  }}>
                    Email Notifications
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Receive updates about your profiles and timelines
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profileData.notifications}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={{ width: '18px', height: '18px' }}
                />
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              paddingBottom: 'var(--spacing-md)',
              borderBottom: '1px solid var(--border-primary)'
            }}>
              <Database size={24} color="var(--accent-green)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Account Information
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <Shield size={18} color="var(--accent-blue)" />
                <div>
                  <p style={{ margin: 0, fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)' }}>
                    Account Type
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Standard User
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <Database size={18} color="var(--accent-green)" />
                <div>
                  <p style={{ margin: 0, fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)' }}>
                    Data Storage
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Cloud-based (Supabase)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <h3 style={{
              margin: '0 0 var(--spacing-md) 0',
              fontSize: '1.25rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)'
            }}>
              Account Actions
            </h3>
            <p style={{
              margin: '0 0 var(--spacing-lg) 0',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              Sign out of your account. You can sign back in anytime.
            </p>
            <button 
              className="btn btn-danger"
              onClick={handleSignOut}
              style={{ width: '100%' }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
