// import React, { useState,useEffect } from 'react';
// import { Settings, Users, Shield, Bell, Database, LogOut, Home, User, Lock, Globe, Mail, Server } from 'lucide-react';

// const PlatformSettingsAdmin = () => {
//     useEffect(() => {
//                                             const navbar = document.querySelector('.navbar');
//                                             if (navbar) {
//                                               navbar.style.display = 'none'; // Hide navbar on mount
//                                             }
                                        
//                                             return () => {
//                                               if (navbar) {
//                                                 navbar.style.display = ''; // Restore navbar on unmount
//                                               }
//                                             };
//                                           }, []);
//   const [activeTab, setActiveTab] = useState('general');
//   const [currentPage, setCurrentPage] = useState('settings');
//   const [adminData, setAdminData] = useState({
//     name: 'Admin User',
//     email: 'admin@antidopinggaming.com',
//     role: 'Super Administrator'
//   });

//   const [settings, setSettings] = useState({
//     siteName: 'Anti-Doping Gaming Platform',
//     maintenanceMode: false,
//     userRegistration: true,
//     emailNotifications: true,
//     twoFactorAuth: true,
//     sessionTimeout: 30,
//     maxLoginAttempts: 5,
//     dataRetention: 365
//   });

//   const handleLogout = () => {
//     // Clear any stored authentication data
//     // In a real app, you'd clear tokens, session data, etc.
//     alert('Logged out successfully!');
//     setCurrentPage('home');
//   };

//   const handleSettingChange = (key, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const handleSaveSettings = () => {
//     alert('Settings saved successfully!');
//   };

//   if (currentPage === 'home') {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontFamily: 'Arial, sans-serif'
//       }}>
//         <div style={{
//           background: 'rgba(255, 255, 255, 0.95)',
//           padding: '3rem',
//           borderRadius: '20px',
//           boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
//           textAlign: 'center',
//           maxWidth: '500px',
//           width: '90%'
//         }}>
//           <Shield size={64} style={{ color: '#667eea', marginBottom: '1rem' }} />
//           <h1 style={{
//             fontSize: '2.5rem',
//             fontWeight: 'bold',
//             color: '#333',
//             marginBottom: '1rem'
//           }}>
//             Anti-Doping Gaming
//           </h1>
//           <p style={{
//             fontSize: '1.1rem',
//             color: '#666',
//             marginBottom: '2rem'
//           }}>
//             Ensuring fair play and integrity in competitive gaming
//           </p>
//           <button
//             onClick={() => setCurrentPage('settings')}
//             style={{
//               background: 'linear-gradient(135deg, #667eea, #764ba2)',
//               color: 'white',
//               border: 'none',
//               padding: '12px 30px',
//               borderRadius: '25px',
//               fontSize: '1rem',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'transform 0.2s',
//               boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//             }}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
//           >
//             Admin Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       {/* Header */}
//       <header style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white',
//         padding: '1rem 2rem',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <Shield size={32} />
//             <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
//               Anti-Doping Gaming Admin
//             </h1>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <div style={{ textAlign: 'right' }}>
//               <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{adminData.name}</div>
//               <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{adminData.role}</div>
//             </div>
//             <button
//               onClick={handleLogout}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.2)',
//                 border: '1px solid rgba(255, 255, 255, 0.3)',
//                 color: 'white',
//                 padding: '8px 16px',
//                 borderRadius: '20px',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 fontSize: '0.9rem',
//                 transition: 'all 0.2s'
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.background = 'rgba(255, 255, 255, 0.3)';
//                 e.target.style.transform = 'translateY(-1px)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.background = 'rgba(255, 255, 255, 0.2)';
//                 e.target.style.transform = 'translateY(0)';
//               }}
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '2rem',
//         display: 'grid',
//         gridTemplateColumns: '300px 1fr',
//         gap: '2rem'
//       }}>
//         {/* Sidebar */}
//         <div style={{
//           background: 'white',
//           borderRadius: '15px',
//           padding: '1.5rem',
//           height: 'fit-content',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//         }}>
//           <h3 style={{
//             fontSize: '1.2rem',
//             fontWeight: 'bold',
//             color: '#333',
//             marginBottom: '1.5rem',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem'
//           }}>
//             <Settings size={20} />
//             Platform Settings
//           </h3>
          
//           {[
//             { id: 'general', label: 'General Settings', icon: Settings },
//             { id: 'users', label: 'User Management', icon: Users },
//             { id: 'security', label: 'Security', icon: Shield },
//             { id: 'notifications', label: 'Notifications', icon: Bell },
//             { id: 'system', label: 'System Config', icon: Database }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               style={{
//                 width: '100%',
//                 padding: '12px 16px',
//                 margin: '4px 0',
//                 border: 'none',
//                 borderRadius: '10px',
//                 background: activeTab === tab.id 
//                   ? 'linear-gradient(135deg, #667eea, #764ba2)' 
//                   : 'transparent',
//                 color: activeTab === tab.id ? 'white' : '#666',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 fontSize: '0.95rem',
//                 transition: 'all 0.2s'
//               }}
//               onMouseOver={(e) => {
//                 if (activeTab !== tab.id) {
//                   e.target.style.background = '#f8f9fa';
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (activeTab !== tab.id) {
//                   e.target.style.background = 'transparent';
//                 }
//               }}
//             >
//               <tab.icon size={18} />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div style={{
//           background: 'white',
//           borderRadius: '15px',
//           padding: '2rem',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//         }}>
//           {activeTab === 'general' && (
//             <div>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
//                 General Settings
//               </h2>
              
//               <div style={{ display: 'grid', gap: '1.5rem' }}>
//                 <div>
//                   <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
//                     Site Name
//                   </label>
//                   <input
//                     type="text"
//                     value={settings.siteName}
//                     onChange={(e) => handleSettingChange('siteName', e.target.value)}
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '2px solid #e1e5e9',
//                       borderRadius: '8px',
//                       fontSize: '1rem',
//                       transition: 'border-color 0.2s'
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = '#667eea'}
//                     onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
//                   />
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '1rem',
//                   background: '#f8f9fa',
//                   borderRadius: '10px'
//                 }}>
//                   <div>
//                     <h4 style={{ margin: 0, color: '#333' }}>Maintenance Mode</h4>
//                     <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
//                       Temporarily disable site access for maintenance
//                     </p>
//                   </div>
//                   <label style={{
//                     position: 'relative',
//                     display: 'inline-block',
//                     width: '50px',
//                     height: '24px'
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={settings.maintenanceMode}
//                       onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
//                       style={{ opacity: 0, width: 0, height: 0 }}
//                     />
//                     <span style={{
//                       position: 'absolute',
//                       cursor: 'pointer',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background: settings.maintenanceMode ? '#667eea' : '#ccc',
//                       borderRadius: '24px',
//                       transition: '0.2s',
//                       transform: settings.maintenanceMode ? 'translateX(26px)' : 'translateX(0)',
//                       width: '20px',
//                       height: '20px',
//                       margin: '2px',
//                       backgroundColor: 'white',
//                       borderRadius: '50%'
//                     }} />
//                   </label>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
//                 User Management
//               </h2>
              
//               <div style={{ display: 'grid', gap: '1.5rem' }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '1rem',
//                   background: '#f8f9fa',
//                   borderRadius: '10px'
//                 }}>
//                   <div>
//                     <h4 style={{ margin: 0, color: '#333' }}>User Registration</h4>
//                     <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
//                       Allow new users to register accounts
//                     </p>
//                   </div>
//                   <label style={{
//                     position: 'relative',
//                     display: 'inline-block',
//                     width: '50px',
//                     height: '24px'
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={settings.userRegistration}
//                       onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
//                       style={{ opacity: 0, width: 0, height: 0 }}
//                     />
//                     <span style={{
//                       position: 'absolute',
//                       cursor: 'pointer',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background: settings.userRegistration ? '#667eea' : '#ccc',
//                       borderRadius: '24px',
//                       transition: '0.2s',
//                       transform: settings.userRegistration ? 'translateX(26px)' : 'translateX(0)',
//                       width: '20px',
//                       height: '20px',
//                       margin: '2px',
//                       backgroundColor: 'white',
//                       borderRadius: '50%'
//                     }} />
//                   </label>
//                 </div>

//                 <div>
//                   <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
//                     Session Timeout (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={settings.sessionTimeout}
//                     onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
//                     style={{
//                       width: '200px',
//                       padding: '12px',
//                       border: '2px solid #e1e5e9',
//                       borderRadius: '8px',
//                       fontSize: '1rem'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'security' && (
//             <div>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
//                 Security Settings
//               </h2>
              
//               <div style={{ display: 'grid', gap: '1.5rem' }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '1rem',
//                   background: '#f8f9fa',
//                   borderRadius: '10px'
//                 }}>
//                   <div>
//                     <h4 style={{ margin: 0, color: '#333' }}>Two-Factor Authentication</h4>
//                     <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
//                       Require 2FA for all admin accounts
//                     </p>
//                   </div>
//                   <label style={{
//                     position: 'relative',
//                     display: 'inline-block',
//                     width: '50px',
//                     height: '24px'
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={settings.twoFactorAuth}
//                       onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
//                       style={{ opacity: 0, width: 0, height: 0 }}
//                     />
//                     <span style={{
//                       position: 'absolute',
//                       cursor: 'pointer',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background: settings.twoFactorAuth ? '#667eea' : '#ccc',
//                       borderRadius: '24px',
//                       transition: '0.2s',
//                       transform: settings.twoFactorAuth ? 'translateX(26px)' : 'translateX(0)',
//                       width: '20px',
//                       height: '20px',
//                       margin: '2px',
//                       backgroundColor: 'white',
//                       borderRadius: '50%'
//                     }} />
//                   </label>
//                 </div>

//                 <div>
//                   <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
//                     Max Login Attempts
//                   </label>
//                   <input
//                     type="number"
//                     value={settings.maxLoginAttempts}
//                     onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
//                     style={{
//                       width: '200px',
//                       padding: '12px',
//                       border: '2px solid #e1e5e9',
//                       borderRadius: '8px',
//                       fontSize: '1rem'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'notifications' && (
//             <div>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
//                 Notification Settings
//               </h2>
              
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '1rem',
//                 background: '#f8f9fa',
//                 borderRadius: '10px'
//               }}>
//                 <div>
//                   <h4 style={{ margin: 0, color: '#333' }}>Email Notifications</h4>
//                   <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
//                     Send email alerts for important events
//                   </p>
//                 </div>
//                 <label style={{
//                   position: 'relative',
//                   display: 'inline-block',
//                   width: '50px',
//                   height: '24px'
//                 }}>
//                   <input
//                     type="checkbox"
//                     checked={settings.emailNotifications}
//                     onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
//                     style={{ opacity: 0, width: 0, height: 0 }}
//                   />
//                   <span style={{
//                     position: 'absolute',
//                     cursor: 'pointer',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: settings.emailNotifications ? '#667eea' : '#ccc',
//                     borderRadius: '24px',
//                     transition: '0.2s',
//                     transform: settings.emailNotifications ? 'translateX(26px)' : 'translateX(0)',
//                     width: '20px',
//                     height: '20px',
//                     margin: '2px',
//                     backgroundColor: 'white',
//                     borderRadius: '50%'
//                   }} />
//                 </label>
//               </div>
//             </div>
//           )}

//           {activeTab === 'system' && (
//             <div>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333', marginBottom: '1.5rem' }}>
//                 System Configuration
//               </h2>
              
//               <div>
//                 <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
//                   Data Retention Period (days)
//                 </label>
//                 <input
//                   type="number"
//                   value={settings.dataRetention}
//                   onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
//                   style={{
//                     width: '200px',
//                     padding: '12px',
//                     border: '2px solid #e1e5e9',
//                     borderRadius: '8px',
//                     fontSize: '1rem'
//                   }}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Save Button */}
//           <div style={{ marginTop: '2rem', textAlign: 'right' }}>
//             <button
//               onClick={handleSaveSettings}
//               style={{
//                 background: 'linear-gradient(135deg, #667eea, #764ba2)',
//                 color: 'white',
//                 border: 'none',
//                 padding: '12px 30px',
//                 borderRadius: '25px',
//                 fontSize: '1rem',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s',
//                 boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
//               }}
//               onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
//               onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
//             >
//               Save Settings
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlatformSettingsAdmin;



// import React, { useState ,useEffect} from 'react';

// const PlatformSettingsAdmin = () => {
//     useEffect(() => {
//                                             const navbar = document.querySelector('.navbar');
//                                             if (navbar) {
//                                               navbar.style.display = 'none'; // Hide navbar on mount
//                                             }
                                        
//                                             return () => {
//                                               if (navbar) {
//                                                 navbar.style.display = ''; // Restore navbar on unmount
//                                               }
//                                             };
//                                           }, []);
  
//   // State for platform settings
//   const [settings, setSettings] = useState({
//     siteName: 'Anti-Doping Education Platform',
//     maintenanceMode: false,
//     userRegistration: true,
//     emailNotifications: true,
//     maxFileSize: '10',
//     sessionTimeout: '30',
//     backupFrequency: 'daily',
//     theme: 'light'
//   });

//   // State for managing active tab
//   const [activeTab, setActiveTab] = useState('general');

//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Handle logout
//   const handleLogout = () => {
//     // Clear any admin session data
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminUser');
//     sessionStorage.clear();
    
//     // Show logout confirmation
//     if (window.confirm('Are you sure you want to logout?')) {
//       // Redirect to home page (landing page)
//       // In a real app with React Router, you would use navigate('/')
//       // For now, we'll redirect using window.location
//       window.location.href = '/';
//     }
//   };

//   // Save settings
//   const handleSaveSettings = () => {
//     // In a real app, this would make an API call
//     localStorage.setItem('platformSettings', JSON.stringify(settings));
//     alert('Settings saved successfully!');
//   };

//   const containerStyle = {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif'
//   };

//   const headerStyle = {
//     background: 'rgba(255, 255, 255, 0.95)',
//     padding: '20px',
//     borderRadius: '15px',
//     marginBottom: '30px',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   };

//   const titleStyle = {
//     margin: 0,
//     color: '#333',
//     fontSize: '28px',
//     fontWeight: 'bold'
//   };

//   const logoutButtonStyle = {
//     background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
//     border: 'none',
//     color: 'white',
//     padding: '12px 24px',
//     borderRadius: '25px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
//   };

//   const cardStyle = {
//     background: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '20px',
//     padding: '30px',
//     boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
//     backdropFilter: 'blur(10px)'
//   };

//   const tabContainerStyle = {
//     display: 'flex',
//     marginBottom: '30px',
//     borderBottom: '2px solid #e0e0e0'
//   };

//   const tabStyle = (isActive) => ({
//     padding: '15px 25px',
//     cursor: 'pointer',
//     border: 'none',
//     background: isActive ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'transparent',
//     color: isActive ? 'white' : '#666',
//     borderRadius: '10px 10px 0 0',
//     fontSize: '16px',
//     fontWeight: isActive ? 'bold' : 'normal',
//     transition: 'all 0.3s ease',
//     marginRight: '5px'
//   });

//   const formGroupStyle = {
//     marginBottom: '25px'
//   };

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '8px',
//     color: '#333',
//     fontSize: '16px',
//     fontWeight: '600'
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 15px',
//     border: '2px solid #e0e0e0',
//     borderRadius: '10px',
//     fontSize: '16px',
//     transition: 'border-color 0.3s ease',
//     outline: 'none'
//   };

//   const selectStyle = {
//     ...inputStyle,
//     background: 'white',
//     cursor: 'pointer'
//   };

//   const switchStyle = {
//     position: 'relative',
//     width: '60px',
//     height: '34px',
//     background: '#ccc',
//     borderRadius: '34px',
//     cursor: 'pointer',
//     transition: 'background 0.3s ease'
//   };

//   const switchSliderStyle = (isOn) => ({
//     position: 'absolute',
//     top: '4px',
//     left: isOn ? '30px' : '4px',
//     width: '26px',
//     height: '26px',
//     background: 'white',
//     borderRadius: '50%',
//     transition: 'left 0.3s ease',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
//   });

//   const saveButtonStyle = {
//     background: 'linear-gradient(45deg, #00b894, #00cec9)',
//     border: 'none',
//     color: 'white',
//     padding: '15px 30px',
//     borderRadius: '25px',
//     cursor: 'pointer',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(0, 184, 148, 0.3)',
//     marginTop: '20px'
//   };

//   const Switch = ({ checked, onChange }) => (
//     <div
//       style={{
//         ...switchStyle,
//         background: checked ? '#667eea' : '#ccc'
//       }}
//       onClick={() => onChange(!checked)}
//     >
//       <div style={switchSliderStyle(checked)} />
//     </div>
//   );

//   const renderGeneralSettings = () => (
//     <div>
//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Site Name</label>
//         <input
//           type="text"
//           value={settings.siteName}
//           onChange={(e) => handleInputChange('siteName', e.target.value)}
//           style={inputStyle}
//         />
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Maintenance Mode</label>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <Switch
//             checked={settings.maintenanceMode}
//             onChange={(value) => handleInputChange('maintenanceMode', value)}
//           />
//           <span>{settings.maintenanceMode ? 'Enabled' : 'Disabled'}</span>
//         </div>
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>User Registration</label>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <Switch
//             checked={settings.userRegistration}
//             onChange={(value) => handleInputChange('userRegistration', value)}
//           />
//           <span>{settings.userRegistration ? 'Allowed' : 'Disabled'}</span>
//         </div>
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Theme</label>
//         <select
//           value={settings.theme}
//           onChange={(e) => handleInputChange('theme', e.target.value)}
//           style={selectStyle}
//         >
//           <option value="light">Light Theme</option>
//           <option value="dark">Dark Theme</option>
//           <option value="auto">Auto (System)</option>
//         </select>
//       </div>
//     </div>
//   );

//   const renderSecuritySettings = () => (
//     <div>
//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Session Timeout (minutes)</label>
//         <input
//           type="number"
//           value={settings.sessionTimeout}
//           onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
//           style={inputStyle}
//           min="5"
//           max="120"
//         />
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Maximum File Upload Size (MB)</label>
//         <input
//           type="number"
//           value={settings.maxFileSize}
//           onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
//           style={inputStyle}
//           min="1"
//           max="100"
//         />
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Email Notifications</label>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <Switch
//             checked={settings.emailNotifications}
//             onChange={(value) => handleInputChange('emailNotifications', value)}
//           />
//           <span>{settings.emailNotifications ? 'Enabled' : 'Disabled'}</span>
//         </div>
//       </div>
//     </div>
//   );

//   const renderBackupSettings = () => (
//     <div>
//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Backup Frequency</label>
//         <select
//           value={settings.backupFrequency}
//           onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
//           style={selectStyle}
//         >
//           <option value="hourly">Hourly</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//       </div>

//       <div style={formGroupStyle}>
//         <label style={labelStyle}>Last Backup</label>
//         <div style={{ 
//           padding: '12px 15px', 
//           background: '#f8f9fa', 
//           borderRadius: '10px',
//           color: '#666'
//         }}>
//           {new Date().toLocaleString()}
//         </div>
//       </div>

//       <div style={formGroupStyle}>
//         <button
//           style={{
//             ...saveButtonStyle,
//             background: 'linear-gradient(45deg, #fd79a8, #e84393)',
//             marginTop: '10px'
//           }}
//           onClick={() => alert('Manual backup initiated!')}
//         >
//           Start Manual Backup
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div style={containerStyle}>
//       {/* Header with Logout */}
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Admin Platform Settings</h1>
//         <button
//           style={logoutButtonStyle}
//           onClick={handleLogout}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'translateY(-2px)';
//             e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
//           }}
//         >
//           🚪 Logout
//         </button>
//       </div>

//       {/* Settings Card */}
//       <div style={cardStyle}>
//         {/* Tab Navigation */}
//         <div style={tabContainerStyle}>
//           <button
//             style={tabStyle(activeTab === 'general')}
//             onClick={() => setActiveTab('general')}
//           >
//             ⚙️ General
//           </button>
//           <button
//             style={tabStyle(activeTab === 'security')}
//             onClick={() => setActiveTab('security')}
//           >
//             🔒 Security
//           </button>
//           <button
//             style={tabStyle(activeTab === 'backup')}
//             onClick={() => setActiveTab('backup')}
//           >
//             💾 Backup
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div>
//           {activeTab === 'general' && renderGeneralSettings()}
//           {activeTab === 'security' && renderSecuritySettings()}
//           {activeTab === 'backup' && renderBackupSettings()}
//         </div>

//         {/* Save Button */}
//         <button
//           style={saveButtonStyle}
//           onClick={handleSaveSettings}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'translateY(-2px)';
//             e.target.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.4)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.3)';
//           }}
//         >
//           💾 Save Settings
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlatformSettingsAdmin;

import React, { useState,useEffect } from 'react';

const PlatformSettingsAdmin = () => {
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
  
  // Platform configuration state
  const [platformConfig, setPlatformConfig] = useState({
    siteName: 'Anti-Doping Education Platform',
    siteDescription: 'Empowering Athletes with Anti-Doping Education',
    maintenanceMode: false,
    allowUserRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    courseCompletionCertificate: true,
    autoEnrollNewUsers: false,
    defaultLanguage: 'English',
    supportEmail: 'support@antidoping.com',
    supportPhone: '+1-800-CLEAN-SPORT',
    socialMediaLinks: {
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      youtube: 'https://www.youtube.com',
      twitter: 'https://twitter.com',
      threads: 'https://www.threads.net'
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field, value) => {
    setPlatformConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setPlatformConfig(prev => ({
      ...prev,
      socialMediaLinks: {
        ...prev.socialMediaLinks,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    // Simulate saving configuration
    setSaveMessage('Configuration saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLogout = () => {
    // Clear admin session (you can add actual logout logic here)
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
    
    // Redirect to home page
    window.location.href = '/';
  };

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : '#333',
    border: '1px solid #dee2e6',
    borderBottom: isActive ? '1px solid #007bff' : '1px solid #dee2e6',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    marginRight: '4px',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          height: '70px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#007bff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              A
            </div>
            <h1 style={{
              margin: 0,
              color: '#333',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              Admin Panel
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Welcome, Admin
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Page Title */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #eee',
            backgroundColor: '#f8f9fa'
          }}>
            <h2 style={{
              margin: 0,
              color: '#333',
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              Platform Settings
            </h2>
            <p style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontSize: '16px'
            }}>
              Configure your anti-doping education platform
            </p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div style={{
              padding: '15px 20px',
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
              margin: '20px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>
              {saveMessage}
            </div>
          )}

          {/* Tabs */}
          <div style={{
            display: 'flex',
            padding: '0 20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6'
          }}>
            {['general', 'security', 'notifications', 'social'].map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={tabStyle(activeTab === tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '30px' }}>
            {activeTab === 'general' && (
              <div style={{ display: 'grid', gap: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '22px' }}>
                  General Settings
                </h3>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={platformConfig.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '400px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Site Description
                    </label>
                    <textarea
                      value={platformConfig.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        minHeight: '80px',
                        maxWidth: '600px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Default Language
                    </label>
                    <select
                      value={platformConfig.defaultLanguage}
                      onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                      style={{
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '200px'
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={platformConfig.supportEmail}
                      onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '400px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      value={platformConfig.supportPhone}
                      onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '300px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={platformConfig.maintenanceMode}
                        onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#555' }}>Maintenance Mode</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={platformConfig.allowUserRegistration}
                        onChange={(e) => handleInputChange('allowUserRegistration', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#555' }}>Allow User Registration</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={platformConfig.autoEnrollNewUsers}
                        onChange={(e) => handleInputChange('autoEnrollNewUsers', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#555' }}>Auto-enroll New Users</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={platformConfig.courseCompletionCertificate}
                        onChange={(e) => handleInputChange('courseCompletionCertificate', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#555' }}>Course Completion Certificates</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'grid', gap: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '22px' }}>
                  Security Settings
                </h3>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={platformConfig.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                      style={{
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '150px'
                      }}
                      min="5"
                      max="120"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={platformConfig.maxLoginAttempts}
                      onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                      style={{
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '150px'
                      }}
                      min="3"
                      max="10"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                      Password Minimum Length
                    </label>
                    <input
                      type="number"
                      value={platformConfig.passwordMinLength}
                      onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                      style={{
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '16px',
                        maxWidth: '150px'
                      }}
                      min="6"
                      max="20"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={platformConfig.requireTwoFactor}
                        onChange={(e) => handleInputChange('requireTwoFactor', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '16px', color: '#555' }}>Require Two-Factor Authentication</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div style={{ display: 'grid', gap: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '22px' }}>
                  Notification Settings
                </h3>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={platformConfig.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '16px', color: '#555' }}>Email Notifications</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={platformConfig.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '16px', color: '#555' }}>SMS Notifications</span>
                  </label>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                  }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>
                      Notification Types
                    </h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      <div style={{ color: '#666' }}>• Course completion notifications</div>
                      <div style={{ color: '#666' }}>• New user registration alerts</div>
                      <div style={{ color: '#666' }}>• System maintenance notifications</div>
                      <div style={{ color: '#666' }}>• Security alerts</div>
                      <div style={{ color: '#666' }}>• Certificate generation notifications</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div style={{ display: 'grid', gap: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '22px' }}>
                  Social Media Links
                </h3>
                
                <div style={{ display: 'grid', gap: '15px' }}>
                  {Object.entries(platformConfig.socialMediaLinks).map(([platform, url]) => (
                    <div key={platform}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '16px',
                          maxWidth: '500px'
                        }}
                        placeholder={`https://www.${platform}.com`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div style={{
            padding: '20px 30px',
            borderTop: '1px solid #eee',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={handleSave}
              style={{
                padding: '12px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettingsAdmin;