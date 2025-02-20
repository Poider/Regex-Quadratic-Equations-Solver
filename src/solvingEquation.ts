import {equationElement} from './types' 
import {mySqrt, toFraction} from "./utils"

export function solveEquation(elements: equationElement[]): string {
    let linearCoefSum = 0; // Sum of coefficients for X^1 terms
    let quadraticCoefSum = 0; // Sum of coefficients for X^2 terms
    let constantSum = 0; // Sum of constant terms
    
    elements.forEach(element => {
        if (element.isVar) { 
            if(element.degree == null)
            {

                throw new Error(`Degree is lower than 0`); // or Something is wrong, element is Var but degree is null?
            } else if(element.degree === 0) {
                constantSum += element.coeficient ?? 0
            } else if (element.degree === 1) { // Degree 1 (X^1 term)
                linearCoefSum += element.coeficient ?? 0; 
            } else if (element.degree === 2) { // Degree 2 (X^2 term)
                quadraticCoefSum += element.coeficient ?? 0; 
            } else if (element.degree >= 3)
                throw new Error("eq 3rd degree or higher, won't solve");
        
        } else {
            constantSum += element.constants ?? 0;
        }
    });

    if (quadraticCoefSum !== 0) {
        console.log("Equation degree : 2");
        // (degree 2): ax^2 + bx + c = 0
        const a = quadraticCoefSum;
        const b = linearCoefSum;
        const c = constantSum;
        
        console.log(`reduced equation :  ${a}x^2 + ${b}x + ${c} = 0`);
        
        // quadratic formula: x = (-b ± sqrt(b^2 - 4ac)) / 2a
        const discriminant = b * b - 4 * a * c;
        console.log(`Discriminant calculation: b^2 - 4ac = ${b}^2 - 4 * ${a} * ${c} = ${discriminant}`);
        
        if (discriminant > 0) {
            const root1 = (-b + mySqrt(discriminant)) / (2 * a);
            const root2 = (-b - mySqrt(discriminant)) / (2 * a);
            return `Quadratic equation has two real roots: x1 = ${toFraction(root1, 1)}, x2 = ${toFraction(root2, 1)}`;
        } else if (discriminant === 0) {
            const root = -b / (2 * a);
            return `Quadratic equation has one real root: x = ${toFraction(root, 1)}`;
        } else {
            return 'Quadratic equation has no real roots';
        }
    }

    if (linearCoefSum !== 0) {
        console.log("Equation degree : 1");
        //  mx + c = 0
        const x = -constantSum / linearCoefSum;
        console.log(`reduced equation : ${linearCoefSum}x + ${constantSum} = 0`);
        
        if (!isFinite(x)) {
            return 'Linear equation has no solution (division by zero)';
        }
        return `Linear equation has one solution: x = ${toFraction(x, 1)}`;
    }

    // (no variable term)
    if (constantSum !== 0) {
        console.log("Equation degree : 0");
        console.log(`reduced equation : ${constantSum} = 0`);
        return 'Equation has no solution (constant term only, no variable)';
    }
    else
    {
        console.log("Equation degree : 0");
        return 'All real numbers are a solution';
    }

}
