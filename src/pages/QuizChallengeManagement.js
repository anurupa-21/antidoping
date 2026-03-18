import React, { useState,useEffect } from 'react';
import { Plus, Edit3, Trash2,  Trophy, BookOpen,  Search } from 'lucide-react';

const QuizChallengeManagement = () => {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.display = 'none';
        return () => { if (navbar) navbar.style.display = ''; };
      }, []);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [currentForm, setCurrentForm] = useState('quiz');

  const sports = [
    { id: 'boxing', name: 'Boxing', icon: '🥊' },
    { id: 'cricket', name: 'Cricket', icon: '🏏' },
    { id: 'weightlifting', name: 'Weightlifting', icon: '🏋️' },
    { id: 'wrestling', name: 'Wrestling', icon: '🤼' },
    { id: 'cycling', name: 'Cycling', icon: '🚴' },
    { id: 'swimming', name: 'Swimming', icon: '🏊' },
    { id: 'football', name: 'Football', icon: '⚽' }
  ];

  const [quizzes, setQuizzes] = useState([
  {
    id: 1,
    title: 'Basic Anti-Doping Rules',
    sport: 'boxing',
    questions: 5,
    difficulty: 'Beginner',
    status: 'Active',
    created: '2024-01-15',
    participants: 45,
    questionsList: [
      { question: 'What is the purpose of anti-doping rules?', options: ['To punish athletes', 'To ensure fair play', 'To promote drug use', 'To avoid injuries'], answer: 'To ensure fair play' },
      { question: 'Who enforces anti-doping rules?', options: ['WADA', 'FIFA', 'NBA', 'IOC'], answer: 'WADA' },
      { question: 'What happens after a positive doping test?', options: ['Promotion', 'Ban/Suspension', 'Prize Money', 'Nothing'], answer: 'Ban/Suspension' },
      { question: 'Can coaches be penalized under anti-doping rules?', options: ['Yes', 'No'], answer: 'Yes' },
      { question: 'When can athletes be tested?', options: ['Only in competition', 'Anytime', 'Only during training', 'Never'], answer: 'Anytime' }
    ]
  },
  {
    id: 2,
    title: 'Prohibited Substances',
    sport: 'cricket',
    questions: 5,
    difficulty: 'Intermediate',
    status: 'Active',
    created: '2024-01-20',
    participants: 32,
    questionsList: [
      { question: 'Which of these is a banned substance?', options: ['Paracetamol', 'Erythropoietin (EPO)', 'Vitamin D', 'Ibuprofen'], answer: 'Erythropoietin (EPO)' },
      { question: 'Who publishes the prohibited list?', options: ['IOC', 'WADA', 'WHO', 'FIFA'], answer: 'WADA' },
      { question: 'What is a masking agent?', options: ['A painkiller', 'A substance that hides doping', 'A supplement', 'Legal medication'], answer: 'A substance that hides doping' },
      { question: 'Are recreational drugs banned in sport?', options: ['Yes, always', 'Depends on sport', 'Only during competition', 'No'], answer: 'Only during competition' },
      { question: 'What does TUE stand for?', options: ['Total Urine Exam', 'Therapeutic Use Exemption', 'Temporary Usage Enforcement', 'Team Unified Evaluation'], answer: 'Therapeutic Use Exemption' }
    ]
  },
  {
    id: 3,
    title: 'Testing Procedures',
    sport: 'weightlifting',
    questions: 5,
    difficulty: 'Advanced',
    status: 'Draft',
    created: '2024-01-25',
    participants: 0,
    questionsList: [
      { question: 'What is the first step in a doping test?', options: ['Collection of urine', 'Identification', 'Result analysis', 'Notification'], answer: 'Notification' },
      { question: 'Who can be present during a test?', options: ['Anyone', 'Only the coach', 'Doping control officer', 'Fans'], answer: 'Doping control officer' },
      { question: 'How is the sample stored?', options: ['Plastic bags', 'Sealed containers', 'Open jars', 'Envelopes'], answer: 'Sealed containers' },
      { question: 'What are the A and B samples?', options: ['Two tests done a year apart', 'Two separate athletes', 'Two parts of the same sample', 'Two blood samples'], answer: 'Two parts of the same sample' },
      { question: 'How long are samples kept?', options: ['1 year', '5 years', '10 years', 'Indefinitely'], answer: '10 years' }
    ]
  }
]);
const [selectedQuiz, setSelectedQuiz] = useState(null);
const [showQuizModal, setShowQuizModal] = useState(false);

const openQuizModal = (quiz) => {
  setSelectedQuiz(quiz);
  setShowQuizModal(true);
};

const closeQuizModal = () => {
  setSelectedQuiz(null);
  setShowQuizModal(false);
};

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Clean Sport Champion',
      sport: 'wrestling',
      type: 'Monthly',
      participants: 128,
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      prize: 'Certificate + Badge'
    },
    {
      id: 2,
      title: 'Anti-Doping Knowledge Master',
      sport: 'cycling',
      type: 'Weekly',
      participants: 89,
      status: 'Active',
      startDate: '2024-02-05',
      endDate: '2024-02-12',
      prize: 'Digital Trophy'
    },
    {
      id: 3,
      title: 'Fair Play Warriors',
      sport: 'swimming',
      type: 'Seasonal',
      participants: 205,
      status: 'Upcoming',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      prize: 'Medal + Certificate'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    sport: 'boxing',
    questions: '',
    difficulty: 'Beginner',
    status: 'Draft',
    type: 'Weekly',
    startDate: '',
    endDate: '',
    prize: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (type, form, item = null) => {
    setModalType(type);
    setCurrentForm(form);
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({
        title: '',
        sport: 'boxing',
        questions: '',
        difficulty: 'Beginner',
        status: 'Draft',
        type: 'Weekly',
        startDate: '',
        endDate: '',
        prize: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentForm === 'quiz') {
      if (modalType === 'create') {
        const newQuiz = {
          ...formData,
          id: Date.now(),
          created: new Date().toISOString().split('T')[0],
          participants: 0
        };
        setQuizzes(prev => [...prev, newQuiz]);
      } else {
        setQuizzes(prev => prev.map(q => q.id === editingItem.id ? { ...q, ...formData } : q));
      }
    } else {
      if (modalType === 'create') {
        const newChallenge = {
          ...formData,
          id: Date.now(),
          participants: 0
        };
        setChallenges(prev => [...prev, newChallenge]);
      } else {
        setChallenges(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...formData } : c));
      }
    }
    closeModal();
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'quiz') {
        setQuizzes(prev => prev.filter(q => q.id !== id));
      } else {
        setChallenges(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Draft': return '#F59E0B';
      case 'Upcoming': return '#3B82F6';
      case 'Ended': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getSportIcon = (sportId) => {
    const sport = sports.find(s => s.id === sportId);
    return sport ? sport.icon : '🏃';
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSport = selectedSport === 'all' || quiz.sport === selectedSport;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSport = selectedSport === 'all' || challenge.sport === selectedSport;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

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
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            Anti-Doping Quiz & Challenge Management
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#6B7280', 
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            Create and manage educational content for athletes
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              background: '#F3F4F6',
              borderRadius: '12px',
              padding: '4px'
            }}>
              <button
                onClick={() => setActiveTab('quizzes')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'quizzes' ? '#667eea' : 'transparent',
                  color: activeTab === 'quizzes' ? 'white' : '#6B7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <BookOpen size={18} />
                Quizzes
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'challenges' ? '#667eea' : 'transparent',
                  color: activeTab === 'challenges' ? 'white' : '#6B7280',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Trophy size={18} />
                Challenges
              </button>
            </div>
          </div>

          {/* Filters and Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF'
                }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '12px 12px 12px 44px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '14px',
                    width: '250px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Sports</option>
                {sports.map(sport => (
                  <option key={sport.id} value={sport.id}>
                    {sport.icon} {sport.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => openModal('create', activeTab.slice(0, -1))}
              style={{
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Plus size={18} />
              Create {activeTab === 'quizzes' ? 'Quiz' : 'Challenge'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {activeTab === 'quizzes' ? (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '25px'
              }}>
                {filteredQuizzes.map(quiz => (
                  <div key={quiz.id} onClick={() => openQuizModal(quiz)}style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #F3F4F6',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>{getSportIcon(quiz.sport)}</span>
                        <span style={{
                          background: getStatusColor(quiz.status),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {quiz.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openModal('edit', 'quiz', quiz)}
                          style={{
                            background: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id, 'quiz')}
                          style={{
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#1F2937',
                      marginBottom: '15px',
                      lineHeight: '1.4'
                    }}>
                      {quiz.title}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Questions</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>{quiz.questions}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Difficulty</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#6366F1' }}>{quiz.difficulty}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Participants</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>{quiz.participants}</span>
                      </div>
                    </div>

                    <div style={{
                      paddingTop: '15px',
                      borderTop: '1px solid #F3F4F6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                        Created: {new Date(quiz.created).toLocaleDateString()}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        textTransform: 'capitalize',
                        fontWeight: '500'
                      }}>
                        {sports.find(s => s.id === quiz.sport)?.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '25px'
              }}>
                {filteredChallenges.map(challenge => (
                  <div key={challenge.id} style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '25px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #F3F4F6',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>{getSportIcon(challenge.sport)}</span>
                        <span style={{
                          background: getStatusColor(challenge.status),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {challenge.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openModal('edit', 'challenge', challenge)}
                          style={{
                            background: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(challenge.id, 'challenge')}
                          style={{
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#1F2937',
                      marginBottom: '15px',
                      lineHeight: '1.4'
                    }}>
                      {challenge.title}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Type</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#6366F1' }}>{challenge.type}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Participants</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>{challenge.participants}</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>Prize</span>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: '5px 0 0 0', fontWeight: '500' }}>{challenge.prize}</p>
                    </div>

                    <div style={{
                      paddingTop: '15px',
                      borderTop: '1px solid #F3F4F6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                      color: '#9CA3AF'
                    }}>
                      <span>{new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                        {sports.find(s => s.id === challenge.sport)?.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#1F2937',
                textAlign: 'center'
              }}>
                {modalType === 'create' ? 'Create' : 'Edit'} {currentForm === 'quiz' ? 'Quiz' : 'Challenge'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '14px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Sport *
                    </label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '14px',
                        background: 'white'
                      }}
                    >
                      {sports.map(sport => (
                        <option key={sport.id} value={sport.id}>
                          {sport.icon} {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '14px',
                        background: 'white'
                      }}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ended">Ended</option>
                    </select>
                  </div>
                </div>

                {currentForm === 'quiz' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                        Number of Questions *
                      </label>
                      <input
                        type="number"
                        name="questions"
                        value={formData.questions}
                        onChange={handleInputChange}
                        required
                        min="1"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #E5E7EB',
                          borderRadius: '10px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                        Difficulty *
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #E5E7EB',
                          borderRadius: '10px',
                          fontSize: '14px',
                          background: 'white'
                        }}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                          Challenge Type *
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px',
                            background: 'white'
                          }}
                        >
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Seasonal">Seasonal</option>
                          <option value="Annual">Annual</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                          Prize *
                        </label>
                        <input
                          type="text"
                          name="prize"
                          value={formData.prize}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Certificate + Badge"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                          End Date *
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder={`Enter ${currentForm} description...`}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '14px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: '12px 24px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#6B7280',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#D1D5DB';
                      e.target.style.background = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.background = 'white';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    {modalType === 'create' ? 'Create' : 'Update'} {currentForm === 'quiz' ? 'Quiz' : 'Challenge'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {showQuizModal && selectedQuiz && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  }}>
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      width: '100%',
      maxWidth: '700px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px'
      }}>{selectedQuiz.title}</h2>

      {selectedQuiz.questionsList?.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <p style={{ fontWeight: '600', marginBottom: '10px', color: '#1F2937' }}>
{idx + 1}. {q.question}</p>
          <ul style={{ paddingLeft: '20px' }}>
            {q.options.map((opt, i) => (
              <li key={i} style={{ marginBottom: '5px', color: '#374151' }}>
• {opt}</li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <button
          onClick={closeQuizModal}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#667eea ',
            color: 'black',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default QuizChallengeManagement;