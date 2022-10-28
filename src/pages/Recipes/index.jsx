import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Context from '../../context/context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import getDrinksFilters from '../../services/api/getDrinksFilters';
import getFoodsFilters from '../../services/api/getFoodsFilters';
import './recipe.css';

const Recipes = () => {
  const { recipes, getAllRecipes, getFilteredRecipes } = useContext(Context);
  const [filters, setFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [category, setCategory] = useState('');
  const maxRecipesLength = 12;

  const { pathname } = useLocation();

  const getDrinkFiltersApi = async () => {
    const drinkFilters = await getDrinksFilters();
    setFilters(drinkFilters);
  };

  const getFoodFiltersApi = async () => {
    const foodFilters = await getFoodsFilters();
    setFilters(foodFilters);
  };

  useEffect(() => {
    getAllRecipes(pathname);
    if (pathname === '/drinks') {
      setCategory('Drink');
      getDrinkFiltersApi();
    } else {
      setCategory('Meal');
      getFoodFiltersApi();
    }
  }, [pathname]);

  return (
    <div className="recipe-container">
      <Header />
      <div className="category-container">
        <button
          className="btn-category"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => {
            getAllRecipes(pathname);
            setIsFiltered(false);
            setActiveFilter('');
          } }
        >
          All
        </button>
        {
          filters.map((filter) => (
            <button
              className="btn-category"
              key={ filter.strCategory }
              type="button"
              onClick={ () => {
                if (activeFilter.includes(filter.strCategory)) {
                  getAllRecipes(pathname);
                  setActiveFilter('');
                  setIsFiltered(false);
                } else {
                  getFilteredRecipes(pathname, filter.strCategory);
                  setIsFiltered(true);
                  setActiveFilter(filter.strCategory);
                }
              } }
              data-testid={ `${filter.strCategory}-category-filter` }
            >
              {filter.strCategory}
            </button>
          ))
        }
      </div>

      {
        category === 'Meal' ? (
          (recipes.length === 1
            && isFiltered === false)
            && <Redirect to={ `${pathname}/${recipes[0].idMeal}` } />
        ) : (
          (recipes.length === 1
            && isFiltered === false)
            && <Redirect to={ `${pathname}/${recipes[0].idDrink}` } />
        )
      }
      <div className="container-cards">
        {
          category === 'Drink' ? (
            recipes.slice(0, maxRecipesLength).map((recipe, index) => {
              if (recipe.idDrink) {
                return (
                  <Link key={ recipe.idDrink } to={ `${pathname}/${recipe.idDrink}` }>
                    <div
                      className="card-recipe"
                      data-testid={ `${index}-recipe-card` }
                    >
                      <img
                        className="card-image"
                        src={ recipe.strDrinkThumb }
                        alt={ recipe.strDrink }
                        width="100px"
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        className="recipe-name"
                        data-testid={ `${index}-card-name` }
                      >
                        {recipe.strDrink}
                      </p>
                    </div>
                  </Link>
                );
              }
              return null;
            })
          ) : (
            recipes.slice(0, maxRecipesLength).map((recipe, index) => {
              if (recipe.idMeal) {
                return (
                  <Link key={ recipe.idMeal } to={ `${pathname}/${recipe.idMeal}` }>
                    <div
                      className="card-recipe"
                      data-testid={ `${index}-recipe-card` }
                    >
                      <img
                        className="card-image"
                        src={ recipe.strMealThumb }
                        alt={ recipe.strMeal }
                        width="100px"
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        className="recipe-name"
                        data-testid={ `${index}-card-name` }
                      >
                        {recipe.strMeal}
                      </p>
                    </div>
                  </Link>
                );
              }
              return null;
            })
          )

        }
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;
