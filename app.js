
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

// Setting the operation for current calculation
allOps.forEach(op => {
    op.addEventListener("click", () => {
        if (firstNumber !== undefined && chosenOp === undefined){
            chosenOp = op.textContent;
            getWorkingOp.textContent = chosenOp;
        } else if (chosenOp !== undefined) {
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

let container = Array.from(document.querySelectorAll('.container'));

container.forEach(element => {
    element.addEventListener("keydown", (event) => {
        console.log(event)
        console.log(event.code)
        if (event.code === "Escape")
        {
            clearAll.click();
        }

        if (event.code === "Enter")
        {
            equalButton.click();
        }
    })
});