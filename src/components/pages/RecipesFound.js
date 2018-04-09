import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Recipes from '../recipesIndex/Recipes';

class RecipesFound extends React.Component {
  state = {
    recipes: []
  }
  componentWillMount() {
    const { ingredients } = queryString.parse(this.props.location.search);
    // const ingredients = this.props.location.state.ingredients;
    axios
      .post('/api/recipes', { ingredients })
      .then(({ data }) => this.setState({ recipes: data}));
  }
  render() {
    if (!this.state.recipes) {
      return null;
    }
    return (
      <Recipes recipes={this.state.recipes} />
    );
  }
}

export default RecipesFound;
