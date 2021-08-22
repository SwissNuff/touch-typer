import { useState, useEffect } from "react";

const DisplayBoard = () => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [loadNewGame, setLoadNewGame] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [countInputWords, setCountInputWords] = useState(0);
  const [startHighlight, setStartHighlight] = useState(0);
  const [displayText, setDisplayText] = useState("Loading...");
  const [score, setScore] = useState(0);

  // For fetching Game of Thrones Qoute API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://got-quotes.herokuapp.com/quotes");
        const json = await response.json();
        setDisplayText(json.quote.replace(/[.,*’'`!?]/g, "") + " ");
      } catch (error) {
        console.log("error", error);
      }
      reset();
    };
    fetchData();
  }, [loadNewGame]);

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
  }, [started, loadNewGame]);

  const onKeyChange = (e) => {
    setText(e.target.value);
    if (!started) {
      setStarted(true);
    }
  };

  const onBlur = () => {
    setStarted(false);
    reset();
  };

  const reset = () => {
    setText("");
    setUserInput("");
    setCountInputWords(0);
    setStartHighlight(0);
  };

  const inputCleanup = (prevInput) => {
    if (prevInput === "") {
      prevInput = prevInput + text;
    } else {
      prevInput = prevInput + " " + text;
    }
    while (prevInput.length <= endHighlight) {
      prevInput += "0";
    }
    return prevInput.slice(0, endHighlight + 1);
  };

  const onSubmitWord = (e) => {
    setUserInput(inputCleanup(userInput));
    e.preventDefault();
    setText("");
    checkIsFinished();
    setStartHighlight(
      (prevStartHighlight) => displayText.indexOf(" ", prevStartHighlight) + 1
    );
  };

  const characterScore = () => {
    let score = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === displayText[i]) {
        score += 1;
      }
    }
    return score;
  };

  const endHighlight = displayText.indexOf(" ", startHighlight + 1) - 1;

  const checkIsFinished = () => {
    if (endHighlight + 2 >= displayText.length) {
      setLoadNewGame((prevCount) => prevCount + 1);
      setScore(Math.round(((60 / timer) * characterScore()) / 8));
    }
  };

  return (
    <div>
      <p>
        {displayText.split("").map((char, index) => {
          let highlightWord = startHighlight <= index && index <= endHighlight;
          let highlight;
          let color;

          if (index < userInput.length) {
            color = char === userInput[index] ? "green" : "maroon";
          }
          if (!started) {
            color = "gray";
          }
          if (highlightWord) {
            highlight = "lightgray";
          }
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
            if (e.key === "Escape") {
              setLoadNewGame((prevCount) => prevCount + 1);
            }
          }}
        />
      </div>
      <div className="scoreboard">
        <span>Timer: {timer} seconds</span>
        <span>
          Accuracy: {((characterScore() / userInput.length) * 100).toFixed(2)}
        </span>
        {loadNewGame > 0 ? (
          <>
            <span style={{ color: "green" }}>WPM: {score}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayBoard;
