import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/provider';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
