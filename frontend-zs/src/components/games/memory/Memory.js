import React from "react";
import MemoryGame from "./index.js";

function Memory({ questions, onFinish }) {
  return (
    <div className="memory-game">
      <MemoryGame questions={questions} onFinish={onFinish} />
    </div>
  );
}

export default Memory;
