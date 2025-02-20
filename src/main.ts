import * as readline from 'readline';

import {solveEquation} from "./solvingEquation"
import parseEquation from './parsing';





function main(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (equation: string) => {
   
        console.log('Equation:', equation);
            
        try {
        const myeqElements = parseEquation(equation)
        console.log(solveEquation(myeqElements));
        } catch (error : any) {
            console.log(error.message)
        }
    

        rl.close();
    });
}
main();



