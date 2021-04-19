import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import homepage from './pages/homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ViewPosts from './pages/Posts';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts/view" component={ViewPosts} />
        </Switch>
      </BrowserRouter>
    )
}

export default App;
