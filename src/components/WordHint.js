import React from "react";

const WordHint = ({ definition, showHint, setShowHint }) => {
  return (
    <div>
      {!showHint ? (
        <button onClick={() => setShowHint(true)}>Show Hint (-200 pts)</button>
      ) : (
        <p>
          <span>Hint:</span>
        <p> {definition} </p> 
        </p>
      )}
    </div>
  );
};



export default WordHint;