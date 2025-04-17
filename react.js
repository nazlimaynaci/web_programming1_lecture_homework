const { useState, useEffect } = React;
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
}function SnakeGame() {
  const [snake, setSnake] = useState([{x: 10, y: 10}]);
  const [food, setFood] = useState({x: 5, y: 5});
  const [direction, setDirection] = useState('RIGHT');

  useEffect(() => {
    const move = () => {
      const head = { ...snake[0] };
      if (direction === 'RIGHT') head.x++;
      if (direction === 'LEFT') head.x--;
      if (direction === 'UP') head.y--;
      if (direction === 'DOWN') head.y++;

      const newSnake = [head, ...snake.slice(0, -1)];

      if (head.x === food.x && head.y === food.y) {
        newSnake.push({...snake[snake.length - 1]});
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      }

      setSnake(newSnake);
    };

    const interval = setInterval(move, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowUp': setDirection('UP'); break;
        case 'ArrowDown': setDirection('DOWN'); break;
        case 'ArrowLeft': setDirection('LEFT'); break;
        case 'ArrowRight': setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const cells = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      let className = '';
      if (snake.some(s => s.x === x && s.y === y)) className = 'snake-cell';
      if (food.x === x && food.y === y) className = 'food-cell';
      cells.push(<div key={`${x}-${y}`} className={className}></div>);
    }
  }

  return (
    <div className="snake-game">
      <div id="game-board">{cells}</div>
      <p>Use Arrow Keys to Move</p>
    </div>
  );
}
