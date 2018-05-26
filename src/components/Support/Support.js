import React, { Component } from 'react';
import '../App/App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supportText: '',
      disableContinue: true,
      savedChanges: true,
    };
  }

  handleChangeSupport = event => {
    const text = event.target.value;
    if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '') {
      this.setState({ supportText: text });
      if (this.props.reduxState.formEntry.support.length > 0) {
        this.setState({
          disableContinue: false,
        });
      } else {
        this.setState({
          disableContinue: true,
        });
      }
      if (text.length > 0 && this.props.reduxState.formEntry.support !== text) {
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

  saveSupportEntry = () => {
    const action = { type: 'SET_ENTRY', property: 'support', payload: this.state.supportText };
    this.props.dispatch(action);
    this.props.dispatch({ type: 'SET_PROGRESS', payload: 75 });
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
    const text = this.props.reduxState.formEntry.support;
    this.setState({
      supportText: text,
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
      <div className="Support">
        <ProgressBar />
        <br />
        <p>How well are you being supported? (1 = very poorly, 5 = very well)</p>
        <Input
          className="rating SupportRating"
          type="number"
          onChange={this.handleChangeSupport}
          value={this.state.supportText}
          required />
        <br />
        <Button
          variant="fab"
          mini
          color="primary"
          className="btn btn-previous">
          <Link className="previous-link" to="/2">
            <ArrowBack className="arrow-left" />
          </Link>
        </Button>&nbsp;
        <Button
          variant="raised"
          color="secondary"
          className="btn btn-save"
          onClick={this.saveSupportEntry}
          disabled={this.state.savedChanges}>
          Save
        </Button>&nbsp;
        <Button
          variant="fab"
          mini
          color="primary"
          className="btn btn-next"
          disabled={this.state.disableContinue}>
          <Link className="next-link" to="/4">
            <ArrowForward className="arrow-right" />
          </Link>
        </Button>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(Support);