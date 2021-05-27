import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import homepage from './pages/homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ViewPosts from './pages/Posts';
import Quiz from './pages/Quiz';
import HighScore from './pages/HighScore';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts/view" component={ViewPosts} />
          <Route exact path="/highscore" component={HighScore} />
          <Route exact path="/quiz" component={Quiz} />
        </Switch>
      </BrowserRouter>
    )
}

export default App;
