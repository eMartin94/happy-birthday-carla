import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
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
  );
};

export default Footer;
