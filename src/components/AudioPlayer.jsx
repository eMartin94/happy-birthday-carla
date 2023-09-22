import { useEffect, useRef, useState } from 'react';
import { songs } from '../constants/data';
import ProgressBar from './ProgressBar';
import AudioControls from './AudioControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const audioRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });

    animation.to(element, {
      scale: 1,
      duration: 1.5,
      ease: 'power1.out',
    });
  }, []);

  useEffect(() => {
    const loadAndPlayAudio = async () => {
      try {
        await audioRef.current.load();
        audioRef.current.currentTime = pausedTime;
        if (isPlaying) {
          audioRef.current.play();
        }
      } catch (error) {
        console.error('Error al cargar o reproducir el audio:', error);
      }
    };

    loadAndPlayAudio();
  }, [currentSongIndex, isPlaying, pausedTime]);

  const playPauseToggle = () => {
    if (isPlaying) {
      setPausedTime(audioRef.current.currentTime);
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const playNextSong = () => {
    setPausedTime(0);
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setCurrentTime(0);
  };

  const playPreviousSong = () => {
    setPausedTime(0);
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleSongEnded = () => {
    setCurrentTime(0);
    setPausedTime(0);
    playNextSong();
    setIsPlaying(true);
  };

  return (
    <div className='w-full sm:w-[420px] h-screen sm:h-[500px] px-8 py-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg z-40 transition-all duration-300 ease-linear'>
      <div
        ref={elementRef}
        style={{ transform: 'scale(0.75)' }}
        className='w-full h-full flex flex-col justify-around sm:justify-end items-center relative transition-all duration-300 ease-linear'
      >
        <img
          src={songs[currentSongIndex].cover}
          alt='Portada del álbum'
          className='w-72 h-72 object-cover rounded absolute top-[15%] sm:-top-14 shadow-custom transition-all duration-300 ease-linear'
        />

        <div className='sm:hidden'></div>
        {/* <AnimationMail /> */}
        <div className='w-full flex flex-col mt-[45%] sm:mt-0 mb-2'>
          <h2 className='text-lg font-semibold mt-4 mb-2 font-unbounded'>
            {songs[currentSongIndex].title}
          </h2>
          <p className='text-sm text-gray-500 font-unbounded mb-4'>
            {songs[currentSongIndex].artist}
          </p>
          <audio
            ref={audioRef}
            src={songs[currentSongIndex].audio}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleSongEnded}
          ></audio>
          <AudioControls
            isPlaying={isPlaying}
            onPlayPause={playPauseToggle}
            onPrevious={playPreviousSong}
            onNext={playNextSong}
            onStop={stopAudio}
          />
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            isDragging={isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
