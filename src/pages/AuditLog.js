import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, Shield, User, FileText, Clock } from 'lucide-react';

const AuditLog = () => {
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
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  // Mock audit log data
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date('2024-06-06T10:30:00'),
      adminId: 'admin001',
      adminName: 'John Smith',
      action: 'USER_CREATED',
      category: 'User Management',
      target: 'Athlete Registration',
      targetId: 'ATH-2024-001',
      description: 'Created new athlete profile for Maria Rodriguez',
      severity: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: {
        before: null,
        after: {
          name: 'Maria Rodriguez',
          sport: 'Athletics',
          status: 'Active',
          email: 'maria.rodriguez@email.com'
        }
      }
    },
    {
      id: 2,
      timestamp: new Date('2024-06-06T09:45:00'),
      adminId: 'admin002',
      adminName: 'Sarah Johnson',
      action: 'TEST_RESULT_UPDATED',
      category: 'Testing',
      target: 'Doping Test Result',
      targetId: 'TEST-2024-156',
      description: 'Updated test result status from Pending to Positive',
      severity: 'critical',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      changes: {
        before: { status: 'Pending', result: null },
        after: { status: 'Positive', result: 'Testosterone elevated', flagged: true }
      }
    },
    {
      id: 3,
      timestamp: new Date('2024-06-06T08:20:00'),
      adminId: 'admin001',
      adminName: 'John Smith',
      action: 'ATHLETE_SUSPENDED',
      category: 'Sanctions',
      target: 'Athlete Status',
      targetId: 'ATH-2024-089',
      description: 'Suspended athlete for doping violation - 2 year ban',
      severity: 'high',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: {
        before: { status: 'Active', suspensionEnd: null },
        after: { status: 'Suspended', suspensionEnd: '2026-06-06', reason: 'Doping violation' }
      }
    },
    {
      id: 4,
      timestamp: new Date('2024-06-06T07:15:00'),
      adminId: 'admin003',
      adminName: 'Mike Wilson',
      action: 'REPORT_GENERATED',
      category: 'Reporting',
      target: 'Monthly Report',
      targetId: 'RPT-2024-05',
      description: 'Generated monthly anti-doping statistics report',
      severity: 'info',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      changes: {
        before: null,
        after: { reportType: 'Monthly Statistics', period: 'May 2024', status: 'Generated' }
      }
    },
    {
      id: 5,
      timestamp: new Date('2024-06-05T16:30:00'),
      adminId: 'admin002',
      adminName: 'Sarah Johnson',
      action: 'WHEREABOUTS_UPDATED',
      category: 'Whereabouts',
      target: 'Athlete Whereabouts',
      targetId: 'WH-2024-234',
      description: 'Updated whereabouts filing for quarterly period',
      severity: 'medium',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      changes: {
        before: { location: 'Training Camp A', filingStatus: 'Incomplete' },
        after: { location: 'Training Camp B', filingStatus: 'Complete', updatedBy: 'admin002' }
      }
    }
  ];

  useEffect(() => {
    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  useEffect(() => {
    let filtered = logs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.category === filterType);
    }

    // Apply severity filter
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === filterSeverity);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, filterSeverity, logs]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'info': return '#2563eb';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={16} />;
      case 'high': return <Shield size={16} />;
      case 'medium': return <User size={16} />;
      case 'info': return <FileText size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Admin', 'Action', 'Category', 'Target', 'Description', 'Severity', 'IP Address'],
      ...filteredLogs.map(log => [
        formatTimestamp(log.timestamp),
        log.adminName,
        log.action,
        log.category,
        log.target,
        log.description,
        log.severity,
        log.ipAddress
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        padding: '24px 32px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Shield size={28} />
          Anti-Doping Admin Audit Log
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
          Track and monitor all administrative actions and system changes
        </p>
      </div>

      <div style={{ padding: '32px' }}>
        {/* Controls */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151'
              }}>
                Search Logs
              </label>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search by admin, action, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151'
              }}>
                Category
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="all">All Categories</option>
                <option value="User Management">User Management</option>
                <option value="Testing">Testing</option>
                <option value="Sanctions">Sanctions</option>
                <option value="Whereabouts">Whereabouts</option>
                <option value="Reporting">Reporting</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151'
              }}>
                Severity
              </label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="info">Info</option>
              </select>
            </div>

            {/* Export Button */}
            <div>
              <button
                onClick={exportLogs}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Timestamp
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Admin
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Action
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Category
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Description
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Severity
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log, index) => (
                  <tr 
                    key={log.id}
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}
                  >
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{log.adminName}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>ID: {log.adminId}</div>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <span style={{
                        backgroundColor: '#e0e7ff',
                        color: '#1e40af',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      {log.category}
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      {log.description}
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: getSeverityColor(log.severity)
                      }}>
                        {getSeverityIcon(log.severity)}
                        <span style={{ 
                          textTransform: 'capitalize',
                          fontWeight: '500'
                        }}>
                          {log.severity}
                        </span>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      <button
                        onClick={() => setSelectedLog(log)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '20px',
              backgroundColor: '#f9fafb',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPage === 1 ? '#f3f4f6' : '#2563eb',
                  color: currentPage === 1 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              
              <span style={{ 
                padding: '0 16px',
                fontSize: '14px',
                color: '#374151'
              }}>
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#2563eb',
                  color: currentPage === totalPages ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Log Details Modal */}
        {selectedLog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h2 style={{ 
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Audit Log Details
                </h2>
                <button
                  onClick={() => setSelectedLog(null)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <strong style={{ color: '#374151' }}>Timestamp:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {formatTimestamp(selectedLog.timestamp)}
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Admin:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {selectedLog.adminName} ({selectedLog.adminId})
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <strong style={{ color: '#374151' }}>Action:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {selectedLog.action.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Category:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {selectedLog.category}
                    </p>
                  </div>
                </div>

                <div>
                  <strong style={{ color: '#374151' }}>Description:</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                    {selectedLog.description}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <strong style={{ color: '#374151' }}>Target:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {selectedLog.target} ({selectedLog.targetId})
                    </p>
                  </div>
                  <div>
                    <strong style={{ color: '#374151' }}>IP Address:</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {selectedLog.ipAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <strong style={{ color: '#374151' }}>User Agent:</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                    {selectedLog.userAgent}
                  </p>
                </div>

                {selectedLog.changes && (
                  <div>
                    <strong style={{ color: '#374151' }}>Changes:</strong>
                    <div style={{
                      marginTop: '8px',
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      {selectedLog.changes.before && (
                        <div style={{ marginBottom: '12px' }}>
                          <strong style={{ color: '#dc2626' }}>Before:</strong>
                          <pre style={{ 
                            margin: '4px 0 0 0',
                            fontSize: '12px',
                            color: '#6b7280',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {JSON.stringify(selectedLog.changes.before, null, 2)}
                          </pre>
                        </div>
                      )}
                      <div>
                        <strong style={{ color: '#059669' }}>After:</strong>
                        <pre style={{ 
                          margin: '4px 0 0 0',
                          fontSize: '12px',
                          color: '#6b7280',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {JSON.stringify(selectedLog.changes.after, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#2563eb' }}>
              {filteredLogs.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Logs</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#dc2626' }}>
              {filteredLogs.filter(log => log.severity === 'critical').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Critical Issues</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#ea580c' }}>
              {filteredLogs.filter(log => log.severity === 'high').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>High Priority</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#059669' }}>
              {new Set(filteredLogs.map(log => log.adminId)).size}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Admins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;