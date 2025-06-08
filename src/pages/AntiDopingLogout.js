import  { useState, useEffect } from 'react';
import { LogOut, Home, User,  CheckCircle, ArrowLeft } from 'lucide-react';

export default function AntiDopingLogout() {
     useEffect(() => {
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                  navbar.style.display = 'none'; // Hide navbar on mount
                }
            
                return () => {
                  if (navbar) {
                    navbar.style.display = ''; // Restore navbar on unmount
                  }
                }; }, []);
  const [logoutStep, setLogoutStep] = useState('confirm'); // 'confirm', 'processing', 'success'
  const [countdown, setCountdown] = useState(5);
  const [userName] = useState('Anurupa Roy'); // This would come from your auth context

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      padding: '40px',
      width: '100%',
      maxWidth: '500px',
      textAlign: 'center'
    },
    header: {
      marginBottom: '32px'
    },
    icon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#fee2e2',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    successIcon: {
      backgroundColor: '#dcfce7'
    },
    processingIcon: {
      backgroundColor: '#fef3c7'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 12px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      margin: 0,
      lineHeight: '1.5'
    },
    userInfo: {
      backgroundColor: '#f1f5f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '32px',
      border: '1px solid #e2e8f0'
    },
    userName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#334155',
      margin: '0 0 8px 0'
    },
    userRole: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      minWidth: '140px'
    },
    primaryButton: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f8fafc',
      color: '#475569',
      border: '1px solid #cbd5e1'
    },
    homeButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    backButton: {
      backgroundColor: '#64748b',
      color: 'white'
    },
    countdown: {
      fontSize: '18px',
      color: '#2563eb',
      fontWeight: '600',
      margin: '20px 0'
    },
    processingText: {
      fontSize: '16px',
      color: '#64748b',
      margin: '20px 0'
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '3px solid #f3f4f6',
      borderTop: '3px solid #fbbf24',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px'
    },
    successMessage: {
      fontSize: '16px',
      color: '#059669',
      margin: '20px 0',
      fontWeight: '500'
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  };

  useEffect(() => {
    if (logoutStep === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (logoutStep === 'success' && countdown === 0) {
      handleGoHome();
    }
  }, [logoutStep, countdown]);

  const handleLogout = () => {
    setLogoutStep('processing');
    
    // Simulate logout process
    setTimeout(() => {
      // Clear user session, tokens, etc.
      // localStorage.removeItem('authToken'); // Would normally do this
      // sessionStorage.clear(); // Would normally do this
      
      setLogoutStep('success');
    }, 2000);
  };

  const handleCancel = () => {
    // Go back to previous page or dashboard
    window.history.back();
  };

  const handleGoHome = () => {
    // Redirect to home page
    // In a real app, you'd use React Router: navigate('/') or history.push('/')
    window.location.href = '/';
  };

  const renderConfirmation = () => (
    <>
      <div style={styles.header}>
        <div style={styles.icon}>
          <LogOut size={40} style={{ color: '#dc2626' }} />
        </div>
        <h1 style={styles.title}>Confirm Logout</h1>
        <p style={styles.subtitle}>
          Are you sure you want to log out of your Anti-Doping account?
        </p>
      </div>

      <div style={styles.userInfo}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
          <User size={20} style={{ color: '#64748b' }} />
          <p style={styles.userName}>{userName}</p>
        </div>
        <p style={styles.userRole}>Registered Athlete • Track and Field</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          <CheckCircle size={16} style={{ color: '#059669' }} />
          <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Compliant Status</span>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={handleCancel}
          style={{
            ...styles.button,
            ...styles.secondaryButton
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#f1f5f9';
            e.target.style.borderColor = '#94a3b8';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f8fafc';
            e.target.style.borderColor = '#cbd5e1';
          }}
        >
          <ArrowLeft size={18} />
          Cancel
        </button>
        <button
          onClick={handleLogout}
          style={{
            ...styles.button,
            ...styles.primaryButton
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#b91c1c';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#dc2626';
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  const renderProcessing = () => (
    <>
      <div style={styles.header}>
        <div style={{ ...styles.icon, ...styles.processingIcon }}>
          <div style={styles.spinner}></div>
        </div>
        <h1 style={styles.title}>Logging Out...</h1>
        <p style={styles.subtitle}>
          Please wait while we securely log you out of your account.
        </p>
      </div>

      <p style={styles.processingText}>
        Clearing your session and securing your data...
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );

  const renderSuccess = () => (
    <>
      <div style={styles.header}>
        <div style={{ ...styles.icon, ...styles.successIcon }}>
          <CheckCircle size={40} style={{ color: '#059669' }} />
        </div>
        <h1 style={styles.title}>Logout Successful</h1>
        <p style={styles.subtitle}>
          You have been successfully logged out of your Anti-Doping account.
        </p>
      </div>

      <p style={styles.successMessage}>
        Your session has been terminated and all data secured.
      </p>

      <p style={styles.countdown}>
        Redirecting to home page in {countdown} seconds...
      </p>

      <div style={styles.buttonGroup}>
        <button
          onClick={handleGoHome}
          style={{
            ...styles.button,
            ...styles.homeButton
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1d4ed8';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#2563eb';
          }}
        >
          <Home size={18} />
          Go to Home
        </button>
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {logoutStep === 'confirm' && renderConfirmation()}
        {logoutStep === 'processing' && renderProcessing()}
        {logoutStep === 'success' && renderSuccess()}
      </div>
    </div>
  );
}