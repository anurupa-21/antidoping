import React, { useState,useEffect } from 'react';
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle, User, Calendar, Filter, Send, X } from 'lucide-react';

const Help = () => {
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
  const [queries, setQueries] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      subject: "Question about TUE Application",
      message: "I need help understanding the Therapeutic Use Exemption process. What documents are required for a TUE application for insulin?",
      category: "TUE",
      status: "pending",
      priority: "high",
      submittedAt: "2025-06-05T14:30:00Z",
      response: null
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      subject: "Prohibited Substance Inquiry",
      message: "Is creatine monohydrate on the prohibited list? I'm a competitive swimmer and want to make sure it's safe to use.",
      category: "Prohibited List",
      status: "responded",
      priority: "medium",
      submittedAt: "2025-06-04T09:15:00Z",
      response: "Creatine monohydrate is not on the WADA Prohibited List and is considered safe for competitive athletes. However, always check the latest prohibited list and ensure any supplements are third-party tested."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      subject: "Testing Procedure Question",
      message: "What should I expect during an out-of-competition drug test? This is my first time and I'm nervous about the process.",
      category: "Testing",
      status: "pending",
      priority: "medium",
      submittedAt: "2025-06-06T11:00:00Z",
      response: null
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      subject: "Whereabouts Filing Issue",
      message: "I'm having trouble updating my whereabouts information in the system. The website keeps giving me an error when I try to submit changes.",
      category: "Whereabouts",
      status: "in-progress",
      priority: "high",
      submittedAt: "2025-06-03T16:45:00Z",
      response: null
    }
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['TUE', 'Prohibited List', 'Testing', 'Whereabouts', 'Education', 'Results Management'];
  const statuses = ['pending', 'in-progress', 'responded'];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock style={{ width: '16px', height: '16px', color: '#f59e0b' }} />;
      case 'in-progress': return <AlertCircle style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
      case 'responded': return <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />;
      default: return null;
    }
  };

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || query.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || query.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSendResponse = () => {
    if (!responseText.trim() || !selectedQuery) return;

    setQueries(queries.map(query => 
      query.id === selectedQuery.id 
        ? { ...query, response: responseText, status: 'responded' }
        : query
    ));
    
    setResponseText('');
    setSelectedQuery({ ...selectedQuery, response: responseText, status: 'responded' });
  };

  const updateQueryStatus = (queryId, newStatus) => {
    setQueries(queries.map(query => 
      query.id === queryId 
        ? { ...query, status: newStatus }
        : query
    ));
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.25rem 0'
            }}>
              Anti-Doping Admin Portal
            </h1>
            <p style={{
              color: '#6b7280',
              margin: 0,
              fontSize: '0.875rem'
            }}>
              Manage user queries and provide assistance
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              background: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {queries.filter(q => q.status === 'pending').length} Pending
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: selectedQuery ? '1fr 1fr' : '1fr',
        gap: '2rem',
        height: 'calc(100vh - 120px)'
      }}>
        {/* Query List Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Search and Filters */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <Search style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="responded">Responded</option>
                </select>
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Query List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {filteredQueries.map(query => (
              <div
                key={query.id}
                onClick={() => setSelectedQuery(query)}
                style={{
                  padding: '1rem',
                  border: selectedQuery?.id === query.id ? '2px solid #667eea' : '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedQuery?.id === query.id ? '#f8fafc' : 'white',
                  transform: selectedQuery?.id === query.id ? 'scale(1.02)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedQuery?.id !== query.id) {
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedQuery?.id !== query.id) {
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <User style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    <span style={{
                      fontWeight: '600',
                      color: '#1f2937',
                      fontSize: '0.875rem'
                    }}>
                      {query.name}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {getStatusIcon(query.status)}
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getPriorityColor(query.priority)
                      }}
                    />
                  </div>
                </div>

                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.25'
                }}>
                  {query.subject}
                </h3>

                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: '0 0 0.75rem 0',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {query.message}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    background: '#e5e7eb',
                    color: '#374151',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {query.category}
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Calendar style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af'
                    }}>
                      {formatDate(query.submittedAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Query Detail Panel */}
        {selectedQuery && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0 0 0.5rem 0'
                }}>
                  {selectedQuery.subject}
                </h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User style={{ width: '14px', height: '14px' }} />
                    {selectedQuery.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar style={{ width: '14px', height: '14px' }} />
                    {formatDate(selectedQuery.submittedAt)}
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <select
                  value={selectedQuery.status}
                  onChange={(e) => updateQueryStatus(selectedQuery.id, e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="responded">Responded</option>
                </select>
                <button
                  onClick={() => setSelectedQuery(null)}
                  style={{
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '0.375rem',
                    color: '#6b7280'
                  }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            {/* Query Details */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 0.5rem 0'
                }}>
                  Contact Information
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {selectedQuery.email}
                </p>
              </div>

              <div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 0.5rem 0'
                }}>
                  Query Message
                </h3>
                <div style={{
                  background: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {selectedQuery.message}
                  </p>
                </div>
              </div>

              {selectedQuery.response && (
                <div>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Previous Response
                  </h3>
                  <div style={{
                    background: '#ecfdf5',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #d1fae5'
                  }}>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#065f46',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {selectedQuery.response}
                    </p>
                  </div>
                </div>
              )}

              {/* Response Input */}
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 0.5rem 0'
                }}>
                  {selectedQuery.response ? 'Send Additional Response' : 'Send Response'}
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response here..."
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button
                    onClick={handleSendResponse}
                    disabled={!responseText.trim()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: responseText.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: responseText.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                      alignSelf: 'flex-start'
                    }}
                  >
                    <Send style={{ width: '16px', height: '16px' }} />
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
                            