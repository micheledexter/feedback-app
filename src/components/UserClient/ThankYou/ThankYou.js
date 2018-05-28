import React, { Component } from 'react';
import '../../App/App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Map the redux state to props because we'll need it
const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

// Set local state to keep track of input and button functionality
class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSuccess: true,
      hideFailure: true,
    }
  }

  /* Reset the form:
  This function resets all of the reducers, and because of the way that the
  router works, they aren't allowed to have this component loaded if they
  have an empty form, and it will redirect them to the 'feeling' component.
  */
  resetEverything = () => {
    this.props.dispatch({ type: 'CLEAR_ALL' });
  }

  // POST the feedback when the component loads and reset the reducer
  componentDidMount = () => {
    const toggle = false;
    if (this.props.reduxState.submission) {
      this.setState({ // Don't allow double-submissions
        hideFailure: toggle,
      });
    } else {
      axios.post('/api/feedback', this.props.reduxState.formEntry).then(response => {
        this.setState({ // If it succeeded, show "success" message
          hideSuccess: toggle,
        });
        this.props.dispatch({ type: 'SUBMITTED' }); // Only one submission per form
      }).catch(error => {
        console.log(`ERROR trying to POST /api/feedback: ${error}`);
        this.setState({ // If it failed, show "oops" message
          hideFailure: toggle,
        });
      });
    }
  }

  render() {
    return (
      <div className="ThankYou">
        <br />
        <Paper className="Paper" elevation={4}>
          {/* Show "success" message if it succeeded */}
          <Typography variant="headline" component="h1">
            <span hidden={this.state.hideSuccess}>
              Thank You!
            </span>
          </Typography>
          {/* Show "oops" message if it failed or wasn't allowed */}
          <Typography variant="headline" component="h1">
            <span hidden={this.state.hideFailure}>
              Oops! It looks like something went wrong!
            </span>
          </Typography>
          <br />
          {/* Allow the user to restart feedback process */}
          <Button
            variant="raised"
            color="primary"
            className="btn btn-restart"
            onClick={this.resetEverything}>
            Leave New Feedback
          </Button>
        </Paper>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(ThankYou);