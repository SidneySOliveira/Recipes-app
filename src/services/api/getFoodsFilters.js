const getFoodsFilters = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = response.json();
  const { meals } = await data;
  const lengthFilters = 5;
  const result = meals.slice(0, lengthFilters);
  return result;
};

export default getFoodsFilters;
