import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RecipesIndex from './components/pages/RecipesIndex';
import RecipesFound from './components/pages/RecipesFound';
import RecipesShow from './components/pages/RecipesShow';
import Homepage from './components/pages/Homepage';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/common/NotFound';
import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

import 'bulma';
import './assets/scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <FlashMessages />
          <Navbar />
          <section>
            {/* switch allows there to be more than one route under the router */}
            <Switch>
              <Route path="/recipes/found" component={RecipesFound} />
              <Route path="/recipes/:id" component={RecipesShow} />
              <Route path="/recipes" component={RecipesIndex} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Homepage} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
