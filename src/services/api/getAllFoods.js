const getAllFoods = async (category) => {
  if (category === '/foods') {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  if (category === '/drinks') {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
};

export default getAllFoods;
