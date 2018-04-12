import React from 'react';
import { Link } from 'react-router-dom';

const PossibilityItem = ({ name, onChange, checked }) => (
  <div id="possibility-item">
    <label className="checkbox">
      {name}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </label>
  </div>
);

class Possibilities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      possibilities: this.props.possibilities,
      selected: this.props.possibilities,
      newItem: ''
    };
  }

  handleChangeToSelected = (name) => {
    const { selected } = this.state;
    const newSelected = selected.indexOf(name) === -1 ? [...selected, name] : selected.filter(value => value !== name);

    this.setState({
      selected: newSelected
    });
  }

  handleChangeInputText = (e) => {
    //store the value of the input field on state for later
    this.setState({ newItem: e.target.value });
  }

  addPossibility = (e) => {
    e.preventDefault();
    this.setState({
      newItem: '',
      possibilities: this.state.possibilities.concat(this.state.newItem),
      selected: this.state.selected.concat(this.state.newItem)
    });
  }

  render() {
    const { possibilities } = this.state;
    const ingredientList = [ ...this.state.selected ];
    if(this.state.newItem) ingredientList.push(this.state.newItem);
    return (
      <div id="possibilities" className="possibilities">
        {
          possibilities.map((name, i ) =>
            <PossibilityItem
              key={i}
              name={name}
              checked={this.state.selected.indexOf(name) !== -1}
              onChange={() => this.handleChangeToSelected(name)}
            />)
        }
        <form onSubmit={this.addPossibility}>
          <input
            className="add-ingredient"
            onChange={this.handleChangeInputText}
            type="text"
            placeholder="Add ingredient"
            value={this.state.newItem}
          />
        </form>
        <Link
          className="button"
          to={`/recipes/found?ingredients=${ingredientList}`}
        >
          Find recipes with selected ingredients
        </Link>
      </div>
    );
  }
}

export default Possibilities;
