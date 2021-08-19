import { useState, useEffect } from "react";

const DisplayBoard = ({ displayText }) => {
  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState([-1, -1]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <p>{displayText}</p>
      <div class="input-cont">
        <input
          type="text"
          id="text"
          placeholder="Start typing..."
          autocomplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
              setText("");
            }
          }}
        />
      </div>
      <span>Timer: {timer} seconds</span>
    </div>
  );
};

export default DisplayBoard;
