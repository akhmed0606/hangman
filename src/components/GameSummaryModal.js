import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "./firebaseConfig";

const GameSummaryModal = ({ setIsLoaded, isWinner, setShowModal, score, word }) => {
  const [userInput, setUserInput] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleClose = () => {
    setIsLoaded(false);
    setShowModal(false);
  };

  // Record date of high score, for now only to the server
  const todayArray = new Date().toDateString().split(" ");
  const myDate = `${todayArray[1]} ${todayArray[2]}, ${todayArray[3]}`;

  const addToLeaderboard = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push({
      username: userInput,
      score: score,
      date: myDate,
      word: word,
    });
    setShowForm(false);
  };

  return (
    <div className="modalRoot">
      <div className="modal">
        <h2>{isWinner ? "You did it!" : "Thanks for playing! Please try again."}</h2>
        <p>Your game word was: </p>
        <p className="featureText">{word}</p>
        {isWinner && showForm ? (
          <div>
            <p>Your finished with a score of:</p>
            <p className="featureText">{score}</p>
            <form className="leaderboardForm" onSubmit={addToLeaderboard}>
              <label htmlFor="leaderboardName">Enter your name for the leaderboard:</label>
              <input
                type="text"
                id="leaderboardName"
                placeholder="Name (8 chars max)"
                maxLength={8}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : isWinner ? (
          <div className="formConfirmation">
            <p>Thank you! Your entry of </p>
            <p>
              Name: <span>{userInput}</span> <br />
              Score: <span>{score}</span>
            </p>{" "}
            <p> has been added to the leaderboard.</p>
          </div>
        ) : null}
        <div className="buttonContainer">
          <Link className="buttonLink" to="/game" onClick={handleClose}>
            Play Again
          </Link>
          <Link className="buttonLink" to="/leaderboard" onClick={handleClose}>
            Leaderboard
          </Link>
          <Link className="buttonLink" to="/" onClick={handleClose}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

GameSummaryModal.propTypes = {
  setIsLoaded: PropTypes.func,
  isWinner: PropTypes.bool,
  setShowModal: PropTypes.func,
  score: PropTypes.number,
  word: PropTypes.string,
};

export default GameSummaryModal;