const calculate = (dailys: number[], target: number): object => {
  const ratingScale: number = 5
  const periodLength: number = dailys.length
  const trainingDays: number = dailys.filter((d) => d > 0).length
  const average: number = dailys.reduce((a, b) => a + b, 0) / dailys.length
  const success: boolean = average >= target ? true : false
  const targetPercentage: number = (average * 100) / target
  const ratingPercentage: number = (targetPercentage * ratingScale) / 100
  const rating: number =
    ratingPercentage > ratingScale ? 5 : Number(ratingPercentage.toFixed(2))

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: 'not too bad but could be better',
    target,
    average,
  }
}

interface bmiValues {
  weight: number
  height: number
}
const parseProcessArgs = (argv: Array<string>): number[] => {
  if (argv.length < 2) throw new Error('Not enough arguments')
  const numbers: string[] = argv.slice(2)

  return numbers.map((arg) => {
    if (!isNaN(Number(arg))) {
      return Number(arg)
    } else {
      throw new Error('Provided values were not numbers')
    }
  })
}

// const parseProcessArgs: number[] = process.argv
//   .slice(2)
//   .map((arg) => Number(arg))

const exercises: number[] = parseProcessArgs(process.argv).slice(0, -1)
const last: number = parseProcessArgs(process.argv).slice(-1)[0]

console.log(calculate(exercises, last))
