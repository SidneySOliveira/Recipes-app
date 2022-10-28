import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HandleRecipeBtn from '../../Components/HandleRecipeBtn';
import Context from '../../context/context';
import getDrinkDetails from '../../services/api/getDrinkDetails';
import getFoodDetails from '../../services/api/getFoodDetails';
import './style.css';
import FavoriteBtn from '../../Components/FavoriteBtn';
import ShareBtn from '../../Components/ShareBtn';

const RecipeDetails = () => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const { pathname } = useLocation();
  const { getAllRecipes, recipes } = useContext(Context);
  const recommendLength = 6;
  const commonFactor1 = 5;
  const commonFactor2 = 1.5;
  const commonFactor3 = 0.6;

  useEffect(() => {
    const arrayDetail = async () => {
      const idIndex = -1;

      if (pathname.includes('foods')) {
        const { meals } = await getFoodDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(meals[0]);
        getAllRecipes('/drinks');
      } else {
        const { drinks } = await getDrinkDetails(pathname.split('/').at(idIndex));
        setRecipeInfo(drinks[0]);
        getAllRecipes('/foods');
      }
    };
    arrayDetail();
  }, [pathname]);
  console.log(recipes);
  return (
    <div className="recipe-details-container">
      <HandleRecipeBtn />
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
        <ShareBtn url={ pathname } />
        <FavoriteBtn recipeInfo={ recipeInfo } />
      </div>

      <div className="ingredients-container">
        <h2>Ingredients:</h2>
        <div className="ingredients-list">
          {
            Object.keys(recipeInfo)
              .filter((a) => a.includes('strIngredient')).map((info, index) => (
                <div
                  key={ `ingredient-${index}` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <p>
                    { recipeInfo[info]
                && `${recipeInfo[info]} : ${recipeInfo[`strMeasure${index + 1}`]}`}
                  </p>
                </div>
              ))
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

      <h3>Recommendations</h3>
      <div className="recommendations-container">
        <div
          className="carousel-details"
        >
          {
            pathname.includes('foods') ? (
              recipes.slice(0, recommendLength).map((recommend, index) => (
                <div
                  className="recommend-container"
                  key={ `${recommend.strDrink}-${index}` }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ recommend.strDrinkThumb } alt="recommed" />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {recommend.strDrink}
                  </p>
                </div>
              ))
            ) : (
              recipes.slice(0, recommendLength).map((recommend, index) => (
                <div
                  className="recommend-container"
                  key={ `${recommend.strMeal}-${index}` }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ recommend.strMealThumb } alt="recommed" />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {recommend.strMeal}
                  </p>
                </div>
              )))
          }
        </div>

      </div>
    </div>
  );
};

export default RecipeDetails;
