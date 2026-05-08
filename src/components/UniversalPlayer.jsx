import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, Volume1, SkipBack, SkipForward, Airplay } from 'lucide-react';
import { motion } from 'framer-motion';
import './UniversalPlayer.css';

const UniversalPlayer = ({ url, title = "iPhone", playing: initialPlaying = false, isVertical = false }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(initialPlaying);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  if (!url) return <div className="player-error">No URL provided</div>;

  const handleTogglePlay = (e) => {
    e?.stopPropagation();
    setPlaying(!playing);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const percentage = duration ? (progress / duration) * 100 : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`ios-player-container ${isVertical ? 'is-vertical' : 'is-horizontal'}`} onClick={(e) => e.stopPropagation()}>
      <div className="video-viewport">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          width="100%"
          height="100%"
          className="react-player-native"
          onProgress={(state) => setProgress(state.playedSeconds)}
          onDuration={(d) => setDuration(d)}
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0, 
                modestbranding: 1, 
                rel: 0,
                controls: 0,
                origin: window.location.origin 
              }
            }
          }}
        />
        {/* Simple center play button on top of video when paused */}
        {!playing && (
          <motion.div 
            className="viewport-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleTogglePlay}
          >
            <div className="center-play-icon">
              <Play fill="white" size={48} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="ios-controls-panel">
        <div className="ios-header">
          <span className="ios-device-name">{title}</span>
          <Airplay size={18} className="ios-airplay-icon" />
        </div>

        <div className="ios-seeker-section">
          <div className="ios-slider-container">
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={progress} 
              onChange={handleSeek}
              className="ios-range-input"
            />
            <div className="ios-custom-track">
              <div 
                className="ios-track-fill" 
                style={{ width: `${clampedPercentage}%` }}
              ></div>
              <div 
                className="ios-track-knob"
                style={{ left: `${clampedPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="ios-time-display">
            <span>{formatTime(progress)}</span>
            <span>-{formatTime(Math.max(0, (duration || 0) - progress))}</span>
          </div>
        </div>

        <div className="ios-playback-controls">
          <button className="ios-control-btn secondary">
            <SkipBack fill="white" size={28} />
          </button>
          <button className="ios-control-btn main" onClick={handleTogglePlay}>
            {playing ? <Pause fill="white" size={36} /> : <Play fill="white" size={36} />}
          </button>
          <button className="ios-control-btn secondary">
            <SkipForward fill="white" size={28} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default UniversalPlayer;
