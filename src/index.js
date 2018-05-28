import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Create a blank form for quick clearing later on
const blankForm = {
  feeling: '',
  understanding: '',
  support: '',
  comments: '',
};

// Create 'formEntry' reducer to manage feedback input
const formEntry = (state = blankForm, action) => {
  if (action.type === 'SET_ENTRY') {
    return { ...state, [action.property]: action.payload };
  } else if (action.type === 'CLEAR_ALL') {
    return blankForm;
  }
  return state;
};

// Create 'progressBar' reducer to keep track of form progress
const progressBar = (state = 0, action) => {
  if (action.type === 'SET_PROGRESS') {
    return action.payload;
  } else if (action.type === 'CLEAR_ALL') {
    return 0;
  }
  return state;
}

const submission = (state = false, action) => {
  if (action.type === 'SUBMITTED') {
    return true;
  } else if (action.type === 'CLEAR_ALL') {
    return false;
  }
  return state;
}

// Create a store instance and put our reducers in it
const storeInstance = createStore(
  combineReducers({
    formEntry,
    progressBar,
    submission,
  }),
  applyMiddleware(logger),
);

// Make sure the provider makes the store available
ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
