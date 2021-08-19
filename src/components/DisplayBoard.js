import { useState, useEffect } from "react";

const DisplayBoard = ({ displayText }) => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (started && !finished) {
      var intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalID); // Not working
    }
  }, [started]);

  const onKeyChange = (e) => {
    setText(e.target.value);
    if (!started) {
      setStarted(true);
    }
  };

  const onBlur = () => {
    setTimer(0);
    setFinished(true);
  };

  const onSubmitWord = (e) => {
    e.preventDefault();
    setText("");
    setIsCorrect(true);
  };

  return (
    <div>
      <p>
        {displayText.split("").map((char, index) => {
          let highlight;

          if (index < text.length) {
            highlight = char === text[index] ? "green" : "gray";
          }
          return (
            <span key={0} style={{ backgroundColor: highlight }}>
              {char}
            </span>
          );
        })}
      </p>

      <div class="input-cont">
        <input
          type="text"
          id="text"
          placeholder="Type here..."
          autocomplete="off"
          value={text}
          onBlur={onBlur}
          onChange={onKeyChange}
          onKeyDown={(e) => {
            if (e.key === " ") {
              onSubmitWord(e);
            }
          }}
        />
      </div>
      <span>Timer: {timer} seconds</span>
    </div>
  );
};

export default DisplayBoard;
