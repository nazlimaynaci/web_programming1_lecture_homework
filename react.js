const { useState, useEffect } = React;

// ----- Nazlım: Calculator App -----
function Calculator() {
  const [input, setInput] = useState('');
  const handleClick = (value) => {
    if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(prev => prev + value);
    }
  };

  const buttons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'];

  return (
    <div className="calculator">
      <input value={input} readOnly />
      <div className="calculator-buttons">
        {buttons.map((btn, i) => (
          <button key={i} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}