import React, { useState, useEffect } from 'react';
import { Search,  Download, Eye, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, BookOpen} from 'lucide-react';

const ProgressAnalytics = () => {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
 // const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  
  // Mock data for players and their progress
  const [playersData, setPlayersData] = useState([
    {
      id: 1,
      name: 'Anurupa Roy',
      sport: 'Cricket',
      team: 'ABC',
      overallProgress: 85,
      complianceStatus: 'compliant',
      lastActivity: '2024-06-05',
      modules: {
        completed: 8,
        total: 10,
        details: [
          { name: 'WADA Code Basics', progress: 100, status: 'completed' },
          { name: 'Prohibited Substances', progress: 100, status: 'completed' },
          { name: 'Testing Procedures', progress: 75, status: 'in-progress' },
          { name: 'TUE Process', progress: 0, status: 'not-started' }
        ]
      },
      testingHistory: {
        completed: 12,
        pending: 1,
        violations: 0
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      sport: 'Swimming',
      team: 'Aqua Stars',
      overallProgress: 92,
      complianceStatus: 'compliant',
      lastActivity: '2024-06-06',
      modules: {
        completed: 9,
        total: 10,
        details: [
          { name: 'WADA Code Basics', progress: 100, status: 'completed' },
          { name: 'Prohibited Substances', progress: 100, status: 'completed' },
          { name: 'Testing Procedures', progress: 100, status: 'completed' },
          { name: 'TUE Process', progress: 60, status: 'in-progress' }
        ]
      },
      testingHistory: {
        completed: 15,
        pending: 0,
        violations: 0
      }
    },
    {
      id: 3,
      name: 'Mike Chen',
      sport: 'Athletics',
      team: 'Track Elite',
      overallProgress: 45,
      complianceStatus: 'at-risk',
      lastActivity: '2024-05-28',
      modules: {
        completed: 4,
        total: 10,
        details: [
          { name: 'WADA Code Basics', progress: 100, status: 'completed' },
          { name: 'Prohibited Substances', progress: 30, status: 'in-progress' },
          { name: 'Testing Procedures', progress: 0, status: 'not-started' },
          { name: 'TUE Process', progress: 0, status: 'not-started' }
        ]
      },
      testingHistory: {
        completed: 8,
        pending: 2,
        violations: 0
      }
    },
    {
      id: 4,
      name: 'Emma Thompson',
      sport: 'Cycling',
      team: 'Velocity Pro',
      overallProgress: 20,
      complianceStatus: 'non-compliant',
      lastActivity: '2024-05-15',
      modules: {
        completed: 2,
        total: 10,
        details: [
          { name: 'WADA Code Basics', progress: 100, status: 'completed' },
          { name: 'Prohibited Substances', progress: 10, status: 'in-progress' },
          { name: 'Testing Procedures', progress: 0, status: 'not-started' },
          { name: 'TUE Process', progress: 0, status: 'not-started' }
        ]
      },
      testingHistory: {
        completed: 5,
        pending: 1,
        violations: 1
      }
    }
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Analytics summary data
  const analyticsData = {
    totalPlayers: playersData.length,
    compliantPlayers: playersData.filter(p => p.complianceStatus === 'compliant').length,
    atRiskPlayers: playersData.filter(p => p.complianceStatus === 'at-risk').length,
    nonCompliantPlayers: playersData.filter(p => p.complianceStatus === 'non-compliant').length,
    averageProgress: Math.round(playersData.reduce((sum, p) => sum + p.overallProgress, 0) / playersData.length),
    totalModulesCompleted: playersData.reduce((sum, p) => sum + p.modules.completed, 0),
    totalTests: playersData.reduce((sum, p) => sum + p.testingHistory.completed, 0)
  };

  // Filter players based on search and status
  const filteredPlayers = playersData.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || player.complianceStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return '#10b981';
      case 'at-risk': return '#f59e0b';
      case 'non-compliant': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return <CheckCircle size={16} />;
      case 'at-risk': return <Clock size={16} />;
      case 'non-compliant': return <AlertTriangle size={16} />;
      default: return null;
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Sport', 'Team', 'Overall Progress', 'Status', 'Modules Completed', 'Last Activity'],
      ...filteredPlayers.map(player => [
        player.name,
        player.sport,
        player.team,
        `${player.overallProgress}%`,
        player.complianceStatus,
        `${player.modules.completed}/${player.modules.total}`,
        player.lastActivity
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'player-progress-report.csv';
    a.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0 0 10px 0',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Anti-Doping Progress & Analytics
          </h1>
          <p style={{
            margin: '0',
            fontSize: '1.1rem',
            opacity: '0.9'
          }}>
            Monitor player compliance and learning progress
          </p>
        </div>

        {/* Analytics Cards */}
        <div style={{
          padding: '30px',
          background: '#f8fafc'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '2px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <Users size={32} style={{ color: '#3b82f6', marginBottom: '10px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {analyticsData.totalPlayers}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Players</div>
            </div>

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '2px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <CheckCircle size={32} style={{ color: '#10b981', marginBottom: '10px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {analyticsData.compliantPlayers}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Compliant</div>
            </div>

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '2px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <TrendingUp size={32} style={{ color: '#8b5cf6', marginBottom: '10px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {analyticsData.averageProgress}%
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Avg Progress</div>
            </div>

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '2px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <BookOpen size={32} style={{ color: '#f59e0b', marginBottom: '10px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {analyticsData.totalModulesCompleted}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Modules Completed</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '25px',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} />
              <input
                type="text"
                placeholder="Search players, sports, or teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="at-risk">At Risk</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>

            <button
              onClick={exportData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Download size={16} />
              Export Report
            </button>
          </div>

          {/* Players Table */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Player</th>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Sport</th>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Progress</th>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Status</th>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Modules</th>
                    <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Last Activity</th>
                    <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr key={player.id} style={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.parentElement.style.backgroundColor = '#f9fafb'}
                    onMouseOut={(e) => e.target.parentElement.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '20px' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                            {player.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {player.team}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px', color: '#374151' }}>{player.sport}</td>
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '80px',
                            height: '8px',
                            background: '#e5e7eb',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${player.overallProgress}%`,
                              height: '100%',
                              background: player.overallProgress >= 80 ? '#10b981' : 
                                         player.overallProgress >= 50 ? '#f59e0b' : '#ef4444',
                              borderRadius: '4px',
                              transition: 'width 0.3s'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                            {player.overallProgress}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          color: getStatusColor(player.complianceStatus),
                          background: `${getStatusColor(player.complianceStatus)}20`
                        }}>
                          {getStatusIcon(player.complianceStatus)}
                          {player.complianceStatus.replace('-', ' ').toUpperCase()}
                        </div>
                      </td>
                      <td style={{ padding: '20px', color: '#374151' }}>
                        {player.modules.completed}/{player.modules.total}
                      </td>
                      <td style={{ padding: '20px', color: '#6b7280', fontSize: '0.875rem' }}>
                        {new Date(player.lastActivity).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '20px', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedPlayer(player)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
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
          </div>
        </div>
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={() => setSelectedPlayer(null)}
        >
          <div style={{
            background: 'white',
            borderRadius: '20px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '20px 20px 0 0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {selectedPlayer.name}
                  </h2>
                  <p style={{ margin: '0', opacity: '0.9' }}>
                    {selectedPlayer.sport} • {selectedPlayer.team}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '30px' }}>
              {/* Progress Overview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: '#f0f9ff',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '2px solid #e0f2fe'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>
                    {selectedPlayer.overallProgress}%
                  </div>
                  <div style={{ color: '#0369a1', fontSize: '0.9rem' }}>Overall Progress</div>
                </div>
                <div style={{
                  background: '#f0fdf4',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '2px solid #dcfce7'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>
                    {selectedPlayer.modules.completed}
                  </div>
                  <div style={{ color: '#166534', fontSize: '0.9rem' }}>Modules Completed</div>
                </div>
                <div style={{
                  background: '#fefce8',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '2px solid #fef3c7'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a16207' }}>
                    {selectedPlayer.testingHistory.completed}
                  </div>
                  <div style={{ color: '#a16207', fontSize: '0.9rem' }}>Tests Completed</div>
                </div>
              </div>

              {/* Module Details */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.4rem' }}>
                  Learning Path Progress
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {selectedPlayer.modules.details.map((module, index) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontWeight: '500', color: '#374151' }}>{module.name}</span>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          color: module.status === 'completed' ? '#065f46' : 
                                 module.status === 'in-progress' ? '#92400e' : '#7c2d12',
                          background: module.status === 'completed' ? '#d1fae5' : 
                                     module.status === 'in-progress' ? '#fef3c7' : '#fee2e2'
                        }}>
                          {module.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${module.progress}%`,
                          height: '100%',
                          background: module.progress === 100 ? '#10b981' : '#3b82f6',
                          borderRadius: '4px',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginTop: '5px'
                      }}>
                        {module.progress}% Complete
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testing History */}
              <div>
                <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.4rem' }}>
                  Testing History
                </h3>
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '20px',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        {selectedPlayer.testingHistory.completed}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                        {selectedPlayer.testingHistory.pending}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                        {selectedPlayer.testingHistory.violations}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Violations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressAnalytics;