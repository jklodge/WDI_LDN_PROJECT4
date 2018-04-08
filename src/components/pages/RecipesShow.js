import React from 'react';
import axios from 'axios';

class RecipeShow extends React.Component {

  state = {
    recipe: null,
    stepsPressed: false,
    ingredientsPressed: false,
    infoPressed: false,
    dietPressed: false
  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ recipe: res.data }, () => console.log(this.state.recipe)));
  }

  getRelevantDataFromRecipes() {
    const instructions = this.state.recipe.analyzedInstructions[0].steps;
    return instructions.map(item => {
      return {
        ingredients: item.ingredients.map(ingredient => ingredient.name),
        step: item.step
      };
    });
  }

  toggleStepsPressed = () => {
    this.setState({ stepsPressed: !this.state.stepsPressed });
  }

  toggleIngredientsPressed = () => {
    this.setState({ ingredientsPressed: !this.state.ingredientsPressed });
  }

  toggleInfoPressed = () => {
    this.setState({ infoPressed: !this.state.infoPressed });
  }

  toggleDietsPressed = () => {
    this.setState({ dietsPressed: !this.state.dietsPressed });
  }

  render() {
    if(!this.state.recipe) return null;
    const instructions = this.getRelevantDataFromRecipes();

    return (
      <section>
        <h1>{this.state.recipe.title}</h1>
        <img src={this.state.recipe.image} />

        <br />
        {this.state.dietsPressed ? (
          <div>
            <ul>
              <li onClick={this.toggleDietsPressed}>Diets:</li>
              {this.state.recipe.diets.map((diet, i) => <li key={i}>{diet}</li>)}
            </ul>
          </div>
        ) : (
          <div>
            <p onClick={this.toggleDietsPressed}><u>Diets</u></p>
          </div>
        )}

        <br />
        {this.state.infoPressed ? (
          <div>
            <h3 onClick={this.toggleInfoPressed}>Info:</h3>
            <p>Servings: {this.state.recipe.servings}</p>
            <p>Preparation Minutes:{' '}
              {this.state.recipe.preparationMinutes > 100 ? (
                this.state.recipe.preparationMinutes / 100
              ) : (
                this.state.recipe.preparationMinutes
              )}
            </p>
            <p>Cooking Minutes: {this.state.recipe.cookingMinutes}</p>
            <p>Ready in Minutes:{' '}
              {this.state.recipe.readyInMinutes > 100 ? (
                this.state.recipe.readyInMinutes / 100
              ) : (
                this.state.recipe.readyInMinutes
              )}
            </p>
            <p>WW Smart points: {this.state.recipe.weightWatcherSmartPoints}</p>
            <p>Price per serving: £{parseFloat(this.state.recipe.pricePerServing / 100).toFixed(2) }</p>
          </div>
        ) : (
          <div>
            <p onClick={this.toggleInfoPressed}><u>Info</u></p>
          </div>
        )}

        <br />
        {this.state.stepsPressed ? (
          <div>
            <ul>
              <li onClick={this.toggleStepsPressed}>Steps:</li>
              {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
            </ul>
          </div>
        ) : (
          <div>
            <p onClick={this.toggleStepsPressed}><u>Steps</u></p>
          </div>
        )}

        <br />
        {this.state.ingredientsPressed ? (
          <div>
            <ul>
              <li onClick={this.toggleIngredientsPressed}>Ingredients:</li>
              {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}>- {extendedIngredient.name}</li>)}
            </ul>
          </div>
        ) : (
          <div>
            <p onClick={this.toggleIngredientsPressed}><u>Ingredients</u></p>
          </div>
        )}

        {/* <br />
        <ul>
          <li>You will need:</li>
          {instructions.map((instruction, i) => <li key={i}>{instruction.equipment.join(', ')}</li>)}
        </ul> */}
        {/* <br />
        <ul>
          <li>Ingredients:</li>
          {instructions.map((instruction, i) => <li key={i}>{instruction.ingredients.join(', ')}</li>)}
        </ul> */}

      </section>
    );
  }
}

export default RecipeShow;
