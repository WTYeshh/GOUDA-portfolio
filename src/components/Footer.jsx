import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-pill glass">
        <div className="footer-left">
          <Link to="/" className="logo">
            GOUDA<span className="font-graffiti">VISUALS</span>
          </Link>
          <span className="footer-tagline">DIRECTOR • EDITOR • VISIONARY</span>
        </div>
        
        <div className="footer-right">
          <div className="footer-nav">
            <Link to="/portfolio">WORK</Link>
            <Link to="/contact">REACH ME</Link>
          </div>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <Link to="/login" className="admin-pill">ADMIN</Link>
        </div>
      </div>
      <p className="copyright-text">&copy; {new Date().getFullYear()} GOUDA VISUALS</p>
    </footer>
  );
};

export default Footer;
