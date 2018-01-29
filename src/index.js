import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import './styles/walmart-colors.css'; //compiled stylesheet with Walmart colors
import './styles/app.css'; //app-wide util classes
import registerServiceWorker from './registerServiceWorker';

//our two views
import Search from './containers/Search/Search'; //allows for searching and displays a tiled list of results
import Details from './containers/Details/Details'; //displays detailed item info and recommendations

//for allowing us to manipulate the history object from anywhere
import history from './utils/history';

//app initialization and bootstrapping
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
