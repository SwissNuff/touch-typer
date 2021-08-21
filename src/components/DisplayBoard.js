import { useState, useEffect } from "react";
import Display from "./Display";
import Input from "./Input";
import Scoreboard from "./Scoreboard";

const DisplayBoard = ({ displayText }) => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [countInputWords, setCountInputWords] = useState(0);
  const [startHighlight, setStartHighlight] = useState(0);

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

  // const onSubmitWord = (e) => {
  //   checkFinished();
  //   setUserInput(inputCleanup(userInput));
  //   e.preventDefault();
  //   setText("");

  //   setStartHighlight(
  //     (prevStartHighlight) => displayText.indexOf(" ", prevStartHighlight) + 1
  //   );
  // };

  // const characterScore = () => {
  //   let score = 0;
  //   for (let i = 0; i < userInput.length; i++) {
  //     if (userInput[i] === displayText[i]) {
  //       score += 1;
  //     }
  //   }
  //   let accuracy = (score / userInput.length) * 100;
  //   return accuracy.toFixed(2);
  // };

  const endHighlight = displayText.indexOf(" ", startHighlight + 1) - 1;

  const checkFinished = () => {
    console.log(displayText.length, endHighlight);
    if (endHighlight + 2 >= displayText.length) {
      setFinished(true);
    }
  };
  return (
    <div>
      {/* <Display
        displayText={displayText}
        startHighlight={startHighlight}
        endHighlight={endHighlight}
        userInput={userInput}
        started={started}
      /> */}
      <Input
        text={text}
        countInputWords={countInputWords}
        userInput={userInput}
        onBlur={onBlur()}
        onKeyChange={onKeyChange}
        started={started}
      />
      {/* <Scoreboard
        timer={timer}
        userInput={userInput}
        displayText={displayText}
      /> */}
    </div>
  );
};

export default DisplayBoard;
