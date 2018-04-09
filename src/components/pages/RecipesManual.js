import React from 'react';
import { Link } from 'react-router-dom';

class RecipesManual extends React.Component {

  state = {
    recipes: null,
    isLoading: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    // set the state from the form with the name as the key (in this case email)
    // set the value as the value being entered in the form
    // console.log this so I can see what is being entered
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  // handleSubmit = (e) => {
  //   // prevent the page from reloading
  //   e.preventDefault();
  //   this.setState({ isLoading: true });
  //   // make a post request to my API, which is making a get request from the recipes API
  //   axios
  //     .post('/api/recipes', this.state)
  //     .then(res => this.setState({ recipes: res.data }))
  //     .then(() => console.log(this.state.recipes));
  // }

  render() {
    const ingredientList = [ ...this.state ];
    return (
      <section>
        <div>
          {/* <form> */}
          <div className="field">
            <label htmlFor="ingredients">Ingredients</label>
            <input className="input"
              placeholder="Ingredients"
              name="ingredients"
              onChange={this.handleChange}
            />
          </div>
          {/* <Link to={{pathname: '/recipes/found', state: { ingredients: this.state.ingredients }}}>
            <button className="button is-primary">Go</button>
          </Link> */}
          <Link
            className="button is-primary"
            to={`/recipes/found?ingredients=${ingredientList}`}
          >
            Find recipes with selected ingredients
          </Link>
          {/* </form> */}
        </div>
      </section>
    );
  }
}

export default RecipesManual;
