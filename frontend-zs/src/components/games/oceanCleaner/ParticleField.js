import React, {useState} from 'react';
import QuizQuestionView from './QuizQuestionView';
import QuizQuestionImageView from './QuizQuestionImageView';
import AnswerCircles from './AnswerCircles';
import Particle from "./Particle";

export default function ParticleField({questions, gameOverCallback, results, userAnswerClick,
                                          questionIndex, setQuestionIndex,
                                          currentQuestion,
                                          setResultAnswer,
                                          left}) {
    const [resetTimer, setResetTimer] = useState(false);
    const [timerActive, setTimerActive] = useState(true);
    const question = questions[questionIndex];

    // Callback for when the user clicks on an answer
    const userSelectAnswer = (answerNumber) => {
        if (question.id === currentQuestion.id) {
            setTimerActive(false);
            userAnswerClick(answerNumber, questionIndex);


            // Display clicked button result
            setResultAnswer({
                resultIdx: answerNumber,
                resultSuccess: answerNumber === question.correctAnswer,
            });

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
            };

            // Display next question after a short delay
            setTimeout(nextQuestion, 2000);
        }
    };

    return (
        <div>
            <Particle
                fullTime={15}
                resetTimer={resetTimer} //Hook: value
                resetTimerCallback={() => setResetTimer(false)} //Hook: func
                timeOutCallback={() => userSelectAnswer(-1)}
                active={timerActive}
                question={question}
                left={left}
            />
            {/*{answers()}*/}
        </div>

    );
}
