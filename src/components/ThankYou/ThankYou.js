import React, { Component } from 'react';
import '../App/App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: true,
      showFailure: true,
    }
  }

  componentDidMount = () => {
    const toggle = false;
    axios.post('/api/feedback', this.props.reduxState.formEntry).then(response => {
      this.props.dispatch({ type: 'CLEAR_ALL' });
      this.setState({
        showSuccess: toggle,
      });
    }).catch(error => {
      console.log(`ERROR trying to POST /api/feedback: ${error}`);
      this.setState({
        showFailure: toggle,
      });
    });
  }

  render() {
    return (
      <div className="ThankYou">
        <ProgressBar />
        <br />
        <Paper className="Paper" elevation={4}>
          <Typography variant="headline" component="h1">
            <span hidden={this.state.showSuccess}>
              Thank You!
            </span>
          </Typography>
          <Typography variant="headline" component="h1">
            <span hidden={this.state.showFailure}>
              Oops! It looks like something went wrong!
            </span>
          </Typography>
          <br />
          <Link className="restart" to="/">
            <Button
              variant="raised"
              color="primary"
              className="btn btn-restart">
              Leave New Feedback
          </Button>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(ThankYou);