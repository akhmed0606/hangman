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

  const checkLetter = useCallback(
    (e) => {
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
    [
      emptyWordArray,
      gameWordArray,
      turnsLeft,
      unusedLettersArray,
      usedLettersArray,
    ]
  );

  // On page load, generate a new word and word hint(definition)
  useEffect(() => {
    if (!showModal) {
      // Get a random word from random-word-api
      const randomWordUrl = new URL(
        `https://random-word-api.herokuapp.com/word`
      );
      randomWordUrl.search = new URLSearchParams({
        swear: 1,
        number: 1,
      });
      const fetchData = (count = 0) => {
        // Increment count
        count++;
        fetch(randomWordUrl)
          .then((res) => res.json())
          .then((data) => {
            // Set word to the charArray
            setGameWordArray(data[0].toUpperCase().split(""));
            // Get the definition of the word
            const apiKey = `${process.env.REACT_APP_DICTIONARY_API_KEY}`;
            const definitionUrl = new URL(
              `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${data[0]}`
            );
            definitionUrl.search = new URLSearchParams({
              key: apiKey,
            });
            fetch(definitionUrl)
              .then((res) => res.json())
              .then((data) => {
                // If there is no definition for the word
                if (data[0].shortdef === undefined) {
                  throw new Error("No Definition found for word.");
                }
                // Get a random definition
                const randomIdx = Math.floor(
                  Math.random() * data[0].shortdef.length
                );
                setDefinition(data[0].shortdef[randomIdx]);
                // Set isLoaded state
                setIsLoaded(true);
              })
              .catch((error) => {
                setDefinition(`${error}`);
                // Try again with recursion if no definition is found.
                if (count <= 3) {
                  fetchData(count);
                }
              });
          });
      };
      fetchData();
    }
  }, [showModal]);

  return (
    <section className="gameContainer">
      <h2>Tries Left: {turnsLeft}</h2>
      <div className="container">
        {emptyWordArray.map((char, id) => {
          return (
            <span className="wordBox" key={id}>
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
