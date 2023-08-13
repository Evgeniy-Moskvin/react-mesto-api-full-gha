import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile container">
        <div className="profile__avatar-wrap" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar"/>
        </div>

        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="button-edit profile__button-edit opacity-effect"
                    aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>

          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button type="button" className="button-add profile__button-add opacity-effect"
                aria-label="Добавить место" onClick={onAddPlace}></button>
      </section>

      <section className="places container" aria-label="Добавленные места">
        <ul className="places__grid">
          {
            cards.map((card) => (
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                    onCardDelete={onCardDelete}/>
            ))
          }
        </ul>
      </section>
    </main>
  );
};

export default Main;
