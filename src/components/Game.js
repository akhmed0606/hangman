import { useState, useCallback, useEffect } from "react";
import KeyboardLetter from "./KeyBoardLetter";
import GameWordLetter from "./GameWordLetter";

const Game = () => {
  const [unusedLettersArray, setUnusedLettersArray] = useState([]);
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameWordArray, setGameWordArray] = useState([]);
  const [definition, setDefinition] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
 
  const checkLetter = useCallback((e) => {
    const currentLetter =
      e.type === "keydown" ? e.key.toUpperCase() : e.target.textContent;
    // remove letter from unusedLettersArray
    setUnusedLettersArray(
      [...unusedLettersArray].filter((letter) => letter !== currentLetter)
    );
    // Check letter in charArray and return wordArray to include found letter in place of underscores
    let letterFoundInWord = false;
    const updatedWordArray = emptyWordArray.map((char, index) => {
      if (gameWordArray[index] === currentLetter) {
        letterFoundInWord = true;
        return gameWordArray[index];
      } else {
        return char;
      }
    });

    // decrement turns if letter was incorrect

    const updatedTurnsLeft = turnsLeft - 1;
    if (!letterFoundInWord) {
      setTurnsLeft(updatedTurnsLeft);

      // add letter to usedLettersArray
      setUsedLettersArray([...usedLettersArray, currentLetter]);
    }
               // Update emptyWordArray with found letters version
    setEmptyWordArray(updatedWordArray);
    if (gameWordArray.join("") === updatedWordArray.join("")) {
        setIsWinner(true);
        setShowModal(true);
      }

      if (updatedTurnsLeft === 0) {
        setShowModal(true);
      }
    },
    [emptyWordArray, gameWordArray, turnsLeft, unusedLettersArray, usedLettersArray]
  );

  return (
    <section className="gameContainer">
      <h2>Tries Left: {turnsLeft}</h2>
      <div className="container">
        {emptyWordArray.map((char, index) => {
          return (
            <span className="wordBox" key={index}>
              {char}
            </span>
          );
        })}
      </div>
      <div className="unusedLettersContainer">
        {unusedLettersArray.map((letter) => (
          <KeyboardLetter
            letter={letter}
            checkLetter={checkLetter}
            key={letter}
          />
        ))}
      </div>
      <div className="unusedLettersContainer">
        {unusedLettersArray.map((letter) => {
          return (
            <button onClick={checkLetter} key={letter}>
              {letter}
            </button>
          );
        })}
      </div>
    </section>
  );
};
export default Game;
