import {
  FaBackward,
  FaForward,
  FaPauseCircle,
  FaPlayCircle,
  // FaStopCircle,
} from 'react-icons/fa';
const AudioControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  // onStop,
}) => {
  return (
    <div className='flex flex-row justify-center items-center mt-4 gap-4'>
      <button
        onClick={onPrevious}
        className='bg-transparent text-yellow-500 font-bold text-3xl hover:drop-shadow-md'
      >
        <FaBackward />
      </button>
      <button
        onClick={onPlayPause}
        className='bg-transparent text-yellow-500 font-bold text-5xl hover:drop-shadow-md'
      >
        {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
      <button
        onClick={onNext}
        className='bg-transparent text-yellow-500 font-bold text-3xl hover:drop-shadow-md'
      >
        <FaForward />
      </button>
      {/* <button
        onClick={onStop}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4'
      >
        <FaStopCircle />
      </button> */}
    </div>
  );
};

export default AudioControls;
