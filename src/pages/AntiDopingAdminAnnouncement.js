import React, { useState,useEffect } from 'react';
import { Send, AlertCircle, CheckCircle, Users } from 'lucide-react';

const AntiDopingAdminAnnouncement = () => {
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
  const [announcement, setAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'medium',
    targetAudience: 'all',
    scheduledDate: '',
    expiryDate: ''
  });
  
  const [notifications, setNotifications] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: '#10B981', bgColor: '#ECFDF5' },
    { value: 'medium', label: 'Medium Priority', color: '#F59E0B', bgColor: '#FFFBEB' },
    { value: 'high', label: 'High Priority', color: '#EF4444', bgColor: '#FEF2F2' },
    { value: 'urgent', label: 'Urgent', color: '#DC2626', bgColor: '#FEF2F2' }
  ];
  
  const audienceOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'athletes', label: 'Athletes Only' },
    { value: 'coaches', label: 'Coaches Only' },
    { value: 'officials', label: 'Testing Officials' },
    { value: 'organizations', label: 'Sports Organizations' }
  ];

  const handleInputChange = (field, value) => {
    setAnnouncement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.title.trim() || !announcement.message.trim()) {
      alert('Please fill in both title and message fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        ...announcement,
        timestamp: new Date().toISOString(),
        status: 'sent',
        recipientCount: Math.floor(Math.random() * 1000) + 100
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setAnnouncement({
        title: '',
        message: '',
        priority: 'medium',
        targetAudience: 'all',
        scheduledDate: '',
        expiryDate: ''
      });
      setIsSubmitting(false);
      setShowPreview(false);
    }, 2000);
  };

  const getPriorityStyle = (priority) => {
    const option = priorityOptions.find(opt => opt.value === priority);
    return option ? { color: option.color, backgroundColor: option.bgColor } : {};
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#1E40AF',
          color: 'white',
          padding: '24px',
          borderRadius: '12px 12px 0 0',
          background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            Anti-Doping Control Platform
          </h1>
          <p style={{
            margin: 0,
            fontSize: '16px',
            opacity: '0.9'
          }}>
            Administrative Announcement System
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '24px',
          marginTop: '24px'
        }}>
          {/* Main Form */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              <h2 style={{
                margin: '0 0 16px 0',
                fontSize: '20px',
                fontWeight: '600',
                color: '#1F2937'
              }}>
                Create New Announcement
              </h2>
              
              <div>
                {/* Title */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Announcement Title *
                  </label>
                  <input
                    type="text"
                    value={announcement.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Updated Testing Procedures Effective Immediately"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Message Content *
                  </label>
                  <textarea
                    value={announcement.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Enter the detailed announcement message here..."
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                {/* Priority and Audience Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Priority Level
                    </label>
                    <select
                      value={announcement.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                      }}
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Target Audience
                    </label>
                    <select
                      value={announcement.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                      }}
                    >
                      {audienceOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Schedule and Expiry Dates */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Schedule Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={announcement.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={announcement.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    style={{
                      padding: '12px 24px',
                      border: '2px solid #6B7280',
                      backgroundColor: 'transparent',
                      color: '#6B7280',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#6B7280';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6B7280';
                    }}
                  >
                    {showPreview ? 'Hide Preview' : 'Preview'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                      padding: '12px 24px',
                      border: 'none',
                      backgroundColor: isSubmitting ? '#9CA3AF' : '#1E40AF',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#1D4ED8';
                    }}
                    onMouseOut={(e) => {
                      if (!isSubmitting) e.target.style.backgroundColor = '#1E40AF';
                    }}
                  >
                    <Send size={18} />
                    {isSubmitting ? 'Sending...' : 'Send Announcement'}
                  </button>
                </div>
                </div>
            </div>

            {/* Preview Section */}
            {showPreview && (announcement.title || announcement.message) && (
              <div style={{
                padding: '24px',
                backgroundColor: '#F9FAFB',
                borderTop: '1px solid #E5E7EB'
              }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1F2937'
                }}>
                  Preview
                </h3>
                
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <AlertCircle size={20} style={{ color: getPriorityStyle(announcement.priority).color }} />
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      ...getPriorityStyle(announcement.priority)
                    }}>
                      {priorityOptions.find(opt => opt.value === announcement.priority)?.label}
                    </span>
                  </div>
                  
                  <h4 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1F2937'
                  }}>
                    {announcement.title || 'Announcement Title'}
                  </h4>
                  
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#4B5563'
                  }}>
                    {announcement.message || 'Announcement message will appear here...'}
                  </p>
                  
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    borderTop: '1px solid #E5E7EB',
                    paddingTop: '12px'
                  }}>
                    Target: {audienceOptions.find(opt => opt.value === announcement.targetAudience)?.label}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Recent Announcements */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              <h3 style={{
                margin: '0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1F2937'
              }}>
                Recent Announcements
              </h3>
            </div>
            
            <div style={{
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#6B7280'
                }}>
                  <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    No announcements sent yet
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #F3F4F6'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <CheckCircle size={16} style={{ color: '#10B981' }} />
                      <span style={{
                        fontSize: '12px',
                        color: '#10B981',
                        fontWeight: '500'
                      }}>
                        SENT
                      </span>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        ...getPriorityStyle(notif.priority)
                      }}>
                        {notif.priority}
                      </span>
                    </div>
                    
                    <h4 style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1F2937',
                      lineHeight: '1.3'
                    }}>
                      {notif.title}
                    </h4>
                    
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '12px',
                      color: '#6B7280',
                      lineHeight: '1.4'
                    }}>
                      {notif.message.length > 100 
                        ? notif.message.substring(0, 100) + '...' 
                        : notif.message}
                    </p>
                    
                    <div style={{
                      fontSize: '11px',
                      color: '#9CA3AF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{formatDate(notif.timestamp)}</span>
                      <span>{notif.recipientCount} recipients</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiDopingAdminAnnouncement;