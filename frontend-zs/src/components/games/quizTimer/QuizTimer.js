import React, { useState, useEffect } from 'react';
import "./QuizTimer.scss";
import QuizGameView from './QuizGameView';
import QuizFinishView from './QuizFinishView';
import Axios from 'axios';

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

function QuizTimer({ questions: propQuestions, gameId, onFinish }) {
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState(propQuestions.map(() => null));

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
  }

  // If finished the game already, call achievements
  useEffect(() => {
    if (!gameIsRunning && userAnswers.every(answer => answer !== null)) {
      // Call for achievements
      const starsCollected = questions.reduce((acc, question, index) => {
        return acc + (question.difficulty + 1) * 2 * results[index];
      }, 0);

      if (starsCollected > 0) {
        const requestBody = {
          reward: starsCollected
        }
        Axios.put(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/game/${gameId}/submitQuiz`, requestBody)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  });

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
      onFinish={onFinish}
    ></QuizFinishView>
  );
  return (
    <div className="quiz-timer">
      <div className="quiz-view">
        {gameIsRunning && questions.length > 0 ? gameView : gameFinishView}
      </div>
    </div>
  );
}



export default QuizTimer;
