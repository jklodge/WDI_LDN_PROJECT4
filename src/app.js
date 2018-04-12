import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RecipesInput from './components/pages/RecipesInput';
import RecipesFound from './components/pages/RecipesFound';
import RecipesFavourite from './components/pages/RecipesFavourite';
import RecipesShow from './components/pages/RecipesShow';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/common/NotFound';
import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';
import ProtectedRoute from './components/common/ProtectedRoute';

import 'bulma';
import './assets/scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <FlashMessages />
          <Navbar />
          <section>
            {/* switch allows there to be more than one route under the router */}
            <Switch>
              <ProtectedRoute path="/recipes/found" component={RecipesFound} />
              <ProtectedRoute path="/recipes/favourites" component={RecipesFavourite} />
              <ProtectedRoute path="/recipes/:id" component={RecipesShow} />
              <ProtectedRoute path="/recipes" component={RecipesInput} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" render={() => <Redirect to="/login" />} />
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
