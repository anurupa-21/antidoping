import React, { useState, useRef,useEffect } from 'react';
import { Download, Shield, User } from 'lucide-react';

const Certificate = () => {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.display = 'none';
        return () => {
          if (navbar) navbar.style.display = '';
        };
      }, []);
    
  const [playerData, setPlayerData] = useState({
    name: 'Anurupa Roy',
    id: 'AD2024-001',
    sport: 'Football',
    organization: 'International Sports Federation',
    testDate: '2024-12-15',
    certificateDate: '2024-12-20',
    validUntil: '2025-12-20'
  });

  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    if (!window.html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.onload = () => {
        captureAndDownload();
      };
      document.head.appendChild(script);
    } else {
      captureAndDownload();
    }

    function captureAndDownload() {
      window.html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: certificateElement.scrollWidth,
        height: certificateElement.scrollHeight
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${playerData.name.replace(/\s+/g, '_')}_AntiDoping_Certificate.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      });
    }
  };

  const pageStyles = {
    container: {
      padding: '40px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      border: '8px solid #1e40af',
      borderRadius: '16px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 0 12px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '18px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    formCard: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '24px'
    },
    formHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    formTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
      marginLeft: '12px'
    },
    inputGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    buttonContainer: {
      textAlign: 'center',
      marginTop: '32px'
    },
    downloadButton: {
      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
      color: 'white',
      fontWeight: 'bold',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      fontSize: '16px',
      transition: 'all 0.2s'
    },
    buttonText: {
      color: '#6b7280',
      marginTop: '8px',
      fontSize: '14px'
    },
    previewCard: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '16px'
    },
    previewTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
      textAlign: 'center'
    },
    footer: {
      marginTop: '48px',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '14px'
    }
  };

  const certificateStyles = {
    ...pageStyles.container,
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1e40af',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#64748b',
      marginBottom: '24px'
    },
    mainContent: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    certifyText: {
      fontSize: '20px',
      color: '#374151',
      marginBottom: '16px'
    },
    playerName: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1e40af',
      borderBottom: '3px solid #3b82f6',
      display: 'inline-block',
      paddingBottom: '8px',
      marginBottom: '32px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      marginBottom: '12px'
    },
    infoLabel: {
      fontWeight: 'bold',
      marginRight: '8px',
      color: '#374151'
    },
    infoValue: {
      color: '#1f2937'
    },
    certificationBox: {
      background: '#f0fdf4',
      border: '2px solid #22c55e',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      marginBottom: '32px'
    },
    certifiedText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#16a34a',
      marginBottom: '8px'
    },
    validText: {
      fontSize: '14px',
      color: '#15803d'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end'
    },
    issueDate: {
      fontSize: '14px',
      color: '#6b7280'
    },
    signature: {
      textAlign: 'center'
    },
    signatureLine: {
      width: '200px',
      height: '2px',
      backgroundColor: '#9ca3af',
      marginBottom: '8px'
    },
    signatureText: {
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.maxWidth}>
        <div style={pageStyles.header}>
          <div style={pageStyles.headerTitle}>
            <Shield size={48} color="#2563eb" />
            <h1 style={pageStyles.title}>Anti-Doping Certification</h1>
          </div>
          <p style={pageStyles.subtitle}>Clean Sport Compliance Portal</p>
        </div>

        <div style={pageStyles.grid}>
          <div style={pageStyles.formCard}>
            <div style={pageStyles.formHeader}>
              <User size={32} color="#2563eb" />
              <h2 style={pageStyles.formTitle}>Player Information</h2>
            </div>

            <div>
              {['name', 'id', 'sport', 'organization', 'testDate', 'validUntil'].map((field, index) => (
                <div style={pageStyles.inputGroup} key={index}>
                  <label style={pageStyles.label}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                  <input
                    type={field.includes('Date') ? 'date' : 'text'}
                    value={playerData[field]}
                    onChange={(e) => setPlayerData({ ...playerData, [field]: e.target.value })}
                    style={pageStyles.input}
                  />
                </div>
              ))}
            </div>

            <div style={pageStyles.buttonContainer}>
              <button
                onClick={downloadCertificate}
                style={pageStyles.downloadButton}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Download size={20} style={{ marginRight: '8px' }} />
                Download Certificate
              </button>
              <p style={pageStyles.buttonText}>Click to download your certificate as PNG</p>
            </div>
          </div>

          <div style={pageStyles.previewCard}>
            <h3 style={pageStyles.previewTitle}>Certificate Preview</h3>
            <div ref={certificateRef} style={certificateStyles}>
              <div style={certificateStyles.header}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" style={{ width: '48px', height: '48px', marginRight: '16px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <h2 style={certificateStyles.title}>Anti-Doping Certificate</h2>
                </div>
                <p style={certificateStyles.subtitle}>Clean Sport Compliance Certification</p>
              </div>

              <div style={certificateStyles.mainContent}>
                <p style={certificateStyles.certifyText}>This is to certify that</p>
                <h3 style={certificateStyles.playerName}>{playerData.name}</h3>
              </div>

              <div style={certificateStyles.infoGrid}>
                <div>
                  <div style={certificateStyles.infoItem}>
                    <span style={certificateStyles.infoLabel}>Player ID:</span>
                    <span style={certificateStyles.infoValue}>{playerData.id}</span>
                  </div>
                  <div style={certificateStyles.infoItem}>
                    <span style={certificateStyles.infoLabel}>Sport:</span>
                    <span style={certificateStyles.infoValue}>{playerData.sport}</span>
                  </div>
                </div>
                <div>
                  <div style={certificateStyles.infoItem}>
                    <span style={certificateStyles.infoLabel}>Organization:</span>
                    <span style={certificateStyles.infoValue}>{playerData.organization}</span>
                  </div>
                  <div style={certificateStyles.infoItem}>
                    <span style={certificateStyles.infoLabel}>Test Date:</span>
                    <span style={certificateStyles.infoValue}>{new Date(playerData.testDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.6' }}>
                  Has successfully completed anti-doping testing and compliance requirements.
                </p>
              </div>

              <div style={certificateStyles.certificationBox}>
                <p style={certificateStyles.certifiedText}>✓ Clean Sport Certified</p>
                <p style={certificateStyles.validText}>
                  Valid until: {new Date(playerData.validUntil).toLocaleDateString()}
                </p>
              </div>

              <div style={certificateStyles.footer}>
                <div>
                  <p style={certificateStyles.issueDate}>
                    Issued on: {new Date(playerData.certificateDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={certificateStyles.signature}>
                  <div style={certificateStyles.signatureLine}></div>
                  <p style={certificateStyles.signatureText}>Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={pageStyles.footer}>
          <p>© 2024 Anti-Doping Certification Authority. All rights reserved.</p>
          <p style={{ marginTop: '4px' }}>For verification, contact: verify@antidoping.org</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
