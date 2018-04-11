import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

import DataSection from '../recipesShow/DataSection';

class RecipeShow extends React.Component {

  state = {
    recipe: null,
    sectionOpened: {
      steps: false,
      ingredients: false,
      info: false,
      diets: false,
      shoppinglist: false
    }
  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ recipe: res.data }, () => console.log(this.state.recipe)));
    console.log(this.props.location.state);
  }

  getRelevantDataFromRecipes() {
    const instructions = this.state.recipe.analyzedInstructions[0] ? this.state.recipe.analyzedInstructions[0].steps : [];
    return instructions.map(item => {
      return {
        ingredients: item.ingredients.map(ingredient => ingredient.name),
        step: item.step
      };
    });
  }

  toggleSectionOpened = (e) => {
    const sectionOpened = e.currentTarget.textContent.toLowerCase();
    this.setState({
      sectionOpened: {
        ...this.state.sectionOpened,
        [sectionOpened]: !this.state.sectionOpened[sectionOpened]
      }
    });
    console.log(this.state.sectionOpened);
  }

  render() {
    if(!this.state.recipe) return null;
    const instructions = this.getRelevantDataFromRecipes();
    const missedIngredients = this.props.location.state.missedIngredients;

    return (
      <section id="recipes-show">
        <h1 className="title has-text-centered">{this.state.recipe.title}</h1>
        <img src={this.state.recipe.image} />

        <br />
        <DataSection
          sectionOpened={this.state.sectionOpened.diets}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Diets"
        >
          <ul>
            {this.state.recipe.diets.map((diet, i) => <li key={i}>{diet}</li>)}
          </ul>
        </DataSection>

        <br />
        <DataSection
          sectionOpened={this.state.sectionOpened.info}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Info"
        >
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
        </DataSection>

        <br />
        {instructions.length > 0 && <DataSection
          sectionOpened={this.state.sectionOpened.steps}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Steps"
        >
          <ul>
            {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
          </ul>
        </DataSection>}

        <br />
        <DataSection
          sectionOpened={this.state.sectionOpened.ingredients}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Ingredients"
        >
          <ul>
            {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}> {extendedIngredient.name}</li>)}
          </ul>
        </DataSection>

        <br />
        <DataSection
          sectionOpened={this.state.sectionOpened.shoppinglist}
          toggleSectionOpened={this.toggleSectionOpened}
          header="ShoppingList"
        >
          <ul>
            {missedIngredients.map((missedIngredient, i) => <li key={i}>{missedIngredient.name}</li>
            )}
          </ul>
        </DataSection>

      </section>
    );
  }
}

export default RecipeShow;
