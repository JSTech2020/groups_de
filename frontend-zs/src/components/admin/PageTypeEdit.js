import React, { useState } from 'react';
import './PageTypeEdit.css'

const allTypes = [
  'quiz-timer',
  'quiz-badges',
  'ocean-cleaner',
  'memory',
  'puzzle'
]

const typesTitles = {
  'quiz-timer': 'Quiz with Timer',
  'quiz-badges': 'Quiz with Badges',
  'ocean-cleaner': 'Ocean Cleaner',
  'memory': 'Memory',
  'puzzle': 'Puzzle'
}

function PageTypeEdit({ pageType, isSelected, openDefault, updateCallback, deleteCallback, selectCallback }) {
  const [opened, setOpened] = useState(openDefault);
  const [pageNumber, setPageNumber] = useState(pageType.page);
  const [types, setTypes] = useState(pageType.types);

  function toggleOpened() {
    setOpened(!opened);
  }

  function changePageNumber(event) {
    setPageNumber(event.target.value);
  }

  function toggleType(type) {
    let newTypes = types;
    if (types.includes(type)) {
      newTypes = types.filter(t => t !== type);
    } else {
      newTypes = types.concat(type);
    }
    setTypes(newTypes);
  }

  function questionEmpty() {
    return pageNumber === '' || types.length === 0;
  }

  function cancel() {
    if (questionEmpty()) {
      window.alert("Page & type is not completely filled yet!");
      return;
    }
    setOpened(false);
    // Reset data
    setPageNumber(pageType.page);
    setTypes(pageType.types);
  }

  function save() {
    if (questionEmpty()) {
      window.alert("Page & type is not completely filled yet!");
      return;
    }
    setOpened(false)
    updateCallback({ ...pageType, page: parseInt(pageNumber), types, openEdit: undefined });
  }

  function remove() {
    if (window.confirm("Are you sure you want to delete this page & type?")) {
      deleteCallback(pageType);
    }
  }

  function toggleSelected() {
    selectCallback(!isSelected);
  }

  // HTML for the closed page type card
  const titles = types.map(type => typesTitles[type]).join(', ');
  const closedHtml = (
    <div className="card-body" >
      <button className="btn btn-zs-primary" onClick={toggleSelected} disabled={isSelected}>
        { isSelected ? 'Selected' : 'Select'}
      </button>
      <span className="card-text">
        Page { pageNumber } - { titles }
      </span>
      <button className="float-right btn btn-secondary" onClick={toggleOpened}>Edit</button>
    </div>
  );

  // HTML for the opened page type card
  const typeHtml = allTypes.map((type, index) => {
    return (
    <div
      className="answers input-group"
      key={index}
    >
      <div className="form-check">
        <input
          id={'type' + type}
          type="checkbox"
          className="form-check-input"
          aria-label="Checkbox for following text input"
          checked={types.includes(type)}
          onChange={() => toggleType(type)}
        ></input>
        <label className="form-check-label" htmlFor={'type' + type}>{ typesTitles[type] }</label>
      </div>
    </div>);
  });
  const openedHtml = (
    <div className="card-body">
      <form>
        <div className="form-group row">
          <label htmlFor="pageNumberInput" className="col-sm-2 col-form-label">Page number:</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="pageNumberInput"
              value={pageNumber}
              min="1"
              onChange={changePageNumber}
            />
          </div>
        </div>
        <div className="form-group">
          These questions will appear in following games:
          { typeHtml }
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
    <div className="card page-type-edit">
      { opened ? openedHtml : closedHtml }
    </div>
  );
}

export default PageTypeEdit;
