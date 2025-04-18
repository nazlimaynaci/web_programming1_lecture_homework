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
function SnakeGame() {
  const gridSize = 10;
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    function handleKey(e) {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === "ArrowUp") newY = Math.max(0, prev.y - 1);
        if (e.key === "ArrowDown") newY = Math.min(gridSize - 1, prev.y + 1);
        if (e.key === "ArrowLeft") newX = Math.max(0, prev.x - 1);
        if (e.key === "ArrowRight") newX = Math.min(gridSize - 1, prev.x + 1);

        return { x: newX, y: newY };
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const cells = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isSnake = position.x === x && position.y === y;
      cells.push(
        React.createElement("div", {
          key: `${x}-${y}`,
          style: {
            width: "20px",
            height: "20px",
            backgroundColor: isSnake ? "green" : "#eee",
            border: "1px solid #ccc",
          },
        })
      );
    }
  }

  return React.createElement("div", null,
    React.createElement("h2", null, "Snake Game (Mini Grid)"),
    React.createElement("p", null, "Use arrow keys to move the snake."),
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 20px)`,
        gap: "2px",
        width: "fit-content",
        margin: "10px 0"
      }
    }, cells)
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