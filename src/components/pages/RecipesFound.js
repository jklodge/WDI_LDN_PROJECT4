import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';

import Recipes from '../recipesInput/Recipes';
import SearchBar from '../recipesInput/SearchBar';

import Auth from '../../lib/Auth';

class RecipesFound extends React.Component {
  state = {
    recipes: [],
    veganRecipes: [],
    sortBy: '',
    sortDirection: '',
    query: ''
  }

  componentWillMount() {
    const { ingredients } = queryString.parse(this.props.location.search);
    axios
      .post('/api/recipes', { ingredients }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(({ data }) => this.setState({ recipes: data}));
  }

  handleSort = (e) => {
    console.log(e.target.value);
    const { ingredients } = queryString.parse(this.props.location.search);
    if (['vegan', 'vegetarian', 'pescetarian', 'paleo'].includes(e.target.value)) {
      axios
        .post(`/api/recipes?diet=${e.target.value}`, { ingredients }, {
          headers: { Authorization: `Bearer ${Auth.getToken()}`}
        })
        .then(({ data }) => this.setState({ veganRecipes: data }));
      // setState of recipes
    } else {
      const [sortBy, sortDirection] = e.target.value.split('|');
      this.setState({ sortBy, sortDirection, veganRecipes: [] });
    }
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  }

  handleSortFilterLogic = () => {
    if (this.state.veganRecipes.length) return this.state.veganRecipes;
    const { sortBy, sortDirection, query } = this.state;
    const regex = new RegExp(query, 'i');

    const orderedRecipes = _.orderBy(this.state.recipes, [sortBy], [sortDirection]);
    // const filtered = _.filter(orderedRecipes, (recipe) => regex.test(recipe.title && product.brand));
    const filtered = _.filter(orderedRecipes, (recipe) => regex.test(recipe.title));
    return filtered;
  }

  render() {
    if (!this.state.recipes) return null;
    return (
      <section id="recipes-found">
        <SearchBar handleSort={this.handleSort} handleSearch={this.handleSearch} recipes={this.handleSortFilterLogic()} />
        <Recipes recipes={this.handleSortFilterLogic()} />
      </section>
    );
  }
}

export default RecipesFound;
