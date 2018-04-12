import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import { Link } from 'react-router-dom';

class Login extends React.Component {

  // set state as an empty object
  state = {
    errors: {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors, [name]: '' };
    // set the state from the form with the name as the key (in this case email)
    // set the value as the value being entered in the form
    // console.log this so I can see what is being entered
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // stop the form from its default behaviour because this would reload the page
    e.preventDefault();

    // post request to my database, sending this.state in
    axios.post('/api/login', this.state)
    // set the token in localStorage using the token found in the response data
      .then(res => Auth.setToken(res.data.token))
      // set flash message using Flash class in lib/Flash
      .then(() => Flash.setMessage('info', 'Welcome back!'))
      // redirect to this place
      .then(() => this.props.history.push('/recipes'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return(
      <section id="login">
        <div id="form" className="grey-box">
          {/* <div>
            <img src="../../assets/images/snappy-food-logo-banner.jpeg" alt="Snappy Food Logo"/>
          </div> */}
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              {/* <label htmlFor="email">Email</label> */}
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              {/* <label htmlFor="password">Password</label> */}
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            {/* <button id="button" className="button">Start Cooking!</button> */}
            <button id="button" className="button">Log in</button>
            <Link to="/register">Don&#39;t have an account? Register now!</Link>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
