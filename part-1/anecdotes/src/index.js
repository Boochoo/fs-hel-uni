import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Utils
const mostVoted = (allVoted) => {
  const votes = Object.values(allVoted);
  const getMax = Math.max(...votes);

  return {
    maxVotes: getMax,
    maxAncedote: anecdotes[votes.indexOf(getMax)],
  };
};

const randomize = (arr) => Math.floor(Math.random() * arr.length);

const initialVotes = (anecdotes) =>
  Object.keys(anecdotes).reduce((acc, curr) => {
    acc[curr] = 0;

    return acc;
  }, {});

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes(anecdotes));
  const index = anecdotes.indexOf(anecdotes[selected]);

  const handleVotes = () => {
    const copy = { ...votes };

    copy[index] += 1;

    setVotes(copy);
  };

  const initView =
    JSON.stringify(votes) === JSON.stringify(initialVotes(anecdotes));

  const randomAnecdote = () => setSelected(randomize(anecdotes));
  const { maxVotes, maxAncedote } = mostVoted(votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[index]} votes</p>

      <Button text='vote' handler={handleVotes} />
      <Button text='next anecdote' handler={randomAnecdote} />
      {!initView ? (
        <>
          <h2>Anecdote with most votes</h2>
          <p>{maxAncedote}</p>
          <p>has {maxVotes} votes</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
