import React, { Component } from 'react';
import '../App/App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class Understanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      understandingText: '',
      disableContinue: true,
      savedChanges: true,
    };
  }

  handleChangeUnderstanding = event => {
    const text = event.target.value;
    if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '') {
      this.setState({ understandingText: text });
      if (this.props.reduxState.formEntry.understanding.length > 0) {
        this.setState({
          disableContinue: false,
        });
      } else {
        this.setState({
          disableContinue: true,
        });
      }
      if (text.length > 0 && this.props.reduxState.formEntry.understanding !== text) {
        this.setState({
          savedChanges: false,
        });
      } else {
        this.setState({
          savedChanges: true,
        });
      }
    }
  }

  saveUnderstandingEntry = () => {
    const action = { type: 'SET_ENTRY', property: 'understanding', payload: this.state.understandingText };
    this.props.dispatch(action);
    this.props.dispatch({ type: 'SET_PROGRESS', payload: 50 });
    const updated = {
      saved: true,
      disabled: false,
    }
    this.setState({
      savedChanges: updated.saved,
      disableContinue: updated.disabled,
    });
  }

  componentDidMount = () => {
    const text = this.props.reduxState.formEntry.understanding;
    this.setState({
      understandingText: text,
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
      <div className="Understanding">
        <ProgressBar />
        <br />
        <Paper className="Paper" elevation={4}>
          <Typography variant="headline" component="h3">
            How well are you understanding the content? (1 = very poorly, 5 = very well)
          </Typography>
          <div className="response-input">
          <Input
            className="rating UnderstandingRating"
            type="number"
            onChange={this.handleChangeUnderstanding}
            value={this.state.understandingText}
            required />
          <br />
          <Button
            variant="fab"
            mini
            color="primary"
            className="btn btn-previous">
            <Link className="previous-link" to="/">
              <ArrowBack className="arrow-left" />
            </Link>
          </Button>&nbsp;
        <Button
            variant="raised"
            color="secondary"
            className="btn btn-save"
            onClick={this.saveUnderstandingEntry}
            disabled={this.state.savedChanges}>
            Save
        </Button>&nbsp;
        <Button
            variant="fab"
            mini
            color="primary"
            className="btn btn-next"
            disabled={this.state.disableContinue}>
            <Link className="next-link" to="/3">
              <ArrowForward className="arrow-right" />
            </Link>
          </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(Understanding);