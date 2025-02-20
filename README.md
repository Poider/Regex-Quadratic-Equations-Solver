
# Regex Quadratic Equations Solver

## Overview
This project is a **Regex-based quadratic equation solver** written in **TypeScript**. It uses **regular expressions** to extract and solve quadratic equations from text input. The solution efficiently identifies coefficients, validates equations, and computes solutions using the quadratic formula step by step.

## Features
- Parses quadratic equations from raw text using **complex regex patterns**
- Extracts coefficients (**a, b, c**) from standard and non-standard formats
- Handles equations with **variable positioning** and **implicit coefficients**
- Computes real and complex roots using the quadratic formula
- Shows step-by-step solutions for each equation
- Supports multiple input formats (e.g., `ax^2 + bx + c = 0` and variations)
- Provides informative error messages for incorrect inputs

## Installation
### Prerequisites
- npm
- TypeScript

### Clone Repository
```sh
git clone https://github.com/Poider/Regex-Quadratic-Equations-Solver.git
cd Regex-Quadratic-Equations-Solver
```

### Setup and Run
Run the setup script to install dependencies, compile, and execute the program:
```sh
./setup.sh
```

## Usage
Run the script and input an equation 
```sh
./dist/main.js
```
Enter a quadratic equation when prompted, such as:
```
2x^2 - 4x + 2 = 0
```
The solver will output:
```
Extracted coefficients: a = 2, b = -4, c = 2
Discriminant calculation: (-4)^2 - 4(2)(2) = 0
Solution formula: x = (-(-4) ± √0) / (2*2)
Solutions: x = 1.0
```

### Example Input & Output
#### Input:
```
5x^2 - 3x + 1 = 0
```
#### Output:
```
Extracted coefficients: a = 5, b = -3, c = 1
Discriminant calculation: (-3)^2 - 4(5)(1) = -11
Solution formula: x = (-(-3) ± √-11) / (2*5)
Solutions: x = 0.3 ± 0.469i
```

## How It Works
1. **Regex Parsing:** Extracts coefficients from various quadratic formats.
2. **Validation:** Ensures the equation is well-formed.
3. **Solving:** Uses the quadratic formula:
   \[ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \]
4. **Step-by-step Explanation:** Shows intermediate calculations.
5. **Edge Cases:** Handles missing coefficients and non-quadratic inputs.


## License
MIT License. See `LICENSE` for details.

## Author
Developed by [Poider](https://github.com/Poider).

## Author
Developed by [Poider](https://github.com/Poider).
