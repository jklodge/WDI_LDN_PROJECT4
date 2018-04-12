import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {

  return (
    <div>
      <h1 className="title is-1 has-text-centered">Recipes</h1>
      <ul className="columns is-multiline">
        {recipes.map((recipe, i) =>
          <li key={i} className="column is-mobile is-one-third-tablet is-one-quarter-desktop">
            <Link to={{
              pathname: `/recipes/${recipe.id}`,
              state: { missedIngredients: recipe.missedIngredients }
            }}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={recipe.image} alt={recipe.title} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="has-text-centered">{recipe.title}</p>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Recipes;
