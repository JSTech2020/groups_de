import React from 'react';
import './AnswerCircles.css';
import CorrectAnswerCircle from './CorrectAnswerCircle';

function AnswerCircles({ answersCorrect }) {
  const answers = answersCorrect.map((correct, index) => {
    return (<CorrectAnswerCircle key={index} correct={correct}></CorrectAnswerCircle>);
  });

  return (
    <div className="answer-circles">
      { answers }
    </div>
  );
}

export default AnswerCircles;