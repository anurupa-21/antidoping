import React, { useState, useEffect } from 'react';
import { Download, FileText, Users, AlertTriangle, Calendar, Filter, RefreshCw, TrendingUp } from 'lucide-react';

const AntiDopingAdminReports = () => {
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
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('last30');
  const [selectedSport, setSelectedSport] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const [reportData, setReportData] = useState({
    overview: {
      totalTests: 1247,
      positiveTests: 18,
      pendingResults: 42,
      athletesTested: 892,
      violationsReported: 15,
      complianceRate: 98.6
    },
    testResults: [
      { id: 1, athleteName: 'John Smith', sport: 'Athletics', testDate: '2025-06-01', result: 'Negative', substance: 'N/A' },
      { id: 2, athleteName: 'Maria Garcia', sport: 'Swimming', testDate: '2025-06-02', result: 'Positive', substance: 'EPO' },
      { id: 3, athleteName: 'Alex Johnson', sport: 'Cycling', testDate: '2025-06-03', result: 'Pending', substance: 'N/A' },
      { id: 4, athleteName: 'Sarah Wilson', sport: 'Weightlifting', testDate: '2025-06-04', result: 'Negative', substance: 'N/A' },
      { id: 5, athleteName: 'Mike Chen', sport: 'Boxing', testDate: '2025-06-05', result: 'Positive', substance: 'Testosterone' }
    ],
    violations: [
      { id: 1, athleteName: 'Maria Garcia', sport: 'Swimming', violationType: 'Presence of Prohibited Substance', status: 'Under Investigation', reportDate: '2025-06-02' },
      { id: 2, athleteName: 'Mike Chen', sport: 'Boxing', violationType: 'Use of Prohibited Method', status: 'Sanctions Applied', reportDate: '2025-06-05' }
    ],
    athletes: [
      { id: 1, name: 'John Smith', sport: 'Athletics', testsCount: 8, lastTest: '2025-06-01', status: 'Active' },
      { id: 2, name: 'Maria Garcia', sport: 'Swimming', testsCount: 12, lastTest: '2025-06-02', status: 'Suspended' },
      { id: 3, name: 'Alex Johnson', sport: 'Cycling', testsCount: 6, lastTest: '2025-06-03', status: 'Active' }
    ]
  });

  const exportToCSV = (data, filename) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    }, 1000);
  };

  const exportToPDF = (reportType) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, you'd use a PDF library like jsPDF
      alert(`${reportType} report exported as PDF (Demo)`);
      setIsLoading(false);
    }, 1500);
  };

  const generateReport = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate API call to generate fresh report
      setReportData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          totalTests: prev.overview.totalTests + Math.floor(Math.random() * 10),
          positiveTests: prev.overview.positiveTests + Math.floor(Math.random() * 2)
        }
      }));
      setIsLoading(false);
    }, 2000);
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div style={{
      background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} color="white" />
        </div>
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  const TableRow = ({ data, headers, onExport }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
          Data Table
        </h3>
        <button
          onClick={onExport}
          disabled={isLoading}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isLoading ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {headers.map((header, index) => (
                <th key={index} style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{
                borderBottom: '1px solid #f1f5f9',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} style={{
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#334155'
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Anti-Doping Reports & Analytics
              </h1>
              <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
                Generate comprehensive reports and export data for compliance monitoring
              </p>
            </div>
            <button
              onClick={generateReport}
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isLoading ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              <RefreshCw size={20} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
              {isLoading ? 'Generating...' : 'Refresh Data'}
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                background: 'white',
                minWidth: '160px'
              }}
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastyear">Last year</option>
            </select>
            
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                background: 'white',
                minWidth: '160px'
              }}
            >
              <option value="all">All Sports</option>
              <option value="athletics">Athletics</option>
              <option value="swimming">Swimming</option>
              <option value="cycling">Cycling</option>
              <option value="weightlifting">Weightlifting</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '8px',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          gap: '8px'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'tests', label: 'Test Results', icon: FileText },
            { id: 'violations', label: 'Violations', icon: AlertTriangle },
            { id: 'athletes', label: 'Athletes', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Statistics Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <StatCard
                title="Total Tests Conducted"
                value={reportData.overview.totalTests.toLocaleString()}
                icon={FileText}
                color="#3b82f6"
                subtitle="This period"
              />
              <StatCard
                title="Positive Test Results"
                value={reportData.overview.positiveTests}
                icon={AlertTriangle}
                color="#ef4444"
                subtitle={`${((reportData.overview.positiveTests / reportData.overview.totalTests) * 100).toFixed(1)}% of total`}
              />
              <StatCard
                title="Athletes Tested"
                value={reportData.overview.athletesTested.toLocaleString()}
                icon={Users}
                color="#10b981"
                subtitle="Unique individuals"
              />
              <StatCard
                title="Compliance Rate"
                value={`${reportData.overview.complianceRate}%`}
                icon={TrendingUp}
                color="#8b5cf6"
                subtitle="Overall compliance"
              />
            </div>

            {/* Export Options */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '24px' }}>
                Export Complete Reports
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <button
                  onClick={() => exportToPDF('Comprehensive')}
                  disabled={isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isLoading ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Download size={20} />
                  Export PDF Report
                </button>
                <button
                  onClick={() => exportToCSV(reportData.testResults, 'all_test_results')}
                  disabled={isLoading}
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isLoading ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Download size={20} />
                  Export All Data CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <TableRow
            data={reportData.testResults}
            headers={['ID', 'Athlete Name', 'Sport', 'Test Date', 'Result', 'Substance']}
            onExport={() => exportToCSV(reportData.testResults, 'test_results')}
          />
        )}

        {activeTab === 'violations' && (
          <TableRow
            data={reportData.violations}
            headers={['ID', 'Athlete Name', 'Sport', 'Violation Type', 'Status', 'Report Date']}
            onExport={() => exportToCSV(reportData.violations, 'violations')}
          />
        )}

        {activeTab === 'athletes' && (
          <TableRow
            data={reportData.athletes}
            headers={['ID', 'Name', 'Sport', 'Tests Count', 'Last Test', 'Status']}
            onExport={() => exportToCSV(reportData.athletes, 'athletes')}
          />
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} color="#667eea" />
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Processing your request...
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AntiDopingAdminReports;