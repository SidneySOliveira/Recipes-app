import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../../images/drinkIcon.svg';
import imageMeal from '../../images/mealIcon.svg';
import './style.css';

export default function Footer() {
  const [isFood, setIsFood] = useState(true);
  return (
    <div
      data-testid="footer"
      className="food-or-drink"
    >
      <Link
        className={ `${isFood ? 'food-or-drink-active-div'
          : 'food-or-drink-inactive-div'}` }
        data-testid="food-bottom-btn"
        to="/foods"
        src={ imageMeal }
        onClick={ () => setIsFood(true) }
      >
        <img
          className={ `${isFood && 'food-or-drink-active'}` }
          src={ imageMeal }
          alt="meal"
        />
      </Link>
      <Link
        className={ `${!isFood ? 'food-or-drink-active-div'
          : 'food-or-drink-inactive-div'}` }
        data-testid="drinks-bottom-btn"
        to="/drinks"
        src={ imageDrink }
        onClick={ () => setIsFood(false) }
      >
        <img
          className={ `${!isFood && 'food-or-drink-active'}` }
          src={ imageDrink }
          alt="drink"
        />
      </Link>
    </div>
  );
}
