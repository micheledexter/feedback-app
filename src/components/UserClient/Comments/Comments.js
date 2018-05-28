import React, { Component } from 'react';
import '../../App/App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Send from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Map the redux state to props because we'll need it
const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

// Set local state to keep track of input and button functionality
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsText: '',
      disableContinue: true,
      savedChanges: true,
    };
  }

  // When the input is changed, keep track of it in local state
  handleChangeComments = event => {
    const text = event.target.value;
    this.setState({ commentsText: text });
    // Check the formEntry reducer to find out if they've saved anything
    if (this.props.reduxState.formEntry.comments.length > 0) {
      this.setState({ // Allow them to continue if there's saved data
        disableContinue: false,
      });
    } else {
      this.setState({ // Disable the button to continue if they haven't
        disableContinue: true,
      });
    }
    // Check their saved data against what's in the input box
    if (text.length > 0 && this.props.reduxState.formEntry.comments !== text) {
      this.setState({ // If input isn't saved, activate the save button
        savedChanges: false,
      });
    } else {
      this.setState({ // If input is saved or no input, disable it
        savedChanges: true,
      });
    }
  }

  // Save the input to the formEntry reducer
  saveCommentsEntry = () => {
    const action = { 
      type: 'SET_ENTRY', // Opt to set the entry
      property: 'comments', // Save to the 'comments' property
      payload: this.state.commentsText // Set the payload to the state
    };
    this.props.dispatch(action);
    this.props.dispatch({ // Save progress to the progressBar reducer
      type: 'SET_PROGRESS', 
      payload: 100 
    });
    // Prepare state status updates because otherwise they are late by
    // one event for some weird reason
    const updated = {
      saved: true,
      disabled: false,
    }
    this.setState({ // Set button states
      savedChanges: updated.saved,
      disableContinue: updated.disabled,
    });
  }

  // Check the formEntry reducer for any saved comments on load
  componentDidMount = () => {
    const text = this.props.reduxState.formEntry.comments;
    this.setState({ // Set states according to their progress
      commentsText: text,
      disableContinue: true,
      savedChanges: true,
      waitingForSubmission: true,
    });
    if (text.length !== 0) {
      const update = false;
      this.setState({ // Allow them to continue if there's saved input
        disableContinue: update,
      });
    }
  }

  render() {
    return (
      <div className="Comments">
        <br />
        <Paper className="Paper" elevation={4}>
          <Typography variant="headline" component="h3">
            Are there any comments you would like to leave?
            </Typography>
          <div className="response-input">
            {/* Watch for input changes and modify states */}
            <TextField
              className="rating CommentsBox"
              multiline
              rows="3"
              onChange={this.handleChangeComments}
              value={this.state.commentsText}
              required />
            <br />
            {/* Back button is always available */}
            <Button
              variant="fab"
              mini
              color="primary"
              className="btn btn-previous">
              <Link className="previous-link" to="/user/3">
                <ArrowBack className="arrow-left" />
              </Link>
            </Button>&nbsp;
            {/* Save button available based on states */}
            <Button
              variant="raised"
              color="secondary"
              className="btn btn-save"
              onClick={this.saveCommentsEntry}
              disabled={this.state.savedChanges}>
              Save
            </Button>&nbsp;
            {/* Allow next button based on saved state */}
            <Button
              variant="fab"
              mini
              color="primary"
              className="btn btn-send"
              disabled={this.state.disableContinue}>
              <Link className="submit-link" to="/user/5">
                <Send onClick={this.submitFeedback} className="send-feedback" />
              </Link>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

// Include a connection to redux for both directions in export
export default connect(mapReduxStateToProps)(Comments);