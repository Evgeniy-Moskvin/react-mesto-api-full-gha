import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    setAvatar('')
  }, [isOpen]);

  const handleChangeAvatar = (evt) => {
    setAvatar(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <div>
      <PopupWithForm
        name={'edit-avatar'}
        title={'Обновить аватар'}
        buttonName={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="form__group">
          <input type="url" name="image" placeholder="Ссылка на картинку"
                 className="form__input form__input_name_image" value={avatar || ''} onChange={handleChangeAvatar}
                 required/>
          <span className="form__error-message form__error-message_field_image"></span>
        </label>
      </PopupWithForm>
    </div>
  );
};

export default EditAvatarPopup;
