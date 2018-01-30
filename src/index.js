import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import './styles/walmart-colors.css'; //compiled stylesheet with Walmart colors
import './styles/app.css'; //app-wide util classes
import registerServiceWorker from './registerServiceWorker'; //create-react-app boilerplate

//our two views
import Search from './containers/Search'; //allows for searching and displays a tiled list of results
import Details from './containers/Details'; //displays detailed item info and recommendations

//for allowing us to manipulate the history object anywhere
import history from './utils/history';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Search}/>
                        <Route path='/search/:searchTerm' component={Search}/>
                        <Route path='/details/:itemId?' component={Details}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

//app initialization and bootstrapping
ReactDOM.render(<App />, document.getElementById('root'));

//create-react-app boilerplate
registerServiceWorker();
