import { useState } from 'react';

// const Display = ({ counter }) => <div>{counter}</div>;
// const Button = ({ onChange, text }) => <button onClick={onChange}>{text}</button>;

// const App = () => {
//   const [ counter, setCounter ] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button text='plus' onChange={increaseByOne}></Button>
//       <Button text='zero' onChange={setToZero}></Button>
//       <Button text='minus' onChange={decreaseByOne}></Button>
//     </div>
//   )
// }

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>the app is used by pressing buttons</div>
    )
  }

  return (
    <div>
      button press history: {allClicks.join(', ')}
    </div>
  )
}

const Button = ({ onChange, text }) => <button onClick={onChange}>{text}</button>;

const App = () => {
  const [ left, setLeft ] = useState(0);
  const [ right, setRight ] = useState(0);
  const [ allClicks, setAll ] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
  }

  return (
    <div>
      {left}
      <Button onChange={handleLeftClick} text='left' />
      <Button onChange={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App