import React, { useState } from 'react';
import "./QuizGameView.scss";
import TimerBar from './TimerBar';
import QuizQuestionView from './QuizQuestionView';
import QuizQuestionImageView from './QuizQuestionImageView';
import AnswerCircles from './AnswerCircles';

function QuizGameView({ questions, gameOverCallback, results, userAnswerClick }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [resultAnswer, setResultAnswer] = useState({resultIdx: -1, resultSuccess: null});

  const currentQuestion = questions[questionIndex];

  // Callback for when the user clicks on an answer
  const userSelectAnswer = (answerNumber) => {
    setTimerActive(false);
    userAnswerClick(answerNumber, questionIndex);

    // Display clicked button result
    setResultAnswer({
      resultIdx: answerNumber,
      resultSuccess: answerNumber === currentQuestion.correctAnswer,
    })

    const nextQuestion = () => {
      // Check if there are still questions remaining
      if (questionIndex + 1 < questions.length) {
        setResultAnswer({resultIdx: -1, resultSuccess: null});
        setQuestionIndex(questionIndex + 1);
        setTimerActive(true);
        setResetTimer(true);
      } else {
        gameOverCallback();
      }
    }

    // Display next question after a short delay
    setTimeout(nextQuestion, 2000);
  }

  // Callback for reseting the reset timer variable :)
  const resetTimerCallback = () => setResetTimer(false);

  // (could move QuizQuestionImageView to the same component...?)
  let currentQuestionView;
  if (currentQuestion.image) {
    currentQuestionView = (
      <QuizQuestionImageView
        question={currentQuestion}
        questionCount={questions.length}
        questionIndex={questionIndex + 1}
        onClick={userSelectAnswer}
        resultAnswer={resultAnswer}
      ></QuizQuestionImageView>
    );
  } else {
    currentQuestionView = (
      <QuizQuestionView
        question={currentQuestion}
        questionCount={questions.length}
        questionIndex={questionIndex + 1}
        onClick={userSelectAnswer}
        resultAnswer={resultAnswer}
      >
      </QuizQuestionView>
    );
  }

  return (
    <div className="quiz-game-view">
      <TimerBar
        fullTime={50}
        resetTimer={resetTimer}
        resetTimerCallback={resetTimerCallback}
        timeOutCallback={() => userSelectAnswer(-1)}
        active={timerActive}
      ></TimerBar>
      { currentQuestionView }
      <AnswerCircles answersCorrect={results}></AnswerCircles>
    </div>
  );
}




export default QuizGameView;
