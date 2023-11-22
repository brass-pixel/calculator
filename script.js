function add(a, b) {
return a + b;
}

function subtract(a, b) {
return a - b;
}

function multiply(a, b) {
return a * b;
}

function divide(a, b) {
	if(b==0) {
		return "Divide by zero error";
	}
	return a/b;
}

function operate(num1, num2, operator) {
	switch(operator) {
		case "+":
			add(num1, num2);
			break;
		case "-":
			subtract(num1, num2);
			break;
		case "×":
			multiply(num1, num2);
			break;
		case "÷":
			divide(num1, num2);
			break;
	}
}



const equalButton = document.querySelector("#equalButton");
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const specialButtons = document.querySelectorAll(".special");
const calcInput = document.querySelector("#calc-input");

equalButton.addEventListener('click', function() {
	console.log('Button with ID "equal" clicked!');
});

clearButton.addEventListener('click', function() {
	calcInput.value = "";
});

deleteButton.addEventListener('click', function() {
	calcInput.value = "";
});

/* Input Numbers */
numberButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
				let number = event.target.textContent;
				calcInput.value = calcInput.value + number;
    });
});


/* Input Operators and Validation */
const equationRegex = /^\s*(\d+)\s*([-+*/])\s*(\d+)\s*$/;
operatorButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
				let operator = event.target.textContent;
				let equation = calcInput.value;
				switch(equation) {
					/* Equation only has one number */
					case "test":
						calcInput.value = calcInput.value + " " + operator + " ";
						break;

					/* Equation already has a number and operator */
					case "2":
						break;

					/* Equation has full equation */
					case "3":
						
						let new_number = operate(num1, num2, operator);
						break;
				}
    });
});
/* Check if 2 numbers are already in input field, automatically call the apppropriate maths function */

