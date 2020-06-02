import { generate as generateId } from 'shortid';

import { CoursePart } from './../types';

const courses: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    id: generateId(),
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    id: generateId(),
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    id: generateId(),
  },
  {
    name: 'Deep web',
    exerciseCount: 23,
    description: 'Why does the confusion with dark web happens frequently?',
    id: generateId(),
  },
];

export default courses;
