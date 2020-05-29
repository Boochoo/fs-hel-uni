var parseArgs = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers');
    }
};
var calculateBmi = function (weight, height) {
    return (weight / height / height) * 10000;
};
var bmiStatus = function (bmi) {
    switch (true) {
        case bmi <= 15:
            return 'Very severely underweight';
        case bmi <= 16:
            return 'Severely underweight';
        case bmi <= 18.5:
            return 'Underweight';
        case bmi <= 25:
            return 'Normal (healthy weight)';
        case bmi <= 30:
            return 'Overweight';
        case bmi <= 35:
            return 'Obese Class I (Moderately obese)';
        case bmi <= 40:
            return 'Obese Class II ( severely obese)';
        case bmi > 40:
            return 'Obese Class II (Very severely obese)';
        default:
            return 'Something is wrong';
    }
};
var _a = parseArgs(process.argv), weight = _a.weight, height = _a.height;
var bmi = calculateBmi(weight, height);
console.log(bmiStatus(bmi));
