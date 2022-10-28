import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import imageComp from '../../images/shareIcon.svg';
import './style.css';

const copy = require('clipboard-copy');

export default function ShareBtn(props) {
  const [shared, setShared] = useState(false);
  const [testid, setTestid] = useState();
  const numeroMagicos = 2000;
  const { url, doneIndex } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('done')) {
      setTestid(`${doneIndex}-horizontal-share-btn`);
    } else {
      setTestid('share-btn');
    }
  }, [pathname]);

  return (
    <div className={ !pathname.includes('done') && 'share-background' }>
      {
        shared
       && (
         <div className="alert-div">
           <p className="alert-link-copied">Link copied!</p>
         </div>
       )
      }
      <button
        className="share-btn"
        data-testid={ testid }
        type="button"
        src={ imageComp }
        onClick={ () => {
          setShared(!shared);
          setTimeout(() => {
            setShared(false);
          }, numeroMagicos);
          copy(`http://localhost:3000${url}`);
        } }
      >
        <img src={ imageComp } alt="sla" />
      </button>
    </div>
  );
}
ShareBtn.propTypes = {
  url: PropTypes.string.isRequired,
  doneIndex: PropTypes.number.isRequired,
};
