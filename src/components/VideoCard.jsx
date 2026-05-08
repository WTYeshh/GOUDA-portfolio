import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalPlayer from './UniversalPlayer';
import { Maximize2, X, Play, Pause, SkipBack, SkipForward, Airplay } from 'lucide-react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isVertical = video.aspectRatio === 'vertical' || video.category?.toLowerCase() === 'reel';

  return (
    <>
      <motion.div 
        className={`video-card ios-widget-card ${isVertical ? 'vertical' : 'horizontal'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="widget-viewport">
          <img src={video.thumbnail} alt={video.title} className="widget-img" />
          <div className="widget-overlay">
            <Play fill="white" size={48} className="widget-play-icon" />
          </div>
        </div>
        
        <div className="widget-controls">
          <div className="widget-header">
            <span className="widget-title">{video.title}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
            <motion.div 
              className={`modal-player-container ${isVertical ? 'modal-vertical' : 'modal-horizontal'}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
              
              <UniversalPlayer 
                url={video.url} 
                title={video.title} 
                playing={true} 
                isVertical={isVertical} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCard;
