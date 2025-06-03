import React from 'react';
import './DashboardP.css';

const DashboardP = () => {
  return (
    <div className="dashboardp-container">
      <h1>Welcome Back, Player!</h1>
      <p className="subtitle">Your learning journey continues here</p>

      <section className="overview">
        <h2>🏠 Dashboard Overview</h2>
        <p className="overview-text">
          Track your progress, take on new challenges, and unlock achievements 
          as you advance through your anti-doping education journey.
        </p>
      </section>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Quizzes Completed</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Badges Earned</h3>
          <p>8</p>
        </div>
        <div className="card">
          <h3>Progress Score</h3>
          <p>85%</p>
        </div>
        <div className="card">
          <h3>Certificates Earned</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardP;
