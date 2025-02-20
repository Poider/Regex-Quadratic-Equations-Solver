export function mySqrt(x: number): number {
    if (x < 0) {
        throw new Error("Cannot calculate the square root of a negative number.");
    }

    if (x === 0) return 0;

    let guess = x / 2; // Initial guess is half of the number
    let previousGuess = 0;

    // you can add tolerance right here to see how different they should be
    while (guess !== previousGuess) {
        previousGuess = guess;
        guess = (guess + x / guess) / 2; // Newton's method (basically betters the guess)
    }

    return guess;
}


function myAbs(value: number): number {
    return value < 0 ? -value : value;
}

function gcd(a: number, b: number): number { //o9lid -> a 
    return b === 0 ? myAbs(a) : gcd(b, a % b);
}

export function toFraction(numerator: number, denominator: number): string {
    if (denominator === 0) return "u dividing by 0"; // Edge case: division by zero
    if (numerator % denominator === 0) // ila numb isnt a fraction
        return (numerator / denominator).toString(); 
    const sign = numerator * denominator < 0 ? "-" : ""; // Determine the sign
    numerator = myAbs(numerator);
    denominator = myAbs(denominator);

    const divisor = gcd(numerator, denominator); 
    //reducin them with my greatest divisor
    numerator = numerator / divisor; 
    denominator = denominator / divisor; 

    return `${sign}${numerator}/${denominator}`; // Return irreducible fraction
}
