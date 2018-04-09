import React from 'react';

class Test extends React.Component {

  state = {
    list: [/*{ item: 'strawberry' }, { item: 'chocolate' }*/],
    newItem: ''
  }

  handleChange = (e) => {
    //store the value of the input field on state for later
    this.setState({ newItem: e.target.value });
  }

  handleSubmit = (e) => {
    //concat the value of the input field that we saved in state to the todos array in state
    e.preventDefault();
    this.setState({
      list: this.state.list.concat({ item: this.state.newItem }),
      newItem: ''
    });
  }

  handleDelete(index) {
    this.setState({
      list: this.state.list.filter((item, i) => i !== index)
    });
  }

  render() {
    console.log(this.state);
    return (
      <section>
        <ul>
          {this.state.list.map((list,index) =>
            <div key={index}>
              <li>
                {list.item}
                <button onClick={() => this.handleDelete(index)}>x</button></li>
            </div>
          )}
        </ul>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Add ingredient"
              value={this.state.newItem}
            />
            <button>Add</button>
          </form>
        </div>
      </section>
    );
  }
}

export default Test;
