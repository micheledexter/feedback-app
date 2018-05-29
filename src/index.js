import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import feedbackReducers from './redux/feedbackReducers/feedbackReducers';

// Create a store instance and put our reducers in it
const storeInstance = createStore(
  feedbackReducers,
  applyMiddleware(logger),
);

// Make sure the provider makes the store available
ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
