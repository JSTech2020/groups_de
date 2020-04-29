import React from 'react';
import QuizQuestionView from './QuizQuestionView';
import './QuizQuestionImageView.scss';

function QuizQuestionImageView({ question, questionCount, questionIndex, resultAnswer, onClick }) {
  const imageSrc = `./../images/${question.image}`;
  return (
    <QuizQuestionView
      question={question}
      questionCount={questionCount}
      questionIndex={questionIndex}
      onClick={onClick}
      resultAnswer={resultAnswer}
    >
      <img src={imageSrc} alt="Demo"></img>
    </QuizQuestionView>
  );
}

export default QuizQuestionImageView;