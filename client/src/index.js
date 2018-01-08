// Readers: To prepare this project to build along in `./App.js`, complete
// steps 1 & 2 below
import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//import App from './components/App';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// [STEP 1] Comment out this line:
//import './index-complete';

// [STEP 2] Un-comment these lines:
ReactDOM.render(
  <MuiThemeProvider>
    <Router>
      <div>
      <Route
        exact path='/'
        component={App} />
      <Route
        path='/:trackId'
        render={({ match }) => {
          return (<App selectedTrackId={match.params.trackId} />)
          }} />
      </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
 );
