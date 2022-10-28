import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import ShareBtn from '../../Components/ShareBtn';
import './style.css';

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(storage);
  }, []);

  return (
    <div className="done-container">
      <Header />
      <div className="done-filters">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('') }
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      <div className="cards-group-container">
        {recipes
          && recipes.filter((recipe) => recipe.type.includes(filter))
            .map((recipe, index) => {
              if (recipe.type === 'food') {
                return (
                  <div
                    className="recipe-done-card"
                    key={ `recipe-food-${index}` }
                  >
                    <Link
                      to={ `/${recipe.type}s/${recipe.id}` }
                    >
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ recipe.image }
                        alt={ recipe.name }
                        width="150px"
                      />
                    </Link>

                    <div className="top-recipe-card-text">
                      <div className="title-subtitle-done-card">
                        <Link
                          to={ `/${recipe.type}s/${recipe.id}` }
                        >
                          <p
                            data-testid={ `${index}-horizontal-name` }
                          >
                            {recipe.name}

                          </p>
                        </Link>

                        <p
                          className="nati-cat-done-card"
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          { `${recipe.nationality} - ${recipe.category}` }
                        </p>
                      </div>

                      {
                        recipe.tags && recipe.tags.toString().split(',')
                        && recipe.tags.toString().split(',').slice(0, 2)
                          .map((tagName, tagIndex) => (
                            <p
                              className="tag-done-recipe-card"
                              key={ `tag-${index}-${tagIndex}` }
                              data-testid={ `${index}-${tagName}-horizontal-tag` }
                            >
                              {tagName}
                            </p>
                          ))
                      }

                      <div
                        className="recipe-card-done-footer"
                      >
                        <p
                          className="done-date-recipe"
                          data-testid={ `${index}-horizontal-done-date` }
                        >
                          {recipe.doneDate}

                        </p>

                        <ShareBtn
                          doneIndex={ index }
                          url={ `/${recipe.type}s/${recipe.id}` }
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className="recipe-done-card"
                  key={ `recipe-drink-${index}` }
                >
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      width="150px"
                    />
                  </Link>

                  <div className="top-recipe-card-text">
                    <Link
                      to={ `/${recipe.type}s/${recipe.id}` }
                    >
                      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                    </Link>
                    <p
                      className="tag-done-recipe-card"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { recipe.alcoholicOrNot }
                    </p>
                    <div
                      className="recipe-card-done-footer"
                    >
                      <p
                        className="done-date-recipe"
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {recipe.doneDate}
                      </p>

                      <ShareBtn
                        doneIndex={ index }
                        url={ `/${recipe.type}s/${recipe.id}` }
                      />
                    </div>

                  </div>
                </div>
              );
            })}
      </div>

    </div>
  );
};

export default DoneRecipes;
