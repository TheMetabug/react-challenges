import React, { useState } from 'react';

const CounterComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className='flex' id='counter-module'>
      <button className='counter-btn icon-minus rounded-full' onClick={decrementCount}>-</button>
      <p className='counter-value px-5'>{count}</p>
      <button className='counter-btn icon-add rounded-full' onClick={incrementCount}>+</button>
    </div>
  );
};

export default CounterComponent