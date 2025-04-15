import type { MetaFunction } from '@remix-run/node';
import { useState, useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Color Challenge' },
    { name: 'description', content: 'Color challenge assessment' },
  ];
};

export default function Index() {
  const [colors, setColors] = useState<string[]>([]);
  const [answer, setAnswer] = useState<number>(0);
  const [message, setMessage] = useState<string>();
  const [showAnswer, setShowAnswer] = useState<boolean>();

  useEffect(() => {
    reset();
  }, []);

  const reset = () => {
    const newColors = [getHex(), getHex(), getHex()];
    setColors(newColors);
    setAnswer(Math.floor(Math.random() * 3));
    setMessage(undefined);
    setShowAnswer(false);
  };

  const getHex = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return `#${randomColor.padStart(6, '0')}`;
  };

  const makeGuess = (index: number) => {
    if (showAnswer === false) {
      setShowAnswer(true);
      if (index === answer) {
        setMessage('Correct!');
      } else {
        setMessage('Incorrect ☹️');
      }
    }
  };

  const renderBoxes = () => {
    return colors.map((color: string, index: number) => (
      <div
        key={index}
        className={`w-[100px] h-[100px] ${
          showAnswer
            ? answer === index
              ? 'border-green-500'
              : 'border-red-400'
            : 'border-white'
        }  border-4 hover:border-yellow-300 flex items-center justify-center`}
        style={{ backgroundColor: color }}
        onClick={() => makeGuess(index)}
      >
        {showAnswer ? <p>{color}</p> : null}
      </div>
    ));
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-4xl'>Color Guessing Game</h1>
      <h3 className='p-8'>Your Hex: {colors[answer]}</h3>
      <div className='flex gap-2'>{renderBoxes()}</div>
      <section className='p-8'>{message ? <h2>{message}</h2> : null}</section>
      {showAnswer ? (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => reset()}
        >
          Play again
        </button>
      ) : null}
    </div>
  );
}
