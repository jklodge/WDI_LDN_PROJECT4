import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import { Link } from 'react-router-dom';

class Register extends React.Component {

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    // set the state from the form with the name as the key (in this case email)
    // set the value as the value being entered in the form
    // console.log this so I can see what is being entered
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent reload
    e.preventDefault();
    // make a post request to /api/Register
    // send the form data
    // redirect to recipes page
    axios.post('/api/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Thank you for registering. Please log in.'))
      .then(() => this.props.history.push('/login'));
  }

  render() {
    return (
      <section id="register">
        <h1 className="title has-text-centered">Welcome</h1>
        <p className="subtitle has-text-centered">We are snappy food - we give you delicious recipes based on the ingredients in your fridge.</p>
        <div id="form" className="grey-box">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
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
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <button id="button" className="button">Register</button>
            <Link to="/login">Login</Link>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;
