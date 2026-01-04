import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Feedback = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
    </>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const GOOD_SCORE = 1;
  const NEUTRAL_SCORE = 0;
  const BAD_SCORE = -1;

  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  } 
  
  const average = (good * GOOD_SCORE + neutral * NEUTRAL_SCORE + bad * BAD_SCORE) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  function handleGoodClick() {
    setGood(g => g + 1);
  }

  function handleNeutralClick() {
    setNeutral(n => n + 1);
  }

  function handleBadClick() {
    setBad(b => b + 1);
  }

  return (
    <div>
      <Feedback 
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick} 
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
