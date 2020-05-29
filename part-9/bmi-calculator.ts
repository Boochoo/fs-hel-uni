export const BMICalculator = (weight: number, height: number): number => {
  return (weight / height / height) * 10000
}

export const BMIStatus = (bmi: number): string => {
  switch (true) {
    case bmi <= 15:
      return 'Very severely underweight'

    case bmi <= 16:
      return 'Severely underweight'

    case bmi <= 18.5:
      return 'Underweight'

    case bmi <= 25:
      return 'Normal (healthy weight)'

    case bmi <= 30:
      return 'Overweight'

    case bmi <= 35:
      return 'Obese Class I (Moderately obese)'

    case bmi <= 40:
      return 'Obese Class II ( severely obese)'

    case bmi > 40:
      return 'Obese Class II (Very severely obese)'

    default:
      return 'Something is wrong'
  }
}
