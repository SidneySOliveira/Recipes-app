import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const seis = 6;
  const re = /\S+@\S+\.\S+/;

  const history = useHistory();

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div className="body">
      <div className="background">
        <div className="title-container">
          <h1 className="title-st">Recipes</h1>
          <h1 className="title-nd">App</h1>
        </div>
        <div className="input-section">
          <p className="label-input">
            Email
          </p>
          <div className="input-background">
            <input
              className="input-login"
              data-testid="email-input"
              id="email"
              type="text"
              onChange={ (e) => setEmail(e.target.value) }
              value={ email }
              name="nome"
              required
            />
          </div>
          <br />
          <p className="label-input">
            Password
          </p>
          <div className="input-background">
            <input
              className="input-login"
              data-testid="password-input"
              id="password"
              type="password"
              onChange={ (e) => setPassword(e.target.value) }
              value={ password }
              name="password"
              required
            />
          </div>
          <br />
          <button
            className="btn-login"
            data-testid="login-submit-btn"
            type="button"
            disabled={ !(re.test(email) && password.length > seis) }
            onClick={ handleSubmit }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
