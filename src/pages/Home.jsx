import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Parallax and Skew effects
  const y1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const sectionSkew = useTransform(smoothProgress, [0, 0.5, 1], [0, 3, 0]);
  const skew = useTransform(smoothProgress, [0, 0.5], [0, 10]);

  const images = [
    '/photo1.png',
    '/photo2.png',
    '/photo3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    const tcTimer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 40); // 24-60fps vibe

    return () => {
      clearInterval(timer);
      clearInterval(tcTimer);
    };
  }, [images.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        
        {/* Camera Viewfinder Overlay */}
        <div className="viewfinder">
          <div className="vf-corner tl"></div>
          <div className="vf-corner tr"></div>
          <div className="vf-corner bl"></div>
          <div className="vf-corner br"></div>
          <div className="vf-top-info">
            <div className="vf-tag">DIRECTOR'S CUT</div>
            <div className="vf-timecode">{timecode}</div>
          </div>
          <div className="vf-info">
            <span>4K 60FPS</span>
            <span>RAW 10-BIT</span>
          </div>
        </div>

        <div className="hero-content container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-subtitle">Visual Storyteller</span>
            <motion.h1 className="hero-title" style={{ skewX: skew }}>
              <span className="text-reveal">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }}
                  style={{ display: "block" }}
                >
                  Capturing Moments
                </motion.span>
              </span>
              <span className="text-reveal">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.01, -0.05, 0.9] }}
                  style={{ display: "block" }}
                >
                  Beyond the <span className="font-graffiti glitch-hover">Lens</span>
                </motion.span>
              </span>
            </motion.h1>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">
                View Showreel <Play size={18} fill="currentColor" />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Book a Shoot <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <motion.section 
        className="featured container"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ skewY: sectionSkew }}
      >
        <div className="section-header">
          <h2 className="section-title">Selected <span className="font-graffiti" style={{ color: '#fff' }}>Works</span></h2>
          <Link to="/portfolio" className="view-all">All Projects <ArrowRight size={16}/></Link>
        </div>
        
        <div className="featured-grid">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="featured-item"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="item-thumbnail glass urban-card">
                <div className="thumbnail-placeholder">Project 0{i}</div>
                <div className="card-glitch-overlay"></div>
              </div>
              <div className="item-info">
                <h3>Urban Narrative 0{i}</h3>
                <p>Commercial / 2024</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive About Section */}
      <section className="about-interactive container">
        <div className="about-grid">
          <div className="about-image-side">
            <div className="photo-booth" onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}>
              {/* Main Image */}
              <motion.img 
                key={currentImage}
                src={images[currentImage]} 
                alt="The Director"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="main-photo"
              />
              {/* Shutter Drag / Ghost Image */}
              <motion.img 
                key={`ghost-${currentImage}`}
                src={images[currentImage]} 
                alt="Ghost"
                initial={{ opacity: 0.5, scale: 1.05, x: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 0, scale: 1.2, x: 30, filter: 'blur(20px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="ghost-photo"
              />
              <div className="photo-booth-label font-graffiti">CLICK ME</div>
              <div className="flash-overlay"></div>
            </div>
            <div className="film-strip">
              {images.map((img, i) => (
                <div key={i} className={`strip-thumb ${currentImage === i ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>
          
          <div className="about-text-side">
            <h2 className="about-title">
              Behind the <br />
              <span className="font-graffiti">Chaos</span>
            </h2>
            <div className="urban-bio">
              <p>I am a visual disruptor. My work isn't just about high-resolution frames; it's about the grit, the energy, and the raw stories that happen in the shadows.</p>
              <p>With a camera in one hand and a vision in the other, I transform urban chaos into cinematic gold. Every click is a statement. Every frame is a rebellion.</p>
            </div>
            <div className="skill-tags">
              <span>#Director</span>
              <span>#Editor</span>
              <span>#StreetVibe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <motion.section 
        className="specialties glass"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="specialties-grid">
            <div className="specialty-item">
              <span className="specialty-number">01</span>
              <h3>Music <br />Videos</h3>
              <p>Visualizing rhythm with high-energy cuts and urban aesthetics.</p>
            </div>
            <div className="specialty-item">
              <span className="specialty-number">02</span>
              <h3>Brand <br />Commercials</h3>
              <p>Elevating brand identity through cinematic storytelling.</p>
            </div>
            <div className="specialty-item">
              <span className="specialty-number">03</span>
              <h3>Event <br />Cinematography</h3>
              <p>Capturing raw emotions and atmosphere in high-definition.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Vision / About Section */}
      <section className="vision-wrapper">
        <div className="film-marquee">
          <div className="film-marquee-inner">
            <span>REC • 4K • 60FPS • 1/120 • F2.8 • ISO 400 • RAW • </span>
            <span>REC • 4K • 60FPS • 1/120 • F2.8 • ISO 400 • RAW • </span>
          </div>
        </div>
        <section className="vision container">
        <div className="vision-content">
          <motion.h2 
            className="vision-title"
            style={{ y: useTransform(smoothProgress, [0.8, 1], [0, -50]) }}
          >
            I don't just shoot videos.
            I capture the <span className="font-graffiti glitch-hover">Soul</span> of the streets.
          </motion.h2>
          <p className="vision-text">
            Based in Bangalore, I specialize in creating visual narratives that stand out. From the gritty urban landscapes to polished commercial sets, my lens is focused on authenticity and impact.
          </p>
          <Link to="/contact" className="btn btn-primary">Start a Project</Link>
        </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
