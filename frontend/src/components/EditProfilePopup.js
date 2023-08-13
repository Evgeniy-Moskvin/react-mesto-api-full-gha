import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      buttonName={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__group">
        <input type="text" name="name" placeholder="Имя"
               className="form__input form__input_name_name" minLength="2" maxLength="40"
               required value={name || ''} onChange={handleChangeName}/>
        <span className="form__error-message form__error-message_field_name"></span>
      </label>

      <label className="form__group">
        <input type="text" name="job" placeholder="О себе"
               className="form__input form__input_name_job" minLength="2" maxLength="200"
               required value={description || ''} onChange={handleChangeDescription}/>
        <span className="form__error-message form__error-message_field_job"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
