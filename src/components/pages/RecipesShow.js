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
    console.log(this.state.recipe.analyzedInstructions[0].steps);
    // console.log(this.state.recipe.analyzedInstructions);
    const instructions = this.getRelevantDataFromRecipes();
    console.log(instructions);
    // instructions.map((instruction) => console.log(instruction));
    // const instructions = this.state.recipe.instructions.split(/[0-9]\. /).splice(1);
    return (
      <div>
        {/* {this.state.recipe.map((data, i) =>
          <p key={i}>{data.title}</p>
        )} */}
        <h1>{this.state.recipe.title}</h1>
        <img src={this.state.recipe.image} />
        {this.state.recipe.diets.map((diet, i) => <p key={i}>- {diet}</p>)}
        {this.state.recipe.dishTypes.map((dishType, i) => <p key={i}>- {dishType}</p>)}
        <p>Servings: {this.state.recipe.servings}</p>
        <p>Preparation Minutes: {this.state.recipe.preparationMinutes}</p>
        <p>Cooking Minutes: {this.state.recipe.cookingMinutes}</p>
        <p>Ready in Minutes: {this.state.recipe.readyInMinutes}</p>
        <p>WW Smart points: {this.state.recipe.weightWatchersSmartPoints}</p>
        <p>Price per serving: {this.state.recipe.pricePerServing}</p>
        {/* <p>{instruction.step[0]}</p>
        {instructions.equipment.} */}
        {/* {instructions.map((instruction, i) => <p key={i}>{instruction}</p>)} */}
        {/* <p>{this.state.recipe.instructions}</p> */}
        {}
      </div>
    );
  }
}

export default RecipeShow;
