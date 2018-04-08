import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Recipes from '../recipesIndex/Recipes';

import Image from '../common/Image';

const PossibilityItem = ({ name, onChange, checked }) => (
  <label><input type="checkbox" checked={checked} onChange={onChange}/> {name}</label>
);

class Possibilities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.possibilities
    };
  }
  handleChangeToSelected = (name) => {
    const { selected } = this.state;
    const newSelected = selected.indexOf(name) === -1 ? [...selected, name] : selected.filter(value => value !== name);

    this.setState({
      selected: newSelected
    });
  }
  render() {
    const { possibilities } = this.props;
    return (
      <div className="possibilities">
        {
          possibilities.map((name, i ) => <PossibilityItem key={i} name={name} checked={this.state.selected.indexOf(name) !== -1} onChange={() => this.handleChangeToSelected(name)}/>)
        }
        <Link to={{pathname: '/recipes/found', state: {ingredients: this.state.selected.join(',') }}}>
          <button>Find recipes with selected ingredients</button>
        </Link>
      </div>
    );
  }
}

class RecipesIndex extends React.Component {

  state = {
    image: '',
    recipes: null,
    isLoading: false,
    possibilities: []
  }

  handleChange = image => {
    // sets state to the image the user has uploaded
    this.setState({ image }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    this.setState({ isLoading: true });
    // make a post request to my API, which is making a get request from the recipes API
    axios
      .post('/api/possible-food-names', { image: this.state.image })
      .then(res => this.setState({ possibilities: res.data }))
      .then(() => console.log(this.state));
  }

  render() {
    return (
      <section>
        {!this.state.possibilities.length?
          <div>
            {!this.state.isLoading ? <Image handleChange={this.handleChange} image={this.state.image} /> : <h1 className="title is-1">LOADING</h1>}
            <form>
              <button onClick={this.handleSubmit} className="button is-primary">Submit</button>
            </form>
          </div>
          :
          <Possibilities possibilities={this.state.possibilities}/>
        }
      </section>
    );
  }
}

export default RecipesIndex;
