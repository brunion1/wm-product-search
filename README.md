# Product Search App

This is a responsive product search and recommendations app utilizing the Walmart search, recommendations, and item endpoints.
It uses React, MUICSS, and the style-components library, plus Axios for service calls. Boilerplate was provided by create-react-app.

## Getting Started

Assuming you have NodeJS and yarn/npm installed, the following commands will pull and load the app:

```
git clone https://github.com/brunion1/wm-product-search.git

cd wm-product-search

yarn/npm install

yarn/npm start
```

In order to successfully make service calls, you'll need to supply your own API Key. Replace the empty string in src/config/config.js with one of your own.

If you haven't already, you'll also need to enable CORS to run. As of January 31st, the app is also running at https://walmart-search-app.herokuapp.com/

## Running the tests

To run the tests, run the following:

```
yarn test
```

## Built With

* [React](https://reactjs.org/) - JavaScript framework
* [create-react-app](https://github.com/facebook/create-react-app) - Allows for fast react app creation with no build configuration
* [Yarn](https://yarnpkg.com/en/) - For dependency management
* [MuiCSS](https://www.muicss.com/docs/v1/react/introduction) - An awesome, lightweight flavor of Material with a robust set of React-compatible components
* [styled-components](https://www.styled-components.com/docs/basicsax) - Library for building your own responsive, styled components without separate css files
* [Axios](https://github.com/axios/axios) - Used for service calls
