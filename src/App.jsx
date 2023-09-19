import CountdownTimer from './components/CountdownTimer';

function App() {
  return (
    <div className='bg-gradient-hb scroll-smooth flex flex-col '>
      <h1 className='opacity-0 absolute'>Happy Birthday</h1>
      <CountdownTimer />
    </div>
  );
}

export default App;
