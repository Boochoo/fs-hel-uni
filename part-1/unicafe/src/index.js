import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const TextElement = ({ text }) => <h1>{text}</h1>;
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      <strong>{value}</strong>
    </td>
  </tr>
);
const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allValues = [good, neutral, bad];
  const sum = (n, next) => n + next;
  const all = allValues.reduce(sum, 0);
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const handler = (stateHandler, state) => stateHandler(state + 1);

  const handleBad = () => handler(setBad, bad);
  const handleNeutral = () => handler(setNeutral, neutral);
  const handleGood = () => handler(setGood, good);

  return (
    <div>
      <TextElement text='Give feedback' />
      <Button text='bad' handler={handleBad} />
      <Button text='neutral' handler={handleNeutral} />
      <Button text='good' handler={handleGood} />

      {all === 0 ? (
        <p>No feedbacks given</p>
      ) : (
        <>
          <TextElement text='Stats' />
          <table>
            <tbody>
              <Statistic text='good' value={good} />
              <Statistic text='neutral' value={neutral} />
              <Statistic text='bad' value={bad} />
              <Statistic text='all' value={all} />
              <Statistic text='average' value={average} />
              <Statistic text='positive' value={`${positive}%`} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
