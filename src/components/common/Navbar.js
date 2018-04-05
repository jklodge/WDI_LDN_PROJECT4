import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  //to avoid binding the method inside a constructor I use an arrow function, because they don't care about 'this'
  handleToggle = () => {
    // for burger menu, toggle between open and closed
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  componentWillUpdate() {
    // if the nav is open, set the state back to closed when the component updates
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  handleLogout = () => {
    Auth.logout();
    // redirect to recipes page on logout?
    // change this if necessary
    Flash.setMessage('danger', 'You have now logged out.');
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          Meal Pal
          </Link>
          <div className={`navbar-burger ${this.state.navIsOpen? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">

            {Auth.isAuthenticated() ?
              <div>
                <a className="navbar-item" onClick={this.handleLogout}>Logout</a>
              </div>
              :
              <div>
                <Link className="navbar-item" to="/register">Register</Link>
                <Link className="navbar-item" to="/login">Login</Link>
              </div>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
