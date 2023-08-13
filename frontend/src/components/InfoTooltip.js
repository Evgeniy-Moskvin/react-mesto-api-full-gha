import React from 'react';
import iconSuccess from '../images/icon-success.svg';
import iconError from '../images/icon-error.svg';

const InfoTooltip = ({ name, isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="button-close opacity-effect popup__close" onClick={onClose}></button>
        <img
          src={
            isSuccess
              ? iconSuccess
              : iconError
          }
          alt="icon"
          className="popup__icon"
        />
        <p className="popup__title popup__title_align_center popup__title_offset_none">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
