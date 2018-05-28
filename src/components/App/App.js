import React, { Component } from 'react';
import './App.css';
import Admin from '../Admin/Admin';
import UserClient from '../UserClient/UserClient';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="Router">
            {/* Use switch-based client-side routing */}
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/user/1" />)} />
              <Route path="/user" component={UserClient} />
              <Route path="/admin" component={Admin} />
              {/* Automatically redirect in case of user mistypes */}
              <Route exact path="/1" render={() => (
                <Redirect to="/user/1" />
              )} />
              <Route exact path="/2" render={() => (
                <Redirect to="/user/2" />
              )} />
              <Route exact path="/3" render={() => (
                <Redirect to="/user/3" />
              )} />
              <Route exact path="/4" render={() => (
                <Redirect to="/user/4" />
              )} />
              <Route exact path="/5" render={() => (
                <Redirect to="/user/5" />
              )} />
              {/* Catch any mistyped pages */}
              <Route render={() => (<h1>ERROR 404: Page not found</h1>)} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

// Simply export 'App' with no connection to redux
export default App;
