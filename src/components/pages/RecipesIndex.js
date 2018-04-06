import React from 'react';
import axios from 'axios';

import Recipes from '../recipesIndex/Recipes';

import Image from '../common/Image';

class RecipesIndex extends React.Component {

  state = {
    image: '',
    recipes: null,
    isLoading: false
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
      .post('/api/recipes', this.state)
      .then(res => this.setState({ recipes: res.data }))
      .then(() => console.log(this.state.recipes));
  }

  render() {
    return (
      <section>
        {!this.state.recipes ?
          <div>
            {!this.state.isLoading ? <Image handleChange={this.handleChange} image={this.state.image} /> : <h1 className="title is-1">LOADING</h1>}
            <form>
              <button onClick={this.handleSubmit} className="button is-primary">Submit</button>
            </form>
          </div>
          :
          <Recipes recipes={this.state.recipes} />
        }
      </section>
    );
  }
}

export default RecipesIndex;
