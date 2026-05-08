import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/portfolio' },
    { name: 'Reach Me', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          GOUDA<span className="font-graffiti">VISUALS</span>
        </Link>

        <div className="nav-desktop">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.name}
            </Link>
          ))}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-icon">
            <FaInstagram size={20} />
          </a>
        </div>

        <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile-menu glass"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
              className="nav-mobile-link"
            >
              {link.name}
            </Link>
          ))}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-mobile-link">
            Instagram
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
