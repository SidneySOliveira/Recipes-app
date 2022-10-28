import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import imageComp from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [shared, setShared] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => (
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);

  const removeFavoriteRecipe = (recipeId) => {
    const newFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== recipeId);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drink
      </button>
      {favoriteRecipes
        && favoriteRecipes.filter((recipe) => recipe.type.includes(filter))
          .map((favoriteRecipe, index) => (
            <div key={ index }>
              <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
                <img
                  src={ favoriteRecipe.image }
                  alt="comida"
                  width={ 250 }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${favoriteRecipe.nationality} - ${favoriteRecipe.category}`}
              </p>
              <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {favoriteRecipe.name}
                </p>
              </Link>
              { favoriteRecipe.alcoholicOrNot && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {favoriteRecipe.alcoholicOrNot}
                </p>)}
              <button
                src={ imageComp }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  setShared((prevState) => (prevState ? '' : favoriteRecipe.name));
                  copy(`http://localhost:3000/foods/${favoriteRecipe.id}`);
                } }
              >
                <img src={ imageComp } alt="sla" />
              </button>
              <button
                src={ blackHeart }
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => removeFavoriteRecipe(favoriteRecipe.id) }
              >
                <img src={ blackHeart } alt="sla" />
              </button>
              {shared === favoriteRecipe.name && <p>Link copied!</p>}
            </div>
          ))}
    </>
  );
};

export default FavoriteRecipes;
