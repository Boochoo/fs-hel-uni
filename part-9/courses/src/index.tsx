import React from 'react';
import ReactDOM from 'react-dom';

import { HeaderProps, CoursePart, ContentProps } from './types';
import courses from './utils/data';
import assertNever from './utils/errorHandler';

const Header: React.FC<HeaderProps> = ({ courseName }) => <h1>{courseName}</h1>;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  // const { name, exerciseCount } = part;
  const renderParts = (param: CoursePart) => {
    switch (param.name) {
      case 'Fundamentals':
        return (
          <div>
            <p>{param.description}</p>
          </div>
        );

      case 'Using props to pass data':
        return <p>groupProjectCount: {param.groupProjectCount}</p>;

      case 'Deeper type usage':
        const { description, exerciseSubmissionLink } = param;
        return (
          <>
            <p>{description}</p>
            <a href={exerciseSubmissionLink}>{exerciseSubmissionLink}</a>
          </>
        );

      case 'Deep web':
        return (
          <div>
            <p>{param.description}</p>
          </div>
        );
      default:
        return assertNever(param);
    }
  };

  return (
    <div>
      <h3>{part.name}</h3>
      <p>exerciseCount: {part.exerciseCount}</p>

      {renderParts(part)}
    </div>
  );
};

const Content: React.FC<ContentProps> = ({ courses }) => (
  <div>
    {courses.map((part) => {
      return (
        <>
          <Part key={part.id} part={part} />
        </>
      );
    })}
  </div>
);

const Total: React.FC<ContentProps> = ({ courses }) => (
  <div>
    <h2>
      Number of exercises{' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </h2>
  </div>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = courses;

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
