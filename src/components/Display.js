import React from "react";

const Display = ({ displayText, startHighlight, endHighlight, userInput }) => {
  return (
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
  );
};

export default Display;
