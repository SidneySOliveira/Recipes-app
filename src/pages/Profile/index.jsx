import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import './style.css';

const Profile = () => {
  const history = useHistory();
  const emailInfo = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="body-profile">
      <div className="header-profile">
        <Header />
      </div>
      <div className="icon-profile">
        <img src="./defaultUser.png" alt="default user" />
      </div>
      <div className="email-profile">
        <h1 data-testid="profile-email">
          {emailInfo && emailInfo.email}
        </h1>
      </div>
      <div className="btn-profile-actions">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <br />
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <button
        className="btn-logout"
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        <img src="./logout.png" alt="logout" />
        <p>
          Logout
        </p>
      </button>
      <Footer />
    </div>
  );
};

export default Profile;
