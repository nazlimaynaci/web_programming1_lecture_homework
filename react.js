const root = ReactDOM.createRoot(document.getElementById("react-root"));
function CalculatorApp() {
  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [result, setResult] = React.useState(null);

  function calculate(op) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Invalid input");
      return;
    }

    let res = 0;
    switch (op) {
      case "+": res = a + b; break;
      case "-": res = a - b; break;
      case "*": res = a * b; break;
      case "/": res = b !== 0 ? a / b : "Division by 0"; break;
    }
    setResult(res);
  }

  return React.createElement("div", null,
    React.createElement("h2", null, "Simple Calculator"),
    React.createElement("input", {
      type: "number",
      placeholder: "First number",
      value: num1,
      onChange: e => setNum1(e.target.value)
    }),
    React.createElement("input", {
      type: "number",
      placeholder: "Second number",
      value: num2,
      onChange: e => setNum2(e.target.value)
    }),
    React.createElement("div", null,
      ["+", "-", "*", "/"].map(op =>
        React.createElement("button", { key: op, onClick: () => calculate(op) }, op)
      )
    ),
    result !== null && React.createElement("p", null, `Result: ${result}`)
  );
}
const generateFood = () => {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  return { x, y };
};

function SnakeGame() {
  const [snake, setSnake] = React.useState([[0, 0]]);
  const [direction, setDirection] = React.useState("RIGHT");
  const [food, setFood] = React.useState(generateFood());
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp": if (direction !== "DOWN") setDirection("UP"); break;
        case "ArrowDown": if (direction !== "UP") setDirection("DOWN"); break;
        case "ArrowLeft": if (direction !== "RIGHT") setDirection("LEFT"); break;
        case "ArrowRight": if (direction !== "LEFT") setDirection("RIGHT"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  React.useEffect(() => {
    const interval = setInterval(moveSnake, 300);
    return () => clearInterval(interval);
  }, [snake, direction]);

  function moveSnake() {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    let newHead;

    switch (direction) {
      case "UP": newHead = [head[0], head[1] - 1]; break;
      case "DOWN": newHead = [head[0], head[1] + 1]; break;
      case "LEFT": newHead = [head[0] - 1, head[1]]; break;
      case "RIGHT": newHead = [head[0] + 1, head[1]]; break;
    }

    if (
      newHead[0] < 0 || newHead[0] >= gridSize ||
      newHead[1] < 0 || newHead[1] >= gridSize ||
      snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      alert("Game over! Skor: " + score);
      setSnake([[0, 0]]);
      setDirection("RIGHT");
      setFood(generateFood());
      setScore(0);
      return;
    }

    newSnake.push(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(score + 1);
      setFood(generateFood());
    } else {
      newSnake.shift(); 
    }

    setSnake(newSnake);
  }

  const cells = [];
for (let y = 0; y < gridSize; y++) {
  for (let x = 0; x < gridSize; x++) {
    const isSnake = snake.some(seg => seg[0] === x && seg[1] === y);
    const isFood = food[0] === x && food[1] === y;
    const className = `snake-cell ${isSnake ? "active" : ""} ${isFood ? "food" : ""}`;
    cells.push(
      React.createElement("div", {
        key: `${x}-${y}`,
        className: className
      })
    );
  }
}

return React.createElement("div", { className: "snake-game" },
  React.createElement("h3", null, "Snake Game (Mini Grid)"),
  React.createElement("p", null, `Score: ${score}`),
  React.createElement("div", { className: "snake-grid" }, cells),
  React.createElement("p", null, "Use arrow keys to move the snake.")
);
}

document.getElementById("btn-calculator").addEventListener("click", () => {
  highlightButton("btn-calculator");
  root.render(React.createElement(CalculatorApp));
});

document.getElementById("btn-snake").addEventListener("click", () => {
  highlightButton("btn-snake");
  root.render(React.createElement(SnakeGame));
});

root.render(React.createElement(CalculatorApp));
highlightButton("btn-calculator");

function highlightButton(id) {
  document.querySelectorAll(".menu button").forEach((btn) => btn.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}