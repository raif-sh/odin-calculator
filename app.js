
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
    if(operator === "+"){
        return add(num, ber)
    }
}

let test = operate("+", 3, 4)

console.log(test)