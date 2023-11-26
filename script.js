// Buttons
const equalButton = document.querySelector("#equalButton");
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const specialButtons = document.querySelectorAll(".special");
const calcInput = document.querySelector("#calc-input");

// Regex
const equationRegex = /^\s*(-?\d*\.?\d+)\s*([-+×÷])\s*(-?\d*\.?\d+)\s*$/; // Matches full equation allowing negative and decimal numbers
const numberPattern = /^-?\d*\.?\d+$/; // Matches a single negative or positive decimal number
const endsWithWholeNumberRegex = /(?<!\.\d*)\d+$/;
const endsWithOperatorRegex = /[+\-×÷]\s$/;
const endsWithDecimalRegex = /\.\s*$/;

function add(a, b) {
	let roundedNumber = parseFloat(a + b);
  return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(3);
}

function subtract(a, b) {
	let roundedNumber = parseFloat(a - b);
  return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(3);
}

function multiply(a, b) {
	let roundedNumber = parseFloat(a * b);
  return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(3);
}

function divide(a, b) {
	if (b == 0) {
		return "Divide by zero error";
	}
	let roundedNumber = parseFloat(a / b);
  return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(3);
}

function operate(num1, num2, operator) {
	switch(operator) {
		case "+":
			calcInput.value = add(num1, num2);

  //return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(3);
			break;
		case "-":
			calcInput.value = subtract(num1, num2);
			break;
		case "×":
			calcInput.value = multiply(num1, num2);
			break;
		case "÷":
			calcInput.value = divide(num1, num2);
			break;
	}
}
function appendOperator(operator) {
	calcInput.value = calcInput.value + " " + operator + " ";
}

function decimalCheck() {
	let equation = calcInput.value;

	if (equation.match(endsWithWholeNumberRegex)){	
		calcInput.value = equation + ".";
	}
	else if (!equation || equation.match(endsWithOperatorRegex))

		calcInput.value = equation + "0.";
}

function equationCheck() {	
	let equation = calcInput.value;
	let equationMatch = equation.match(equationRegex);

	// Full Equation
	if (equationMatch) {	
		let num1 = parseFloat(equationMatch[1])
		let equation_operator = equationMatch[2]
		let num2 = parseFloat(equationMatch[3])
		console.log(equation_operator);
		operate(num1, num2, equation_operator);
	}

}


/* Decimal Button */
decimalButton.addEventListener('click', function() {
	decimalCheck();
});

/* Equal Button */
equalButton.addEventListener('click', function() {
	equationCheck();	
});

/* Clear Calculator */
clearButton.addEventListener('click', function() {
	calcInput.value = "";
});

/* Back Function */
deleteButton.addEventListener('click', function() {
	let equation = calcInput.value.trim();
	calcInput.value = equation.substring(0,(equation.length - 1)).trim();
});

/* Input Numbers */
numberButtons.forEach(function(button) {
	button.addEventListener('click', function(event) {
		let number = event.target.textContent;
		calcInput.value = calcInput.value + number;
	});
});


/* Input Operators and Validation */

operatorButtons.forEach(function(button) {
	button.addEventListener('click', function(event) {
		let equation = calcInput.value;
		let operator = event.target.textContent;
		// One Number only or Full Equation Check
		if (equation.match(numberPattern) || equationCheck()) {	
			appendOperator(operator)		}
		
		//(!(equation.match(endsWithDecimalRegex))) || (!(equation.match(endsWithOperatorRegex)))
	});
});
