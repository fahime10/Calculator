let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayedNumber = document.querySelector(".current-number");
const previousDisplayedNumber = document.querySelector(".previous-number");

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if (currentNum != "" && previousNum != "") {
        calculate();
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

numberButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplayedNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayedNumber.textContent = currentNum;
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentDisplayedNumber.textContent = "0";
        previousDisplayedNumber.textContent = previousNum + " " + operator; 
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayedNumber.textContent = previousNum + " " + operator; 
    currentDisplayedNumber.textContent = "0";
    currentNum = "";
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum = previousNum + currentNum;
    } else if (operator === "-") {
        previousNum = previousNum - currentNum;
    } else if (operator === "x") {
        previousNum = previousNum * currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayResult();
            return;
        }
        previousNum = previousNum / currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResult();
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResult() {
    if (previousNum.length <= 11) {
        currentDisplayedNumber.textContent = previousNum;
    } else {
        currentDisplayedNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayedNumber.textContent = "";
    operator = "";
    currentNum = "";
}

function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayedNumber.textContent = "0";
    previousDisplayedNumber.textContent = ""; 
}

function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentDisplayedNumber.textContent = currentNum;
    }
}