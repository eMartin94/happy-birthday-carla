import { useState, useEffect } from 'react';
import HappyBirthday from './HappyBirthday';
import { FaArrowCircleDown, FaHeart } from 'react-icons/fa';
import AudioPlayer from './AudioPlayer';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const year = new Date().getFullYear();

  const scrollToMp3Section = () => {
    const mp3Section = document.getElementById('mp3');
    if (mp3Section) {
      window.scrollTo({
        top: mp3Section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const currentDate = new Date();
      const birthday = '-09-25T00:00:00';
      const targetDate = new Date(`${currentDate.getFullYear()}${birthday}`);
      const oneDay = 1000 * 60 * 60 * 24;
      const timeRemaining = targetDate - currentDate;
      const days = Math.floor(timeRemaining / oneDay);
      const hours = Math.floor((timeRemaining % oneDay) / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      const isCurrentDayBirthday =
        targetDate.getDate() === currentDate.getDate() &&
        targetDate.getMonth() === currentDate.getMonth();

      const isBeforeDayBirthday =
        targetDate.getDate() >= currentDate.getDate() &&
        targetDate.getMonth() >= currentDate.getMonth();

      const isAfterDayBirthday =
        targetDate.getDate() <= currentDate.getDate() &&
        targetDate.getMonth() <= currentDate.getMonth();

      if (isCurrentDayBirthday) {
        setShowBirthdayMessage(true);
      } else if (isBeforeDayBirthday) {
        setShowBirthdayMessage(false);
        setCountdown({ days, hours, minutes, seconds });
      } else if (isAfterDayBirthday) {
        setShowBirthdayMessage(false);
        const nextYearTargetDate = new Date(
          `${currentDate.getFullYear() + 1}${birthday}`
        );
        const nextYearTimeRemaining = nextYearTargetDate - currentDate;
        const nextYearDays = Math.floor(nextYearTimeRemaining / oneDay);
        const nextYearHours = Math.floor(
          (nextYearTimeRemaining % oneDay) / (1000 * 60 * 60)
        );
        const nextYearMinutes = Math.floor(
          (nextYearTimeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const nextYearSeconds = Math.floor(
          (nextYearTimeRemaining % (1000 * 60)) / 1000
        );
        setCountdown({
          days: nextYearDays,
          hours: nextYearHours,
          minutes: nextYearMinutes,
          seconds: nextYearSeconds,
        });
      } else {
        setShowBirthdayMessage(false);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
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
            <div className='absolute bottom-4 w-full flex justify-center items-center'>
              <FaArrowCircleDown
                className='text-white text-5xl animate-bounce hover:animate-none  cursor-pointer transition-all duration-300 ease-linear drop-shadow-md'
                onClick={scrollToMp3Section}
              />
            </div>
          </div>
          <div className='w-full min-h-screen' id='mp3'>
            <div className='min-h-screen flex items-center justify-center'>
              <AudioPlayer />
            </div>
          </div>
          <footer className='w-full flex flex-col justify-center items-center gap-4 py-4 absolute bottom-0 z-50'>
            <p className='font-Unbounded flex gap-2 text-sm'>
              Made with <FaHeart className='text-red-500' /> by{' '}
              <a
                href='https://github.com/emartin94'
                target='_blank'
                rel='noreferrer'
                className='font-bold transition-all duration-300 ease-linear'
              >
                eMartin
              </a>
            </p>
            <p className='font-Unbounded text-sm'>© {year}</p>
          </footer>
        </section>
      ) : (
        <section className='w-full h-screen flex flex-col justify-center gap-8 items-center'>
          <p className='text-lg md:text-2xl lg:text-4xl font-Sniglet text-tertiary'>
            Quedan:
          </p>
          <div className='grid grid-cols-4 gap-2 md:gap-4 p-4'>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-Sniglet text-tertiary'>
                {countdown.days}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-Sniglet text-tertiary'>
                Días
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-Sniglet text-tertiary'>
                {countdown.hours}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-Sniglet text-tertiary'>
                Horas
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-Sniglet text-tertiary'>
                {countdown.minutes}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-Sniglet text-tertiary'>
                Minutos
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 bg-transparent px-4 py-8 border-t-4 lg:border-t-8 border-secondary rounded shadow-lg'>
              <div className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-Sniglet text-tertiary'>
                {countdown.seconds}
              </div>
              <div className='text-xs md:text-base lg:text-2xl lowercase font-Sniglet text-tertiary'>
                Segundos
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CountdownTimer;
