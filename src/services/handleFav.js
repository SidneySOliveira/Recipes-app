const handleFav = (recipeInfo, body, setFav) => {
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

export default handleFav;
