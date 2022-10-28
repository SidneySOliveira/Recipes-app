const getDrinksFilters = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = response.json();
  const { drinks } = await data;
  const lengthFilters = 5;
  const result = drinks.slice(0, lengthFilters);
  return result;
};

export default getDrinksFilters;
