import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/Admin';
import './css/style.css';
import Login from './components/Login';

function App():React.ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/admin/:id?">
          <Admin />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
