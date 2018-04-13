import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

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
    },
    userFavourites: []
  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ recipe: res.data }, () => console.log(this.state.recipe)));
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
    // for modal, toggle between open and closed
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  handleFavourite = (e) => {
    console.log(this.state.recipe.title);
    e.preventDefault();
    axios.post(`/api/recipes/${this.props.match.params.id}/favourites`, this.state.recipe,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        const filteredRes = res.data.favourites.filter(fav => fav !== null);
        this.setState({ userFavourites: filteredRes });
      })
      .then(console.log(this.state.userFavourites[0]))
      .catch(err => console.error(err));
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

        <div className="buttons">
          <button onClick={this.handleFavourite} className="button">Save recipe</button>
          <i className="fas fa-info-circle has-text-info"></i>
        </div>

        <div className="modal-container" onClick={this.handleToggleModal}>

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
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>
        </div>

        <div className="recipe-info columns is-multiline">
          <div className="instructions column">
            {instructions.length > 0 && <DataSection
              sectionOpened={this.state.sectionOpened.steps}
              toggleSectionOpened={this.toggleSectionOpened}
              header="Steps"
            >
              <ul>
                {instructions.map((instruction, i) => <li key={i}>{i+1}. {instruction.step}</li>)}
              </ul>
            </DataSection>}
          </div>

          <div className="ingredients column">
            <DataSection
              sectionOpened={this.state.sectionOpened.ingredients}
              toggleSectionOpened={this.toggleSectionOpened}
              header="Ingredients"
            >
              <ul>
                {this.state.recipe.extendedIngredients.map((extendedIngredient, i) => <li key={i}> {extendedIngredient.name}</li>)}
              </ul>
            </DataSection>
          </div>

          {/* <div className="shopping-list">
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
          </div> */}
        </div>
        <Link to="/recipes/favourites">See your saved recipes</Link>

      </section>
    );
  }
}

export default RecipeShow;
