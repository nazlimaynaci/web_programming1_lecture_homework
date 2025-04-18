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
