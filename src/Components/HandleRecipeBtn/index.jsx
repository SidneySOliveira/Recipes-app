import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.css';

export default function HandleRecipeBtn() {
  const [isStarded, setIsStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [category, setCategory] = useState('food');
  const [id, setId] = useState();

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const pathnameSplited = pathname.split('/');
    const idSplited = pathnameSplited[2];
    const categorySplited = pathnameSplited[1];
    setId(idSplited);
    setCategory(categorySplited);
  }, []);

  useEffect(() => {
    const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneRecipesLS) {
      const doneListIds = doneRecipesLS.map((recipe) => recipe.id);
      if (doneListIds.includes(id)) {
        setIsDone(true);
      }
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (category === 'foods' && inProgressRecipes) {
      const inProgressList = Object.keys(inProgressRecipes.meals);
      if (inProgressList.includes(id)) {
        setIsStarted(true);
      }
    }

    if (category === 'drinks' && inProgressRecipes) {
      const inProgressList = Object.keys(inProgressRecipes.cocktails);
      if (inProgressList.includes(id)) {
        setIsStarted(true);
      }
    }
  }, [category, id]);

  const handleCLick = () => {
    setIsStarted(true);
    history.push(`/${category}/${id}/in-progress`);
  };

  if (!isDone && isStarded) {
    return (
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleCLick }
      >
        Continue Recipe
      </button>
    );
  } if (!isDone && !isStarded) {
    return (
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleCLick }
      >
        Start Recipe
      </button>
    );
  }

  return null;
}
