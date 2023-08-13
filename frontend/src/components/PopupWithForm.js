import React from 'react';

const PopupWithForm = ({ title, name, buttonName, children, isOpen, onClose, onSubmit }) => {
  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="button-close opacity-effect popup__close" onClick={onClose}></button>
        <form name={`form-${name}`} className="form" onSubmit={onSubmit}>
          <fieldset className="form__fieldset">
            <legend className="form__legend">
              <h2 className="popup__title">{title}</h2>
            </legend>

            {children}
          </fieldset>
          <button type="submit" className="button form__button">{buttonName}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
