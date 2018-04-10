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
      diets: false
    }
  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
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

  toggleSectionOpened = (e) => {
    const sectionOpened = e.currentTarget.textContent.toLowerCase();
    this.setState({ sectionOpened: { [sectionOpened]: !this.state.sectionOpened[sectionOpened] } });
  }

  render() {
    if(!this.state.recipe) return null;
    const instructions = this.getRelevantDataFromRecipes();

    return (
      <section>
        <h1>{this.state.recipe.title}</h1>
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
        <DataSection
          sectionOpened={this.state.sectionOpened.steps}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Steps"
        >
          <ul>
            <li onClick={((e) => this.toggleSectionOpened(e))}>Steps:</li>
            {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
          </ul>
        </DataSection>

        <br />
        <DataSection
          sectionOpened={this.state.sectionOpened.ingredients}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Ingredients"
        >
          <ul>
            <li onClick={((e) => this.toggleSectionOpened(e))}>Ingredients:</li>
            {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}>- {extendedIngredient.name}</li>)}
          </ul>
        </DataSection>
      </section>
    );
  }
}

export default RecipeShow;
