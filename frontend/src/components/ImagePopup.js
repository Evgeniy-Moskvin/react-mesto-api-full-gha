import React from 'react';

const ImagePopup = ({ card, isOpen, onClose }) => {
  return (
    <div className={`popup popup_name_full-image ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_image">
        <button type="button" className="button-close opacity-effect popup__close" onClick={onClose}></button>

        <img src={card.link} alt={card.name} className="popup__image"/>
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
