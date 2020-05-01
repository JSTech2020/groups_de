import React, { useState, useEffect } from 'react';
import QuizGameView from './QuizGameView';
import QuizFinishView from './QuizFinishView';
import Axios from 'axios';

function QuizView({ questions, gameId, onFinish }) {
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
                Axios.put(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/game/${gameId}/submitOceanCleaner`, requestBody)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    });

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const [height, setHeight] = useState(viewportHeight - 150);

    function updateHeight() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        setHeight(viewportHeight - 150);
    }

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    });

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
        <div className="quiz-view" style={{ height: height + 'px' }}>
            {gameIsRunning ? gameView : gameFinishView}
        </div>
    );
}




export default QuizView;