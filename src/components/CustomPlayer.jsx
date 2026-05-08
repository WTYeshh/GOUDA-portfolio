import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Critical for plugin registration
if (typeof window !== 'undefined') {
  window.videojs = videojs;
}
import 'videojs-youtube';
import './CustomPlayer.css';

const CustomPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isYoutube, setIsYoutube] = useState(false);

  useEffect(() => {
    // Check if it's a YouTube source
    const youtubeSource = options.sources?.find(s => s.type === 'video/youtube');
    setIsYoutube(!!youtubeSource);

    // Dispose existing player if source type changes drastically
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Standard Video.js initialization
    const player = (playerRef.current = videojs(videoElement, options, () => {
      console.log('Video.js Ready');
      if (options.autoplay) {
        player.play().catch(() => {
          // Autoplay might be blocked, handled gracefully
        });
      }
      onReady && onReady(player);
    }));

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div className={`video-player-container ${isYoutube ? 'youtube-mode' : ''}`}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-cinematic"
          playsInline
        />
      </div>
      {/* We keep the shield only for non-youtube to avoid blocking iframe interaction */}
      {!isYoutube && <div className="video-shield"></div>}
    </div>
  );
};

export default CustomPlayer;
