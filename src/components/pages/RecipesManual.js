import React from 'react';
import axios from 'axios';

import Recipes from '../recipesIndex/Recipes';

class RecipesManual extends React.Component {

  state = {
    recipes: null,
    isLoading: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    // set the state from the form with the name as the key (in this case email)
    // set the value as the value being entered in the form
    // console.log this so I can see what is being entered
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    this.setState({ isLoading: true });
    // make a post request to my API, which is making a get request from the recipes API
    axios
      .post('/api/recipes', this.state)
      .then(res => this.setState({ recipes: res.data }))
      .then(() => console.log(this.state.recipes));
  }

  render() {
    return (
      <section>
        {!this.state.recipes ?
          <div>
            {!this.state.isLoading ?
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="ingredients">Ingredients</label>
                  <input className="input"
                    placeholder="Ingredients"
                    name="ingredients"
                    onChange={this.handleChange}
                  />
                </div>
                <button className="button is-primary">Submit</button>
              </form>
              :
              <h1 className="title is-1">LOADING</h1>}
            {/* <form>
              <button onClick={this.handleSubmit} className="button is-primary">Submit</button>
            </form> */}
          </div>
          :
          <Recipes recipes={this.state.recipes} />
        }
      </section>
    );
  }
}

export default RecipesManual;
