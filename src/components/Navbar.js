import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.jpg" alt="Logo" className="logo-img" />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        
      </ul>

      <div className="login">
        <Link to="/auth"><button className="login-btn">Login</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
