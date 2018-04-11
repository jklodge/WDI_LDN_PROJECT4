import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {

  return (
    <div>
      <h1 className="title is-1">Recipes</h1>
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
                  <h3 className="title is-4">{recipe.title}</h3>
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
