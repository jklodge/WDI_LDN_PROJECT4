import React from 'react';
import axios from 'axios';

class RecipeShow extends React.Component {

  state = {
    recipe: null
  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ recipe: res.data }, () => console.log(this.state.recipe)));
  }
  getRelevantDataFromRecipes() {
    const instructions = this.state.recipe.analyzedInstructions[0].steps;
    return instructions.map(item => {
      return {
        equipment: item.equipment.map(equipment => equipment.name),
        ingredients: item.ingredients.map(ingredient => ingredient.name),
        step: item.step
      };
    });
  }
  render() {
    if(!this.state.recipe) return null;
    const instructions = this.getRelevantDataFromRecipes();
    // instructions.map((instruction) => console.log('ingredient ', instruction.ingredient));
    // instructions.map((instruction) => console.log('equipment ', instruction.equipment));
    // instructions.map((instruction) => console.log('step', instruction.step));
    return (
      <div>
        <h1>{this.state.recipe.title}</h1>
        <img src={this.state.recipe.image} />
        {this.state.recipe.diets.map((diet, i) => <p key={i}>diet - {diet}</p>)}
        <br />
        {this.state.recipe.dishTypes.map((dishType, i) => <p key={i}>dishType - {dishType}</p>)}
        <br />
        <p>Servings: {this.state.recipe.servings}</p>
        <p>Preparation Minutes: {this.state.recipe.preparationMinutes}</p>
        <p>Cooking Minutes: {this.state.recipe.cookingMinutes}</p>
        <p>Ready in Minutes: {this.state.recipe.readyInMinutes}</p>
        <p>WW Smart points: {this.state.recipe.weightWatcherSmartPoints}</p>
        <p>Price per serving: {this.state.recipe.pricePerServing}</p>
        <br />
        <ul>
          <li>You will need:</li>
          {instructions.map((instruction, i) => <li key={i}>{instruction.equipment.join(', ')}</li>)}
        </ul>
        {/* <br />
        <ul>
          <li>Ingredients:</li>
          {instructions.map((instruction, i) => <li key={i}>{instruction.ingredients.join(', ')}</li>)}
        </ul> */}
        <br />
        <ul>
          <li>Steps:</li>
          {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
        </ul>
        <br />
        <ul>
          <li>Ingredients:</li>
          {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}>- {extendedIngredient.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default RecipeShow;
