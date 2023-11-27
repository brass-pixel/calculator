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

// Maths Functions
function add(a, b) {
	let roundedNumber = parseFloat(a + b);
	return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(2);
}

function subtract(a, b) {
	let roundedNumber = parseFloat(a - b);
	return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(2);
}

function multiply(a, b) {
	let roundedNumber = parseFloat(a * b);
	return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(2);
}

function divide(a, b) {
	if (b == 0) {
		alert("Can't divide by Zero!");
		return "0";
	}
	let roundedNumber = parseFloat(a / b);
	return Number.isInteger(roundedNumber) ? roundedNumber.toFixed(0) : roundedNumber.toFixed(2);
}

// Evaluate equation
function operate(num1, num2, operator) {
	switch(operator) {
		case "+":
			calcInput.value = add(num1, num2);
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
		operate(num1, num2, equation_operator);
		return true;
	}

}

// Operator Function
function handleOperator(operator) {
  let equation = calcInput.value;
  if (equation.match(numberPattern) || equationCheck()) {
    appendOperator(operator);
  }
}

// Back Function
function backspaceDelete() {
	let equation = calcInput.value.trim();
	calcInput.value = equation.substring(0,(equation.length - 1)).trim();
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
	backspaceDelete();
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
    let operator = event.target.textContent;
    handleOperator(operator);
	});
});

// Keyboard Mapping
document.addEventListener('keydown', function(event) {
	const key = event.key;

	const numericKeys = /^[0-9]$/;
	const operatorKeys = /^[+\-*\/]$/;
	console.log(key);
	// Number Input
	if (key.match(numericKeys)) {
		calcInput.value = calcInput.value + key;
	}
	// Operator Input
	if (key.match(operatorKeys)) {
		let operator = key;
		switch(key) {
			case "*":
				operator = "×";	
				break;
			case "/":
				operator = "÷";	
				break;
		}
		handleOperator(operator);
	}
	switch (key) {
		case '.':
			decimalCheck();
			break;
		case 'Enter':
			equationCheck();
			break;
		case 'Backspace':
			backspaceDelete();
			break;
			// Add additional cases for other keys if needed
		default:
			break;
	}
});
