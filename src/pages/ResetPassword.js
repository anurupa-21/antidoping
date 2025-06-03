import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    document.body.classList.add('no-navbar');
    return () => {
      document.body.classList.remove('no-navbar');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setSuccess('');
      return;
    }

    try {
      setError('');
      // ⚠️ Replace with actual token or user ID if required for backend
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        password: newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password reset successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/auth'); // Redirect after success
        }, 2000);
      }
    } catch (err) {
      setError('Password reset failed. Please try again.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h1 className="reset-password-title">Reset Your Password</h1>
          <form onSubmit={handleSubmit} className="reset-password-form">
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
              />
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
              />
            </div>

            {error && <p className="reset-password-error">{error}</p>}
            {success && <p className="reset-password-success">{success}</p>}

            <button type="submit" className="reset-password-submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;