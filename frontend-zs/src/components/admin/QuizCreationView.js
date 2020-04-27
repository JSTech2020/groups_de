import React, { useState } from 'react';
import './QuizCreationView.css';
import { mockStories } from './mockStories';
import { mockDataQuestions } from './mockDataQuestions';
import QuestionEdit from './QuestionEdit';


function QuizCreationView() {
  const availableStories = mockStories;
  const [selectedStoryId, setSelectedStoryId] = useState(-1);
  const [storyPreviewExpanded, setStoryPreviewExpanded] = useState(false);
  const [questions, setQuestions] = useState(mockDataQuestions)

  function changeSelectedStoryId(event) {
    setSelectedStoryId(parseInt(event.target.value));
    setStoryPreviewExpanded(false);
  }

  function toggleStoryPreview() {
    setStoryPreviewExpanded(!storyPreviewExpanded);
  }

  function updateQuestion(updatedQuestion) {
    const newQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) return updatedQuestion;
      else return question;
    });
    setQuestions(newQuestions);
  }

  function deleteQuestion(deletedQuestion) {
    const newQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(newQuestions);
  }

  function newQuestion() {
    const question = {
      id: Math.ceil(Math.random() * 1000000),
      question: "",
      answers: [
        "",
        "",
        "",
        "",
      ],
      correctAnswer: -1,
      difficulty: 1,
      openEdit: true,
    };
    const newQuestions = [question, ...questions];
    console.log(newQuestions);
    setQuestions(newQuestions);
  }

  const storyOptions = availableStories.map(({ id, title }) => {
    return (<option key={id} value={id}>{ title }</option>);
  });

  const storySelect = (
    <select className="custom-select story-select" value={selectedStoryId} onChange={changeSelectedStoryId}>
      <option key={-1} value={-1}>Select a story</option>
      { storyOptions }
    </select>
  );

  const isStorySelected = selectedStoryId !== -1;
  const selectedStory = availableStories.find(story => story.id === selectedStoryId);

  const storyPreview = isStorySelected ? (
    <div className="card story-preview" onClick={toggleStoryPreview}>
      <div className="card-body">
        <h5 className="card-title">{ selectedStory.title }</h5>
        <div className={"card-text story-content " + (storyPreviewExpanded ? "" : "closed")}>
          { selectedStory.content }
        </div>
      </div>
    </div>
  ) : null;


  const newQuestionButton = (
    <button className="btn new-question" onClick={newQuestion}>Create new question</button>
  );

  const storedQuestions = questions.map((question) => (
    <QuestionEdit
      key={question.id}
      question={question}
      openDefault={question.openEdit === true}
      updateCallback={updateQuestion}
      deleteCallback={deleteQuestion}
    ></QuestionEdit>
  ))

  const questionsArea = isStorySelected ? (
    <div className="questions-area">
      <h4>Questions:</h4>
      { newQuestionButton }
      { storedQuestions }
    </div>
  ) : null;

  return (
    <div className="container quiz-creation-view">
      <h2>Create Questions for the Games</h2>
      { storySelect }
      {/* Pick the game */}
      { storyPreview }
      { questionsArea }
    </div>
  );
}



export default QuizCreationView;
