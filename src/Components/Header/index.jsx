import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcons from '../../images/profileIcon.svg';
import searchProfileIcon from '../../images/searchIcon.svg';
import SearchBar from './components/SearchBar';
import './style.css';

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const isLocation = useLocation();
  const history = useHistory();
  const pageNames = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  return (
    <div className="body-header">
      <div className={ `header-bar ${!isSearch && 'search-bar-off'}` }>
        <button
          className={ `btn-header ${!isSearch && 'search-icon-off'}` }
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcons }
            alt="Icone"
          />
        </button>
        <h1
          className="page-title"
          data-testid="page-title"
        >
          {pageNames[isLocation.pathname]}

        </h1>
        {
          (
            isLocation.pathname !== '/profile'
          && isLocation.pathname !== '/done-recipes'
          && isLocation.pathname !== '/favorite-recipes'
          )
            ? (
              <button
                className={ `btn-header ${!isSearch && 'search-icon-off'}` }
                type="button"
                onClick={ () => setIsSearch(!isSearch) }
              >

                <img
                  data-testid="search-top-btn"
                  src={ searchProfileIcon }
                  alt=""
                />
              </button>
            ) : (
              <div>
                <p />
              </div>
            )
        }
      </div>

      {
        isSearch && (
          <SearchBar />
        )
      }

    </div>
  );
}
