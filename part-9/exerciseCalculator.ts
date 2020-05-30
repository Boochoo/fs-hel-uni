interface calculateValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescription = (rating: number): string => {
  switch (true) {
    case rating === 5:
      return 'Yu rAk';

    case rating > 4 && rating < 5:
      return 'Almost there';

    case rating > 2.5 && rating < 4:
      return 'keep tryin';

    default:
      return 'come on...';
  }
};

const calculate = (dailys: number[], target: number): calculateValues => {
  const ratingScale = 5;
  const periodLength: number = dailys.length;
  const trainingDays: number = dailys.filter((d) => d > 0).length;
  const average: number = dailys.reduce((a, b) => a + b, 0) / dailys.length;
  const success: boolean = average >= target ? true : false;
  const targetPercentage: number = (average * 100) / target;
  const ratingPercentage: number = (targetPercentage * ratingScale) / 100;
  const rating: number =
    ratingPercentage > ratingScale ? 5 : Number(ratingPercentage.toFixed(2));

  console.log(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription(rating),
    target,
    average,
  };
};

export default calculate;

// interface bmiValues {
//   weight: number
//   height: number
// }
// const parseProcessArgs = (argv: Array<string>): number[] => {
//   if (argv.length < 2) throw new Error('Not enough arguments')
//   const numbers: string[] = argv.slice(2)

//   return numbers.map((arg) => {
//     if (!isNaN(Number(arg))) {
//       return Number(arg)
//     } else {
//       throw new Error('Provided values were not numbers')
//     }
//   })
// }

// const exercises: number[] = parseProcessArgs(process.argv).slice(0, -1)
// const last: number = parseProcessArgs(process.argv).slice(-1)[0]

// console.log(calculate(exercises, last))
