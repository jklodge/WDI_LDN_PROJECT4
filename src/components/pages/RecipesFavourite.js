import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class RecipesFavourite extends React.Component {
  state = {}

  componentDidMount() {
    axios.get('/api/me', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }));
  }

  render() {
    if(!this.state.user) return null;
    return(
      <div id="recipes-favourite">
        {this.state.user.favourites.map((favourite, i) => <p key={i}>{favourite.title}</p>)}
      </div>
    );
  }
}

export default RecipesFavourite;
