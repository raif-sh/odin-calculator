
function add(foo, bar){
    return foo + bar;
}

function sub(foo, bar){
    return foo - bar;
}

function multiply(foo, bar){
    return foo * bar;
}

function divide(foo, bar){
    return foo / bar;
}

function operate(operator, num, ber){
    num = parseFloat(num);
    ber = parseFloat(ber);
    if(operator === "+"){
        return (add(num, ber));
    } else if (operator === "-") {
        return (sub(num, ber));
    } else if (operator === "*") {
        return (multiply(num, ber));
    } else if (operator === "/") {
        if(ber === 0) {
            return "lmao"
        }
        return (divide(num, ber));
    } else {
        return "invalid"
    }
}

// Declaring calculation variables
let firstNumber;
let chosenOp;
let secondNumber;

// Selecting html elements to insert input
let getWorkingFirst = document.querySelector("#workingFirst");
let getWorkingOp = document.querySelector("#workingOp");
let getWorkingSecond = document.querySelector("#workingSecond");

// Selecting buttons for input
let allInputs = document.querySelectorAll(".num");
let allOps = document.querySelectorAll(".ops");
let clearAll = document.querySelector("#clearWorking");
let equalButton = document.querySelector("#doCalculation");
let floatButton = document.querySelector(".float");

function clearWorking(){
    firstNumber = "";
    getWorkingSecond.textContent = firstNumber;

    chosenOp = undefined;
    getWorkingOp.textContent = chosenOp;

    secondNumber = undefined;
    getWorkingSecond.textContent = secondNumber;

    getWorkingFirst.textContent = "";

}

// for clearing and getting calculation results
clearAll.addEventListener("click", clearWorking)

equalButton.addEventListener("click", () => {
    if (firstNumber !== undefined && chosenOp !== undefined && secondNumber !== undefined){
        let result = operate(chosenOp, firstNumber, secondNumber);
        let decimalCheck = countDecimal(result)
        if(decimalCheck > 5){
            result = result.toFixed(5);
        }
        clearWorking()
        getWorkingFirst.textContent = result
        firstNumber = result
    }
})

// Setting the operation for current calculation
allOps.forEach(op => {
    op.addEventListener("click", () => {
        if (firstNumber !== undefined && chosenOp === undefined){
            chosenOp = op.textContent;
            getWorkingOp.textContent = chosenOp;
        } else if (chosenOp !== undefined && secondNumber === undefined) {
            chosenOp = op.textContent;
            getWorkingOp.textContent = chosenOp;
        } else {
            let result = operate(chosenOp, firstNumber, secondNumber);
            clearWorking()
            getWorkingFirst.textContent = result
            firstNumber = result
        }
    })
})

// Setting all number inputs
allInputs.forEach(number => {
    number.addEventListener("click", () => {
        if (chosenOp === undefined){
            if (firstNumber === undefined){
                firstNumber = number.textContent;
            } else {
                firstNumber += number.textContent;
            }
            getWorkingFirst.textContent = firstNumber
        } else {
            if (secondNumber === undefined) {
                secondNumber = number.textContent
            } else {
                secondNumber += number.textContent
            }
            getWorkingSecond.textContent = secondNumber
        }
    })
})

// Setting up for decimal calculations

floatButton.addEventListener("click", () => {
    if (chosenOp === undefined && !firstNumber.includes('.')) {
        firstNumber += ".";
        getWorkingFirst.textContent = firstNumber
    } else if (chosenOp !== undefined && !secondNumber.includes('.')) {
        secondNumber += ".";
        getWorkingSecond.textContent = secondNumber
    } 
})


// Keyboard stuff

document.addEventListener('keydown', (e) => {
    let prefix = "Digit"

    if (e.code === "Enter"){
        equalButton.click();
    }
    if (e.code === "Escape"){
        clearAll.click();
    }
    

    if (e.code === "Backspace"){
        if (chosenOp === undefined){
            if (firstNumber === undefined){
                return;
            } else {
                firstNumber = firstNumber.slice(0, -1);
            }
            getWorkingFirst.textContent = firstNumber
        } else {
            if (secondNumber === undefined) {
                return
            } else {
                secondNumber = secondNumber.slice(0, -1);
            }
            getWorkingSecond.textContent = secondNumber
        }
    }

    if (e.code.match(prefix)){
        let s = e.code;
        let input = s.charAt(s.length - 1);

        if (chosenOp === undefined){
            if (firstNumber === undefined){
                firstNumber = input;
            } else {
                firstNumber += input;
            }
            getWorkingFirst.textContent = firstNumber
        } else {
            if (secondNumber === undefined) {
                secondNumber = input
            } else {
                secondNumber += input
            }
            getWorkingSecond.textContent = secondNumber
        }

    }
})


// Count decimal places to round off and prevent overflow

function countDecimal(number) {
    let decimalIndex = number.toString().indexOf('.');
    return decimalIndex >= 0 ? number.toString().length - decimalIndex - 1 : 0;
}