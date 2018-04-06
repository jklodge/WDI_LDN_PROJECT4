import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class Login extends React.Component {

  // set state as an empty object
  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    // set the state from the form with the name as the key (in this case email)
    // set the value as the value being entered in the form
    // console.log this so I can see what is being entered
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // stop the form from its default behaviour because this would reload the page
    e.preventDefault();

    // post request to my database, sending this.state in
    axios.post('/api/login', this.state)
    // set the token in localStorage using the token found in the response data
      .then(res => Auth.setToken(res.data.token))
      // set flash message using Flash class in lib/Flash
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      // redirect to this place
      .then(() => this.props.history.push('/recipes'));
  }

  render() {
    return(
      <section>
        <form onSubmit={this.handleSubmit}>
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
          <button className="button is-primary">Submit</button>
        </form>
      </section>
    );
  }
}

export default Login;
