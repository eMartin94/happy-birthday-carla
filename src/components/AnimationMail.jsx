import { useState } from 'react';

const AnimationMail = ({ setShowDown, showDown }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
    setShowDown(!showDown);
  };
  return (
    <div className=' flex justify-center items-center w-full'>
      <div
        id='mail'
        className={`cursor-pointer ${show ? 'mail--show' : 'mail--hide'}`}
        onClick={handleShow}
      >
        <div className='mail__letter'>
          <div className='mail__shadow'></div>
          <div className='mail__background'></div>
          <div className='mail__body'>
            <div className='mail__text'>
              <div className='mail__headline'>
                <div className='mail__close' onClick={handleShow}>
                  <svg viewBox='0 0 24 24'>
                    <path d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'></path>
                  </svg>
                </div>
              </div>

              <div className='font-dancing-script p-8 rounded-sm shadow-md bg-[rgb(255,254,244)] text-gray-700'>
                <h1 className='text-xl font-bold mb-4 tracking-wider'>
                  ¡Feliz Cumpleaños, Bonita!
                </h1>
                <p className='text-sm md:text-base'>
                  Hoy es un día especial, un día que merece ser celebrado con
                  alegría y felicidad. Aunque nuestros caminos se hayan
                  separado, quiero que sepas que el afecto y el respeto que
                  siento por ti siguen siendo tan profundos como siempre.
                </p>
                <p className='text-sm md:text-base mt-4'>
                  Los momentos que compartimos juntos fueron maravillosos y
                  siempre estarán grabados en mi corazón. Deseo de todo corazón
                  que este nuevo año de vida te traiga muchas bendiciones,
                  éxitos y momentos felices.
                </p>
                <p className='text-sm md:text-base mt-4'>
                  Que este día esté lleno de sonrisas y alegría. Estoy seguro de
                  que lograrás grandes cosas en el futuro.
                </p>
                <p className='text-sm md:text-base mt-4'>
                  Con cariño,{' '}
                  <span className='text-xl font-semibold'>Martin</span>
                </p>
                <hr />
                <p className='text-xs leading-0 mt-2 text-gray-400'>
                  Pdta: Espero que te guste el playlist. Desliza hacia abajo.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='mt-8'>
          <button
            className='bg-blue-500 text-white border-none outline-none table px-5 py-2 my-0 mx-auto rounded-md cursor-pointer leading-5 text-sm font-medium'
            onClick={handleShow}
          >
            Confirm
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AnimationMail;
