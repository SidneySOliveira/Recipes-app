const handleCheck = (obj) => {
  const { setIngredientsCheck, ingredientsCheck, ingredientAndMeasure,
    storagePrev, cat, recipeId } = obj;

  if (!ingredientsCheck.includes(ingredientAndMeasure)) {
    const bodyObj = {
      ...storagePrev,
      [cat]: {
        ...storagePrev[cat],
        [recipeId]: [...ingredientsCheck, ingredientAndMeasure],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(bodyObj));

    setIngredientsCheck([...ingredientsCheck, ingredientAndMeasure]);
    return;
  }

  const bodyObj = {
    ...storagePrev,
    [cat]: { ...storagePrev[cat],
      [recipeId]: ingredientsCheck
        .filter((ingredient) => ingredient !== ingredientAndMeasure),
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(bodyObj));
  setIngredientsCheck(ingredientsCheck
    .filter((ingredient) => ingredient !== ingredientAndMeasure));
};

export default handleCheck;
