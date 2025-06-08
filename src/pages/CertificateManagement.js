import React, { useState,useEffect } from 'react';
import { Award, Download, Eye, Edit3, Plus, Search, CheckCircle, FileText, Palette, Save, X, Copy } from 'lucide-react';

const CertificateManagement = () => {
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
  const [activeTab, setActiveTab] = useState('issued');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDesigner, setShowDesigner] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [previewMode, setPreviewMode] = useState(false);
  
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      athleteName: "Sarah Johnson",
      sport: "Swimming",
      country: "USA",
      certificateType: "Clean Competition",
      issueDate: "2025-05-20",
      validUntil: "2026-05-20",
      status: "active",
      templateUsed: "template1",
      certificateNumber: "ADC-2025-001"
    },
    {
      id: 2,
      athleteName: "Marcus Chen",
      sport: "Track & Field",
      country: "CAN",
      certificateType: "Testing Compliance",
      issueDate: "2025-05-18",
      validUntil: "2026-05-18",
      status: "active",
      templateUsed: "template2",
      certificateNumber: "ADC-2025-002"
    },
    {
      id: 3,
      athleteName: "Elena Rodriguez",
      sport: "Cycling",
      country: "ESP",
      certificateType: "Clean Competition",
      issueDate: "2025-04-15",
      validUntil: "2026-04-15",
      status: "revoked",
      templateUsed: "template1",
      certificateNumber: "ADC-2025-003"
    }
  ]);

  const [newCertificate, setNewCertificate] = useState({
    athleteName: '',
    sport: '',
    country: '',
    certificateType: 'Clean Competition',
    validUntil: '',
    templateUsed: 'template1'
  });

  const [templateDesign, setTemplateDesign] = useState({
    template1: {
      name: 'Professional Blue',
      backgroundColor: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      borderStyle: '4px solid #fbbf24',
      logoPosition: 'top-center',
      fontSize: '18px'
    },
    template2: {
      name: 'Elegant Green',
      backgroundColor: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
      textColor: '#ffffff',
      accentColor: '#10b981',
      borderStyle: '4px solid #10b981',
      logoPosition: 'top-left',
      fontSize: '16px'
    },
    template3: {
      name: 'Modern Red',
      backgroundColor: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      borderStyle: '4px solid #fbbf24',
      logoPosition: 'top-center',
      fontSize: '17px'
    }
  });

  const certificateTypes = [
    'Clean Competition',
    'Testing Compliance',
    'Anti-Doping Education',
    'Therapeutic Use Exemption',
    'Fair Play Recognition'
  ];

  const handleIssueCertificate = () => {
    const newId = Math.max(...certificates.map(c => c.id)) + 1;
    const certificateToAdd = {
      ...newCertificate,
      id: newId,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'active',
      certificateNumber: `ADC-2025-${String(newId).padStart(3, '0')}`
    };
    
    setCertificates([...certificates, certificateToAdd]);
    setNewCertificate({
      athleteName: '',
      sport: '',
      country: '',
      certificateType: 'Clean Competition',
      validUntil: '',
      templateUsed: 'template1'
    });
    setActiveTab('issued');
  };

  const handleRevokeCertificate = (id) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? {...cert, status: 'revoked'} : cert
    ));
  };

  const handleActivateCertificate = (id) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? {...cert, status: 'active'} : cert
    ));
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'issued' ? true : 
                      activeTab === 'active' ? cert.status === 'active' :
                      activeTab === 'revoked' ? cert.status === 'revoked' : true;
    return matchesSearch && matchesTab;
  });

  const CertificatePreview = ({ template, certificateData }) => {
    const design = templateDesign[template];
    return (
      <div style={{
        width: '600px',
        height: '400px',
        background: design.backgroundColor,
        color: design.textColor,
        border: design.borderStyle,
        borderRadius: '12px',
        padding: '32px',
        position: 'relative',
        fontFamily: 'serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '0 auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: design.accentColor
          }}>
            ANTI-DOPING AUTHORITY
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            CERTIFICATE OF {certificateData?.certificateType?.toUpperCase() || 'COMPLIANCE'}
          </div>
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            fontSize: '16px',
            marginBottom: '16px',
            lineHeight: 1.6
          }}>
            This is to certify that
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: design.accentColor,
            marginBottom: '16px',
            textDecoration: 'underline'
          }}>
            {certificateData?.athleteName || 'ATHLETE NAME'}
          </div>
          <div style={{
            fontSize: '18px',
            marginBottom: '8px'
          }}>
            Competing in <strong>{certificateData?.sport || 'Sport'}</strong>
          </div>
          <div style={{
            fontSize: '18px',
            marginBottom: '24px'
          }}>
            Representing <strong>{certificateData?.country || 'Country'}</strong>
          </div>
          <div style={{
            fontSize: '16px',
            lineHeight: 1.6,
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            has successfully demonstrated compliance with anti-doping regulations
            and is certified as meeting all requirements for clean competition.
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end'
        }}>
          <div>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              Certificate No:
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {certificateData?.certificateNumber || 'ADC-2025-XXX'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '2px',
              backgroundColor: design.accentColor,
              marginBottom: '4px'
            }}></div>
            <div style={{ fontSize: '12px' }}>
              Authorized Signature
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', marginBottom: '4px' }}>
              Valid Until:
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {certificateData?.validUntil || '2026-12-31'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
          padding: '32px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <Award size={32} />
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: 0
            }}>
              Certificate Management
            </h1>
          </div>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            margin: 0
          }}>
            Design, issue, and manage anti-doping compliance certificates
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e5e7eb'
        }}>
          {[
            { key: 'issued', label: 'All Certificates', icon: FileText },
            { key: 'active', label: 'Active', icon: CheckCircle },
            { key: 'revoked', label: 'Revoked', icon: X },
            { key: 'issue', label: 'Issue New', icon: Plus },
            { key: 'design', label: 'Design Templates', icon: Palette }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 24px',
                  border: 'none',
                  backgroundColor: activeTab === tab.key ? 'white' : 'transparent',
                  color: activeTab === tab.key ? '#1f2937' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderBottom: activeTab === tab.key ? '3px solid #3b82f6' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ padding: '24px' }}>
          {/* Search Bar (for certificate lists) */}
          {(activeTab === 'issued' || activeTab === 'active' || activeTab === 'revoked') && (
            <div style={{
              marginBottom: '24px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                />
              </div>
            </div>
          )}

          {/* Certificate List */}
          {(activeTab === 'issued' || activeTab === 'active' || activeTab === 'revoked') && (
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              {filteredCertificates.map(cert => (
                <div
                  key={cert.id}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '16px',
                    alignItems: 'start'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          margin: 0,
                          color: '#1f2937'
                        }}>
                          {cert.athleteName}
                        </h3>
                        <div style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: cert.status === 'active' ? '#d1fae5' : '#fee2e2',
                          color: cert.status === 'active' ? '#065f46' : '#991b1b'
                        }}>
                          {cert.status.toUpperCase()}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            Certificate Type
                          </div>
                          <div style={{ fontWeight: '600' }}>
                            {cert.certificateType}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            Sport & Country
                          </div>
                          <div style={{ fontWeight: '600' }}>
                            {cert.sport} - {cert.country}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            Certificate Number
                          </div>
                          <div style={{ fontWeight: '600', fontFamily: 'monospace' }}>
                            {cert.certificateNumber}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            Valid Until
                          </div>
                          <div style={{ fontWeight: '600' }}>
                            {cert.validUntil}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      minWidth: '120px'
                    }}>
                      <button
                        onClick={() => {
                          setPreviewMode(cert);
                          setShowDesigner(true);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={14} />
                        Preview
                      </button>
                      
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <Download size={14} />
                        Download
                      </button>
                      
                      {cert.status === 'active' ? (
                        <button
                          onClick={() => handleRevokeCertificate(cert.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={14} />
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateCertificate(cert.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle size={14} />
                          Activate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Issue New Certificate */}
          {activeTab === 'issue' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: '#1f2937'
                }}>
                  Issue New Certificate
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Athlete Name
                    </label>
                    <input
                      type="text"
                      value={newCertificate.athleteName}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        athleteName: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      placeholder="Enter athlete name"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Sport
                    </label>
                    <input
                      type="text"
                      value={newCertificate.sport}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        sport: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      placeholder="Enter sport"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Country
                    </label>
                    <input
                      type="text"
                      value={newCertificate.country}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        country: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      placeholder="Enter country"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Certificate Type
                    </label>
                    <select
                      value={newCertificate.certificateType}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        certificateType: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      {certificateTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Valid Until
                    </label>
                    <input
                      type="date"
                      value={newCertificate.validUntil}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        validUntil: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#374151'
                    }}>
                      Template
                    </label>
                    <select
                      value={newCertificate.templateUsed}
                      onChange={(e) => setNewCertificate({
                        ...newCertificate,
                        templateUsed: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      {Object.entries(templateDesign).map(([key, template]) => (
                        <option key={key} value={key}>{template.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Live Preview */}
                <div style={{
                  marginBottom: '24px',
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Certificate Preview
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: 'scale(0.7)',
                    transformOrigin: 'center'
                  }}>
                    <CertificatePreview 
                      template={newCertificate.templateUsed} 
                      certificateData={newCertificate}
                    />
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={handleIssueCertificate}
                    disabled={!newCertificate.athleteName || !newCertificate.sport || !newCertificate.country}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: newCertificate.athleteName && newCertificate.sport && newCertificate.country ? '#10b981' : '#9ca3af',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: newCertificate.athleteName && newCertificate.sport && newCertificate.country ? 'pointer' : 'not-allowed',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <Award size={20} />
                    Issue Certificate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Template Designer */}
          {activeTab === 'design' && (
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#1f2937'
              }}>
                Certificate Template Designer
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: '24px'
              }}>
                {/* Template Selector */}
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                  height: 'fit-content'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    Select Template
                  </h3>
                  
                  {Object.entries(templateDesign).map(([key, template]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedTemplate(key)}
                      style={{
                        padding: '12px',
                        border: selectedTemplate === key ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        cursor: 'pointer',
                        backgroundColor: selectedTemplate === key ? '#eff6ff' : 'white'
                      }}
                    >
                      <div style={{
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {template.name}
                      </div>
                      <div style={{
                        width: '100%',
                        height: '60px',
                        background: template.backgroundColor,
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb'
                      }}></div>
                    </div>
                  ))}
                </div>
                
                {/* Template Preview */}
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Template Preview
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    transform: 'scale(0.8)',
                    transformOrigin: 'center'
                  }}>
                    <CertificatePreview 
                      template={selectedTemplate} 
                      certificateData={{
                        athleteName: 'John Doe',
                        sport: 'Athletics',
                        country: 'USA',
                        certificateType: 'Clean Competition',
                        validUntil: '2026-12-31',
                        certificateNumber: 'ADC-2025-SAMPLE'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                  }}>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <Copy size={16} />
                      Duplicate Template
                    </button>
                    
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Certificate Preview Modal */}
        {showDesigner && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  Certificate Preview
                </h2>
                <button
                  onClick={() => {
                    setShowDesigner(false);
                    setPreviewMode(false);
                  }}
                  style={{
                    padding: '8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <CertificatePreview 
                  template={previewMode ? previewMode.templateUsed : selectedTemplate}
                  certificateData={previewMode || {
                    athleteName: 'Sample Athlete',
                    sport: 'Sample Sport',
                    country: 'Sample Country',
                    certificateType: 'Clean Competition',
                    validUntil: '2026-12-31',
                    certificateNumber: 'ADC-2025-SAMPLE'
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center'
              }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <Download size={16} />
                  Download PDF
                </button>
                
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={16} />
                  Edit Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div style={{
          padding: '24px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#ecfdf5',
              borderRadius: '16px',
              border: '1px solid #d1fae5',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#065f46',
                marginBottom: '4px'
              }}>
                {certificates.filter(c => c.status === 'active').length}
              </div>
              <div style={{ fontSize: '14px', color: '#047857' }}>
                Active Certificates
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#fef2f2',
              borderRadius: '16px',
              border: '1px solid #fecaca',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#991b1b',
                marginBottom: '4px'
              }}>
                {certificates.filter(c => c.status === 'revoked').length}
              </div>
              <div style={{ fontSize: '14px', color: '#dc2626' }}>
                Revoked Certificates
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '16px',
              border: '1px solid #bfdbfe',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '4px'
              }}>
                {certificates.length}
              </div>
              <div style={{ fontSize: '14px', color: '#2563eb' }}>
                Total Issued
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#fffbeb',
              borderRadius: '16px',
              border: '1px solid #fed7aa',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '4px'
              }}>
                {Object.keys(templateDesign).length}
              </div>
              <div style={{ fontSize: '14px', color: '#d97706' }}>
                Available Templates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateManagement;