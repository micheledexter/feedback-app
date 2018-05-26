import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const blankForm = {
  feeling: '',
  understanding: '',
  support: '',
  comments: '',
};

const formEntry = (state = blankForm, action) => {
  if (action.type === 'SET_ENTRY') {
    return { ...state, [action.property]: action.payload };
  } else if (action.type === 'CLEAR_ALL') {
    return blankForm;
  }
  return state;
};

const progressBar = (state = 0, action) => {
  if (action.type === 'SET_PROGRESS') {
    return action.payload;
  } else if (action.type === 'CLEAR_ALL') {
    return 0;
  }
  return state;
}

const storeInstance = createStore(
  combineReducers({
    formEntry,
    progressBar,
  }),
  applyMiddleware(logger),
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
