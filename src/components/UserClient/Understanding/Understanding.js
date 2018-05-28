import React, { Component } from 'react';
import '../../App/App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Map the redux state to props because we'll need it
const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

// Set local state to keep track of input and button functionality
class Understanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      understandingText: '',
      disableContinue: true,
      savedChanges: true,
    };
  }

  // When the input is changed, keep track of it in local state
  handleChangeUnderstanding = event => {
    const text = event.target.value;
    // Check to make sure they're entering only allowed input
    if (text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '') {
      this.setState({ understandingText: text });
      // Check the formEntry reducer to find out if they've saved anything
      if (this.props.reduxState.formEntry.understanding.length > 0) {
        this.setState({ // Allow them to continue if there's saved data
          disableContinue: false,
        });
      } else {
        this.setState({ // Disable the button to continue if they haven't
          disableContinue: true,
        });
      }
      // Check their saved data against what's in the input box
      if (text.length > 0 && this.props.reduxState.formEntry.understanding !== text) {
        this.setState({ // If input isn't saved, activate the save button
          savedChanges: false,
        });
      } else {
        this.setState({ // If input is saved or no input, disable it
          savedChanges: true,
        });
      }
    }
  }

  // Save the input to the formEntry reducer
  saveUnderstandingEntry = () => {
    const action = {
      type: 'SET_ENTRY', // Opt to set the entry
      property: 'understanding', // Save to the 'understanding' property
      payload: this.state.understandingText // Set the payload to the state
    };
    this.props.dispatch(action);
    this.props.dispatch({ // Save progress to the progressBar reducer
      type: 'SET_PROGRESS',
      payload: 50
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

  // Check the formEntry reducer for any saved data on load
  componentDidMount = () => {
    const text = this.props.reduxState.formEntry.understanding;
    this.setState({ // Set states according to their progress
      understandingText: text,
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
      <div className="Understanding">
        <br />
        <Paper className="Paper" elevation={4}>
          <Typography variant="headline" component="h3">
            How well are you understanding the content? (1 = very poorly, 5 = very well)
          </Typography>
          <div className="response-input">
            {/* Watch for input changes and modify states */}
            <Input
              className="rating UnderstandingRating"
              type="number"
              onChange={this.handleChangeUnderstanding}
              value={this.state.understandingText}
              required />
            <br />
            {/* Back button is always available */}
            <Button
              variant="fab"
              mini
              color="primary"
              className="btn btn-previous">
              <Link className="previous-link" to="/user/1">
                <ArrowBack className="arrow-left" />
              </Link>
            </Button>&nbsp;
            {/* Save button available based on states */}
            <Button
              variant="raised"
              color="secondary"
              className="btn btn-save"
              onClick={this.saveUnderstandingEntry}
              disabled={this.state.savedChanges}>
              Save
            </Button>&nbsp;
            {/* Allow next button based on saved state */}
            <Button
              variant="fab"
              mini
              color="primary"
              className="btn btn-next"
              disabled={this.state.disableContinue}>
              <Link className="next-link" to="/user/3">
                <ArrowForward className="arrow-right" />
              </Link>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

// Include a connection to redux for both directions in export
export default connect(mapReduxStateToProps)(Understanding);