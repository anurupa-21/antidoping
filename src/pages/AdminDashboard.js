import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';


import {
  BarChart3, Users, Brain, BookOpen, Award, TrendingUp, Trophy,
  FileText, Megaphone, MessageSquare, Settings, Activity,
  Database, Shield, Menu, X,
  Contact2Icon
} from 'lucide-react';
import './AdminDashboard.css';

const Sidebar = ({ isOpen, toggleSidebar, activeSection, setActiveSection }) => {
  const menuItems = [
    {
      icon: BarChart3,
      label: 'Dashboard / Overview',
      key: 'dashboard',
      description: 'Summary metrics and system status'
    },
    { icon: Users, label: 'User Management', key: 'users', description: 'Manage players, coaches, and accounts', link: '/userm' },
    { icon: Brain, label: 'Quiz & Challenge Management', key: 'quizzes', description: 'Create and manage learning content',link: '/quizza' },
    { icon: BookOpen, label: 'Learning Resource Management', key: 'resources', description: 'Upload and organize educational materials',link: '/lrm' },
    { icon: Award, label: 'Achievements & Badges', key: 'achievements', description: 'Configure rewards and recognition',link: '/achbad' },
    { icon: TrendingUp, label: 'Progress & Analytics', key: 'analytics', description: 'Track learning paths and compliance',link: '/proana' },
    { icon: Trophy, label: 'Leaderboard Settings', key: 'leaderboard', description: 'Manage scoring and rankings',link: '/lset' },
    { icon: FileText, label: 'Certificate Management', key: 'certificates', description: 'Design and issue certificates',link: '/cm' },
    { icon: Megaphone, label: 'Announcements & Notifications', key: 'announcements', description: 'Send platform-wide communications',link: '/an' },
    { icon: MessageSquare, label: 'Forum / Community Moderation', key: 'moderation', description: 'Monitor and moderate discussions' ,link: '/fcm'},
    { icon: Settings, label: 'Platform Settings', key: 'settings', description: 'Customize platform configuration',link: '/ps' },
    { icon: Activity, label: 'Audit Logs', key: 'audit', description: 'Track admin actions and changes',link: '/al' },
    { icon: Database, label: 'Data Export & Reports', key: 'export', description: 'Generate and download reports',link: '/der' },
    { icon: Shield, label: 'Anti-Doping Monitoring', key: 'antidoping', description: 'Track compliance and agreements',link: '/adm' },
    { icon: Contact2Icon, label: 'Help', key: 'help', description: 'Help user',link: '/adm' }
  ];

  return (
    <div className={`admin-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isOpen && <div className="admin-brand"><h2>Admin Panel</h2></div>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isDashboard = item.key === 'dashboard';
          const linkHref = isDashboard ? '#' : `/admin/${item.key}`;
          const isActive = isDashboard && activeSection === item.key;

          return isDashboard ? (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              title={item.description}
            >
              <item.icon size={20} className="sidebar-icon" />
              <div className="sidebar-content">
                <span className="sidebar-label">{item.label}</span>
                {isOpen && <span className="sidebar-description">{item.description}</span>}
              </div>
            </button>
          ) : (
            <Link
  key={item.key}
  to={linkHref}
  className="sidebar-item"
  title={item.description}
>

              <item.icon size={20} className="sidebar-icon" />
              <div className="sidebar-content">
                <span className="sidebar-label">{item.label}</span>
                {isOpen && <span className="sidebar-description">{item.description}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const DashboardContent = ({ section }) => {
  if (section !== 'dashboard') return null;

  return (
    <div className="main-content-area">
      <div className="content-section">
       <h1>📊 Dashboard Overview</h1>

        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Users</h3>
            <span className="metric-value">2,547</span>
            <span className="metric-change">+12% this month</span>
          </div>
          <div className="metric-card">
            <h3>Active Users</h3>
            <span className="metric-value">1,823</span>
            <span className="metric-change">+8% this week</span>
          </div>
          <div className="metric-card">
            <h3>Quiz Completion Rate</h3>
            <span className="metric-value">87%</span>
            <span className="metric-change">+3% this month</span>
          </div>
          <div className="metric-card">
            <h3>System Uptime</h3>
            <span className="metric-value">99.8%</span>
            <span className="metric-change">Excellent</span>
          </div>
        </div>
        <div className="activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">User Anurupa completed Advanced Quiz #3</div>
            <div className="activity-item">New discussion started in Community Forum</div>
            <div className="activity-item">Certificate issued to Sarah Johnson</div>
            <div className="activity-item">Flagged content reported in Forum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
    return () => { if (navbar) navbar.style.display = ''; };
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className={`admin-main-content ${sidebarOpen ? 'content-shifted' : 'content-full'}`}>
       <DashboardContent section={activeSection} />


      </main>
    </div>
  );
};

export default AdminDashboard;
