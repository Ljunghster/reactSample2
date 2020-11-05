import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import homepage from './homepage';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={homepage} />
        </Switch>
      </BrowserRouter>
    )
}

export default App;
