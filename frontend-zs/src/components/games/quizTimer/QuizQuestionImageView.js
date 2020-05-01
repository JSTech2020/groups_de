import React from 'react';
import QuizQuestionView from './QuizQuestionView';
import './QuizQuestionImageView.scss';

function QuizQuestionImageView({ question, questionCount, questionIndex, resultAnswer, onClick }) {
  const imgSrc = String.fromCharCode.apply(null, question.image.data.data);
  return (
    <QuizQuestionView
      question={question}
      questionCount={questionCount}
      questionIndex={questionIndex}
      onClick={onClick}
      resultAnswer={resultAnswer}
    >
      <img src={imgSrc} alt="Question"></img>
    </QuizQuestionView>
  );
}

export default QuizQuestionImageView;