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
  const [pageTypes, setPageTypes] = useState([]);
  const [selectedPageTypeId, setSelectedPageTypeId] = useState(-1);

  function changeSelectedStoryId(event) {
    const storyId = event.target.value;
    setSelectedStoryId(storyId);
    setSelectedPageTypeId(-1);
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
      id: Math.ceil(Math.random() * 100000000),
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
    const { strippedPt, imagesToUpload } = pageTypeStripImages(updatedPageType);
    apiUpdatePageType(strippedPt)
      .then(response => {
        // Process updated images
        const promises = [];
        for (const { questionId, image } of imagesToUpload) {
          updatedPageType.quizData.questions.find(q => q.id === questionId).image.updated = false;
          promises.push(() => apiUploadQuestionImage(updatedPageType._id, questionId, image));
        }

        // Resolve promises for uploading the images sequentially
        return promises.reduce((prevPromise, current) => {
          return prevPromise.then(() => {
            return current();
          });
        }, Promise.resolve());
      }).then(() => {
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

  function apiUploadQuestionImage(pageTypeId, questionId, image) {
    return Axios.put(`${API_URL}/api/admin/games/${pageTypeId}/questions/${questionId}/image`, { image });
  }

  /**
   * Strip the questions (and puzzleData) in pagetype of images, because otherwise we can receive a
   * 413 (Payload Too Large) error when making an API PUT / POST call.
   * We upload updated images via a seperate call.
   */
  function pageTypeStripImages(pageType) {
    const imagesToUpload = [];
    let strippedPt = pageType;

    if (pageType.quizData) {
      const questions = pageType.quizData.questions.map(question => {
        if (!question.image) return question;
        if (question.image.updated) {
          imagesToUpload.push({ questionId: question.id, image: question.image });
        }
        return { ...question, image: null }
      });
      strippedPt = { ...pageType, quizData: { questions } }
    }

    if (strippedPt.puzzleData && strippedPt.puzzleData.image) {
      strippedPt = { ...strippedPt, puzzleData: { image: undefined } }
    }

    return {
      strippedPt,
      imagesToUpload,
    }
  }

  /******************
   *     PUZZLE     *
   ******************/
  function changeUploadedPuzzleImage(event) {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const input = event.target;
    if (input.files && input.files.length) {
      const kb = input.files[0].size / 1024;
      if (kb > 512) {
        alert(`Image is ${Math.round(kb)}kB big, which is bigger than the limit 512kB!`);
        return;
      }
      toBase64(input.files[0]).then(result => {
        const image = {
          name: input.files[0].name,
          data: result,
        }
        apiUploadPuzzleImage(selectedPageTypeId, image)
          .then(respose => {
            const localImage = {
              image: {
                name: image.name,
                dataStr: image.data,
              }
            }
            const pt = { ...selectedPageType, puzzleData: localImage };
            updatePageType(pt);
          })
          .catch(err => {
            console.log('Error while uploading puzzle image', err, image);
          })
      });
    }
  }

  function removePuzzleImage(event) {
    apiUploadPuzzleImage(selectedPageTypeId, null)
      .then(respose => {
        const pt = { ...selectedPageType, puzzleData: { image: null }};
        updatePageType(pt);
      })
      .catch(err => {
        console.log('Error while removing puzzle image', err, selectedPageType);
      })
    event.preventDefault();
  }

  function apiUploadPuzzleImage(pageTypeId, image) {
    return Axios.put(`${API_URL}/api/admin/games/${pageTypeId}/puzzleData`, { image });
  }


  /******************
   *    LIFECYCLE   *
   ******************/

  useEffect(() => {
    Axios.get(`${API_URL}/api/stories`)
      .then(response => {
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
   *  PUZZLE HTML  *
   ******************/

  const showPuzzleArea = isPageTypeSelected && selectedPageType.types.includes('puzzle');
  const puzzleImage = showPuzzleArea && selectedPageType.puzzleData && selectedPageType.puzzleData.image;
  let puzzleImageSrc = "";
  if(puzzleImage){
    if(puzzleImage.dataStr){
      puzzleImageSrc = puzzleImage.dataStr;
    } else if(puzzleImage.data){
      for (var i=0; i<puzzleImage.data.data.length; i++) {
        puzzleImageSrc += String.fromCharCode(puzzleImage.data.data[i])
      }
    }
  }
  //const puzzleImageSrc = puzzleImage &&
    //(puzzleImage.dataStr ? puzzleImage.dataStr : String.fromCharCode.apply(null, puzzleImage.data.data));
  const puzzleArea = showPuzzleArea && (
    <div className="puzzle-area">
      <h4>Puzzle Image</h4>
      <form>
        <div className="form-group">
            <label htmlFor="file-upload">Add picture for the puzzle:</label>
            <input
              type="file"
              className="form-control-file"
              id="file-upload"
              onChange={changeUploadedPuzzleImage}
            />
          </div>
          { puzzleImage && (
            <div className="form-group">
              <img src={puzzleImageSrc} alt='Uploaded'/>
              <br/>
              <button className="btn btn-secondary" onClick={removePuzzleImage}>
                Remove image
              </button>
            </div>
          )}
      </form>
    </div>
  );


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
      { puzzleArea }
      { questionsArea }
    </div>
  );
}



export default QuizCreationView;
