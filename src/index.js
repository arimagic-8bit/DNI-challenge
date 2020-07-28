import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import {PhotoProvider} from "./lib/PhotoProvider";
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <PhotoProvider>
      <App />
    </PhotoProvider>
  </Router>,
  document.getElementById('root')
);


