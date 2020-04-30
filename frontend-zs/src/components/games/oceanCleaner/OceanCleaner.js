import React, { useState, useEffect } from "react";
import QuizView from "./QuizView";
import "./style.scss";

function questionsShuffleAnswers(questions) {
  return questions.map((question) => {
    const arr = [0, 1, 2, 3];
    arr.sort(() => 0.5 - Math.random());

    return {
      ...question,
      answerButtonOrder: arr,
    };
  });
}

function OceanCleaner({ questions: propQuestions, onFinish }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(questionsShuffleAnswers(propQuestions));
  }, [propQuestions]);

  return (
    <div className="ocean-cleaner">
      { questions.length && (
        <QuizView questions={questions} onFinish={onFinish} />
      )}
    </div>
  );
}

export default OceanCleaner;
