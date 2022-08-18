const nums = document.querySelectorAll('.num');
const opers = document.querySelectorAll('.oper');
const clear = document.querySelector('.clear');
const back = document.querySelector('.back');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const equation = document.querySelector('.equation');

let a = 0;
let b = 0;
let operator = "";
let previousKeyType = "";

clear.addEventListener('click', () => {
    equation.textContent = "0";
    a = 0;
    b = 0;
    operator = "";
    previousKeyType = "";
});

back.addEventListener('click', () => {
    equation.textContent = equation.textContent.slice(0, -1);
    if (!equation.textContent) equation.textContent = 0;
});

decimal.addEventListener('click',  () => {
    if(equation.textContent.length >= 9) return;
    if(equation.textContent.includes('.') && previousKeyType == "number") return;
    if(equation.textContent.includes('.') && previousKeyType == "operator") equation.textContent = "0.";
    else equation.textContent += ".";
    previousKeyType = "number";
});

equals.addEventListener('click', () => {
    previousKeyType = "operator";
    result();
    operator = "";
});

nums.forEach(num => num.addEventListener('click', () => {
    if(equation.textContent.length == 10 && previousKeyType == "number") return;
    if (equation.textContent == "0" || previousKeyType == "operator") equation.textContent = num.textContent;
    else equation.textContent += num.textContent;
    previousKeyType = "number";
}));

opers.forEach(oper => oper.addEventListener('click', () => {
    previousKeyType = "operator";
    operator ? result() : a = Number(equation.textContent);
    operator = oper.textContent;
}));

function result(){
    b = Number(equation.textContent);
    let temp = operate(operator, a, b);
    if(temp.toString().length > 10) temp = temp.toExponential(2);
    equation.textContent = temp;
    a = temp;
}

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
    if (b == 0) return "ERROR";
    return a / b;
}

function pow(a, b) {
    return Math.pow(a, b);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        case "^":
            return pow(a, b);
            break;
    }
}