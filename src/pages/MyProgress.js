import React, { useState, useEffect } from 'react';
import './MyProgress.css';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Award,
  Brain,
  Flame,
  Activity,
  FileText,
  CheckCircle,
  Star,
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Dummy data (simulate props or API response)
const progressData = {
  overall: {
    completedQuizzes: 23,
    averageScore: 85,
    totalStudyTime: 42,
    streak: 7,
  },
  subjects: {
    Athletics: { progress: 75 },
    Swimming: { progress: 60 },
    Cricket: { progress: 40 },
  },
  recentActivity: [
    { type: 'quiz', description: 'Completed Athletics Quiz', time: '2h ago' },
    { type: 'study', description: 'Studied Swimming-Articles for 1h', time: '5h ago' },
    { type: 'achievement', description: 'Unlocked Bronze Badge', time: '1 day ago' },
  ],
  achievements: [
    {
      title: 'Quiz Master',
      description: 'Completed 20 quizzes with over 80% average.',
      progress: [20, 40, 60, 80],
    },
    {
      title: 'Study Streak',
      description: 'Studied consistently for 7 days.',
      progress: [25, 50, 75, 100],
    },
  ],
};

// Chart data
const chartData = [
  { name: 'Jan', score: 78 },
  { name: 'Feb', score: 82 },
  { name: 'Mar', score: 85 },
  { name: 'Apr', score: 88 },
];

// Utility: Map progress % to color
const getProgressColor = (percentage) => {
  if (percentage >= 75) return '#006400'; // Deep green
  if (percentage >= 50) return '#FFC107';
  return '#F44336';
};

// Utility: Icon mapping
const getActivityIcon = (type) => {
  switch (type) {
    case 'quiz':
      return <CheckCircle size={20} color="#4CAF50" />;
    case 'study':
      return <FileText size={20} color="#2196F3" />;
    case 'achievement':
      return <Star size={20} color="#FFD700" />;
    default:
      return <Activity size={20} />;
  }
};

const MyProgress = ({ playerName = "Anurupa" }) => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
    return () => {
      if (navbar) navbar.style.display = '';
    };
  }, []);

  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [hoveredStat, setHoveredStat] = useState(null);
  const timePeriods = ['This Week', 'This Month', 'Last 3 Months', 'This Year'];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="title">
          <BarChart3 size={40} />
          My Progress
        </h1>
        <p className="subtitle">
          Track your learning journey and performance, {playerName}!
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="timePeriodSelector">
        {timePeriods.map(period => (
          <button
            key={period}
            className={`timePeriodBtn ${selectedPeriod === period ? 'active' : ''}`}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="statsOverview">
        {/* Quizzes Completed */}
        <div
          className={`statCard ${hoveredStat === 'quizzes' ? 'hover' : ''}`}
          onMouseEnter={() => setHoveredStat('quizzes')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="statHeader">
            <div className="statIcon">
              <Brain size={24} color="#006400" />
            </div>
            <div className="statTitle">Quizzes Completed</div>
          </div>
          <div className="statValue">{progressData.overall.completedQuizzes}</div>
          <div className="statChange">
            <TrendingUp size={16} color="#388E3C" />
            <span style={{ color: '#388E3C' }}>+3 this week</span>
          </div>
        </div>

        {/* Average Score */}
        <div
          className={`statCard ${hoveredStat === 'average' ? 'hover' : ''}`}
          onMouseEnter={() => setHoveredStat('average')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="statHeader">
            <div className="statIcon">
              <Target size={24} color="#2196F3" />
            </div>
            <div className="statTitle">Average Score</div>
          </div>
          <div className="statValue">{progressData.overall.averageScore}%</div>
          <div className="statChange">
            <TrendingUp size={16} color="#388E3C" />
            <span style={{ color: '#388E3C' }}>+2% from last month</span>
          </div>
        </div>

        {/* Study Time */}
        <div
          className={`statCard ${hoveredStat === 'study' ? 'hover' : ''}`}
          onMouseEnter={() => setHoveredStat('study')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="statHeader">
            <div className="statIcon">
              <Clock size={24} color="#FF9800" />
            </div>
            <div className="statTitle">Study Time</div>
          </div>
          <div className="statValue">{progressData.overall.totalStudyTime}h</div>
          <div className="statChange">
            <TrendingUp size={16} color="#388E3C" />
            <span style={{ color: '#388E3C' }}>+5h this week</span>
          </div>
        </div>

        {/* Streak */}
        <div
          className={`statCard ${hoveredStat === 'activity' ? 'hover' : ''}`}
          onMouseEnter={() => setHoveredStat('activity')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="statHeader">
            <div className="statIcon">
              <Flame size={24} color="#F44336" />
            </div>
            <div className="statTitle">Current Streak</div>
          </div>
          <div className="statValue">{progressData.overall.streak} days</div>
          <div className="statChange">
            <TrendingUp size={16} color="#388E3C" />
            <span style={{ color: '#388E3C' }}>Keep it up!</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mainGrid">
        <div className="chartContainer">
          <h2 className="chartTitle">
            <BarChart3 size={28} />
            Quiz Scores Over Time
          </h2>

          {/* Recharts Line Chart */}
          <div className="realChart" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4CAF50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Progress */}
          <div className="progressSection">
            {Object.entries(progressData.subjects).map(([subject, data]) => (
              <div className="progressItem" key={subject}>
                <div className="progressHeader">
                  <span className="progressLabel">{subject.charAt(0).toUpperCase() + subject.slice(1)} Progress</span>
                  <span className="progressValue">{data.progress}%</span>
                </div>
                <div className="progressBar">
                  <div
                    className="progressFill"
                    style={{
                      width: `${data.progress}%`,
                      backgroundColor: getProgressColor(data.progress),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Recent Activity */}
        <div className="chartContainer activityFeed">
          <h2 className="chartTitle">
            <Activity size={28} />
            Recent Activity
          </h2>

          {progressData.recentActivity.map((item, index) => (
            <div key={index} className="activityItem">
              <div className="activityIcon">{getActivityIcon(item.type)}</div>
              <div className="activityContent">
                <div className="activityText">{item.description}</div>
                <div className="activityTime">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="achievementsSection">
        {progressData.achievements.map((ach, idx) => (
          <div key={idx} className="achievementCard">
            <div className="achievementHeader">
              <Award size={28} color="#FFD700" />
              <div className="achievementTitle">{ach.title}</div>
            </div>
            <p style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>{ach.description}</p>
            <div className="barChart">
              {ach.progress.map((p, i) => (
                <div key={i} className="bar" style={{ height: `${p}%`, backgroundColor: '#006400' }}>
                  {p}%
                  <div className="barLabel">{['Jan', 'Feb', 'Mar', 'Apr'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProgress;
