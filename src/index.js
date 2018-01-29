import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import './styles/walmart-colors.css'; //compiled stylesheet with walmart colors
import registerServiceWorker from './registerServiceWorker';

import Search from './containers/Search/Search';
import Details from './containers/Details/Details';

import history from './utils/history';

class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
