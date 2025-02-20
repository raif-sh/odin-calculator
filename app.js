
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
    console.log("starting operation for " + operator)
    num = parseInt(num);
    ber = parseInt(ber);
    if(operator === "+"){
        return add(num, ber);
    } else if (operator === "-") {
        return sub(num, ber);
    } else if (operator === "*") {
        return multiply(num, ber);
    } else if (operator === "/") {
        return divide(num, ber);
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

function clearWorking(){
    console.log("clearing")
    firstNumber = "";
    getWorkingSecond.textContent = firstNumber;

    chosenOp = undefined;
    getWorkingOp.textContent = chosenOp;

    secondNumber = "";
    getWorkingSecond.textContent = secondNumber;

    getWorkingFirst.textContent = "";

}

// for clearing and getting calculation results
clearAll.addEventListener("click", clearWorking)

equalButton.addEventListener("click", () => {
    if (firstNumber !== undefined && chosenOp !== undefined && secondNumber !== undefined){
        let result = operate(chosenOp, firstNumber, secondNumber);
        clearWorking()
        getWorkingFirst.textContent = result
        firstNumber = result
    }
})

allOps.forEach(op => {
    op.addEventListener("click", () => {
        if (firstNumber !== undefined){
            chosenOp = op.textContent;
            getWorkingOp.textContent = chosenOp;
        }
    })
})

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
