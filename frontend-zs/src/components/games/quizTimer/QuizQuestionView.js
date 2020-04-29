import React from 'react';
import AnswerButtons from './AnswerButtons';
import "./QuizQuestionView.css";

function QuizQuestionView({ question, questionCount, questionIndex, resultAnswer, children, onClick }) {
  return (
    <div className="quiz-question-view">
      <div className="quiz-question-content">
        <div className="question-area">
          <div className="question-index">
            Frage {questionIndex} von {questionCount}
          </div>
          <div className="the-question">
            {question.question}
          </div>
        </div>
        <div className="media-area">
          {children}
        </div>
        <div className="answer-buttons-area">
          <AnswerButtons
            onClick={onClick}
            answers={question.answers}
            resultAnswer={resultAnswer}
            answerButtonOrder={question.answerButtonOrder}
          ></AnswerButtons>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestionView;