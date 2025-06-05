import React, { useState, useEffect } from 'react';

import {
  Award,
  Trophy,
  Star,
  Medal,
  Target,
  Brain,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  Lock,
  Flame,
  Calendar,
  TrendingUp
} from 'lucide-react';
import './AchievementsBadges.css'; // External CSS file

const badgesData = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first quiz successfully",
    category: "Learning",
    icon: Target,
    earned: true,
    earnedDate: "2024-05-15",
    progress: 100,
    maxProgress: 1,
    rarity: "common"
  },
  {
    id: 2,
    title: "Knowledge Seeker",
    description: "Complete 10 quizzes with 80% or higher score",
    category: "Learning",
    icon: Brain,
    earned: true,
    earnedDate: "2024-05-20",
    progress: 10,
    maxProgress: 10,
    rarity: "rare"
  },
  {
    id: 3,
    title: "Study Enthusiast",
    description: "Read 25 learning resources articles",
    category: "Learning",
    icon: BookOpen,
    earned: false,
    progress: 18,
    maxProgress: 25,
    rarity: "rare"
  },
  {
    id: 4,
    title: "Perfect Score",
    description: "Achieve 100% on any quiz",
    category: "Achievement",
    icon: Star,
    earned: true,
    earnedDate: "2024-05-18",
    progress: 100,
    maxProgress: 1,
    rarity: "epic"
  },
  {
    id: 5,
    title: "Streak Master",
    description: "Maintain a 7-day learning streak",
    category: "Engagement",
    icon: Flame,
    earned: false,
    progress: 4,
    maxProgress: 7,
    rarity: "rare"
  },
  {
    id: 6,
    title: "Community Helper",
    description: "Help 5 other players in the forum",
    category: "Community",
    icon: Users,
    earned: false,
    progress: 2,
    maxProgress: 5,
    rarity: "epic"
  },
  {
    id: 7,
    title: "Speed Learner",
    description: "Complete a quiz in under 2 minutes",
    category: "Achievement",
    icon: Clock,
    earned: true,
    earnedDate: "2024-05-22",
    progress: 100,
    maxProgress: 1,
    rarity: "rare"
  },
  {
    id: 8,
    title: "Champion",
    description: "Reach top 3 on the leaderboard",
    category: "Competition",
    icon: Trophy,
    earned: false,
    progress: 0,
    maxProgress: 1,
    rarity: "legendary"
  },
  {
    id: 9,
    title: "Consistent Learner",
    description: "Complete activities for 30 consecutive days",
    category: "Engagement",
    icon: Calendar,
    earned: false,
    progress: 12,
    maxProgress: 30,
    rarity: "epic"
  }
];

const categories = ['All', 'Learning', 'Achievement', 'Engagement', 'Community', 'Competition'];

const AchievementsBadges = ({ playerName = "Alex Johnson" }) => {
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
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredBadges = activeFilter === 'All'
    ? badgesData
    : badgesData.filter(badge => badge.category === activeFilter);

  const earnedBadges = badgesData.filter(badge => badge.earned);
  const totalBadges = badgesData.length;
  const completionPercentage = Math.round((earnedBadges.length / totalBadges) * 100);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          <Award size={40} />
          Achievements & Badges
        </h1>
        <p className="subtitle">
          Track your progress and showcase your accomplishments, {playerName}!
        </p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <Medal size={32} color="#FFD700" />
          <div className="stat-number">{earnedBadges.length}</div>
          <div className="stat-label">Badges Earned</div>
        </div>
        <div className="stat-card">
          <Target size={32} color="#4CAF50" />
          <div className="stat-number">{completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <TrendingUp size={32} color="#2196F3" />
          <div className="stat-number">{totalBadges - earnedBadges.length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <Star size={32} color="#FF9800" />
          <div className="stat-number">{earnedBadges.filter(b => b.rarity === 'legendary').length}</div>
          <div className="stat-label">Legendary Badges</div>
        </div>
      </div>

      <div className="filter-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="badges-grid">
        {filteredBadges.map(badge => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
            >
              <div className="badge-header">
                <div className={`badge-icon ${badge.earned ? 'earned' : 'locked'}`}>
                  {badge.earned ? <Icon size={24} /> : <Lock size={24} />}
                </div>
                <div className="badge-info">
                  <div className="badge-title">{badge.title}</div>
                  <div className="badge-category">{badge.category}</div>
                </div>
                <div className={`rarity ${badge.rarity}`}>{badge.rarity}</div>
              </div>
              <div className="badge-description">{badge.description}</div>
              {!badge.earned && (
                <div className="progress-container">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="badge-footer">
                {badge.earned ? (
                  <div className="earned-date">
                    <CheckCircle size={14} color="#4CAF50" />
                    <span>Earned {formatDate(badge.earnedDate)}</span>
                  </div>
                ) : (
                  <div className="earned-date">
                    <Clock size={14} color="#999" />
                    <span>In Progress</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsBadges;