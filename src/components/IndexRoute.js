import React from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';

class IndexRoute extends React.Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    axios.get('/api/recipes')
      .then(res => console.log(res));
    // .then(res => this.setState( { recipes: res.data} ))
  }

  render() {
    return(
      <h1>Index route</h1>
      
    );
  }
}

export default IndexRoute;
