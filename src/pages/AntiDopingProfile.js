import React, { useState,useEffect } from 'react';
import { User, Shield, Calendar, Settings, Lock, Edit3, Save, X, CheckCircle } from 'lucide-react';

export default function AntiDopingProfile() {
     useEffect(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
              navbar.style.display = 'none'; // Hide navbar on mount
            }
        
            return () => {
              if (navbar) {
                navbar.style.display = ''; // Restore navbar on unmount
              }
            };
          }, []);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Anurupa',
    lastName: 'Roy',
    email: 'anurupaintern03@gmail.com',
    phone: '+91-7602932266',
    dateOfBirth: '2003-09-05',
    nationality: 'Indian',
    sport: 'Cricket',
    discipline: '400m Sprint',
    club: 'Elite Athletics Club',
    coach: 'Michael Roberts',
    emergencyContact: 'Animesh Ray',
    emergencyPhone: '+91 8967399157'
  });

  const [notifications, setNotifications] = useState({
    testReminders: true,
    resultNotifications: true,
    educationUpdates: false,
    systemAlerts: true
  });

  const testHistory = [
    { date: '2024-05-15', type: 'Urine', status: 'Negative', location: 'Training Facility' },
    { date: '2024-04-22', type: 'Blood', status: 'Negative', location: 'Competition Venue' },
    { date: '2024-03-18', type: 'Urine', status: 'Negative', location: 'Out-of-Competition' },
    { date: '2024-02-10', type: 'Blood', status: 'Negative', location: 'Training Facility' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '16px'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px'
    },
    headerCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      width: '64px',
      height: '64px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      margin: '4px 0'
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '4px'
    },
    statusText: {
      fontSize: '14px',
      color: '#059669',
      fontWeight: '500'
    },
    flexRow: {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap'
    },
    sidebar: {
      width: '256px',
      minWidth: '256px'
    },
    nav: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '16px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    navButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s'
    },
    navButtonActive: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    navButtonInactive: {
      color: '#374151'
    },
    content: {
      flex: 1
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    primaryButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    successButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    grayButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    inputDisabled: {
      backgroundColor: '#f9fafb',
      color: '#6b7280'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb'
    },
    td: {
      padding: '12px 16px',
      borderBottom: '1px solid #f3f4f6'
    },
    tr: {
      transition: 'background-color 0.2s'
    },
    settingsItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    settingsItemLast: {
      borderBottom: 'none'
    },
    settingsButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: 'background-color 0.2s'
    },
    toggle: {
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '24px'
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    toggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.4s',
      borderRadius: '24px'
    },
    toggleSliderChecked: {
      backgroundColor: '#2563eb'
    },
    toggleSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '18px',
      width: '18px',
      left: '3px',
      bottom: '3px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    },
    toggleSliderCheckedBefore: {
      transform: 'translateX(20px)'
    }
  };

  const handleProfileSave = () => {
    setIsEditing(false);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const Toggle = ({ checked, onChange }) => (
    <label style={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={styles.toggleInput}
      />
      <span
        style={{
          ...styles.toggleSlider,
          ...(checked ? styles.toggleSliderChecked : {}),
        }}
      >
        <span
          style={{
            ...styles.toggleSliderBefore,
            ...(checked ? styles.toggleSliderCheckedBefore : {}),
          }}
        />
      </span>
    </label>
  );

  const renderProfile = () => (
    <div style={styles.card}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{ ...styles.button, ...styles.primaryButton }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div style={styles.buttonGroup}>
            <button
              onClick={handleProfileSave}
              style={{ ...styles.button, ...styles.successButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{ ...styles.button, ...styles.grayButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div style={styles.grid}>
        {Object.entries(profileData).map(([key, value]) => (
          <div key={key} style={styles.formGroup}>
            <label style={styles.label}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type={key === 'email' ? 'email' : key === 'dateOfBirth' ? 'date' : key.includes('Phone') ? 'tel' : 'text'}
              value={value}
              onChange={(e) => setProfileData(prev => ({ ...prev, [key]: e.target.value }))}
              disabled={!isEditing}
              style={{
                ...styles.input,
                ...(isEditing ? {} : styles.inputDisabled)
              }}
              onFocus={(e) => {
                if (isEditing) {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestHistory = () => (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Testing History</h2>
      <div style={{ overflowX: 'auto', marginTop: '24px' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Test Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Location</th>
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, index) => (
              <tr
                key={index}
                style={styles.tr}
                onMouseOver={(e) => e.target.parentNode.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.parentNode.style.backgroundColor = 'transparent'}
              >
                <td style={styles.td}>{new Date(test.date).toLocaleDateString()}</td>
                <td style={styles.td}>{test.type}</td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} style={{ color: '#059669' }} />
                    <span style={{ color: '#059669', fontWeight: '500' }}>{test.status}</span>
                  </div>
                </td>
                <td style={{ ...styles.td, color: '#6b7280' }}>{test.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Notification Preferences</h2>
        <div style={{ marginTop: '24px' }}>
          {Object.entries(notifications).map(([key, value], index, array) => (
            <div
              key={key}
              style={{
                ...styles.settingsItem,
                ...(index === array.length - 1 ? styles.settingsItemLast : {})
              }}
            >
              <div>
                <h3 style={{ fontWeight: '500', color: '#1f2937', margin: '0 0 4px 0' }}>
                  {key === 'testReminders' && 'Test Reminders'}
                  {key === 'resultNotifications' && 'Result Notifications'}
                  {key === 'educationUpdates' && 'Education Updates'}
                  {key === 'systemAlerts' && 'System Alerts'}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  {key === 'testReminders' && 'Receive notifications about upcoming tests'}
                  {key === 'resultNotifications' && 'Get notified when test results are available'}
                  {key === 'educationUpdates' && 'Updates about anti-doping education and rules'}
                  {key === 'systemAlerts' && 'Important system and security alerts'}
                </p>
              </div>
              <Toggle
                checked={value}
                onChange={() => handleNotificationChange(key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Security Settings</h2>
        <div style={{ marginTop: '24px' }}>
          <button
            style={styles.settingsButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={20} style={{ color: '#6b7280' }} />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>Change Password</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Update your account password</p>
              </div>
            </div>
            <div style={{ color: '#9ca3af' }}>→</div>
          </button>
          
          <button
            style={styles.settingsButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={20} style={{ color: '#6b7280' }} />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>Two-Factor Authentication</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Add an extra layer of security</p>
              </div>
            </div>
            <div style={{ color: '#9ca3af' }}>→</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.headerCard}>
          <div style={styles.avatar}>
            <User size={24} style={{ color: '#2563eb' }} />
          </div>
          <div>
            <h1 style={styles.title}>
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p style={styles.subtitle}>{profileData.sport} • {profileData.discipline}</p>
            <div style={styles.status}>
              <CheckCircle size={16} style={{ color: '#059669' }} />
              <span style={styles.statusText}>Compliant Status</span>
            </div>
          </div>
        </div>

        <div style={styles.flexRow}>
          <div style={styles.sidebar}>
            <nav style={styles.nav}>
              <ul style={styles.navList}>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                      ...styles.navButton,
                      ...(activeTab === 'profile' ? styles.navButtonActive : styles.navButtonInactive)
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== 'profile') {
                        e.target.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== 'profile') {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <User size={18} />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('testing')}
                    style={{
                      ...styles.navButton,
                      ...(activeTab === 'testing' ? styles.navButtonActive : styles.navButtonInactive)
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== 'testing') {
                        e.target.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== 'testing') {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Calendar size={18} />
                    Testing History
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    style={{
                      ...styles.navButton,
                      ...(activeTab === 'settings' ? styles.navButtonActive : styles.navButtonInactive)
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== 'settings') {
                        e.target.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== 'settings') {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Settings size={18} />
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div style={styles.content}>
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'testing' && renderTestHistory()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}