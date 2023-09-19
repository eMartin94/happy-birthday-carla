function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const ProgressBar = ({
  currentTime,
  duration,
  onSeek,
  // isDragging,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div className='flex flex-col mt-4'>
      <input
        type='range'
        min='0'
        max={duration || 0}
        value={currentTime}
        className='w-full accent-yellow-500 outline-none'
        onChange={onSeek}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
      />
      <div className='flex flex-row justify-between text-xs text-gray-500 mt-2 px-4 sm:px-0'>
        <span className='mr-2 text-left'>{formatTime(currentTime)}</span>
        <span className='ml-2'>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
