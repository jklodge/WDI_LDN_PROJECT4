import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

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
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input className="input"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="input"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            onChange={this.handleChange}
          />
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;
