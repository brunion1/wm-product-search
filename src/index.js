import React from 'react';
import ReactDOM from 'react-dom';

import './styles/walmart-colors.css'; //compiled stylesheet with Walmart colors
import './styles/app.css'; //app-wide util classes
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker';

//app initialization and bootstrapping
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
