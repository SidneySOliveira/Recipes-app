import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import getFoods from '../services/api/getFoods';
import getAllFoods from '../services/api/getAllFoods';
import getFilteredFoods from '../services/api/getFilteredFoods';
import getFilteredDrinks from '../services/api/getFilteredDrinks';

const Provider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const getFilteredRecipes = async (category, filter) => {
    if (category === '/foods') {
      const { meals } = await getFilteredFoods(filter);
      if (meals) {
        setRecipes(meals);
      }
    }

    if (category === '/drinks') {
      const { drinks } = await getFilteredDrinks(filter);
      if (drinks) {
        setRecipes(drinks);
      }
    }
  };

  const getAllRecipes = async (category) => {
    if (category === '/foods') {
      const { meals } = await getAllFoods(category);
      if (meals) {
        setRecipes(meals);
      }
    }

    if (category === '/drinks') {
      const { drinks } = await getAllFoods(category);
      if (drinks) {
        setRecipes(drinks);
      }
    }
  };

  const updateRecipes = async (type, text, category) => {
    if (category === '/foods') {
      const { meals } = await getFoods(type, text, category);
      if (meals) {
        setRecipes(meals);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }

    if (category === '/drinks') {
      const { drinks } = await getFoods(type, text, category);
      if (drinks) {
        setRecipes(drinks);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  return (
    <Context.Provider
      value={ {
        recipes,
        updateRecipes,
        getAllRecipes,
        getFilteredRecipes,
      } }
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
