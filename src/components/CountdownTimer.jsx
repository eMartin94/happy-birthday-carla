import { useState, useEffect } from 'react';
import HappyBirthday from './HappyBirthday';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

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
    <div className='w-full h-screen text-center text-2xl relative flex justify-center items-center'>
      {showBirthdayMessage ? (
        <HappyBirthday />
      ) : (
        <div className='grid grid-cols-4 gap-4'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-5xl md:text-7xl font-bold'>
              {countdown.days}
            </div>
            <div className='text-sm md:text-base lowercase'>Días</div>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-5xl md:text-7xl font-bold'>
              {countdown.hours}
            </div>
            <div className='text-sm md:text-base lowercase'>Horas</div>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-5xl md:text-7xl font-bold'>
              {countdown.minutes}
            </div>
            <div className='text-sm md:text-base lowercase'>Minutos</div>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-5xl md:text-7xl font-bold'>
              {countdown.seconds}
            </div>
            <div className='text-sm md:text-base lowercase'>Segundos</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
