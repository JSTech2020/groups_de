import React from 'react';
import QuizButton from './QuizButton';
import './AnswerButtons.css';

function AnswerButtons({ answers, answerButtonOrder, resultAnswer, onClick }) {

  const { resultIdx, resultSuccess } = resultAnswer;

  const buttons = answers.map((answer, index) => {
    let resultClass = '';
    if (index === resultIdx) {
      resultClass = resultSuccess ? 'correct' : 'wrong';
    }
    return (<QuizButton
      key={index}
      text={answer}
      resultClass={resultClass}
      onClick={() => onClick(index)}
    ></QuizButton>)
  })
  const answersOrdered = answerButtonOrder.map(randIdx => buttons[randIdx]);

  return (
    <div className="answer-buttons">
      {answersOrdered}
    </div>
  );
}

export default AnswerButtons;