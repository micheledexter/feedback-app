import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

// Map the redux state to props because we'll need it
const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

// No local state necessary, we only need a reducer
const ProgressBar = props => (
  <div className="ProgressBar">
    {/* Create determinate progress bar with set state */}
    <LinearProgress variant="determinate" value={props.reduxState.progressBar} />
  </div>
);

// Include a connection to redux for both directions in export
export default connect(mapReduxStateToProps)(ProgressBar);