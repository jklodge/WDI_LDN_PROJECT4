import React from 'react';
import axios from 'axios';

import Possibilities from '../recipesInput/Possibilities';
import Image from '../common/Image';

import Auth from '../../lib/Auth';


class RecipesInput extends React.Component {

  state = {
    image: '',
    // isLoading: false,
    possibilities: [],
    inputMethodSwitchPressed: false,
    goPressed: false
  }

  handleChange = image => {
    // sets state to the image the user has uploaded
    this.setState({ image }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    this.setState({ isLoading: true });
    // make a post request to my API, which is making a get request from the recipes API
    axios
      .post('/api/possible-food-names', { image: this.state.image }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ possibilities: res.data, goPressed: true }))
      .then(() => console.log(this.state));
  }

  toggleInputMethodSwitchPressed = () => {
    this.setState({ inputMethodSwitchPressed: !this.state.inputMethodSwitchPressed });
    console.log(this.state);
  }

  render() {
    return (
      <section id="recipes-input">
        <div className="grey-box">
          {!this.state.inputMethodSwitchPressed ? (
            <div>
              <Image handleChange={this.handleChange} image={this.state.image} />
              <form>
                <div className="center-container">
                  <button id="button" onClick={this.handleSubmit} className="button go-button">Go</button>
                </div>
              </form>
              <div className="center-container">
                <button
                  onClick={this.toggleInputMethodSwitchPressed}
                  id="button"
                  className="button trouble-button"
                >
                  Having trouble? Input ingredients manually
                </button>
                {this.state.goPressed && <Possibilities possibilities={this.state.possibilities} />}
              </div>
            </div>
          ) : (
            <div>
              <Possibilities possibilities={this.state.possibilities}/>
              <div className="center-container">
                <button
                  onClick={this.toggleInputMethodSwitchPressed}
                  id="button"
                  className="button"
                >
                  Back to image uploader
                </button>
              </div>
            </div>
            //     {/* {!this.state.isLoading ? <Image handleChange={this.handleChange} image={this.state.image} /> : <h1 className="title is-1">LOADING</h1>} */}
          )}
        </div>
      </section>
    );
  }
}

export default RecipesInput;
