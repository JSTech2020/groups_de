import React, { useState, useEffect } from 'react';
import "./QuizTimer.scss";
import QuizGameView from './QuizGameView';
import QuizFinishView from './QuizFinishView';

function questionsShuffleAnswers(questions) {
  return questions.map((question) => {
    const arr = [0, 1, 2, 3];
    arr.sort(() => .5 - Math.random());

    return {
      ...question,
      answerButtonOrder: arr,
    }
  });
}

function QuizTimer({ questions: propQuestions, onFinish }) {
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState(questions.map(() => null));

  const userAnswerClick = (answerNumber, questionIndex) => {
    // Update the users answers
    const newAnswers = userAnswers.map((answer, index) => {
      if (index === questionIndex) return answerNumber;
      else return answer;
    })
    setUserAnswers(newAnswers);
  }

  const results = userAnswers.map((quizAnswer, index) => {
    if (quizAnswer === null) return null;
    return questions[index].correctAnswer === quizAnswer;
  });

  const [gameIsRunning, setGameIsRunning] = useState(true);
  const gameOverCallback = () => {
    setGameIsRunning(false);
    onFinish();
  }

  useEffect(() => {
    setQuestions(questionsShuffleAnswers(propQuestions));
    console.log('Questions shuffled!');
  }, [propQuestions]);

  const gameView = (
    <QuizGameView
      questions={questions}
      gameOverCallback={gameOverCallback}
      results={results}
      userAnswerClick={userAnswerClick}
    ></QuizGameView>
  );

  const gameFinishView = (
    <QuizFinishView
      results={results}
    ></QuizFinishView>
  );
  return (
    <div className="quiz-timer">
      <div className="quiz-view">
        { gameIsRunning && questions.length > 0 ? gameView : gameFinishView }
      </div>
    </div>
  );
}




export default QuizTimer;
