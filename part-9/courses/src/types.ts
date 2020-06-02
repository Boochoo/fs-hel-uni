export interface HeaderProps {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  id: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartOne extends CoursePartBaseDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDescription {
  name: 'Deep web';
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export interface ContentProps {
  courses: Array<CoursePart>;
}
