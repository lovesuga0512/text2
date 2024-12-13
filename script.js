const numbers = document.querySelectorAll('.number');
const func = document.querySelectorAll('.function');
const opera = document.querySelectorAll('.operator');
const display = document.querySelector('.num_view');
const point = document.querySelector('.point');
const result = document.querySelector('.result');

// 변수 선언
let firstOperand = null;
let secondOperand = null;
let operator = null;
let reset = false;

// 숫자를 눌렀을 때 디스플레이에 노출
numbers.forEach((num) => {
  num.addEventListener('click', (e) => {
    if (display.textContent === '0' || reset) {
      display.textContent = e.target.textContent;
      reset = false;
      return;
    }
    display.textContent += e.target.textContent;
  });
});

// 연산기호를 눌렀을 때 display의 내용을 저장하고 연산기호도 저장
opera.forEach((op) => {
  op.addEventListener('click', (e) => {
    if (firstOperand !== null && operator !== null && !reset) {
      secondOperand = display.textContent;
      const calcResult = calculate(firstOperand, secondOperand);
      display.textContent = calcResult;
      firstOperand = calcResult; // 결과를 firstOperand로 업데이트
    } else {
      firstOperand = display.textContent;
    }
    operator = e.target.textContent;
    reset = true;
  });
});

// =를 눌렀을 때 secondOperand를 입력 받고 결과값이 나오게 반환
result.addEventListener('click', () => {
  if (firstOperand !== null && operator !== null) {
    secondOperand = display.textContent;
    const calcResult = calculate(firstOperand, secondOperand);
    display.textContent = calcResult;
    firstOperand = calcResult; // 결과를 다음 연산에 활용
    operator = null; // 연산자 초기화
    reset = true;
  }
});

// 계산 함수
function calculate(firstOperand, secondOperand) {
  let num1 = Number(firstOperand);
  let num2 = Number(secondOperand);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return num1;
  }
}

// C 눌렀을 때 클리어
func[0].addEventListener('click', () => {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  operator = null;
  reset = false;
});

// 소수점 클릭 시 작동 로직
point.addEventListener('click', (e) => {
  if (!display.textContent.includes('.')) {
    display.textContent += e.target.textContent;
  }
});
