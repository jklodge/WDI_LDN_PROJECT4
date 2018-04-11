import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import { Link } from 'react-router-dom';

class Register extends React.Component {

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
    // prevent reload
    e.preventDefault();
    // make a post request to /api/Register
    // send the form data
    // redirect to recipes page
    axios.post('/api/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Thank you for registering. Please log in.'))
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <section id="register">
        <h1 className="title has-text-centered">Welcome</h1>
        <p className="subtitle has-text-centered">We are snappy food - we give you delicious recipes based on the ingredients in your fridge.</p>
        <div id="form" className="grey-box">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                {/* {this.state.errors.username && <small>{this.state.errors.username}</small>} */}
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                {this.state.errors.username &&
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle has-text-warning"></i>
                  </span>
                }
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                {/* {this.state.errors.email && <small>{this.state.errors.email}</small>} */}
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                {this.state.errors.email &&
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle has-text-warning"></i>
                  </span>
                }
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
                {/* {this.state.errors.password && <small>{this.state.errors.password}</small>} */}
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
                {this.state.errors.password &&
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle has-text-warning"></i>
                  </span>
                }
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={this.handleChange}
                />
                {/* {this.state.errors.passwordConfirmation && <small>{this.state.errors.passwordConfirmation}</small>} */}
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
                {this.state.errors.passwordConfirmation &&
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle has-text-warning"></i>
                  </span>
                }
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
