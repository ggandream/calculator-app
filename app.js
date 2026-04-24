const digits = document.querySelectorAll(".calc-btn-default.digit");
const screen = document.querySelector(".calc-display > span");
const operators = document.querySelectorAll(".calc-btn-default.operator");
const reset = document.querySelector(".calc-btn-default.reset");
const equal = document.querySelector(".calc-btn-default.equal");
const del = document.querySelector(".calc-btn-default.del");
const inputRange = document.querySelector(".calc-input-range");
const html = document.querySelector("html");

let firstEntry = null;
let secondEntry = null;
let result;
let firstStep = true;
let currentOperator = null;
let consecutiveEqual = false;

screen.textContent = 0;

function clear() {
  screen.textContent = 0;
  firstEntry = null;
  secondEntry = null;
  result = null;
  currentOperator = null;
  firstStep = true;
}

digits.forEach(function (digit) {
  digit.addEventListener("click", function () {

    if (consecutiveEqual) {
      firstEntry = null;
      secondEntry = null;
      result = null;
      consecutiveEqual = false;
      screen.textContent = 0;
      firstStep = true;
    }

    if (firstStep) {
      firstEntry =
        firstEntry === null
          ? Number(digit.textContent)
          : firstEntry + digit.textContent;

      screen.textContent = firstEntry;
    } else {
      secondEntry =
        secondEntry === null
          ? Number(digit.textContent)
          : secondEntry + digit.textContent;

      screen.textContent = secondEntry;
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
    result = Number(firstEntry) + Number(secondEntry);
  } else if (currentOperator == "/") {
    result = Number(firstEntry) / Number(secondEntry);
  } else if (currentOperator == "*") {
    result = Number(firstEntry) * Number(secondEntry);
  } else if (currentOperator == "-") {
    result = Number(firstEntry) - Number(secondEntry);
  }

  screen.textContent = result;

  if (result != null && consecutiveEqual) {
    firstEntry = result;
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
        firstEntry = null;
      } else {
        firstEntry = screen.textContent;
      }
    } else {
      if (screen.textContent == 0) {
        secondEntry = null;
      } else {
        secondEntry = screen.textContent;
      }
    }
  }
});

inputRange.addEventListener("input", (event) => {
  let value = null;
  value = event.target.value;
  if (value == 2) {
    html.setAttribute("data-theme", "theme-2");
  } else if (value == 3) {
    html.setAttribute("data-theme", "theme-3");
  } else {
    html.setAttribute("data-theme", "0");
  }
});
