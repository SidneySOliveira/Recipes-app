const getDrinkDetails = async (idDrinks) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinks}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export default getDrinkDetails;
