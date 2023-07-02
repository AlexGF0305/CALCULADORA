let runningTotal=0;
let buffer= "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal= 0;
            break;
        case '=':
            if(previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length ===1){
               buffer = '0'; 
            }else{
               buffer = buffer.substring(0, buffer.length - 1);
            }
        break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
      runningTotal += intBuffer;
    } else if (previousOperator === '-') {
      runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
      runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
      runningTotal /= intBuffer;
    }
    
  }

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        //para verificar el total de digitos en el recuadro
        if (buffer.length <14 ){
            buffer +=numberString;
        }
    }
}


function init() {
    // Event listener para hacer clic en los botones
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
      buttonClick(event.target.innerText);
    })
  
    // Event listener para capturar los eventos de teclado
    document.addEventListener('keydown', function(event) {
      const key = event.key;
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape'];
  
      // Verificar si la tecla presionada está permitida
      if (allowedKeys.includes(key)) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del teclado
  
        if (key === 'Enter') {
            buttonClick('=');
          } else if (key === 'Backspace') {
            buttonClick('←');
          } else if (key === 'Escape') {
            buttonClick('C');
          } else {
            buttonClick(key);
        }
        }
    })
  }
  
  
init();