import { useState, useEffect } from "react";

const DisplayBoard = ({ displayText }) => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [countInputWords, setCountInputWords] = useState(0);

  useEffect(() => {
    if (!started) {
      return;
    }
    const intervalID = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => {
      clearInterval(intervalID);
      setTimer(0);
    };
  }, [started]);

  const onKeyChange = (e) => {
    setText(e.target.value);
    if (!started) {
      setStarted(true);
    }
  };

  const onBlur = () => {
    setStarted(false);
    setText("");
    setUserInput("");
    setCountInputWords(0);
  };

  const onSubmitWord = (e) => {
    setUserInput((prevInput) =>
      prevInput === "" ? prevInput + text : prevInput + " " + text
    );
    e.preventDefault();
    setText("");
  };

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
    <div>
      <p>
        {displayText.split("").map((char, index) => {
          let highlight;
          let color;

          if (index < userInput.length) {
            color = char === userInput[index] ? "green" : "maroon";
          }
          if (!started) {
            color = "gray";
          }
          // if (userInput.length + index < userInput.length + 5) {
          //   highlight = char === userInput[index] ? "gray" : "lightgray";
          // }
          return (
            <span
              key={index}
              style={{ color: color, backgroundColor: highlight }}
            >
              {char}
            </span>
          );
        })}
      </p>

      <div className="input-cont">
        <input
          type="text"
          id="text"
          placeholder="Type here..."
          autoComplete="off"
          value={text}
          onBlur={onBlur}
          onChange={onKeyChange}
          onKeyDown={(e) => {
            if (e.key === " ") {
              onSubmitWord(e);
              setCountInputWords((prevCount) => prevCount + 1);
            }
          }}
        />
      </div>
      <div className="scoreboard">
        <span>Timer: {timer} seconds</span>
        <span>Score: {characterScore()}</span>
      </div>
    </div>
  );
};

export default DisplayBoard;
