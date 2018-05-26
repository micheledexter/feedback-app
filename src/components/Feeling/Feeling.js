import React, { Component } from 'react';
import '../App/App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class Feeling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feelingText: '',
      disableContinue: true,
      savedChanges: true,
    };
  }

  handleChangeFeeling = event => {
    const text = event.target.value;
    if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '') {
      this.setState({ feelingText: text });
      if (this.props.reduxState.formEntry.feeling.length > 0) {
        this.setState({
          disableContinue: false,
        });
      } else {
        this.setState({
          disableContinue: true,
        });
      }
      if (text.length > 0 && this.props.reduxState.formEntry.feeling !== text) {
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

  saveFeelingEntry = () => {
    const action = { type: 'SET_ENTRY', property: 'feeling', payload: this.state.feelingText };
    this.props.dispatch(action);
    this.props.dispatch({ type: 'SET_PROGRESS', payload: 25 });
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
    const text = this.props.reduxState.formEntry.feeling;
    this.setState({
      feelingText: text,
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
      <div className="Feeling">
        <ProgressBar />
        <br />
        <Paper className="Paper" elevation={4}>
          <Typography variant="headline" component="h3">
            How are you feeling today? (1 = very poorly, 5 = very well)
          </Typography>
          <div className="response-input">
          <Input
            className="rating FeelingRating"
            type="number"
            onChange={this.handleChangeFeeling}
            value={this.state.feelingText}
            required />
          <br />
          <Button
            variant="raised"
            color="secondary"
            className="btn btn-save"
            onClick={this.saveFeelingEntry}
            disabled={this.state.savedChanges}>
            Save
        </Button>&nbsp;
        <Button
            variant="fab"
            mini
            color="primary"
            className="btn btn-next"
            disabled={this.state.disableContinue}>
            <Link className="next-link" to="/2">
              <ArrowForward className="arrow-right" />
            </Link>
          </Button>
          </div>
        </Paper>
      </div >
    );
  }
}

export default connect(mapReduxStateToProps)(Feeling);