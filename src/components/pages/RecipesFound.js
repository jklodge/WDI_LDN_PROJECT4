import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';

import Recipes from '../recipesIndex/Recipes';
import SearchBar from '../recipesIndex/SearchBar';

class RecipesFound extends React.Component {
  state = {
    recipes: [],
    veganRecipes: [],
    sortBy: '',
    sortDirection: '',
    query: '',
    diets: []
  }

  componentWillMount() {
    const { ingredients } = queryString.parse(this.props.location.search);
    // const ingredients = this.props.location.state.ingredients;
    axios
      .post('/api/recipes', { ingredients })
      .then(({ data }) => this.setState({ recipes: data}));
  }

  'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?diet=vegan&includeIngredients=onions%2C+lettuce%2C+tomato'

  handleSort = (e) => {
    console.log(e.target.value);
    const { ingredients } = queryString.parse(this.props.location.search);
    if (e.target.value === 'vegan') {
      axios
        .post('/api/recipes?diet=vegan', { ingredients })
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
      <section>
        <SearchBar handleSort={this.handleSort} handleSearch={this.handleSearch} recipes={this.handleSortFilterLogic()} />
        <Recipes recipes={this.handleSortFilterLogic()} />
      </section>
    );
  }
}

export default RecipesFound;
