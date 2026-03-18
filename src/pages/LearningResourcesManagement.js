
import React, { useState, useRef,useEffect } from 'react';
import { Upload, FileText, Video, Music, BookOpen, AlertTriangle, CheckCircle, Edit2, Trash2, Eye, Plus, Filter, Search } from 'lucide-react';

const LearningResourcesManagement = () => {
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
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Anti-Doping Rules for Boxing",
      type: "article",
      sport: "boxing",
      description: "Comprehensive guide on anti-doping regulations in boxing",
      uploadDate: "2024-05-15",
      status: "published",
      file: null,
      url: "https://example.com/anti-doping-boxing-article"
    },
    {
      id: 2,
      title: "Clean Sport Documentary",
      type: "video",
      sport: "football",
      description: "Educational video about maintaining integrity in sports",
      uploadDate: "2024-05-10",
      status: "draft",
      file: null
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [filterSport, setFilterSport] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    sport: 'boxing',
    description: '',
    file: null,
    status: 'draft'
  });

  const sportsCategories = [
    { id: 'boxing', name: 'Boxing', icon: '🥊' },
    { id: 'cricket', name: 'Cricket', icon: '🏏' },
    { id: 'weightlifting', name: 'Weightlifting', icon: '🏋️' },
    { id: 'wrestling', name: 'Wrestling', icon: '🤼' },
    { id: 'cycling', name: 'Cycling', icon: '🚴' },
    { id: 'swimming', name: 'Swimming', icon: '🏊' },
    { id: 'football', name: 'Football', icon: '⚽' }
  ];

  const resourceTypes = [
    { id: 'audio', name: 'Audio', icon: Music, color: '#10B981' },
    { id: 'video', name: 'Video', icon: Video, color: '#3B82F6' },
    { id: 'article', name: 'Article', icon: FileText, color: '#8B5CF6' },
    { id: 'story', name: 'Story', icon: BookOpen, color: '#F59E0B' },
    { id: 'dosdonts', name: "Do's & Don'ts", icon: AlertTriangle, color: '#EF4444' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingResource) {
      setResources(prev => prev.map(resource => 
        resource.id === editingResource.id 
          ? { ...resource, ...formData, id: editingResource.id }
          : resource
      ));
      setEditingResource(null);
    } else {
      const newResource = {
        ...formData,
        id: Date.now(),
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setResources(prev => [...prev, newResource]);
    }
    
    setFormData({
      title: '',
      type: 'article',
      sport: 'boxing',
      description: '',
      file: null,
      status: 'draft'
    });
    setShowUploadModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      type: resource.type,
      sport: resource.sport,
      description: resource.description,
      file: resource.file,
      status: resource.status
    });
    setShowUploadModal(true);
  };

  const handleDelete = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
    }
  };

  const toggleStatus = (resourceId) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, status: resource.status === 'published' ? 'draft' : 'published' }
        : resource
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSport = filterSport === 'all' || resource.sport === filterSport;
    const matchesType = filterType === 'all' || resource.type === filterType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    return resourceType ? resourceType.icon : FileText;
  };

  const getTypeColor = (type) => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    return resourceType ? resourceType.color : '#6B7280';
  };

  const getSportIcon = (sport) => {
    const sportCategory = sportsCategories.find(sc => sc.id === sport);
    return sportCategory ? sportCategory.icon : '🏃';
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
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: '3px solid #f1f5f9',
          paddingBottom: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 8px 0'
            }}>
              Learning Resources Management
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
              Upload and organize educational anti-doping resources
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            <Plus size={20} />
            Add Resource
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {resourceTypes.map(type => {
            const count = resources.filter(r => r.type === type.id).length;
            const Icon = type.icon;
            return (
              <div key={type.id} style={{
                background: `linear-gradient(135deg, ${type.color}15, ${type.color}08)`,
                border: `2px solid ${type.color}20`,
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Icon size={32} style={{ color: type.color, marginBottom: '12px' }} />
                <h3 style={{ margin: '0 0 8px 0', color: type.color, fontSize: '1.2rem' }}>
                  {type.name}
                </h3>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: type.color }}>
                  {count}
                </p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '30px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={20} style={{ color: '#64748b' }} />
            <span style={{ fontWeight: '600', color: '#374151' }}>Filters:</span>
          </div>
          
          <select
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Sports</option>
            {sportsCategories.map(sport => (
              <option key={sport.id} value={sport.id}>
                {sport.icon} {sport.name}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Types</option>
            {resourceTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px' }}>
            <Search size={20} style={{ color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {filteredResources.map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            const typeColor = getTypeColor(resource.type);
            const sportIcon = getSportIcon(resource.sport);
            
            return (
              <div key={resource.id} style={{
                background: 'white',
                border: '2px solid #f1f5f9',
                borderRadius: '16px',
                padding: '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                e.target.style.borderColor = typeColor;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                e.target.style.borderColor = '#f1f5f9';
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${typeColor}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TypeIcon size={24} style={{ color: typeColor }} />
                    </div>
                    <div>
                      <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '1.1rem',
                        color: '#1f2937'
                      }}>
                        {resource.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        <span>{sportIcon}</span>
                        <span>{sportsCategories.find(s => s.id === resource.sport)?.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: resource.status === 'published' ? '#10B98115' : '#F59E0B15',
                      color: resource.status === 'published' ? '#059669' : '#D97706'
                    }}>
                      {resource.status === 'published' ? '● Published' : '● Draft'}
                    </span>
                  </div>
                </div>

                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  {resource.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#9ca3af'
                  }}>
                    {resource.uploadDate}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleStatus(resource.id)}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        border: 'none',
                        background: resource.status === 'published' ? '#F59E0B15' : '#10B98115',
                        color: resource.status === 'published' ? '#D97706' : '#059669',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title={resource.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      {resource.status === 'published' ? <Eye size={16} /> : <CheckCircle size={16} />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(resource)}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#3B82F615',
                        color: '#2563EB',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(resource.id)}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#EF444415',
                        color: '#DC2626',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6b7280'
          }}>
            <FileText size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No resources found</h3>
            <p>Try adjusting your filters or add some resources to get started.</p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
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
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                borderBottom: '2px solid #f1f5f9',
                paddingBottom: '20px'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {editingResource ? 'Edit Resource' : 'Add New Resource'}
                </h2>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setEditingResource(null);
                    setFormData({
                      title: '',
                      type: 'article',
                      sport: 'boxing',
                      description: '',
                      file: null,
                      status: 'draft'
                    });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#6b7280',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Resource Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      {resourceTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
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
                      Sport Category *
                    </label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      {sportsCategories.map(sport => (
                        <option key={sport.id} value={sport.id}>
                          {sport.icon} {sport.name}
                        </option>
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
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      fontSize: '1rem',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Upload File
                  </label>
                  <div style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '12px',
                    padding: '30px',
                    textAlign: 'center',
                    background: '#f9fafb',
                    transition: 'all 0.3s ease'
                  }}>
                    <Upload size={48} style={{ color: '#9ca3af', margin: '0 auto 16px' }} />
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*,video/*,.pdf,.doc,.docx,.txt"
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" style={{
                      color: '#3B82F6',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textDecoration: 'underline'
                    }}>
                      Choose file
                    </label>
                    <p style={{ color: '#6b7280', margin: '8px 0 0 0', fontSize: '0.9rem' }}>
                      Supports: Audio, Video, PDF, DOC, TXT files
                    </p>
                    {formData.file && (
                      <p style={{ color: '#059669', margin: '8px 0 0 0', fontWeight: '600' }}>
                        Selected: {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setEditingResource(null);
                      setFormData({
                        title: '',
                        type: 'article',
                        sport: 'boxing',
                        description: '',
                        file: null,
                        status: 'draft'
                      });
                    }}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    {editingResource ? 'Update Resource' : 'Add Resource'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningResourcesManagement;
