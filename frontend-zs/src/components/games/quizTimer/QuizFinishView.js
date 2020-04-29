import React from 'react';
import './QuizFinishView.css';

function QuizFinishView({ results }) {
  const all = results.length;
  const correct = results.filter(result => result).length;
  const text = correct > 0 ? "Glückwunsch!" : "Schade!";
  return (
    <div className="quiz-finish-view">
      <div className="congratulations">{ text }</div>
      <div className="message">
        Du hast { correct } von { all } Fragen richtig beantwortet!
      </div>
    </div>
  );
}

export default QuizFinishView;