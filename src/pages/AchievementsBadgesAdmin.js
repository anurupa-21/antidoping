import React, { useState,useEffect } from 'react';
import { Plus, Edit, Trash2, Award, Trophy, Star, Medal, Shield, Target, Users, Save, X } from 'lucide-react';

const AchievementsBadgesAdmin = () => {
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
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'Clean Athlete',
      description: 'Complete 12 months without any doping violations',
      icon: 'Shield',
      category: 'Compliance',
      points: 100,
      criteria: 'No violations for 365 days',
      isActive: true,
      color: '#10B981'
    },
    {
      id: 2,
      name: 'Education Champion',
      description: 'Complete all anti-doping education modules',
      icon: 'Star',
      category: 'Education',
      points: 50,
      criteria: 'Complete 100% of education modules',
      isActive: true,
      color: '#3B82F6'
    },
    {
      id: 3,
      name: 'Testing Veteran',
      description: 'Successfully complete 10 drug tests',
      icon: 'Trophy',
      category: 'Testing',
      points: 75,
      criteria: 'Complete 10 drug tests with negative results',
      isActive: true,
      color: '#F59E0B'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Award',
    category: '',
    points: 0,
    criteria: '',
    isActive: true,
    color: '#10B981'
  });

  const iconOptions = ['Award', 'Trophy', 'Star', 'Medal', 'Shield', 'Target'];
  const categoryOptions = ['Compliance', 'Education', 'Testing', 'Performance', 'Community'];
  const colorOptions = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const getIcon = (iconName) => {
    const icons = { Award, Trophy, Star, Medal, Shield, Target };
    const IconComponent = icons[iconName] || Award;
    return <IconComponent size={20} />;
  };

  const handleAddNew = () => {
    setEditingAchievement(null);
    setFormData({
      name: '',
      description: '',
      icon: 'Award',
      category: '',
      points: 0,
      criteria: '',
      isActive: true,
      color: '#10B981'
    });
    setShowModal(true);
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setFormData({ ...achievement });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(a => a.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.category || !formData.criteria) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingAchievement) {
      setAchievements(achievements.map(a => 
        a.id === editingAchievement.id ? { ...formData, id: editingAchievement.id } : a
      ));
    } else {
      const newAchievement = {
        ...formData,
        id: Math.max(...achievements.map(a => a.id)) + 1
      };
      setAchievements([...achievements, newAchievement]);
    }
    setShowModal(false);
  };

  const toggleActive = (id) => {
    setAchievements(achievements.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Achievements & Badges
              </h1>
              <p style={{ margin: 0, color: '#6B7280', fontSize: '1.1rem' }}>
                Configure rewards and recognition for clean athletes
              </p>
            </div>
            <button
              onClick={handleAddNew}
              style={{
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '12px 24px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Plus size={20} />
              Add Achievement
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '15px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px auto'
            }}>
              <Award size={30} color="white" />
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>
              {achievements.length}
            </h3>
            <p style={{ margin: 0, color: '#6B7280' }}>Total Achievements</p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              borderRadius: '15px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px auto'
            }}>
              <Users size={30} color="white" />
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>
              {achievements.filter(a => a.isActive).length}
            </h3>
            <p style={{ margin: 0, color: '#6B7280' }}>Active Achievements</p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '25px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              borderRadius: '15px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px auto'
            }}>
              <Star size={30} color="white" />
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>
              {achievements.reduce((sum, a) => sum + a.points, 0)}
            </h3>
            <p style={{ margin: 0, color: '#6B7280' }}>Total Points</p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '25px' 
        }}>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: achievement.isActive ? '#10B981' : '#6B7280',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {achievement.isActive ? 'Active' : 'Inactive'}
              </div>

              {/* Achievement Icon */}
              <div style={{
                background: achievement.color,
                borderRadius: '15px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: 'white'
              }}>
                {getIcon(achievement.icon)}
              </div>

              {/* Achievement Details */}
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#1F2937' 
              }}>
                {achievement.name}
              </h3>
              <p style={{ 
                margin: '0 0 15px 0', 
                color: '#6B7280', 
                lineHeight: '1.5' 
              }}>
                {achievement.description}
              </p>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px' 
                }}>
                  <span style={{ 
                    background: '#F3F4F6', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    {achievement.category}
                  </span>
                  <span style={{ 
                    background: achievement.color, 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {achievement.points} pts
                  </span>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem', 
                  color: '#6B7280',
                  fontStyle: 'italic'
                }}>
                  Criteria: {achievement.criteria}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleActive(achievement.id)}
                  style={{
                    flex: 1,
                    background: achievement.isActive ? '#FEF3C7' : '#D1FAE5',
                    color: achievement.isActive ? '#92400E' : '#065F46',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {achievement.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(achievement)}
                  style={{
                    background: '#DBEAFE',
                    color: '#1E40AF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(achievement.id)}
                  style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
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
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '25px' 
              }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '1.75rem', 
                  fontWeight: 'bold',
                  color: '#1F2937'
                }}>
                  {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Achievement Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Points
                  </label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                    min="0"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Criteria
                  </label>
                  <input
                    type="text"
                    value={formData.criteria}
                    onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                    required
                    placeholder="e.g., Complete 10 drug tests"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Color
                  </label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: formData.color === color ? '3px solid #374151' : '2px solid #E5E7EB',
                          background: color,
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      background: '#F3F4F6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Save size={16} />
                    {editingAchievement ? 'Update' : 'Create'}
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

export default AchievementsBadgesAdmin;