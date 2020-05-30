interface MultiplyValues {
  val_1: number;
  val_2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val_1: Number(args[2]),
      val_2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const multipilicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { val_1, val_2 } = parseArguments(process.argv);

  multipilicator(
    val_1,
    val_2,
    `multiplied ${val_1} and ${val_2}, the result is: `
  );
} catch ({ message }) {
  console.log('error: ', message);
}
