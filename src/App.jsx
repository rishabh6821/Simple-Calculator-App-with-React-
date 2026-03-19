import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operand, setOperand] = useState(null);
  const [storedValue, setStoredValue] = useState(null);

  const handleInput = (value) => {
    setDisplayValue(displayValue === '0' ? value : displayValue + value);
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) setDisplayValue(displayValue + '.');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperand(null);
    setStoredValue(null);
  };

  const handleToggleSign = () => {
    setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
  };

  const handlePercent = () => {
    setDisplayValue((prev) => (parseFloat(prev) / 100).toString());
  };

  const handleOperation = (operator) => {
    const inputValue = parseFloat(displayValue);
    if (storedValue === null) {
      setStoredValue(inputValue);
      setOperand(operator);
      setDisplayValue('0');
    } else {
      const result = calculate(storedValue, inputValue, operand);
      setStoredValue(result);
      setOperand(operator);
      setDisplayValue('0');
    }
  };

  const handleEquals = () => {
    if (storedValue === null) return;
    const inputValue = parseFloat(displayValue);
    const result = calculate(storedValue, inputValue, operand);
    setDisplayValue(result.toString());
    setStoredValue(null);
    setOperand(null);
  };

  const calculate = (storedValue, inputValue, operator) => {
    try {
      switch (operator) {
        case '+': return storedValue + inputValue;
        case '-': return storedValue - inputValue;
        case '*': return storedValue * inputValue;
        case '/': 
          if (inputValue === 0) throw new Error("Division by zero");
          return storedValue / inputValue;
        case '^': return Math.pow(storedValue, inputValue);
        default: return storedValue;
      }
    } catch (error) {
      return "Error";
    }
  };

  // Scientific functions
  const handleScientific = (func) => {
    const value = parseFloat(displayValue);
    let result;
    switch (func) {
      case 'sqrt': result = Math.sqrt(value); break;
      case 'sin': result = Math.sin(value); break;
      case 'cos': result = Math.cos(value); break;
      case 'tan': result = Math.tan(value); break;
      default: result = value;
    }
    setDisplayValue(result.toString());
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keys">
        <button onClick={handleClear}>AC</button>
        <button onClick={handleToggleSign}>+/-</button>
        <button onClick={handlePercent}>%</button>
        <button className="operation" onClick={() => handleOperation('/')}>÷</button>

        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button className="operation" onClick={() => handleOperation('*')}>×</button>

        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button className="operation" onClick={() => handleOperation('-')}>−</button>

        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button className="operation" onClick={() => handleOperation('+')}>+</button>

        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="equals" onClick={handleEquals}>=</button>

        {/* Scientific buttons */}
        <button onClick={() => handleScientific('sqrt')}>√</button>
        <button onClick={() => handleOperation('^')}>x^y</button>
        <button onClick={() => handleScientific('sin')}>sin</button>
        <button onClick={() => handleScientific('cos')}>cos</button>
        <button onClick={() => handleScientific('tan')}>tan</button>
      </div>
    </div>
  );
}

export default App;
