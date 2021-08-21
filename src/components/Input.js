import React from "react";

const Input = ({ text, started, onBlur, onKeyChange, onSubmitWord }) => {
  return (
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
          }
        }}
      />
    </div>
  );
};

export default Input;
