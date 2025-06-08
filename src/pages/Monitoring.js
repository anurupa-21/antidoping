import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, AlertTriangle, Calendar, Users, FileText, TrendingUp } from 'lucide-react';

const Monitoring = () => {
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
  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');

  // Mock data for athletes and their compliance status
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: 'John Smith',
        sport: 'Swimming',
        country: 'USA',
        status: 'compliant',
        lastTest: '2024-05-15',
        agreementSigned: true,
        agreementDate: '2024-01-10',
        testsCompleted: 12,
        testsRequired: 12,
        violations: 0,
        riskLevel: 'low',
        nextTestDue: '2024-06-20'
      },
      {
        id: 2,
        name: 'Maria Garcia',
        sport: 'Athletics',
        country: 'Spain',
        status: 'pending',
        lastTest: '2024-04-20',
        agreementSigned: true,
        agreementDate: '2024-01-15',
        testsCompleted: 8,
        testsRequired: 10,
        violations: 0,
        riskLevel: 'medium',
        nextTestDue: '2024-06-10'
      },
      {
        id: 3,
        name: 'Chen Wei',
        sport: 'Weightlifting',
        country: 'China',
        status: 'non-compliant',
        lastTest: '2024-03-10',
        agreementSigned: false,
        agreementDate: null,
        testsCompleted: 3,
        testsRequired: 8,
        violations: 1,
        riskLevel: 'high',
        nextTestDue: '2024-06-05'
      },
      {
        id: 4,
        name: 'Sarah Johnson',
        sport: 'Cycling',
        country: 'UK',
        status: 'compliant',
        lastTest: '2024-05-20',
        agreementSigned: true,
        agreementDate: '2024-01-05',
        testsCompleted: 15,
        testsRequired: 14,
        violations: 0,
        riskLevel: 'low',
        nextTestDue: '2024-07-01'
      },
      {
        id: 5,
        name: 'Ahmed Hassan',
        sport: 'Boxing',
        country: 'Egypt',
        status: 'pending',
        lastTest: '2024-05-01',
        agreementSigned: true,
        agreementDate: '2024-02-01',
        testsCompleted: 6,
        testsRequired: 8,
        violations: 0,
        riskLevel: 'medium',
        nextTestDue: '2024-06-15'
      }
    ];
    setAthletes(mockData);
    setFilteredAthletes(mockData);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = athletes;
    
    if (searchTerm) {
      filtered = filtered.filter(athlete => 
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(athlete => athlete.status === filterStatus);
    }
    
    setFilteredAthletes(filtered);
  }, [searchTerm, filterStatus, athletes]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'non-compliant': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#64748b',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>{title}</h3>
          <p style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0'
          }}>{value}</p>
          {subtitle && (
            <p style={{
              fontSize: '12px',
              color: '#64748b',
              margin: 0
            }}>{subtitle}</p>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} color={color} />
        </div>
      </div>
    </div>
  );

  const AthleteModal = ({ athlete, onClose }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
            {athlete.name}
          </h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#64748b',
            padding: '4px'
          }}>×</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <strong style={{ color: '#374151' }}>Sport:</strong> {athlete.sport}
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Country:</strong> {athlete.country}
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Status:</strong> 
            <span style={{
              color: getStatusColor(athlete.status),
              fontWeight: '600',
              marginLeft: '8px',
              textTransform: 'capitalize'
            }}>{athlete.status}</span>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Risk Level:</strong> 
            <span style={{
              color: getRiskColor(athlete.riskLevel),
              fontWeight: '600',
              marginLeft: '8px',
              textTransform: 'capitalize'
            }}>{athlete.riskLevel}</span>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
            Testing Compliance
          </h3>
          <div style={{
            background: '#f1f5f9',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Tests Completed</span>
              <span style={{ fontWeight: '600' }}>{athlete.testsCompleted} / {athlete.testsRequired}</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(athlete.testsCompleted / athlete.testsRequired) * 100}%`,
                height: '100%',
                background: athlete.testsCompleted >= athlete.testsRequired ? '#10b981' : '#f59e0b',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <strong style={{ color: '#374151' }}>Last Test:</strong><br />
              {athlete.lastTest}
            </div>
            <div>
              <strong style={{ color: '#374151' }}>Next Test Due:</strong><br />
              {athlete.nextTestDue}
            </div>
            <div>
              <strong style={{ color: '#374151' }}>Violations:</strong><br />
              <span style={{ color: athlete.violations > 0 ? '#ef4444' : '#10b981', fontWeight: '600' }}>
                {athlete.violations}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
            Agreement Status
          </h3>
          <div style={{
            background: athlete.agreementSigned ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${athlete.agreementSigned ? '#bbf7d0' : '#fecaca'}`,
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {athlete.agreementSigned ? (
                <CheckCircle size={20} color="#10b981" style={{ marginRight: '8px' }} />
              ) : (
                <XCircle size={20} color="#ef4444" style={{ marginRight: '8px' }} />
              )}
              <span style={{ fontWeight: '600' }}>
                {athlete.agreementSigned ? 'Agreement Signed' : 'Agreement Pending'}
              </span>
            </div>
            {athlete.agreementDate && (
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Signed on: {athlete.agreementDate}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const compliantCount = athletes.filter(a => a.status === 'compliant').length;
  const pendingCount = athletes.filter(a => a.status === 'pending').length;
  const nonCompliantCount = athletes.filter(a => a.status === 'non-compliant').length;
  const agreementSignedCount = athletes.filter(a => a.agreementSigned).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1e293b',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Anti-Doping Monitoring Dashboard
          </h1>
          <p style={{
            color: '#64748b',
            margin: 0,
            fontSize: '16px'
          }}>
            Track athlete compliance, testing schedules, and agreement status
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard 
            title="Total Athletes" 
            value={athletes.length} 
            icon={Users} 
            color="#667eea"
            subtitle="Under monitoring"
          />
          <StatCard 
            title="Compliant" 
            value={compliantCount} 
            icon={CheckCircle} 
            color="#10b981"
            subtitle={`${((compliantCount/athletes.length)*100).toFixed(0)}% of total`}
          />
          <StatCard 
            title="Pending Tests" 
            value={pendingCount} 
            icon={AlertTriangle} 
            color="#f59e0b"
            subtitle="Require attention"
          />
          <StatCard 
            title="Agreements Signed" 
            value={agreementSignedCount} 
            icon={FileText} 
            color="#8b5cf6"
            subtitle={`${((agreementSignedCount/athletes.length)*100).toFixed(0)}% completion`}
          />
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} />
              <input
                type="text"
                placeholder="Search athletes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  background: '#ffffff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '14px',
                background: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="pending">Pending</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <Download size={16} />
              Export Report
            </button>
          </div>

          {/* Athletes Table */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '16px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 100px',
              gap: '16px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Athlete</div>
              <div>Status</div>
              <div>Last Test</div>
              <div>Progress</div>
              <div>Agreement</div>
              <div>Risk Level</div>
              <div>Actions</div>
            </div>

            {filteredAthletes.map((athlete, index) => (
              <div key={athlete.id} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 100px',
                gap: '16px',
                padding: '20px 24px',
                alignItems: 'center',
                borderBottom: index < filteredAthletes.length - 1 ? '1px solid #f1f5f9' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                    {athlete.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {athlete.sport} • {athlete.country}
                  </div>
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: `${getStatusColor(athlete.status)}20`,
                    color: getStatusColor(athlete.status)
                  }}>
                    {athlete.status}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {athlete.lastTest}
                </div>
                
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                    {athlete.testsCompleted}/{athlete.testsRequired}
                  </div>
                  <div style={{
                    width: '60px',
                    height: '4px',
                    background: '#e2e8f0',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(athlete.testsCompleted / athlete.testsRequired) * 100}%`,
                      height: '100%',
                      background: athlete.testsCompleted >= athlete.testsRequired ? '#10b981' : '#f59e0b',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                <div>
                  {athlete.agreementSigned ? (
                    <CheckCircle size={20} color="#10b981" />
                  ) : (
                    <XCircle size={20} color="#ef4444" />
                  )}
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: `${getRiskColor(athlete.riskLevel)}20`,
                    color: getRiskColor(athlete.riskLevel)
                  }}>
                    {athlete.riskLevel}
                  </span>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      setSelectedAthlete(athlete);
                      setShowModal(true);
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f1f5f9';
                      e.target.style.borderColor = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <Eye size={16} color="#64748b" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAthletes.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#64748b'
            }}>
              <Users size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No athletes found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedAthlete && (
        <AthleteModal 
          athlete={selectedAthlete} 
          onClose={() => {
            setShowModal(false);
            setSelectedAthlete(null);
          }} 
        />
      )}
    </div>
  );
};

export default Monitoring;