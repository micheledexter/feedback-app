import React, { Component } from 'react';
import './App.css';
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import ThankYou from '../ThankYou/ThankYou';
import Admin from '../Admin/Admin';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="Router">
            <header className="App-header">
              <h1 className="App-title">Feedback!</h1>
            </header>
            <Route exact path="/" component={Feeling} />
            <Route exact path="/2" component={Understanding} />
            <Route exact path="/3" component={Support} />
            <Route exact path="/4" component={Comments} />
            <Route exact path="/5" component={ThankYou} />
            <Route exact path="/admin" component={Admin} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
