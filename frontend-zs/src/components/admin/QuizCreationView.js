import React, { useState, useEffect } from 'react';
import './QuizCreationView.css';
import QuestionEdit from './QuestionEdit';
import Axios from 'axios';
import PageTypeEdit from './PageTypeEdit';

const API_HOST = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;
const API_URL = `${API_HOST}:${API_PORT}`;

function QuizCreationView() {
  const [availableStories, setAvailableStories] = useState([]);
  const [selectedStoryId, setSelectedStoryId] = useState(-1);
  const [storyPreviewExpanded, setStoryPreviewExpanded] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  // const [questions, setQuestions] = useState([])
  const [pageTypes, setPageTypes] = useState([]);
  const [selectedPageTypeId, setSelectedPageTypeId] = useState(-1);

  function changeSelectedStoryId(event) {
    const storyId = event.target.value;
    setSelectedStoryId(storyId);
    setStoryPreviewExpanded(false);
    loadQuestions(storyId)
  }

  function toggleStoryPreview() {
    setStoryPreviewExpanded(!storyPreviewExpanded);
  }

  function changeSelectedPageType(id) {
    setSelectedPageTypeId(id);
  }


  /******************
   * QUESTIONS CODE *
   ******************/

  function loadQuestions(storyId) {
    setLoadingQuestions(true);
    Axios.get(`${API_URL}/api/admin/stories/${storyId}/games`)
      .then(response => {
        console.log(response.data);
        setPageTypes(response.data);
      })
      .catch(err => {
        console.log('Error while fetching story questions', err);
      })
      .finally(() => {
        setLoadingQuestions(false);
      })
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
    setQuestions(newQuestions);
  }

  function setQuestions(questions) {
    const newPageType = {
      ...selectedPageType,
      quizData: { questions: questions },
    };
    updatePageType(newPageType);
  }


  /******************
   * PAGETYPES CODE *
   ******************/

  function updatePageType(updatedPageType) {
    apiUpdatePageType(updatedPageType)
      .then(response => {
        const newPTs = pageTypes.map((pageType) => {
          if (pageType._id === updatedPageType._id) return updatedPageType;
          else return pageType;
        });
        console.log('updated pt', newPTs);
        setPageTypes(newPTs);
      })
      .catch(err => {
        console.log('Error while updating page type', err, updatedPageType)
      });
  }

  function deletePageType(deletedPageType) {
    apiDeletePageType(deletedPageType)
      .then(response => {
        const newPTs = pageTypes.filter((pageType) => pageType._id !== deletedPageType._id);
        console.log('deleted pt', newPTs);
        if (selectedPageTypeId === deletedPageType._id) {
          setSelectedPageTypeId(-1);
        }
        setPageTypes(newPTs);
      })
      .catch(err => {
        console.log('Error while deleting page type', err, deletedPageType)
      });
  }

  function newPageType() {
    const newType = {
      story: selectedStoryId,
      page: 0,
      types: [],
      quizData: { questions: [] },
    };

    apiPostPageType(newType)
      .then(response => {
        const rspNewType = response.data;
        const newPTs = [rspNewType, ...pageTypes];
        setPageTypes(newPTs);
      })
      .catch(err => {
        console.log('Error while creating new page type', err, newType)
      });
  }

  function apiPostPageType(pageType) {
    return Axios.post(`${API_URL}/api/admin/stories/${selectedStoryId}/games`, { game: pageType });
  }
  function apiUpdatePageType(pageType) {
    return Axios.put(`${API_URL}/api/admin/games/${pageType._id}`, { game: pageType });
  }
  function apiDeletePageType(pageType) {
    return Axios.delete(`${API_URL}/api/admin/games/${pageType._id}`);
  }

  // function putPageTypesOnline(pts) {
  //   Axios.put(`${API_URL}/api/admin/stories/${selectedStoryId}/games`,
  //     {
  //       games: pts,
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(err => {
  //       console.log('Error while puting page types', err);
  //     })
  // }

  /******************
   *    LIFECYCLE   *
   ******************/

  useEffect(() => {
    Axios.get(`${API_URL}/api/stories`)
      .then(response => {
        console.log(response.data);
        setAvailableStories(response.data);
      })
      .catch(function (error) {
          console.log(error.message)
      })
  }, [])


  /******************
   *      HTML      *
   ******************/

  const storyOptions = availableStories.map(({ _id, title }) => {
    return (<option key={_id} value={_id}>{ title }</option>);
  });

  const storySelect = (
    <select className="custom-select story-select" value={selectedStoryId} onChange={changeSelectedStoryId}>
      <option key={-1} value={-1}>Select a story</option>
      { storyOptions }
    </select>
  );

  const isStorySelected = selectedStoryId.toString() !== '-1';
  const selectedStory = availableStories.find(story => story._id === selectedStoryId);

  const storyPreview = isStorySelected ? (
    <div className="card story-preview" onClick={toggleStoryPreview}>
      <div className="card-body">
        <h5 className="card-title">{ selectedStory.title }</h5>
        <div className={"card-text story-content " + (storyPreviewExpanded ? "" : "closed")}>
          { selectedStory.shortDescription }
        </div>
      </div>
    </div>
  ) : null;


  /******************
   * PAGETYPES HTML *
   ******************/

  const storedPageTypes = pageTypes.map((pageType) => {
    return (
      <PageTypeEdit
        key={pageType._id}
        pageType={pageType}
        isSelected={selectedPageTypeId === pageType._id}
        openDefault={pageType.isDraft === true}
        updateCallback={updatePageType}
        deleteCallback={deletePageType}
        selectCallback={() => changeSelectedPageType(pageType._id)}
      ></PageTypeEdit>
    );
  });

  const pageTypeArea = isStorySelected && (
    <div className="page-type-area">
      <h4>Pages and types:</h4>
      <button className="btn new-page-type" onClick={newPageType}>Create new page with types</button>
      { storedPageTypes }
    </div>
  );

  const isPageTypeSelected = isStorySelected && selectedPageTypeId !== -1;
  const selectedPageType = pageTypes.find(pt => pt._id === selectedPageTypeId);


  /******************
   * QUESTIONS HTML *
   ******************/

  const questions = isPageTypeSelected ? selectedPageType.quizData.questions : []

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

  const questionsArea = isPageTypeSelected && (
    <div className="questions-area">
      <h4>Questions:</h4>
      { newQuestionButton }
      { loadingQuestions ? (<p>Loading...</p>) : storedQuestions }
    </div>
  );


  /******************
   *   FINAL HTML   *
   ******************/

  return (
    <div className="container quiz-creation-view">
      <h2>Create Questions for the Games</h2>
      { storySelect }
      { storyPreview }
      { pageTypeArea }
      { questionsArea }
    </div>
  );
}



export default QuizCreationView;
