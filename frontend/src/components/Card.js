import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick({ link: card.link, name: card.name });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__item">
      <figure className="place-card places__card">
        {isOwn && <button type="button" aria-label="Удалить"
                          className="button-delete opacity-effect place-card__delete"
                          onClick={handleDeleteClick}></button>}
        <div className="place-card__image-wrap">
          <img src={card.link} alt={card.name} className="place-card__image" onClick={handleClick}/>
        </div>
        <figcaption className="place-card__body">
          <h2 className="place-card__name">{card.name}</h2>
          <div className="place-card__likes">
            <button type="button"
                    className={`button-like ${isLiked && 'button-like_active'} opacity-effect place-card__like`}
                    onClick={handleLikeClick}></button>
            <span className="place-card__likes-count">{card.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

export default Card;
