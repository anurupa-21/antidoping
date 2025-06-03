import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';  // IMPORTANT
import { 
  Home, Brain, BookOpen, Award, BarChart3, Trophy, 
  FileText, Newspaper, MessageSquare, Settings, LogOut, Menu, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './PlayerDashboard.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', link: '/player-dashboard' },
    { icon: Brain, label: 'Quizzes / Challenges', link: '/quizzes' },
    { icon: BookOpen, label: 'Learning Resources', link: '/resources' },
    { icon: Award, label: 'Achievements / Badges', link: '/achievements' },
    { icon: BarChart3, label: 'My Progress', link: '/progress' },
    { icon: Trophy, label: 'Leaderboard', link: '/leaderboard' },
    { icon: FileText, label: 'Certificates', link: '/certificates' },
    { icon: Newspaper, label: 'News & Updates', link: '/news' },
    { icon: MessageSquare, label: 'Community / Forum', link: '/community' },
    { icon: Settings, label: 'Settings / Profile', link: '/settings' },
    { icon: LogOut, label: 'Logout', link: '/logout' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} className="sidebar-item" title={item.label}>
            <item.icon size={20} className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const PlayerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Hide navbar on mount
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.display = 'none';
    }
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`main-content ${sidebarOpen ? 'main-content-shifted' : 'main-content-full'}`}>
        {/* Outlet is where child routes render */}
        <Outlet />
      </main>
    </div>
  );
};

export default PlayerDashboard;
