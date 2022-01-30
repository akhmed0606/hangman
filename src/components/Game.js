import { useState } from 'react';

const Game = ({ gameWordArray, setIsGameStarted }) => {
 
  const [unusedLettersArray, setUnusedLettersArray] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(""));
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState(gameWordArray.map((char) => (char === ' ' ? ' ' : '_')));
  const [turnsLeft, setTurnsLeft] = useState(6);

  const checkLetter = (e) => {
    const currentLetter = e.type === 'keydown' ? e.key.toUpperCase() : e.target.textContent;
    // remove letter from unusedLettersArray
    setUnusedLettersArray([...unusedLettersArray].filter((letter) => letter !== currentLetter));
    // check letter in charArray
    console.log(gameWordArray);
    let letterFoundInWord = false;
    const updatedWordArray = emptyWordArray.map((char, index) => {
      if (gameWordArray[index] === currentLetter) {
        letterFoundInWord = true;
        return gameWordArray[index];
      } else {
        return char;
      }
    });
    // decrememnt turnsLeft if letter was incorrect
    const newTurnsLeft = turnsLeft - 1;
    if (!letterFoundInWord) {
      setTurnsLeft(newTurnsLeft);
      // add letter to usedLettersArray
      setUsedLettersArray([...usedLettersArray, currentLetter]);
    }

    setEmptyWordArray(updatedWordArray);
    if (gameWordArray.join('') === updatedWordArray.join('')) {
      alert('You win!');
      setIsGameStarted(false);
    }
    if (newTurnsLeft === 0) {
      alert('You Lose :(');
      setIsGameStarted(false);
    }
  };



  return(
    <section className='gameContainer'>
    <h2>Tries Left: {turnsLeft}</h2>
    <div className='container'>
      {emptyWordArray.map((char, index) => {
        return (
          <span className='wordBox' key={index}>
            {char}
          </span>
        );
      })}
    </div>
    <div className='usedLettersContainer'>
      {usedLettersArray.map((letter) => {
        return <span className='wordBox'>{letter}</span>;
      })}
    </div>
    <div className='unusedLettersContainer'>
      {unusedLettersArray.map((letter) => {
        return (
          <button onClick={checkLetter} key={letter}>
            {letter}
          </button>
        );
      })}
    </div>
  </section>
  )
}
export default Game;