import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import './style.css';

const FavoriteBtn = (props) => {
  const [fav, setFav] = useState(false);
  const [body, setBody] = useState({});
  const { recipeInfo } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idForDetails = -1;
    const idForProgress = -2;
    const idIndex = pathname.includes('in-progress') ? idForProgress : idForDetails;

    if (favListLS && Object.keys(recipeInfo).includes('idMeal')) {
      const isFav = favListLS
        .some((info) => (info.id) === pathname.split('/').at(idIndex));
      setFav(isFav);
    }

    if (favListLS && Object.keys(recipeInfo).includes('idDrink')) {
      const isFav = favListLS
        .some((info) => (info.id) === pathname.split('/').at(idIndex));
      setFav(isFav);
    }

    const categoryLs = (Object.keys(recipeInfo).at(0));
    if (categoryLs === 'idMeal') {
      const foodBody = {
        alcoholicOrNot: '',
        category: recipeInfo.strCategory,
        id: recipeInfo.idMeal,
        image: recipeInfo.strMealThumb,
        name: recipeInfo.strMeal,
        nationality: recipeInfo.strArea,
        type: 'food',
      };
      setBody(foodBody);
    } else {
      const drinkBody = {
        alcoholicOrNot: recipeInfo.strAlcoholic,
        category: recipeInfo.strCategory,
        id: recipeInfo.idDrink,
        image: recipeInfo.strDrinkThumb,
        name: recipeInfo.strDrink,
        nationality: '',
        type: 'drink',
      };
      setBody(drinkBody);
    }
  }, [recipeInfo]);

  const handleFav = () => {
    const favListLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const categoryLs = (Object.keys(recipeInfo).at(0));

    if ((!favListLS) && Object.keys(recipeInfo).includes(categoryLs)) {
      const firstList = [body];
      localStorage.setItem('favoriteRecipes', JSON.stringify(firstList));
      setFav(true);
    } else if (favListLS && Object.keys(recipeInfo).includes(categoryLs)) {
      const isFav = favListLS
        .some((info) => (info.id) === recipeInfo[categoryLs]);
      if (!isFav) {
        favListLS.push(body);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favListLS));
        setFav(!isFav);
      } else {
        const removeFav = favListLS
          .filter((recipe) => (recipe.id !== recipeInfo[categoryLs]));
        localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
        setFav(!isFav);
      }
    }
  };

  if (fav) {
    return (
      <button
        className="fav-btn-marked"
        data-testid="favorite-btn"
        type="button"
        onClick={ handleFav }
        src={ blackHeart }
        alt="blackheart"
      >
        <img src={ blackHeart } alt="black" />
      </button>
    );
  }
  return (
    <button
      className="fav-btn-unmarked"
      data-testid="favorite-btn"
      src={ whiteHeart }
      alt="whiteHeart"
      type="button"
      onClick={ handleFav }
    >
      <img src={ whiteHeart } alt="white" />
    </button>
  );
};

FavoriteBtn.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default FavoriteBtn;
