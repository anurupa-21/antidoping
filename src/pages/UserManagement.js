import React, { useState,useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Download, Users, UserCheck, Shield } from 'lucide-react';

const UserManagement = () => {
  useEffect(() => {
      const navbar = document.querySelector('.navbar');
      if (navbar) navbar.style.display = 'none';
      return () => { if (navbar) navbar.style.display = ''; };
    }, []);
  const [activeTab, setActiveTab] = useState('players');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  // Sample data
  const [users, setUsers] = useState({
    players: [
      { id: 1, name: 'John Smith', email: 'john.smith@email.com', sport: 'Athletics', team: 'City Runners', status: 'active', lastTest: '2024-05-15', violations: 0 },
      { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', sport: 'Swimming', team: 'Aqua Stars', status: 'suspended', lastTest: '2024-04-20', violations: 1 },
      { id: 3, name: 'Mike Chen', email: 'mike.chen@email.com', sport: 'Cycling', team: 'Speed Demons', status: 'active', lastTest: '2024-06-01', violations: 0 },
      { id: 4, name: 'Emma Wilson', email: 'emma.w@email.com', sport: 'Tennis', team: 'Ace Players', status: 'inactive', lastTest: '2024-03-10', violations: 0 },
      { id: 5, name: 'Anurupa Roy', email: 'anurupaintern03@gmail.com', sport: 'Cricket', team: 'Indian Federal', status: 'active', lastTest: '2024-03-10', violations: 0 },
    ],
    coaches: [
      { id: 1, name: 'David Brown', email: 'david.brown@email.com', sport: 'Athletics', certification: 'Level 3', status: 'active', athletes: 15 },
      { id: 2, name: 'Lisa Wilson', email: 'lisa.wilson@email.com', sport: 'Swimming', certification: 'Level 2', status: 'active', athletes: 8 },
      { id: 3, name: 'Tom Anderson', email: 'tom.anderson@email.com', sport: 'Boxing', certification: 'Level 1', status: 'inactive', athletes: 3 },
    ],
    accounts: [
      { id: 1, username: 'admin1', email: 'admin1@antidoping.org', role: 'Super Admin', lastLogin: '2024-06-05', status: 'active' },
      { id: 2, username: 'officer1', email: 'officer1@antidoping.org', role: 'Testing Officer', lastLogin: '2024-06-04', status: 'active' },
      { id: 3, username: 'analyst1', email: 'analyst1@antidoping.org', role: 'Data Analyst', lastLogin: '2024-05-28', status: 'inactive' },
    ]
  });

  const tabData = {
    players: { icon: Users, label: 'Players', count: users.players.length },
    coaches: { icon: UserCheck, label: 'Coaches', count: users.coaches.length },
    accounts: { icon: Shield, label: 'Admin Accounts', count: users.accounts.length }
  };

  const filteredUsers = users[activeTab].filter(user => {
    const matchesSearch = (user.name || user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
    
  });

  const handleAddUser = () => {
    setModalType('add');
    setSelectedUser(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setModalType('edit');
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(user => user.id !== userId)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newUser = { ...formData, id: Date.now() };
      setUsers(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newUser]
      }));
    } else {
      setUsers(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(user => 
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      }));
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: { bg: '#DEF7EC', text: '#03543F', border: '#A7F3D0' },
      inactive: { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' },
      suspended: { bg: '#FDF2F2', text: '#991B1B', border: '#FECACA' }
    };
    const color = colors[status] || colors.inactive;
    
    return {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: color.bg,
      color: color.text,
      border: `1px solid ${color.border}`,
      textTransform: 'capitalize'
    };
  };

  const getViolationBadge = (violations) => {
    const isViolation = violations > 0;
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: isViolation ? '#FDF2F2' : '#DEF7EC',
      color: isViolation ? '#991B1B' : '#03543F',
      border: `1px solid ${isViolation ? '#FECACA' : '#A7F3D0'}`,
      minWidth: '24px',
      textAlign: 'center'
    };
  };

  const getRoleBadge = (role) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#EBF8FF',
    color: '#1E40AF',
    border: '1px solid #BFDBFE'
  });

  // Common styles
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '1px solid #E5E7EB'
  };

  const buttonPrimaryStyle = {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const buttonSecondaryStyle = {
    backgroundColor: '#FFFFFF',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  };

  const tableHeaderStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '12px',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB'
  };

  const tableCellStyle = {
    padding: '16px',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '14px',
    color: '#374151',
    verticalAlign: 'middle'
  };

  const ActionButton = ({ onClick, color, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '8px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: color,
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s ease',
        outline: 'none'
      }}
      onMouseOver={(e) => e.target.style.opacity = '0.8'}
      onMouseOut={(e) => e.target.style.opacity = '1'}
    >
      {children}
    </button>
  );

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            User Management System
          </h1>
          <p style={{ 
            color: '#6B7280', 
            fontSize: '16px',
            margin: '0'
          }}>
            Manage players, coaches, and administrative accounts in the anti-doping system
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          {Object.entries(tabData).map(([key, data]) => {
            const IconComponent = data.icon;
            return (
              <div key={key} style={{
                ...cardStyle,
                padding: '24px',
                cursor: 'pointer',
                transform: activeTab === key ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => setActiveTab(key)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: activeTab === key ? '#3B82F6' : '#EBF8FF',
                    marginRight: '16px'
                  }}>
                    <IconComponent size={28} color={activeTab === key ? 'white' : '#3B82F6'} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      margin: '0 0 4px 0' 
                    }}>
                      {data.label}
                    </h3>
                    <p style={{ 
                      fontSize: '36px', 
                      fontWeight: '700', 
                      color: '#3B82F6', 
                      margin: '0' 
                    }}>
                      {data.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={cardStyle}>
          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {Object.entries(tabData).map(([key, data]) => {
                const IconComponent = data.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      padding: '16px 24px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderBottom: isActive ? '3px solid #3B82F6' : '3px solid transparent',
                      color: isActive ? '#3B82F6' : '#6B7280',
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <IconComponent size={20} />
                    {data.label}
                    <span style={{
                      backgroundColor: isActive ? '#3B82F6' : '#E5E7EB',
                      color: isActive ? 'white' : '#6B7280',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginLeft: '4px'
                    }}>
                      {data.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                margin: '0' 
              }}>
                {tabData[activeTab].label}
              </h2>
              <button
                onClick={handleAddUser}
                style={buttonPrimaryStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
              >
                <Plus size={16} />
                Add New {tabData[activeTab].label.slice(0, -1)}
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '300px', maxWidth: '400px' }}>
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    ...inputStyle,
                    paddingLeft: '40px'
                  }}
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  ...inputStyle,
                  width: 'auto',
                  minWidth: '120px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <button style={buttonSecondaryStyle}>
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr>
                  {activeTab === 'players' && (
                    <>
                      <th style={tableHeaderStyle}>Name</th>
                      <th style={tableHeaderStyle}>Email</th>
                      <th style={tableHeaderStyle}>Sport</th>
                      <th style={tableHeaderStyle}>Team</th>
                      <th style={tableHeaderStyle}>Last Test</th>
                      <th style={tableHeaderStyle}>Violations</th>
                      <th style={tableHeaderStyle}>Status</th>
                      <th style={tableHeaderStyle}>Actions</th>
                    </>
                  )}
                  {activeTab === 'coaches' && (
                    <>
                      <th style={tableHeaderStyle}>Name</th>
                      <th style={tableHeaderStyle}>Email</th>
                      <th style={tableHeaderStyle}>Sport</th>
                      <th style={tableHeaderStyle}>Certification</th>
                      <th style={tableHeaderStyle}>Athletes</th>
                      <th style={tableHeaderStyle}>Status</th>
                      <th style={tableHeaderStyle}>Actions</th>
                    </>
                  )}
                  {activeTab === 'accounts' && (
                    <>
                      <th style={tableHeaderStyle}>Username</th>
                      <th style={tableHeaderStyle}>Email</th>
                      <th style={tableHeaderStyle}>Role</th>
                      <th style={tableHeaderStyle}>Last Login</th>
                      <th style={tableHeaderStyle}>Status</th>
                      <th style={tableHeaderStyle}>Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} style={{ 
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    transition: 'background-color 0.2s ease'
                  }}>
                    {activeTab === 'players' && (
                      <>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '500' }}>{user.name}</div>
                        </td>
                        <td style={tableCellStyle}>{user.email}</td>
                        <td style={tableCellStyle}>{user.sport}</td>
                        <td style={tableCellStyle}>{user.team}</td>
                        <td style={tableCellStyle}>{user.lastTest}</td>
                        <td style={tableCellStyle}>
                          <span style={getViolationBadge(user.violations)}>
                            {user.violations}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <span style={getStatusBadge(user.status)}>
                            {user.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'coaches' && (
                      <>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '500' }}>{user.name}</div>
                        </td>
                        <td style={tableCellStyle}>{user.email}</td>
                        <td style={tableCellStyle}>{user.sport}</td>
                        <td style={tableCellStyle}>{user.certification}</td>
                        <td style={tableCellStyle}>{user.athletes}</td>
                        <td style={tableCellStyle}>
                          <span style={getStatusBadge(user.status)}>
                            {user.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'accounts' && (
                      <>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: '500' }}>{user.username}</div>
                        </td>
                        <td style={tableCellStyle}>{user.email}</td>
                        <td style={tableCellStyle}>
                          <span style={getRoleBadge(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td style={tableCellStyle}>{user.lastLogin}</td>
                        <td style={tableCellStyle}>
                          <span style={getStatusBadge(user.status)}>
                            {user.status}
                          </span>
                        </td>
                      </>
                    )}
                    <td style={tableCellStyle}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <ActionButton onClick={() => handleEditUser(user)} color="#3B82F6">
                          <Edit size={14} />
                        </ActionButton>
                        <ActionButton onClick={() => handleDeleteUser(user.id)} color="#EF4444">
                          <Trash2 size={14} />
                        </ActionButton>
                        <ActionButton color="#10B981">
                          <Eye size={14} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ 
            padding: '20px 24px', 
            borderTop: '1px solid #E5E7EB', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '0' }}>
              Showing {filteredUsers.length} of {users[activeTab].length} results
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={buttonSecondaryStyle}>Previous</button>
              <button style={buttonSecondaryStyle}>Next</button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                {modalType === 'add' ? 'Add New' : 'Edit'} {tabData[activeTab].label.slice(0, -1)}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {(() => {
                  const fields = {
                    players: [
                      { name: 'name', label: 'Full Name', type: 'text', required: true },
                      { name: 'email', label: 'Email', type: 'email', required: true },
                      { name: 'sport', label: 'Sport', type: 'text', required: true },
                      { name: 'team', label: 'Team', type: 'text', required: true },
                      { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'suspended'] }
                    ],
                    coaches: [
                      { name: 'name', label: 'Full Name', type: 'text', required: true },
                      { name: 'email', label: 'Email', type: 'email', required: true },
                      { name: 'sport', label: 'Sport', type: 'text', required: true },
                      { name: 'certification', label: 'Certification Level', type: 'select', options: ['Level 1', 'Level 2', 'Level 3'] },
                      { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }
                    ],
                    accounts: [
                      { name: 'username', label: 'Username', type: 'text', required: true },
                      { name: 'email', label: 'Email', type: 'email', required: true },
                      { name: 'role', label: 'Role', type: 'select', options: ['Super Admin', 'Testing Officer', 'Data Analyst', 'Lab Technician'] },
                      { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }
                    ]
                  };

                  return fields[activeTab].map(field => (
                    <div key={field.name}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500', 
                        color: '#374151',
                        fontSize: '14px'
                      }}>
                        {field.label} {field.required && <span style={{ color: '#EF4444' }}>*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          style={inputStyle}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          style={inputStyle}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ));
                })()}
                
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  justifyContent: 'flex-end', 
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      ...buttonSecondaryStyle,
                      padding: '12px 20px'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      ...buttonPrimaryStyle,
                      padding: '12px 20px'
                    }}
                  >
                    {modalType === 'add' ? 'Add User' : 'Update User'}
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

export default UserManagement;