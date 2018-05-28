import React from 'react';
import '../App/App.css';
import UserHeader from './UserHeader/UserHeader';
import ProgressBar from './ProgressBar/ProgressBar';
import Feeling from './Feeling/Feeling';
import Understanding from './Understanding/Understanding';
import Support from './Support/Support';
import Comments from './Comments/Comments';
import ThankYou from './ThankYou/ThankYou';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const mapReduxStateToProps = (reduxState) => ({ reduxState });

const UserClient = props => (
  <div className="UserClient">
    <UserHeader />
    <ProgressBar />
    <Router>
      <div className="Router">
        <Switch>
          <Route exact path="/user" render={() => (<Redirect to="/user/1" />)} />
          <Route exact path="/user/1" component={Feeling} />
          <Route exact path="/user/2" render={() => (
            props.reduxState.formEntry.feeling ? (
              <Understanding />
            ) : (
              <Redirect to="/user/1" />
            )
          )} />
          <Route exact path="/user/3" render={() => (
            props.reduxState.formEntry.understanding ? (
              <Support />
            ) : (
              <Redirect to="/user/2" />
            )
          )} />
          <Route exact path="/user/4" render={() => (
            props.reduxState.formEntry.support ? (
              <Comments />
            ) : (
              <Redirect to="/user/3" />
            )
          )} />
          <Route exact path="/user/5" render={() => (
            props.reduxState.formEntry.comments ? (
              <ThankYou />
            ) : (
              <Redirect to="/user/4" />
            )
          )} />
          <Route render={() => (<h1>ERROR 404: Page not found</h1>)} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default connect(mapReduxStateToProps)(UserClient);