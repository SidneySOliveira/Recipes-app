import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import './style.css';
import handleCheck from '../../services/handleCheck';
import FinishBtn from '../../Components/FinishBtn';
import FavoriteBtn from '../../Components/FavoriteBtn';
import ShareBtn from '../../Components/ShareBtn';

const RecipeInProgress = () => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const { pathname } = useLocation();
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const [storagePrev, setStoragePrev] = useState();
  const [cat, setCat] = useState();
  const [recipeId, setRecipeId] = useState();
  const commonFactor1 = 5;
  const commonFactor2 = 1.5;
  const commonFactor3 = 0.6;

  useEffect(() => {
    const arrayDetail = async () => {
      const idIndex = -2;
      if (pathname.includes('foods')) {
        const { meals } = await getFoodDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(meals[0]);
      } else {
        const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(drinks[0]);
      }
    };
    arrayDetail();
  }, [pathname]);

  useEffect(() => {
    if (Object.keys(recipeInfo)[0] === 'idMeal') {
      setCat('meals');
      setRecipeId(recipeInfo.idMeal);
    }
    if (Object.keys(recipeInfo)[0] === 'idDrink') {
      setCat('cocktails');
      setRecipeId(recipeInfo.idDrink);
    }
    const ingredientsLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLS && Object.keys(recipeInfo)[0] === 'idMeal'
      && ingredientsLS.meals[recipeInfo.idMeal]) {
      setIngredientsCheck(ingredientsLS.meals[recipeInfo.idMeal]);
    }
    if (ingredientsLS && Object.keys(recipeInfo)[0] === 'idDrink'
      && ingredientsLS.cocktails[recipeInfo.idDrink]) {
      setIngredientsCheck(ingredientsLS.cocktails[recipeInfo.idDrink]);
    }
    if (!ingredientsLS) {
      const initialLS = { meals: {}, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialLS));
      setStoragePrev({ meals: {}, cocktails: {} });
    }
    setStoragePrev(ingredientsLS);
  }, [recipeInfo]);

  const checking = (ingredientAndMeasure) => {
    handleCheck({
      setIngredientsCheck,
      ingredientsCheck,
      ingredientAndMeasure,
      storagePrev,
      cat,
      recipeId });
  };

  const checkRender = (ingredientAndMeasure, index) => {
    if (ingredientsCheck.includes(ingredientAndMeasure)) {
      return (<input
        data-testid={ `checkbox-${index}` }
        onChange={ () => {
          checking(ingredientAndMeasure);
        } }
        type="checkbox"
        defaultChecked
      />
      );
    }
    return (<input
      data-testid={ `checkbox-${index}` }
      onChange={ () => checking(ingredientAndMeasure) }
      type="checkbox"
    />
    );
  };

  return (
    <div className="recipe-details-container">
      <FinishBtn ingredientsCheck={ ingredientsCheck } recipeInfo={ recipeInfo } />
      {
        (recipeInfo.strMeal || recipeInfo.strDrink)
        && (pathname.includes('foods') ? (
          <div
            className="recipe-top-info"
          >
            <div
              className="recipe-top-info-img"
              style={ { backgroundImage: `url(${recipeInfo.strMealThumb})` } }
            >
              <img
                data-testid="recipe-photo"
                src={ recipeInfo.strMealThumb }
                alt={ recipeInfo.strCategory }
              />
            </div>
            <h1
              data-testid="recipe-title"
              style={ { fontSize: `${(commonFactor1)
              / (recipeInfo.strMeal.length ** (commonFactor3 / commonFactor2))}em` } }
            >
              {recipeInfo.strMeal}
            </h1>
            <p data-testid="recipe-category">{recipeInfo.strCategory}</p>
          </div>
        ) : (
          <div className="recipe-top-info">
            <div
              className="recipe-top-info"
            >
              <div
                className="recipe-top-info-img"
                style={ { backgroundImage: `url(${recipeInfo.strDrinkThumb})` } }
              >
                <img
                  data-testid="recipe-photo"
                  src={ recipeInfo.strDrinkThumb }
                  alt={ recipeInfo.strDrink }
                />
              </div>
              <h1
                data-testid="recipe-title"
                style={ { fontSize: `${(commonFactor1)
              / (recipeInfo.strDrink.length ** (commonFactor3 / commonFactor2))}em` } }
              >
                {recipeInfo.strDrink}
              </h1>
              <div data-testid="recipe-category">
                <p>{recipeInfo.strCategory}</p>
                <p>{recipeInfo.strAlcoholic}</p>
              </div>
            </div>
          </div>
        ))
      }

      <div className="user-action">

        <ShareBtn url={ `${`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`}` } />

        <FavoriteBtn recipeInfo={ recipeInfo } />
      </div>

      <div className="ingredients-container">
        <h2>Ingredients:</h2>
        <div className="ingredients-list">
          {
            Object.keys(recipeInfo)
              .filter((a) => a.includes('strIngredient')).map((info, index) => {
                const ingredientRecipe = `${recipeInfo[info]} - `;
                const measureRecipe = `${recipeInfo[`strMeasure${index + 1}`]}`;
                const ingredientAndMeasure = ingredientRecipe + measureRecipe;
                const checkbox = checkRender(ingredientAndMeasure, index);
                if (recipeInfo[info] && recipeInfo[info].length > 1) {
                  return (
                    <div
                      className="ingredient-div"
                      key={ `ingredient-${index}` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      {checkbox}
                      -
                      <p
                        className={ `${ingredientsCheck.includes(ingredientAndMeasure)
                        && 'ingredient-marked'}` }
                      >
                        { recipeInfo[info]
                    && `${recipeInfo[info]} - ${recipeInfo[`strMeasure${index + 1}`]}`}
                      </p>
                    </div>
                  );
                }
                return null;
              })
          }
        </div>
      </div>
      <p
        className="recipe-instructions"
        data-testid="instructions"
      >
        {recipeInfo.strInstructions}

      </p>

      {
        recipeInfo.strYoutube && (
          <iframe
            className="youtube-player"
            data-testid="video"
            title={ recipeInfo.strYoutube }
            src={ recipeInfo.strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
          />
        )
      }
    </div>
  );
};
export default RecipeInProgress;
