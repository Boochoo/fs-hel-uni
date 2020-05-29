type Operation = 'multiply' | 'add' | 'divide'
type Result = number

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'add':
      return a + b

    case 'divide':
      return a / b

    case 'multiply':
      if (b === 0) throw new Error(`cant be divided`)

      return a * b

    default:
      throw new Error('operation is nt multiply, add or divide')
  }
}

try {
  console.log('hmmm ', calculator(1, 0, 'divide'))
} catch (e) {
  console.log('something went terribly wrong', e.message)
}
