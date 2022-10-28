import React from 'react';
import PropTypes, { string } from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import './style.css';

const FinishBtn = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { ingredientsCheck, recipeInfo } = props;

  const updateRecipes = () => {
    const today = new Date();
    const doneDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const verifyCat = () => (pathname.includes('foods') ? 'Meal' : 'Drink');

    const {
      [`id${verifyCat()}`]: id,
      strArea: nationality,
      strCategory: category,
      [`str${verifyCat()}`]: name,
      [`str${verifyCat()}Thumb`]: image,
      strTags: tags,
    } = recipeInfo;

    const recipe = {
      id,
      nationality,
      category,
      name,
      image,
      doneDate,
      tags,
    };

    if (pathname.includes('foods')) {
      recipe.alcoholicOrNot = '';
      recipe.type = 'food';
    } else {
      recipe.alcoholicOrNot = recipeInfo.strAlcoholic;
      recipe.type = 'drink';
      recipe.nationality = '';
      recipe.tags = [];
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    }
    history.push('/done-recipes');
  };

  const counter = Object.keys(recipeInfo).filter((a) => a.includes('strIngredient'))
    .map((info, index) => {
      if (recipeInfo[info] && recipeInfo[info].length > 1) {
        return index;
      }
      return null;
    });

  const lastIndex = -1;
  const ingredientsLength = counter.filter((n) => n).at(lastIndex) + 1;

  if (ingredientsCheck && (ingredientsCheck.length !== ingredientsLength)) {
    return (
      <button
        className="finish-recipe-disable"
        data-testid="finish-recipe-btn"
        type="button"
        disabled
      >
        Finish Recipe
      </button>
    );
  }
  return (
    <button
      className="finish-recipe"
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ updateRecipes }
    >
      Finish Recipe
    </button>
  );
};

FinishBtn.propTypes = {
  ingredientsCheck: PropTypes.arrayOf(string).isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default FinishBtn;
