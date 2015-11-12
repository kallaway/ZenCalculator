// IDEA: Add a random quote to be displayed on the calculator (maybe each time AC is pressed).
// When you hover over the question mark - the list of features is displayed in a box

// IDEA: buttons should have gradient going from grey to white from top to bottom, but when clicked, the gradient is reversed.

// Getting all the needed elements on the page

var keyInfo = document.getElementById("info");
var displayInfo = document.getElementById("project-description");
var result = document.getElementById("result");

var key0 = document.getElementById("0");
var key1 = document.getElementById("1");
var key2 = document.getElementById("2");
var key3 = document.getElementById("3");
var key4 = document.getElementById("4");
var key5 = document.getElementById("5");
var key6 = document.getElementById("6");
var key7 = document.getElementById("7");
var key8 = document.getElementById("8");
var key9 = document.getElementById("9");

var ac = document.getElementById("ac");
var ce = document.getElementById("ce");
var keyPercentage = document.getElementById("0");
var keyDivide = document.getElementById("divider");
var keyMultiply = document.getElementById("x");
var keySubtract = document.getElementById("minus");
var keySum = document.getElementById("plus")
var keyDecimal = document.getElementById("decimal");
var keyEquals = document.getElementById("equals");

var zenQuotes = [ "breathe", "peace", "know thyself", "now",
 				 "be", "walk slowly", "meditate", "meditate on this",
 				 "free your mind", "let go", "follow your bliss", "wake up",
 				 "declutter", "help others", "be mindful", "focus",
 				 "be kind", "simplify", "uncommit", "be yourself",
 				 "slow down", "relax", "be aware", "notice the urge",
 				 "here", "enjoy every step", "accept yourself", "don't compare",
 				 "praise others", "share knowledge", "respect others", "be like water",
 				 "respect yourself", "clear distractions", "create", "share",
 				 "support others", "dance", "sing", "smile",
 				 "travel", "start", "start today", "start now",
 				 "carry on", "try", "clean", "live simply",
 				 "choose your thoughts", "be flexible", "practice", "look within" ];

console.log("The current number of quotes in the calculator is " + zenQuotes.length);

// function to generate the a random number based on the array given
function randomArrayElement(arr) {
	return Math.floor(Math.random() * arr.length + 1);
}

function setRandomQuote(arr) {
	var randomQuoteIndex = randomArrayElement(arr);
	result.textContent = arr[randomQuoteIndex];
}

// run the function and hold on to the number
// inject the array element (quote) that is at the index of the random number - into the display of the calculator
setRandomQuote(zenQuotes);

var expression = "";
var isCalculating = true;
var saveTheValue;

var actions = []; // building up an array of actions.

// Function to display and hide the description of the project.
keyInfo.addEventListener("mouseover", function() {
		displayInfo.style.display = "inline-block";
}, false);

keyInfo.addEventListener("mouseout", function() {
	displayInfo.style.display = "none";
}, false);


// Basic arithmetic functions:
function sum(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {	
		var divResult = a / b;
		divResult = ("" + divResult).slice(0, 12);
		return divResult;
	}
function percentage(a, b) { return (a / b) * 100; }

// Functions of a calculator

function buttonGrabber() {
	var value = this.textContent;
	console.log(value);
	//result.textContent = value;

	workWithInput(value);

	//return value;
}




function calculate(actions) {
	// * This function should only get a filtered actions array - number should be first
	// Calculate the expression's result based on the actions array
	// Display the result on the calculator
	console.log("function Calculate is activated.");
	console.log("The list of actions I am working with is " + actions)
	var runningResult = 0;

	for (var i = 0; i < actions.length; i++) {
		if (runningResult === 0) {
			var indexDot = runningResult.toString().indexOf(".");
			if (indexDot !== -1) {
				runningResult = parseFloat(actions[i]);
			} else {
				runningResult = parseInt(actions[i]); 
			}

		} else if (parseInt(actions[i]) < 10 || runningResult) {
			continue;
		} else {
			// Choosing whether to parseInt or parseFloat based on the dot symbol
			// Create a function that automates the process of this?

			console.log("Modified running result is " + runningResult)

			var formattedNumber;
			if (actions[i+1].indexOf(".") !== -1) {
				formattedNumber = parseFloat(actions[i+1]);
			} else {
				formattedNumber = parseInt(actions[i+1]);
			}
			console.log("THE FORMATTED NUMBER IS " + formattedNumber);

			switch (actions[i]) {
				case "+":
					runningResult = sum(runningResult, formattedNumber);
					break;

				case "-":
					runningResult = subtract(runningResult, formattedNumber);
					break;

				case "X":
					runningResult = multiply(runningResult, formattedNumber);
					break;

				case "/":
					runningResult = divide(runningResult, formattedNumber);
					break;

				case "%":
					runningResult = percentage(runningResult, formattedNumber);
					break;	

				default:
					alert("no such function?");
			}
		}

	}
	console.log("The result in the end of the calculate function is " + runningResult);
	result.textContent = runningResult;
	saveTheValue = runningResult;
	
	return saveTheValue; // ADDITION
}





function workWithInput(input) {
	// Until user inputs number, don't record anything

	// FIRST check if it is an equals.
	if (input === "=") {
		actions.push(expression);
		console.log(actions);
		calculate(actions); // if so, calculate and display it.


		actions = [];
		//actions.push(saveTheValue); // Cleaning the array
		expression = saveTheValue; // Cleaning the expression
		console.log("After I am done calculating, this is what is currently within the array actions " + actions)

	} else if (input === "AC") {

		actions = [];
		expression = "";
		setRandomQuote(zenQuotes);

	} else if (parseInt(input) < 10 || input === ".") {
			expression += input;
			result.textContent = expression;

			console.log("Current Expression: " + expression);

		} else {
			actions.push(expression);
			expression = input;
			actions.push(expression);
			expression = "";
		}
	

} 		




// The calculator app itself

function attachListeners(collection) {
	for (var i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click", buttonGrabber, false);
	}
}


// Attaching functions to events
var buttons = document.getElementsByTagName("button");

// Attaching listeners to the collection of buttons
attachListeners(buttons);


// IDEA : BUILD UP AN ARRAY OF ACTIONS UNTIL THE PERSON CLICKS EQUALS
// THEN GO THROUGH THE EVALUATOR FUNCTION WHICH EVALUATES BASED ON THE INPUT.
// IF A NUMBER COMES ALONG AFTER THE PREVIOUS THING WAS A NUMBER THEN BUILD THEM INTO A STRING, 
// THEN PUSH AS A NUMBER