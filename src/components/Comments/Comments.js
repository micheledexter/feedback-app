import React, { Component } from 'react';
import '../App/App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Send from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

const freshState = {
  commentsText: '',
  disableContinue: true,
  savedChanges: true,
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...freshState
    };
  }

  handleChangeComments = event => {
    const text = event.target.value;
    this.setState({ commentsText: text });
    if (this.props.reduxState.formEntry.comments.length > 0) {
      this.setState({
        disableContinue: false,
      });
    } else {
      this.setState({
        disableContinue: true,
      });
    }
    if (text.length > 0 && this.props.reduxState.formEntry.comments !== text) {
      this.setState({
        savedChanges: false,
      });
    } else {
      this.setState({
        savedChanges: true,
      });
    }
  }

  saveCommentsEntry = () => {
    const action = { type: 'SET_ENTRY', property: 'comments', payload: this.state.commentsText };
    this.props.dispatch(action);
    this.props.dispatch({ type: 'SET_PROGRESS', payload: 100 });
    const updated = {
      saved: true,
      disabled: false,
    }
    this.setState({
      disableContinue: updated.disabled,
    });
  }

  componentDidMount = () => {
    const text = this.props.reduxState.formEntry.comments;
    this.setState({
      commentsText: '',
      disableContinue: true,
      savedChanges: true,
      waitingForSubmission: true,
    });
    if (text.length !== 0) {
      const update = false;
      this.setState({
        disableContinue: update,
      });
    }
  }

  render() {
    return (
      <div className="Comments">
        <ProgressBar />
        <br />
        <p>Any comments you want to leave?</p>
        <TextField
          className="rating CommentsBox"
          multiline
          rows="3"
          onChange={this.handleChangeComments}
          value={this.state.commentsText}
          required />
        <br />
        <Button
          variant="fab"
          mini
          color="primary"
          className="btn btn-previous">
          <Link className="previous-link" to="/3">
            <ArrowBack className="arrow-left" />
          </Link>
        </Button>&nbsp;
        <Button
          variant="raised"
          color="secondary"
          className="btn btn-save"
          onClick={this.saveCommentsEntry}
          disabled={this.state.savedChanges}>
          Save
        </Button>&nbsp;
        <Button
          variant="fab"
          mini
          color="primary"
          className="btn btn-next"
          disabled={this.state.disableContinue}>
          <Link className="submit-link" to="/5">
            <Send onClick={this.submitFeedback} className="send-feedback" />
          </Link>
        </Button>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(Comments);