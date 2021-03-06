import React, { useState } from 'react';
import './QuestionEdit.css';

function QuestionEdit({ question, openDefault, updateCallback, deleteCallback }) {
  const [opened, setOpened] = useState(openDefault);
  const [questionText, setQuestionText] = useState(question.question);
  const [answers, setAnswers] = useState(question.answers);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
  const [difficulty, setDifficulty] = useState(question.difficulty);
  let imgDefault = null;
  if (question.image) {
    imgDefault = {
      name: question.image.name,
      data: question.image.b64 ? question.image.data : String.fromCharCode.apply(null, question.image.data.data),
      b64: true,
      updated: false,
    };
  }
  const [image, setImage] = useState(imgDefault);

  function toggleOpened() {
    setOpened(!opened);
  }

  function changeQuestionText(event) {
    setQuestionText(event.target.value);
  }

  function changeAnswer(changedIndex, event) {
    const newAnswers = answers.map((answer, index) => {
      if (changedIndex === index) return event.target.value;
      else return answer;
    });
    setAnswers(newAnswers);
  }

  function changeCorrectAnswer(changedIndex) {
    setCorrectAnswer(changedIndex);
  }

  function changeDifficulty(event) {
    setDifficulty(parseInt(event.target.value));
  }

  function changeUploadedImage(event) {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const input = event.target;
    if (input.files) {
      const kb = input.files[0].size / 1024;
      if (kb > 100) {
        alert(`Image is ${Math.round(kb)}kB big, which is bigger than the limit 100kB!`);
        return;
      }
      toBase64(input.files[0]).then(result => {
        setImage({
          name: input.files[0].name,
          data: result,
          b64: true,
          updated: true,
        });
      })
    } else {
      setImage(null);
    }
  }

  // HTML for the closed question card
  const closedHtml = (
    <div className="card-body">
      { question.question }
      <button className="float-right btn btn-secondary" onClick={toggleOpened}>Edit</button>
    </div>
  );

  // HTML for the opened question card
  const answerHtml = answers.map((answer, index) => {
    return (
    <div
      className="answers input-group"
      key={index}
    >
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            aria-label="Checkbox for following text input"
            checked={index === correctAnswer}
            onChange={() => changeCorrectAnswer(index)}
          />
        </div>
      </div>
      <input
        type="text"
        className="form-control"
        id={"questionInput " + index}
        value={answer}
        placeholder={"Insert answer " + (index + 1)}
        autoComplete="off"
        onChange={(e) => changeAnswer(index, e)}
      />
    </div>);
  });

  function questionEmpty() {
    return (
      questionText === ''
      || answers.length < 4
      || answers.some(answer => answer === '')
      || correctAnswer < 0
      || correctAnswer > 3
    );
  }

  function cancel() {
    if (questionEmpty()) {
      window.alert("Question is not completely filled yet!");
      return;
    }
    setOpened(false);
    setQuestionText(question.question);
    setAnswers(question.answers);
    setDifficulty(question.difficulty);
  }

  function save() {
    if (questionEmpty()) {
      window.alert("Question is not completely filled yet!");
      return;
    }
    setOpened(false)
    updateCallback({ ...question, question: questionText, answers, difficulty, image, correctAnswer, openEdit: undefined });
  }

  function remove() {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteCallback(question);
    }
  }

  const openedHtml = (
    <div className="card-body">
      <form>
        <div className="form-group">
          <label htmlFor="questionInput">Question:</label>
          <input
            type="text"
            className="form-control"
            id="questionInput"
            value={questionText}
            placeholder="Write the new question here..."
            onChange={changeQuestionText}
          />
        </div>
        <div className="form-group">
          Answers:
          { answerHtml }
        </div>
        <div className="form-group">
          <label htmlFor="file-upload">Add picture</label>
          <input
            type="file"
            className="form-control-file"
            id="file-upload"
            onChange={changeUploadedImage}
          />
        </div>
        { image && (
          <div className="form-group">
            <img src={image.data} alt='Uploaded'/>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="difficulty-select">Select difficulty:</label>
          <select
            className="form-control"
            id="difficulty-select"
            value={difficulty}
            onChange={changeDifficulty}
          >
            <option key={0} value={0}>Easy</option>
            <option key={1} value={1}>Normal</option>
            <option key={2} value={2}>Hard</option>
          </select>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="col">
              <button type="button" className="form-control btn btn-secondary" onClick={cancel}>Cancel</button>
            </div>
            <div className="col">
              <button type="button" className="form-control btn btn-danger" onClick={remove}>Delete</button>
            </div>
            <div className="col-8">
              <button type="button" className="form-control btn btn-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="card question-edit">
      { opened ? openedHtml : closedHtml }
    </div>
  );
}

export default QuestionEdit;
