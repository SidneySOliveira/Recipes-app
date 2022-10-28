const getFoods = async (type, text, category) => {
  if (type === 'i') {
    if (category === '/foods') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${text}`;
      const response = await fetch(url);
      const data = response.json();
      return data;
    }
    if (category === '/drinks') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${type}=${text}`;
      const response = await fetch(url);
      const data = response.json();
      return data;
    }
  }

  if (category === '/foods') {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${text}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
  if (category === '/drinks') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${text}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  }
};

export default getFoods;
