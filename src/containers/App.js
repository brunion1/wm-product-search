import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

//our two views
import Search from './Search'; //allows for searching and displays a tiled list of results
import Details from './Details'; //displays detailed item info and recommendations

//for allowing us to manipulate the history object anywhere
import history from '../utils/history';

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
                        <Route path='/search/:searchTerm' component={Search}/>
                        <Route path='/details/:itemId?' component={Details}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;