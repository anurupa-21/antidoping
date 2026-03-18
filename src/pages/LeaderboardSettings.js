import React, { useState,useEffect } from 'react';
import { Search, Edit3, Save, X, Plus, Trophy, AlertTriangle, CheckCircle, Ban } from 'lucide-react';

const LeaderboardSettings = () => {
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
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      sport: "Swimming",
      country: "USA",
      score: 2450,
      rank: 1,
      status: "clean",
      testsCompleted: 24,
      lastTest: "2025-05-15",
      violations: 0
    },
    {
      id: 2,
      name: "Marcus Chen",
      sport: "Track & Field",
      country: "CAN",
      score: 2380,
      rank: 2,
      status: "clean",
      testsCompleted: 18,
      lastTest: "2025-05-20",
      violations: 0
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      sport: "Cycling",
      country: "ESP",
      score: 2200,
      rank: 3,
      status: "pending",
      testsCompleted: 16,
      lastTest: "2025-05-22",
      violations: 0
    },
    {
      id: 4,
      name: "Anurupa Roy",
      sport: "Cricket",
      country: "IN",
      score: 1980,
      rank: 4,
      status: "violation",
      testsCompleted: 12,
      lastTest: "2025-04-30",
      violations: 1
    },
    {
      id: 5,
      name: "Ana Petrov",
      sport: "Swimming",
      country: "RUS",
      score: 1850,
      rank: 5,
      status: "clean",
      testsCompleted: 20,
      lastTest: "2025-05-18",
      violations: 0
    }
  ]);

  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    sport: '',
    country: '',
    score: 0,
    status: 'clean',
    testsCompleted: 0,
    lastTest: '',
    violations: 0
  });

  const statusConfig = {
    clean: { color: '#10b981', bg: '#d1fae5', icon: CheckCircle },
    pending: { color: '#f59e0b', bg: '#fef3c7', icon: AlertTriangle },
    violation: { color: '#ef4444', bg: '#fee2e2', icon: Ban }
  };

  const handleEdit = (player) => {
    setEditingPlayer({...player});
  };

  const handleSave = (id) => {
    setPlayers(players.map(p => 
      p.id === id ? {...editingPlayer} : p
    ));
    
    // Recalculate ranks based on scores
    const updatedPlayers = players.map(p => 
      p.id === id ? {...editingPlayer} : p
    ).sort((a, b) => b.score - a.score);
    
    const rankedPlayers = updatedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1
    }));
    
    setPlayers(rankedPlayers);
    setEditingPlayer(null);
  };

  const handleCancel = () => {
    setEditingPlayer(null);
  };

  const handleAddPlayer = () => {
    const newId = Math.max(...players.map(p => p.id)) + 1;
    const playerToAdd = {
      ...newPlayer,
      id: newId,
      rank: players.length + 1
    };
    
    const updatedPlayers = [...players, playerToAdd]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        rank: index + 1
      }));
    
    setPlayers(updatedPlayers);
    setNewPlayer({
      name: '',
      sport: '',
      country: '',
      score: 0,
      status: 'clean',
      testsCompleted: 0,
      lastTest: '',
      violations: 0
    });
    setShowAddForm(false);
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || player.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '12px',
        backgroundColor: config.bg,
        color: config.color,
        fontSize: '12px',
        fontWeight: '500'
      }}>
        <IconComponent size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
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
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
          padding: '32px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <Trophy size={32} />
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: 0
            }}>
              Leaderboard Management
            </h1>
          </div>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            margin: 0
          }}>
            Manage athlete rankings, scores, and anti-doping compliance status
          </p>
        </div>

        {/* Controls */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flex: 1
            }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type="text"
                  placeholder="Search athletes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: 'white'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Status</option>
                <option value="clean">Clean</option>
                <option value="pending">Pending</option>
                <option value="violation">Violation</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              <Plus size={18} />
              Add Athlete
            </button>
          </div>
        </div>

        {/* Add Player Form */}
        {showAddForm && (
          <div style={{
            padding: '24px',
            backgroundColor: '#f0f9ff',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#1f2937'
            }}>
              Add New Athlete
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <input
                type="text"
                placeholder="Athlete Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Sport"
                value={newPlayer.sport}
                onChange={(e) => setNewPlayer({...newPlayer, sport: e.target.value})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Country"
                value={newPlayer.country}
                onChange={(e) => setNewPlayer({...newPlayer, country: e.target.value})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="number"
                placeholder="Score"
                value={newPlayer.score}
                onChange={(e) => setNewPlayer({...newPlayer, score: parseInt(e.target.value)})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <select
                value={newPlayer.status}
                onChange={(e) => setNewPlayer({...newPlayer, status: e.target.value})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="clean">Clean</option>
                <option value="pending">Pending</option>
                <option value="violation">Violation</option>
              </select>
              <input
                type="number"
                placeholder="Tests Completed"
                value={newPlayer.testsCompleted}
                onChange={(e) => setNewPlayer({...newPlayer, testsCompleted: parseInt(e.target.value)})}
                style={{
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddPlayer}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Athlete
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div style={{ padding: '24px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 100px 120px 100px 120px 140px 100px 120px',
              gap: '16px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e5e7eb',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              <div>Rank</div>
              <div>Athlete</div>
              <div>Sport</div>
              <div>Country</div>
              <div>Score</div>
              <div>Status</div>
              <div>Tests</div>
              <div>Last Test</div>
              <div>Violations</div>
              <div>Actions</div>
            </div>

            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 120px 100px 120px 100px 120px 140px 100px 120px',
                  gap: '16px',
                  padding: '20px',
                  borderBottom: '1px solid #e5e7eb',
                  alignItems: 'center',
                  fontSize: '14px',
                  backgroundColor: editingPlayer?.id === player.id ? '#f0f9ff' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                {/* Rank */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: player.rank <= 3 ? '#fbbf24' : '#e5e7eb',
                  color: player.rank <= 3 ? 'white' : '#374151',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {player.rank}
                </div>

                {/* Name */}
                <div style={{ fontWeight: '600', color: '#1f2937' }}>
                  {player.name}
                </div>

                {/* Sport */}
                <div style={{ color: '#6b7280' }}>
                  {player.sport}
                </div>

                {/* Country */}
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textAlign: 'center',
                  color: '#374151'
                }}>
                  {player.country}
                </div>

                {/* Score */}
                <div>
                  {editingPlayer?.id === player.id ? (
                    <input
                      type="number"
                      value={editingPlayer.score}
                      onChange={(e) => setEditingPlayer({
                        ...editingPlayer,
                        score: parseInt(e.target.value)
                      })}
                      style={{
                        width: '80px',
                        padding: '6px',
                        border: '2px solid #3b82f6',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  ) : (
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>
                      {player.score.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div>
                  {editingPlayer?.id === player.id ? (
                    <select
                      value={editingPlayer.status}
                      onChange={(e) => setEditingPlayer({
                        ...editingPlayer,
                        status: e.target.value
                      })}
                      style={{
                        padding: '6px',
                        border: '2px solid #3b82f6',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    >
                      <option value="clean">Clean</option>
                      <option value="pending">Pending</option>
                      <option value="violation">Violation</option>
                    </select>
                  ) : (
                    getStatusBadge(player.status)
                  )}
                </div>

                {/* Tests */}
                <div style={{ textAlign: 'center' }}>
                  {editingPlayer?.id === player.id ? (
                    <input
                      type="number"
                      value={editingPlayer.testsCompleted}
                      onChange={(e) => setEditingPlayer({
                        ...editingPlayer,
                        testsCompleted: parseInt(e.target.value)
                      })}
                      style={{
                        width: '60px',
                        padding: '6px',
                        border: '2px solid #3b82f6',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    player.testsCompleted
                  )}
                </div>

                {/* Last Test */}
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {player.lastTest}
                </div>

                {/* Violations */}
                <div style={{
                  textAlign: 'center',
                  color: player.violations > 0 ? '#ef4444' : '#10b981',
                  fontWeight: '600'
                }}>
                  {player.violations}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {editingPlayer?.id === player.id ? (
                    <>
                      <button
                        onClick={() => handleSave(player.id)}
                        style={{
                          padding: '6px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          padding: '6px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(player)}
                      style={{
                        padding: '6px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#ecfdf5',
              borderRadius: '16px',
              border: '1px solid #d1fae5'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#065f46',
                marginBottom: '4px'
              }}>
                {players.filter(p => p.status === 'clean').length}
              </div>
              <div style={{ fontSize: '14px', color: '#047857' }}>
                Clean Athletes
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#fffbeb',
              borderRadius: '16px',
              border: '1px solid #fed7aa'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '4px'
              }}>
                {players.filter(p => p.status === 'pending').length}
              </div>
              <div style={{ fontSize: '14px', color: '#d97706' }}>
                Pending Tests
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#fef2f2',
              borderRadius: '16px',
              border: '1px solid #fecaca'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#991b1b',
                marginBottom: '4px'
              }}>
                {players.filter(p => p.status === 'violation').length}
              </div>
              <div style={{ fontSize: '14px', color: '#dc2626' }}>
                Violations
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '16px',
              border: '1px solid #bfdbfe'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '4px'
              }}>
                {Math.round(players.reduce((sum, p) => sum + p.testsCompleted, 0) / players.length)}
              </div>
              <div style={{ fontSize: '14px', color: '#2563eb' }}>
                Avg Tests/Athlete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSettings;