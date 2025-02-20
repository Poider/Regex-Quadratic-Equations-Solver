import { equationElement } from "./types";

//check POSSITIVE DEGREES, else for negative degrees u do check before - if theres ^ or not 

// const simpleTest = "- 2  + 5 * X^0 + 4 * X^-1 - 9.3 * X^2 = 1 * X^0 + 5" // => doesnt give  - 1 X checkthat out
// what if theres -2 6*x.. what if theres a space between

function ensureNegativeSigns(eq : string) : string {
    const normalizedEq = eq.replaceAll(/(?<!\^)-/g, "+-") 
    return normalizedEq;
} // if u split by + u will also split +c than rather just +x... which is ok x^n + x^x-1 ... + c cus c is also alone just no var no coef and just a const 

function splitEquationByEqual(eq : string) : string {
    const terms : string[] = eq.split('=');
    const startsWithMinus = /^\s*-/;
    let equationOneSide = terms[1];
    if(!startsWithMinus.test(terms[1])){
        equationOneSide = '+' + terms[1]
        
    }
    equationOneSide = terms[0] + equationOneSide.replaceAll(/[-+]/g, (match) => match === '-' ? '+' : '-');
    // console.log('when swapped',equationOneSide);
    return equationOneSide; 
}

function splitTerms(eq : string) : string[] {
    // console.log(`before split "${eq}"`)
    if(eq[0] === '+')//if starts with + we take it off so it dont split extra empty string
        eq  = eq.slice(1);

    const terms : string[] = eq.split('+');
    // console.log('terms',terms)
    return terms; 
}

// case when X -> coef 0 or just dont exist then it should be
function extractInfos(terms: string []) : equationElement []{
    //"5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"
    const infos : equationElement [] = terms.map((term : string)=>{
        const CoefRegex : RegExp = /((?<!\^)[+-]?\d+(?:\.\d+)?)(?=\*X)/;
        const degreeRegex : RegExp = /(?<=X\^)([-+]?\d+)(?=(?:$|[+-]))/;
        const constantRegex : RegExp = /(?:^(?<!\^)[+-]?|(?<!\^)[+-]{1})(?:\d+(?:\.\d+)?)(?=$|[+-])/;
                    //constant still captures it as groups (the - and the number)
        

        //!!!if term matches none of these, throw error and catch it later


        const coefMatch = term.match(CoefRegex);
        const degreeMatch = term.match(degreeRegex);
        const constantMatch = term.match(constantRegex);
        // console.log("coef" , coefMatch)
        // console.log("constant match",constantMatch)
        // console.log("degree match:", degreeMatch)
        const parsedTerm : equationElement =    { 
            isVar : term.includes('X'), // IF X EXISTS then 
            coeficient : coefMatch? Number(coefMatch[0]) : null,
            degree: degreeMatch? Number(degreeMatch[0])  : null,
            constants : constantMatch? Number(constantMatch[0]) : null,
        }
        return parsedTerm;
    }) 
    return infos;
}


function handleXNoCoef(eq: string): string {

    return eq.replace(/(?<=^|[+-])(?=X)/g, '1*');
}


function handleXNoDegree(eq: string): string {
    return eq.replace(/X(?!\^)/g, 'X^1');
}

function simpleChecks(myeq: string): void {
    if (myeq.trim() === '') {
        throw new Error("Invalid equation: Input is empty.");
    }
    
    if (!myeq.includes('=')) {
        throw new Error("Invalid equation: Missing '=' sign.");
    }

    const sides = myeq.split('=');
    if (sides.length !== 2 || sides[0].trim() === '' || sides[1].trim() === '') {
        throw new Error("Invalid equation: Both sides must contain terms.");
    }

    //advanced 

    if (/[^0-9Xx^*+\-=.\s]/.test(myeq)) {
        throw new Error("Invalid equation: Contains invalid characters.");
    }

    if (/\d+\.\d+\./.test(myeq)) {
        throw new Error("Invalid equation: Malformed number format.");
    }

    const xCount = (myeq.match(/X/g) || []).length;
    const starCount = (myeq.match(/\*/g) || []).length;

    if (xCount > starCount) {
        throw new Error("Invalid equation: Missing '*' between coefficient and variable.");
    }

    if (/\^([^0-9+-]|$)/.test(myeq)) {
        throw new Error("Invalid equation: '^' must be followed by a number.");
    }
    
}

function updatextoX (eq : string) : string
{
    return eq.replace(/x/g,"X");
}


export default function parseEquation(equation : string) : equationElement []
{
    let myeq =  equation.replaceAll(/\s/g,'');
    myeq = updatextoX(myeq);
    
    myeq = handleXNoCoef(myeq);
    myeq = handleXNoDegree(myeq);
    simpleChecks(myeq);
    myeq = splitEquationByEqual(myeq);
    myeq = ensureNegativeSigns(myeq)
    const terms : string [] = splitTerms(myeq);
    const parsedTerms : equationElement[] = extractInfos(terms);
    return parsedTerms
    // console.log(parsedTerms)
}
