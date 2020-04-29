import React from 'react';

function QuizButton({ text, resultClass, onClick }) {
    return (
        <button className={`quiz-button ${resultClass}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default QuizButton;