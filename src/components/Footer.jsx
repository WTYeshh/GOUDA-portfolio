import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-pill glass">
        <div className="footer-left">
          <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
            GOUDA<span className="font-graffiti">VISUALS</span>
          </Link>
          <span className="footer-tagline">DIRECTOR • EDITOR • VISIONARY</span>
        </div>
        
        <div className="footer-right">
          <div className="footer-nav">
            <Link to="/portfolio" onClick={() => window.scrollTo(0, 0)}>WORK</Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>REACH ME</Link>
          </div>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <Link to="/login" className="admin-pill">ADMIN</Link>
        </div>
      </div>
      <div className="footer-location-row">
        <span className="location-dot"></span>
        <p className="footer-location">BASED IN BANGALORE • AVAILABLE WORLDWIDE</p>
      </div>
      <p className="copyright-text">&copy; {new Date().getFullYear()} GOUDA VISUALS</p>
    </footer>
  );
};

export default Footer;
