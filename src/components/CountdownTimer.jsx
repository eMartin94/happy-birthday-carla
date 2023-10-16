import { useState, useEffect } from 'react';
import HappyBirthday from './HappyBirthday';
import { FaArrowCircleDown } from 'react-icons/fa';
import AudioPlayer from './AudioPlayer';
import Footer from './Footer';
import AnimationMail from './AnimationMail';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [showDown, setShowDown] = useState(false);
  const oneSecond = 1000;

  const scrollToMp3Section = () => {
    const mp3Section = document.getElementById('mp3');
    if (mp3Section) {
      window.scrollTo({
        top: mp3Section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleShowDown = () => {
    setTimeout(() => {
      setShowDown(!showDown);
    }, 1000);
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const currentDate = new Date();
      const birthday = '-09-25T00:00:00';
      const targetDate = new Date(`${currentDate.getFullYear()}${birthday}`);

      const timeRemaining = targetDate - currentDate;

      if (timeRemaining < 0) {
        const nextYearTargetDate = new Date(
          `${currentDate.getFullYear() + 1}${birthday}`
        );
        const nextYearTimeRemaining = nextYearTargetDate - currentDate;
        setCountdown(calculateTimeUnits(nextYearTimeRemaining));
      } else {
        setCountdown(calculateTimeUnits(timeRemaining));
      }

      const isCurrentDayBirthday =
        targetDate.getDate() === currentDate.getDate() &&
        targetDate.getMonth() === currentDate.getMonth();
      setShowBirthdayMessage(isCurrentDayBirthday);
    };

    const calculateTimeUnits = (timeRemaining) => {
      const oneDay = 1000 * 60 * 60 * 24;
      const oneHour = 1000 * 60 * 60;
      const oneMinute = 1000 * 60;

      const days = Math.floor(timeRemaining / oneDay);
      const hours = Math.floor((timeRemaining % oneDay) / oneHour);
      const minutes = Math.floor((timeRemaining % oneHour) / oneMinute);
      const seconds = Math.floor((timeRemaining % oneMinute) / oneSecond);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    };

    const countdownInterval = setInterval(calculateCountdown, 1000);
    calculateCountdown();
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className='w-full min-h-screen text-center text-2xl relative flex flex-col justify-center items-center'>
      {showBirthdayMessage ? (
        <section className='relative w-full min-h-screen'>
          <div className='bg-serpentine w-full min-h-screen relative bg-no-repeat bg-contain bg-center bg-origin-content'>
            <HappyBirthday />

            <div className='absolute bottom-[18%] sm:bottom-4 w-full flex flex-col justify-center items-center z-50'>
              <AnimationMail
                setShowDown={handleShowDown}
                showDown={!showDown}
              />
              {showDown && (
                <FaArrowCircleDown
                  className='text-white text-5xl animate-bounce hover:animate-none  cursor-pointer transition-all duration-300 ease-linear drop-shadow-md z-50 absolute'
                  onClick={scrollToMp3Section}
                />
              )}
            </div>
          </div>
          <div className='w-full min-h-screen' id='mp3'>
            <div className='min-h-screen flex items-center justify-center'>
              <AudioPlayer />
            </div>
          </div>
          <Footer />
        </section>
      ) : (
        <section className='w-full h-screen flex flex-col justify-center gap-8 items-center relative'>
          <p className='text-lg md:text-2xl lg:text-4xl font-sniglet text-tertiary'>
            Quedan:
          </p>
          <div className='grid grid-cols-4 gap-2 md:gap-4 p-4'>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sniglet text-tertiary'>
                {countdown.days}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-sniglet text-tertiary'>
                Días
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sniglet text-tertiary'>
                {countdown.hours}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-sniglet text-tertiary'>
                Horas
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sniglet text-tertiary'>
                {countdown.minutes}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-sniglet text-tertiary'>
                Minutos
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-sniglet text-tertiary'>
                {countdown.seconds}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-sniglet text-tertiary'>
                Segundos
              </div>
            </div>
          </div>
          <Footer />
        </section>
      )}
    </div>
  );
};

export default CountdownTimer;
