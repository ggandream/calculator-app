let digits = document.querySelectorAll(".calc-btn-default.digit");
let screen = document.querySelector(".calc-display > span");
let operators = document.querySelectorAll(".calc-btn-default.operator");
let reset = document.querySelector(".calc-btn-default.reset");
let equal = document.querySelector(".calc-btn-default.equal");
let del = document.querySelector(".calc-btn-default.del");
const inputRange = document.querySelector(".calc-input-range");
const html = document.querySelector("html");

console.log("Hola Mundo");

let numeroCompleto1 = null;
let numero1 = null;
let numero2 = null;
let resultado;
let firstStep = true;
let currentOperator = null;
let consecutiveEqual = false;

screen.textContent = 0;

function clear() {
  screen.textContent = 0;
  numero1 = null;
  numero2 = null;
  resultado = null;
  currentOperator = null;
  firstStep = true;
}

digits.forEach(function (digit) {
  digit.addEventListener("click", function () {
    console.log("afuera del if", {
      consecutiveEqual,
      numero1,
      numero2,
      resultado,
    });

    if (consecutiveEqual) {
      console.log({ consecutiveEqual, numero1, numero2, resultado });
      numero1 = null;
      numero2 = null;
      resultado = null;
      consecutiveEqual = false;
      screen.textContent = 0;
      firstStep = true;
    }

    if (firstStep) {
      numero1 =
        numero1 == null
          ? Number(digit.textContent)
          : numero1 + digit.textContent;

      screen.textContent = numero1;
    } else {
      numero2 =
        numero2 == null
          ? Number(digit.textContent)
          : numero2 + digit.textContent;

      screen.textContent = numero2;
    }
  });
});

operators.forEach(function (operator) {
  operator.addEventListener("click", function () {
    firstStep = false;
    currentOperator = operator.textContent;
  });
});

equal.addEventListener("click", function () {
  consecutiveEqual = true;
  if (currentOperator == "+") {
    resultado = Number(numero1) + Number(numero2);
  } else if (currentOperator == "/") {
    resultado = Number(numero1) / Number(numero2);
  } else if (currentOperator == "*") {
    resultado = Number(numero1) * Number(numero2);
  } else if (currentOperator == "-") {
    resultado = Number(numero1) - Number(numero2);
  }

  screen.textContent = resultado;
  console.log(resultado);

  if (resultado != null && consecutiveEqual) {
    numero1 = resultado;
    firstStep = true;
  } else {
    clear();
  }
});

reset.addEventListener("click", function () {
  clear();
});

del.addEventListener("click", function () {
  let display = screen.textContent;

  if (!consecutiveEqual) {
    if (screen.textContent.length > 1) {
      screen.textContent = display.substring(0, display.length - 1);
    } else if (screen.textContent.length === 1) {
      screen.textContent = 0;
    }

    if (firstStep) {
      if (screen.textContent == 0) {
        numero1 = null;
      } else {
        numero1 = screen.textContent;
      }
    } else {
      if (screen.textContent == 0) {
        numero2 = null;
      } else {
        numero2 = screen.textContent;
      }
    }
  }
});

inputRange.addEventListener("input", (event) => {
  let value = null;

  value = event.target.value;

  console.log(`inputRange: ${value}`);

  if (value == 2) {
    html.setAttribute("data-theme", "theme-2");
  } else if (value == 3) {
    html.setAttribute("data-theme", "theme-3");
  } else {
    html.setAttribute("data-theme", "0");
  }
});
