let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayedNumber = document.querySelector(".current-number");
const previousDisplayedNumber = document.querySelector(".previous-number");

const equal = document.querySelector(".equal");
equal.addEventListener("click", calculate);

const decimal = document.querySelector(".decimal");

const clear = document.querySelector(".clear");

const numberButtons = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

numberButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
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
    operator = op;
    previousNum = currentNum;
    previousDisplayedNumber.textContent = previousNum + " " + operator;
    currentNum = "";
    currentDisplayedNumber.textContent = "";
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
    previousNum = previousNum.toString();
    displayResult();
}

function displayResult() {
    previousDisplayedNumber.textContent = "";
    operator = "";
    if (previousDisplayedNumber.length <= 11) {
        currentDisplayedNumber.textContent = previousNum;
    } else {
        currentDisplayedNumber.textContent = previousNum.slice(0, 11) + "...";
    }
}