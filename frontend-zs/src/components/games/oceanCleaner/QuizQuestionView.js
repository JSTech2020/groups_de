import React from 'react';
import AnswerButtons from './AnswerButtons';

function QuizQuestionView({ question, questionCount, questionIndex, resultAnswer, children, onClick }) {
    return (
        <div className="quiz-question-view">
            <div className="quiz-question-content">
                <div className="answer-buttons-area">
                    <AnswerButtons
                        onClick={onClick}
                        answers={question.answers}
                        resultAnswer={resultAnswer}
                        answerButtonOrder={question.answerButtonOrder}
                    />
                </div>
            </div>
        </div>
    );
}

export default QuizQuestionView;