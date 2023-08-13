import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddCard }) => {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name={'add-place-card'}
      title={'Новое место'}
      buttonName={'Создать'}

      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__group">
        <input type="text" name="name" placeholder="Название"
               className="form__input form__input_name_name" minLength="2" maxLength="30" value={name || ''}
               onChange={handleChangeName} required/>
        <span className="form__error-message form__error-message_field_name"></span>
      </label>

      <label className="form__group">
        <input type="url" name="image" placeholder="Ссылка на картинку"
               onChange={handleChangeLink} className="form__input form__input_name_image" value={link || ''} required/>
        <span className="form__error-message form__error-message_field_image"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
