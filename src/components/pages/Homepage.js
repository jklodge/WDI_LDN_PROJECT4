import React from 'react';

import Icon from '../recipesIndex/Icon';

import { Link } from 'react-router-dom';

class Homepage extends React.Component {

  state = {
    srcs: [
      { name: 'upload', path: '../assets/images/upload.png' },
      { name: 'recipes', path: '../assets/images/recipes.png' },
      { name: 'shopping-list', path: '../assets/images/shopping-list.png' },
      { name: 'eat', path: '../assets/images/eat.png' }
    ]
  }

  render() {
    return (
      <section>
        <h2 className="title is-3">How to:</h2>
        <Icon srcs={this.state.srcs} />
        <Link to="/recipes">
          <button className="button is-primary">Upload an image</button>
        </Link>
        {/* {' '}
        <Link to="/recipes-manual">
          <button className="button is-primary">Input manually</button>
        </Link> */}
      </section>
    );
  }
}

export default Homepage;
