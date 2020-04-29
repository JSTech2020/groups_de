import React from 'react';
import './CorrectAnswerCircle.css';

function CorrectAnswerCircle({ correct }) {
  let content = '';
  let colorClass = '';
  if (correct === true) {
    content = '✔️';
    colorClass = 'correct';
  } else if (correct === false) {
    content = '❌';
    colorClass = 'wrong';
  }

  return (
    <div className="correct-answer-circle">
      <div className={"circle " + colorClass}>
        <span>{ content }</span>
      </div>
    </div>
  );
}

export default CorrectAnswerCircle;