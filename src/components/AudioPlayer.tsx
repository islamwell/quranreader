import React, { useRef, useEffect, useState } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  onEnded?: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onEnded, isPlaying, onPlayPause }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsLoading(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      setCurrentTime(0);
      setDuration(0);
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsLoading(false);
        });
      }
    }
  }, [audioUrl, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onCanPlay={handleCanPlay}
        onLoadStart={() => setIsLoading(true)}
      />
      <button className="play-pause-btn" onClick={onPlayPause} disabled={isLoading}>
        {isLoading ? (
          <span className="loading-spinner">⏳</span>
        ) : isPlaying ? (
          <span>⏸️</span>
        ) : (
          <span>▶️</span>
        )}
      </button>
      <div className="time-display">{formatTime(currentTime)}</div>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="seek-slider"
      />
      <div className="time-display">{formatTime(duration)}</div>
    </div>
  );
};

export default AudioPlayer;
