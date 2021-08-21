import React from "react";

const Scoreboard = ({ timer, userInput, displayText }) => {
  const characterScore = () => {
    let score = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === displayText[i]) {
        score += 1;
      }
    }
    let accuracy = (score / userInput.length) * 100;
    return accuracy.toFixed(2);
  };
  return (
    <div className="scoreboard">
      <span>Timer: {timer} seconds</span>
      <span>Score: {characterScore()}</span>
    </div>
  );
};

export default Scoreboard;
