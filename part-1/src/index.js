import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts
        .map((e) => e.exercises)
        .reduce((a, b) => {
          return a + b;
        }, 0)}
    </p>
  );
};

const randomId = () => Math.random().toString(32);

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={randomId()} name={part.name} exercise={part.exercises} />
  ));
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
