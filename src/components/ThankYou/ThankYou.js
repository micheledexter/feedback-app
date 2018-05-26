import React, { Component } from 'react';
import '../App/App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <h1 hidden={this.state.showSuccess}>Thank You!</h1>
        <h1 hidden={this.state.showFailure}>Oops! It looks like something went wrong!</h1>
        <Link className="restart" to="/">
          <Button
            variant="raised"
            color="primary"
            className="btn btn-restart">
              Leave New Feedback
          </Button>
        </Link>
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(ThankYou);