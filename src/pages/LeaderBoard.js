import React, { useState,useEffect } from 'react';
import { Trophy, Medal, Award, Shield,  Calendar } from 'lucide-react';

const LeaderBoard = () => {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.display = 'none';
        return () => {
          if (navbar) navbar.style.display = '';
        };
      }, []);
    
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Clean athletes leaderboard data
  const leaderboardData = [
    { 
      rank: 1, 
      name: 'Sarah Johnson', 
      country: 'USA',
      sport: 'Track & Field',
      cleanScore: 1500, 
      testsCleared: 45,
      cleanYears: 8,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    { 
      rank: 2, 
      name: 'Marcus Chen', 
      country: 'Canada',
      sport: 'Swimming',
      cleanScore: 1200, 
      testsCleared: 38,
      cleanYears: 6,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    { 
      rank: 3, 
      name: 'Elena Rodriguez', 
      country: 'Spain',
      sport: 'Cycling',
      cleanScore: 1000, 
      testsCleared: 42,
      cleanYears: 7,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    { 
      rank: 4, 
      name: 'David Kim', 
      country: 'South Korea',
      sport: 'Weightlifting',
      cleanScore: 800, 
      testsCleared: 33,
      cleanYears: 5,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    { 
      rank: 5, 
      name: 'Anna Petrov', 
      country: 'Russia',
      sport: 'Gymnastics',
      cleanScore: 750, 
      testsCleared: 29,
      cleanYears: 4,
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
    { 
      rank: 6, 
      name: 'James Wilson', 
      country: 'Australia',
      sport: 'Boxing',
      cleanScore: 720, 
      testsCleared: 31,
      cleanYears: 6,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    { 
      rank: 7, 
      name: 'Marie Dubois', 
      country: 'France',
      sport: 'Tennis',
      cleanScore: 700, 
      testsCleared: 27,
      cleanYears: 5,
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
    },
    { 
      rank: 8, 
      name: 'Carlos Silva', 
      country: 'Brazil',
      sport: 'Football',
      cleanScore: 650, 
      testsCleared: 25,
      cleanYears: 4,
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    { 
      rank: 9, 
      name: 'Lisa Zhang', 
      country: 'China',
      sport: 'Badminton',
      cleanScore: 600, 
      testsCleared: 23,
      cleanYears: 3,
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
    },
    { 
      rank: 10, 
      name: 'Ahmed Hassan', 
      country: 'Egypt',
      sport: 'Wrestling',
      cleanScore: 550, 
      testsCleared: 21,
      cleanYears: 3,
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
  ];

  const achievementsData = [
    { 
      title: 'Clean Sport Ambassador', 
      description: 'Recognized for promoting fair play and clean competition in your sport.', 
      date: '2025-01-15',
      icon: '🏅',
      category: 'Leadership'
    },
    { 
      title: '50 Clean Tests Milestone', 
      description: 'Successfully completed 50 drug tests with perfect clean record.', 
      date: '2025-01-14',
      icon: '✅',
      category: 'Testing'
    },
    { 
      title: 'Fair Play Award Winner', 
      description: 'Awarded for exceptional sportsmanship and ethical behavior.', 
      date: '2025-01-10',
      icon: '🤝',
      category: 'Sportsmanship'
    },
    { 
      title: '5 Years Drug-Free Athlete', 
      description: 'Celebrating 5 consecutive years of clean competition and testing.', 
      date: '2025-01-05',
      icon: '🎖️',
      category: 'Milestone'
    },
    { 
      title: 'Clean Competition Advocate', 
      description: 'Actively participated in anti-doping education programs.', 
      date: '2024-12-20',
      icon: '📚',
      category: 'Education'
    },
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy style={{ color: '#FFD700', width: '24px', height: '24px' }} />;
      case 2: return <Medal style={{ color: '#C0C0C0', width: '24px', height: '24px' }} />;
      case 3: return <Award style={{ color: '#CD7F32', width: '24px', height: '24px' }} />;
      default: return <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#666' }}>#{rank}</span>;
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'USA': '🇺🇸', 'Canada': '🇨🇦', 'Spain': '🇪🇸', 'South Korea': '🇰🇷',
      'Russia': '🇷🇺', 'Australia': '🇦🇺', 'France': '🇫🇷', 'Brazil': '🇧🇷',
      'China': '🇨🇳', 'Egypt': '🇪🇬'
    };
    return flags[country] || '🏳️';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
          <Shield style={{ color: '#4f46e5', width: '40px', height: '40px' }} />
          <h1 style={{ 
            margin: 0, 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            See Where You Stand in Clean Sport!
          </h1>
          <Shield style={{ color: '#4f46e5', width: '40px', height: '40px' }} />
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '1.2rem', 
          color: '#6b7280',
          fontWeight: '500'
        }}>
          Celebrating Athletes Who Compete with Integrity
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginBottom: '30px'
      }}>
        {[
          { key: 'leaderboard', label: 'Clean Sport Leaders', icon: '🏆' },
          { key: 'achievements', label: 'Fair Play Achievements', icon: '🏅' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '15px 30px',
              borderRadius: '15px',
              border: 'none',
              background: activeTab === tab.key 
                ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' 
                : 'rgba(255, 255, 255, 0.9)',
              color: activeTab === tab.key ? 'white' : '#374151',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: activeTab === tab.key 
                ? '0 8px 25px rgba(79, 70, 229, 0.4)' 
                : '0 4px 15px rgba(0,0,0,0.1)',
              transform: activeTab === tab.key ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Section */}
      {activeTab === 'leaderboard' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            fontSize: '2rem',
            color: '#1f2937',
            fontWeight: 'bold'
          }}>
            🏆 Clean Sport Leaderboard
          </h2>

          {/* Top 3 Players */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {leaderboardData.slice(0, 3).map((player) => (
              <div key={player.rank} style={{
                textAlign: 'center',
                background: player.rank === 1 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' :
                           player.rank === 2 ? 'linear-gradient(135deg, #9ca3af, #6b7280)' :
                           'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '20px',
                padding: '25px',
                color: 'white',
                minWidth: '200px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transform: player.rank === 1 ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginBottom: '15px'
                }}>
                  {getRankIcon(player.rank)}
                </div>
                <img 
                  src={player.avatar} 
                  alt={player.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '4px solid white',
                    marginBottom: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                />
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: 'bold' }}>
                  {player.name}
                </h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', opacity: '0.9' }}>
                  {getCountryFlag(player.country)} {player.sport}
                </p>
                <p style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {player.cleanScore}
                </p>
                <div style={{ fontSize: '0.8rem', opacity: '0.9' }}>
                  <div>✅ {player.testsCleared} Tests Clear</div>
                  <div>🏆 {player.cleanYears} Years Clean</div>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Players Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}>
                  <th style={{ padding: '20px', textAlign: 'left', fontSize: '1.1rem', fontWeight: '600' }}>Rank</th>
                  <th style={{ padding: '20px', textAlign: 'left', fontSize: '1.1rem', fontWeight: '600' }}>Athlete</th>
                  <th style={{ padding: '20px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>Avatar</th>
                  <th style={{ padding: '20px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>Clean Score</th>
                  <th style={{ padding: '20px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>Tests Clear</th>
                  <th style={{ padding: '20px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>Clean Years</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.slice(3).map((player, index) => (
                  <tr key={player.rank} style={{
                    background: index % 2 === 0 ? '#f9fafb' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e0f2fe';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? '#f9fafb' : 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1f2937' }}>
                          {player.name}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {getCountryFlag(player.country)} {player.country} • {player.sport}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <img 
                        src={player.avatar} 
                        alt={`${player.name}'s Avatar`}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          border: '3px solid #e5e7eb',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#4f46e5' }}>
                      {player.cleanScore}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', color: '#059669' }}>
                      ✅ {player.testsCleared}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', color: '#dc2626' }}>
                      🏆 {player.cleanYears}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {activeTab === 'achievements' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            fontSize: '2rem',
            color: '#1f2937',
            fontWeight: 'bold'
          }}>
            🏅 Fair Play Achievements
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            {achievementsData.map((achievement, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))',
                borderRadius: '15px',
                padding: '25px',
                border: '2px solid rgba(79, 70, 229, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{
                    fontSize: '3rem',
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {achievement.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: '1.4rem', 
                        fontWeight: 'bold', 
                        color: '#1f2937'
                      }}>
                        {achievement.title}
                      </h3>
                      <span style={{
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {achievement.category}
                      </span>
                    </div>
                    <p style={{ 
                      margin: '0 0 15px 0', 
                      color: '#4b5563', 
                      fontSize: '1.1rem',
                      lineHeight: '1.6'
                    }}>
                      {achievement.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      <span style={{ 
                        color: '#6b7280', 
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}>
                        Achieved on: {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '25px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          margin: 0, 
          color: '#6b7280', 
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          🌟 Together, we build a future of clean and fair competition 🌟
        </p>
      </div>
    </div>
  );
};

export default LeaderBoard;