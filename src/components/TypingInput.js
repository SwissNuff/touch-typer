import React, { useState } from "react";

const TypingInput = ({ displaytext }) => {
  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState([-1, -1]);

  return (
    <div class="input-cont">
      <input
        type="text"
        id="text"
        placeholder="Type here..."
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
  );
};

export default TypingInput;
