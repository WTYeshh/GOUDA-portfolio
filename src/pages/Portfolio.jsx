import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VideoCard from '../components/VideoCard';
import './Portfolio.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Commercial', 'Music Video', 'Event', 'Short Film'];

  const videos = [
    {
      id: 1,
      title: 'City Pulse',
      category: 'Commercial',
      thumbnail: 'https://images.unsplash.com/photo-1492691523567-6170c8185b30?q=80&w=2070&auto=format&fit=crop',
      url: 'https://vjs.zencdn.net/v/oceans.mp4', // Demo video
      description: 'A high-energy commercial capturing the rhythm of the city.',
      aspectRatio: 'horizontal'
    },
    {
      id: 4,
      title: 'Cinematic Test (YouTube)',
      category: 'Short Film',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
      url: 'https://www.youtube.com/watch?v=QUx1anKHYuI',
      description: 'Testing the VideoCard with a YouTube source.',
      aspectRatio: 'horizontal'
    },
    {
      id: 5,
      title: 'Urban Reel',
      category: 'Reel',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
      url: 'https://www.youtube.com/shorts/QUx1anKHYuI', // Using shorts link as example
      description: 'A vertical reel for social media.',
      aspectRatio: 'vertical'
    },
    {
      id: 2,
      title: 'Midnight Melodies',
      category: 'Music Video',
      thumbnail: 'https://images.unsplash.com/photo-1514525253361-bee8d488f4d4?q=80&w=2070&auto=format&fit=crop',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      description: 'Cinematic visuals for an upcoming indie artist.'
    },
    {
      id: 3,
      title: 'Golden Hour Wedding',
      category: 'Event',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
      url: 'https://vjs.zencdn.net/v/oceans.mp4',
      description: 'Capturing the magic of a sunset wedding ceremony.'
    },
    // Add more dummy videos as needed
  ];

  const filteredVideos = filter === 'All' 
    ? videos 
    : videos.filter(v => v.category === filter);

  return (
    <div className="portfolio-page container">
      <header className="portfolio-header">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Work
        </motion.h1>
        
        <div className="filter-bar">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        className="portfolio-grid"
        layout
      >
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </motion.div>
    </div>
  );
};

export default Portfolio;
