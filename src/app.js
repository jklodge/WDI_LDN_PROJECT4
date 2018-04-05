import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './components/pages/Homepage';
// import IndexRoute from './components/pages/IndexRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/common/NotFound';
import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <FlashMessages />
          <Navbar />
          <section>
            <Switch>
              {/* <Route path="/recipes" component={IndexRoute} /> */}
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
