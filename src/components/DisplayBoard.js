import React from "react";
import TypingInput from "./TypingInput";

const DisplayBoard = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
      <TypingInput displaytext={text} />
    </div>
  );
};

export default DisplayBoard;
