import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <PrivacyPolicy />
  </React.StrictMode>,
  document.getElementById('root')
);
