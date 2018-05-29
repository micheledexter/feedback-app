import { combineReducers } from 'redux';

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
    return { ...state,
      [action.property]: action.payload
    };
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

// Create 'submission' reducer to keep track of whether or not the user has
// submitted the form already (to avoid double-submission) or not
const submission = (state = false, action) => {
  if (action.type === 'SUBMITTED') {
    return true;
  } else if (action.type === 'CLEAR_ALL') {
    return false;
  }
  return state;
}

export default combineReducers({
  formEntry,
  progressBar,
  submission,
});