import React from 'react';
import "./QuizButton.scss";

function QuizButton({ text, resultClass, onClick }) {
  return (
    <button className={`quiz-button ${resultClass}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default QuizButton;