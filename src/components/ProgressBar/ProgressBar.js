import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    }
  }

  getProgress = () => {
    this.setState({ completed: this.props.reduxState.progressBar });
  }

  componentDidMount = () => {
    this.getProgress();
  }

  render() {
    return (
      <div className="ProgressBar">
        <LinearProgress variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(ProgressBar);