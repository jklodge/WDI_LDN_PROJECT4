import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

import DataSection from '../recipesShow/DataSection';

class RecipeShow extends React.Component {

  state = {
    recipe: null,
    modalIsOpen: false,
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

  handleToggleModal = () => {
    // for burger menu, toggle between open and closed
    console.log('click');
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    if(!this.state.recipe) return null;
    const instructions = this.getRelevantDataFromRecipes();
    const missedIngredients = this.props.location.state.missedIngredients;

    return (
      <section id="recipes-show">
        <h1 className="title has-text-centered">{this.state.recipe.title}</h1>
        <div id="food-image-background">
          <img id="food-image" src={this.state.recipe.image} />
        </div>
        <div id="food-image-round-div">
          <img id="food-image-round" src={this.state.recipe.image} />
        </div>

        {/* <DataSection
          sectionOpened={this.state.sectionOpened.diets}
          toggleSectionOpened={this.toggleSectionOpened}
          header="Diets"
        >
          <ul>
            {this.state.recipe.diets.map((diet, i) => <li key={i}>{diet}</li>)}
          </ul>
        </DataSection> */}

        <div className="modal-container" onClick={this.handleToggleModal}>
          {/* <div id="recipe-show-modal" className="modal is-active"> */}
          <i className="fas fa-info-circle has-text-info"></i>
          <div id="recipe-show-modal" className={`modal ${this.state.modalIsOpen ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div>
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
                <p>Price per serving: £{parseFloat(this.state.recipe.pricePerServing / 100).toFixed(2) }</p>
                {/* </DataSection> */}
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>
        </div>

        {/* <DataSection
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
        </DataSection> */}

        <div className="recipe-info">
          {instructions.length > 0 && <DataSection
            sectionOpened={this.state.sectionOpened.steps}
            toggleSectionOpened={this.toggleSectionOpened}
            header="Steps"
          >
            <ul>
              {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
            </ul>
          </DataSection>}

          <DataSection
            sectionOpened={this.state.sectionOpened.ingredients}
            toggleSectionOpened={this.toggleSectionOpened}
            header="Ingredients"
          >
            <ul>
              {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}> {extendedIngredient.name}</li>)}
            </ul>
          </DataSection>

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
        </div>

      </section>
    );
  }
}

export default RecipeShow;
