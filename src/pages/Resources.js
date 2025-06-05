import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

const Resources = () => {
  useEffect(() => {
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
    <div className="resources-page">
      {/* Upper Section */}
      <div className="resource-header">
        <div className="header-content">
          <h1>Explore Resources</h1>
        </div>
      </div>

      {/* Lower Section: Sports Categories */}
      <div className="resource-categories">
        <div className="category-card">
          <Link to="/athletics">
            <img src="athletics.jpg" alt="Athletics" />
            <p className="p">Athletics</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/cycling">
            <img src="cycling.jpg" alt="Cycling" />
            <p className="p">Cycling</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/wrestling">
            <img src="wrestling.jpg" alt="Wrestling" />
            <p className="p">Wrestling</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/weightlifting">
            <img src="weightlifting.jpg" alt="Weightlifting" />
            <p className="p">Weightlifting</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/cricket">
            <img src="cricket.jpg" alt="Cricket" />
            <p className="p">Cricket</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/football">
            <img src="football.jpg" alt="Football/Soccer" />
            <p className="p">Football</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/boxing">
            <img src="boxing.jpeg" alt="Boxing" />
            <p className="p">Boxing</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;
