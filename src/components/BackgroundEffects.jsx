import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './BackgroundEffects.css';

const BackgroundEffects = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const y = useTransform(smoothProgress, [0, 1], [0, -500]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  const leakColor = useTransform(smoothProgress, [0, 0.5, 1], ["#ff8c00", "#ff3e3e", "#8b0000"]);

  return (
    <div className="bg-effects-container">
      {/* Film Grain Overlay */}
      <div className="grain-overlay"></div>
      
      {/* Scanlines Overlay */}
      <div className="scanlines"></div>

      {/* Cinematic Light Leaks */}
      <motion.div 
        className="light-leak leak-1"
        style={{ 
          y: useTransform(smoothProgress, [0, 1], [-100, 400]),
          background: `radial-gradient(circle, ${leakColor} 0%, transparent 70%)`
        }}
      ></motion.div>
      <motion.div 
        className="light-leak leak-2"
        style={{ 
          y: useTransform(smoothProgress, [0, 1], [200, -300]),
          background: `radial-gradient(circle, ${leakColor} 0%, transparent 70%)`
        }}
      ></motion.div>
      <motion.div 
        className="floating-element splatter-1"
        style={{ y }}
      ></motion.div>
      <motion.div 
        className="floating-element sticker-1"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
      >
        <span className="font-graffiti">RAW</span>
      </motion.div>
      <motion.div 
        className="floating-element splatter-2"
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, 600]) }}
      ></motion.div>
      
      {/* Background Text Marquee (Fast Shutter Reel Vibe) */}
      <div className="bg-marquee">
        <div className="marquee-inner">
          <span>CINEMATIC • URBAN • RAW • 4K • DIRECTORS CUT • </span>
          <span>CINEMATIC • URBAN • RAW • 4K • DIRECTORS CUT • </span>
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffects;
