import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Search from './Search/Search';
import Details from './Details/Details';

import history from '../utils/history';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Search}/>
            <Route path='/details/:itemId?' component={Details}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;