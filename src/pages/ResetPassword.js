import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get token from URL parameters
  const token = searchParams.get('token');
  
  const [step, setStep] = useState(token ? 'reset' : 'request'); // 'request' or 'reset'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  // Configure axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
    // Hide navbar
    document.body.classList.add('no-navbar');
    
    // If token exists, validate it
    if (token) {
      validateToken();
    }
    
    return () => {
      document.body.classList.remove('no-navbar');
    };
  }, [token]);

  const validateToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/password/validate/${token}`);
      
      if (response.status === 200) {
        setTokenValid(true);
        setStep('reset');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      setError('Invalid or expired reset token. Please request a new password reset.');
      setStep('request');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
     const response = await axios.post('/api/auth/password/forgot', { email: email.trim() });

      if (response.status === 200) {
        setSuccess('Password reset link has been sent to your email address. Please check your inbox.');
        setEmail('');
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        switch (status) {
          case 404:
            setError('No account found with this email address.');
            break;
          case 429:
            setError('Too many reset requests. Please wait before trying again.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(message || 'Failed to send reset email. Please try again.');
        }
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/password/reset', { token, newPassword });

      if (response.status === 200) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setNewPassword('');
        setConfirmPassword('');
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        switch (status) {
          case 400:
            setError('Invalid reset token or password requirements not met.');
            break;
          case 404:
            setError('Reset token not found or expired.');
            break;
          case 410:
            setError('Reset token has expired. Please request a new password reset.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(message || 'Password reset failed. Please try again.');
        }
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !error && !success) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <div className="reset-password-box">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Please wait...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-box">
          <img src="/logo.jpg" alt="Logo" className="reset-password-logo" />
          
          {step === 'request' ? (
            <>
              <h1 className="reset-password-title">Forgot Password?</h1>
              <p className="reset-password-subtitle">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handlePasswordResetRequest} className="reset-password-form">
                <div className="reset-password-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="reset-password-input"
                    disabled={loading}
                  />
                </div>

                {error && <p className="reset-password-error">{error}</p>}
                {success && <p className="reset-password-success">{success}</p>}

                <button 
                  type="submit" 
                  className="reset-password-submit"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <div className="reset-password-links">
                  <Link to="/auth" className="reset-password-link">
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="reset-password-title">Reset Your Password</h1>
              <p className="reset-password-subtitle">
                Enter your new password below.
              </p>
              
              <form onSubmit={handlePasswordReset} className="reset-password-form">
                <div className="reset-password-input-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="reset-password-input"
                    disabled={loading}
                  />
                  <small className="password-requirements">
                    Password must be at least 6 characters with uppercase, lowercase, and numbers.
                  </small>
                </div>
                
                <div className="reset-password-input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="reset-password-input"
                    disabled={loading}
                  />
                </div>

                {error && <p className="reset-password-error">{error}</p>}
                {success && <p className="reset-password-success">{success}</p>}

                <button 
                  type="submit" 
                  className="reset-password-submit"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                
                <div className="reset-password-links">
                  <Link to="/auth" className="reset-password-link">
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;