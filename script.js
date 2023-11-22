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



const equalButton = document.getElementById("equalButton");
const numberButtons = document.getElementsByClassName("number");

equalButton.addEventListener('click', function() {
	console.log('Button with ID "equal" clicked!');
});


numberButtons.addEventListener('click', function() {
	console.log('Button with number clicked!');
});
