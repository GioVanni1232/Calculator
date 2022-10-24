const calculator = document.querySelector(".calculator");
const button = calculator.querySelector(".calculator-buttons");
const display = calculator.querySelector(".display");
const upDisplay = calculator.querySelector(".display-up");

button.addEventListener("click", (e) => {
  const key = e.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else display.textContent += keyValue;
  }

  if (type === "operator") {
    const operatorKey = button.querySelectorAll('[data-type = "operator"]');
    operatorKey.forEach((element) => {
      element.dataset.state = " ";
    });
    const state = (key.dataset.state = "selected");

    if (state === "selected") {
      const sign = key.dataset.sign;
      upDisplay.textContent = displayValue + sign;
    }

    display.textContent = "0";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equals") {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    display.textContent = calculate(firstNumber, operator, secondNumber);
    upDisplay.textContent = " ";
  }

  if (type === "clear") {
    display.textContent = "0";
    upDisplay.textContent = " ";
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(num1, operator, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  if (operator === "plus") return num1 + num2;
  if (operator === "minus") return num1 - num2;
  if (operator === "divide") return num1 / num2;
  if (operator === "times") return num1 * num2;
}
