import React from 'react';

const totalSum = (total, p) => {
  total += p.exercises;
  return total;
};

const Total = ({ parts }) => (
  <strong>Total of {parts.reduce(totalSum, 0)} exercises</strong>
);

const randomId = () => Math.random().toString(32);

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.id} name={part.name} exercise={part.exercises} />
  ));

const Course = ({ courses }) => (
  <>
    {courses.map((course) => (
      <div key={randomId()}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
);

export default Course;
