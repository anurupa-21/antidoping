import React, { useState, useEffect } from 'react';
import { Search, Flag, Eye,  MessageCircle, Users, AlertTriangle, CheckCircle,  Trash2,  Shield,  Filter } from 'lucide-react';

const ForumModerationDashboard = () => {
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
  const [activeTab, setActiveTab] = useState('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Mock data for demonstration
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Question about WADA testing procedures",
      author: "AthleteUser2024",
      content: "I have a question about the new testing procedures implemented by WADA. Can someone explain the process?",
      timestamp: "2024-06-06 10:30",
      status: "approved",
      reports: 0,
      category: "General Discussion",
      replies: 5,
      flagged: false,
      riskLevel: "low"
    },
    {
      id: 2,
      title: "Suspicious post about performance enhancement",
      author: "SuspiciousUser",
      content: "Looking for ways to enhance performance without getting caught. Anyone have tips?",
      timestamp: "2024-06-06 09:15",
      status: "flagged",
      reports: 3,
      category: "General Discussion",
      replies: 1,
      flagged: true,
      riskLevel: "high"
    },
    {
      id: 3,
      title: "Clean athlete support group",
      author: "CleanRunner",
      content: "Starting a support group for athletes committed to clean competition. Join us!",
      timestamp: "2024-06-06 08:45",
      status: "approved",
      reports: 0,
      category: "Community",
      replies: 12,
      flagged: false,
      riskLevel: "low"
    },
    {
      id: 4,
      title: "Banned substance inquiry",
      author: "CoachMike",
      content: "My athlete tested positive for a substance they claim they didn't knowingly take. What are our options?",
      timestamp: "2024-06-06 07:20",
      status: "pending",
      reports: 1,
      category: "Legal",
      replies: 8,
      flagged: true,
      riskLevel: "medium"
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "AthleteUser2024",
      email: "athlete@example.com",
      joinDate: "2024-01-15",
      postCount: 45,
      reportCount: 0,
      status: "active",
      role: "member",
      lastActivity: "2024-06-06 10:30"
    },
    {
      id: 2,
      username: "SuspiciousUser",
      email: "suspicious@example.com",
      joinDate: "2024-06-01",
      postCount: 3,
      reportCount: 5,
      status: "flagged",
      role: "member",
      lastActivity: "2024-06-06 09:15"
    },
    {
      id: 3,
      username: "CleanRunner",
      email: "clean@example.com",
      joinDate: "2023-08-10",
      postCount: 156,
      reportCount: 0,
      status: "trusted",
      role: "member",
      lastActivity: "2024-06-06 08:45"
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      postId: 2,
      reportedBy: "CleanRunner",
      reason: "Promoting doping",
      description: "This post seems to be asking for ways to use banned substances without detection",
      timestamp: "2024-06-06 09:20",
      status: "pending"
    },
    {
      id: 2,
      postId: 4,
      reportedBy: "AthleteUser2024",
      reason: "Misinformation",
      description: "Contains potentially misleading information about legal procedures",
      timestamp: "2024-06-06 07:25",
      status: "pending"
    }
  ]);

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: action, flagged: action === 'flagged' }
        : post
    ));
  };

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: action }
        : user
    ));
  };

  const handleReportAction = (reportId, action) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: action }
        : report
    ));
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#10b981';
      case 'flagged': return '#ef4444';
      case 'pending': return '#f59e0b';
      case 'banned': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalPosts: posts.length,
    flaggedPosts: posts.filter(p => p.flagged).length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    activeUsers: users.filter(u => u.status === 'active').length
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              Anti-Doping Forum Moderation
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
              Community oversight and content moderation dashboard
            </p>
          </div>
          <Shield size={32} />
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MessageCircle size={24} style={{ color: '#3b82f6' }} />
            <div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalPosts}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Total Posts</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Flag size={24} style={{ color: '#ef4444' }} />
            <div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.flaggedPosts}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Flagged Posts</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={24} style={{ color: '#f59e0b' }} />
            <div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.pendingReports}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Pending Reports</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={24} style={{ color: '#10b981' }} />
            <div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.activeUsers}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Active Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ padding: '0 2rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {['posts', 'users', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  backgroundColor: activeTab === tab ? '#f3f4f6' : 'transparent',
                  color: activeTab === tab ? '#1f2937' : '#6b7280',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Filter Controls */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Search posts, users, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={16} style={{ color: '#6b7280' }} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '1.5rem' }}>
            {activeTab === 'posts' && (
              <div>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#1f2937' }}>Forum Posts</h3>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {filteredPosts.length} posts found
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: post.flagged ? '#fef2f2' : '#ffffff',
                        borderLeft: `4px solid ${getRiskColor(post.riskLevel)}`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <h4 style={{ margin: 0, color: '#1f2937', fontSize: '1.1rem' }}>
                              {post.title}
                            </h4>
                            {post.flagged && <Flag size={16} style={{ color: '#ef4444' }} />}
                            <span style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              backgroundColor: getRiskColor(post.riskLevel),
                              color: 'white',
                              textTransform: 'uppercase',
                              fontWeight: 'bold'
                            }}>
                              {post.riskLevel}
                            </span>
                          </div>
                          <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                            by {post.author} • {post.timestamp} • {post.category}
                          </p>
                          <p style={{ margin: '0 0 1rem 0', color: '#374151' }}>
                            {post.content}
                          </p>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                            <span>{post.replies} replies</span>
                            <span>{post.reports} reports</span>
                            <span style={{ 
                              color: getStatusColor(post.status),
                              fontWeight: 'bold',
                              textTransform: 'capitalize'
                            }}>
                              {post.status}
                            </span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                          <button
                            onClick={() => handlePostAction(post.id, 'approved')}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #10b981',
                              backgroundColor: 'white',
                              color: '#10b981',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handlePostAction(post.id, 'flagged')}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #ef4444',
                              backgroundColor: 'white',
                              color: '#ef4444',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                            title="Flag"
                          >
                            <Flag size={16} />
                          </button>
                          <button
                            onClick={() => handlePostAction(post.id, 'banned')}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #dc2626',
                              backgroundColor: 'white',
                              color: '#dc2626',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #6b7280',
                              backgroundColor: 'white',
                              color: '#6b7280',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#1f2937' }}>User Management</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {users.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: user.status === 'flagged' ? '#fef2f2' : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ margin: 0, color: '#1f2937' }}>{user.username}</h4>
                          <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                            {user.email}
                          </p>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                            <span>Joined: {user.joinDate}</span>
                            <span>Posts: {user.postCount}</span>
                            <span>Reports: {user.reportCount}</span>
                            <span>Last active: {user.lastActivity}</span>
                          </div>
                          <div style={{ marginTop: '0.5rem' }}>
                            <span style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              backgroundColor: getStatusColor(user.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleUserAction(user.id, 'active')}
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #10b981',
                              backgroundColor: 'white',
                              color: '#10b981',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'suspended')}
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #f59e0b',
                              backgroundColor: 'white',
                              color: '#f59e0b',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'banned')}
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #ef4444',
                              backgroundColor: 'white',
                              color: '#ef4444',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Ban
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#1f2937' }}>Community Reports</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
                            <h4 style={{ margin: 0, color: '#1f2937' }}>
                              Report #{report.id}
                            </h4>
                            <span style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              backgroundColor: report.status === 'pending' ? '#f59e0b' : '#10b981',
                              color: 'white',
                              textTransform: 'capitalize'
                            }}>
                              {report.status}
                            </span>
                          </div>
                          <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                            Reported by {report.reportedBy} • {report.timestamp}
                          </p>
                          <p style={{ margin: '0 0 0.5rem 0', color: '#374151', fontWeight: 'bold' }}>
                            Reason: {report.reason}
                          </p>
                          <p style={{ margin: '0 0 1rem 0', color: '#374151' }}>
                            {report.description}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                            Related to Post ID: #{report.postId}
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                          <button
                            onClick={() => handleReportAction(report.id, 'resolved')}
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #10b981',
                              backgroundColor: 'white',
                              color: '#10b981',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Resolve
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, 'dismissed')}
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #6b7280',
                              backgroundColor: 'white',
                              color: '#6b7280',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumModerationDashboard;