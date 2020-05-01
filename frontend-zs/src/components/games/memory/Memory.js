import React, { useState, useEffect } from "react";
import MemoryGame from "./index.js";

function Memory({ questions, gameId, onFinish }) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
  const [height, setHeight] = useState(viewportHeight - 150);

  function updateHeight() {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
      setHeight(viewportHeight - 150);
  }

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
});

  return (
    <div className="memory-game" style={{height}}>
      <MemoryGame questions={questions} gameId={gameId} onFinish={onFinish} />
    </div>
  );
}

export default Memory;
