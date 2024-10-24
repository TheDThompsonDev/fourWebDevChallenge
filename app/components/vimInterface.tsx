"use client";
import React, { useState, useEffect, useRef } from "react";

type props = {
  clickCount: number;
};

const VimInterface: React.FC<props> = ({ clickCount }) => {
  const [vimInput, setVimInput] = useState("");
  const vimInputRef = useRef<HTMLInputElement>(null);
  const [stuck, setStuck] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const stuckElement = () => {
    if (stuck === true) {
      return <p className="vim-message">"You can't escape VIM!"</p>;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && stuck === false) {
      e.preventDefault();
      const newLines = vimInput.split("\n");
      const currentLine = 0;
      newLines[currentLine] = "";
      setVimInput(newLines.join("\n"));
    }
  };

  useEffect(() => {
    if (vimInput.includes(":q") || vimInput.includes(":wq")) {
      setStuck(true);
    }
  }, [vimInput]);

  useEffect(() => {
    if (clickCount >= 5 && vimInputRef.current) {
      vimInputRef.current.focus();
    }
  }, [clickCount]);

  const handleVimInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVimInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  return (
    <div className="vim-interface">
      <div className="vim-header">VIM - /usr/bin/vim</div>
      <div className="vim-body">
        <p className="vim-line">
          <span className="vim-prompt">:</span>
          <input
            ref={vimInputRef}
            type="text"
            value={vimInput}
            onChange={handleVimInput}
            className="vim-input"
            onKeyDown={handleKeyDown}
          />
          <span
            className="vim-cursor"
            style={{ left: `${cursorPosition * 0.6}em` }}
          >
            █
          </span>
        </p>
        {stuckElement()}
      </div>
    </div>
  );
};
export default VimInterface;
