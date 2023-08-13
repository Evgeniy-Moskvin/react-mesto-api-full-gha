import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  //const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleRegister({
      userEmail: email,
      userPassword: password,
    })
      .then(() => {
        setEmail('');
        setPassword('');
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="login">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="form__fieldset">
            <legend className="form__legend">
              <h2 className="form__title">Регистрация</h2>
            </legend>
          </fieldset>

          <label className="form__group">
            <input type="email" name="email" placeholder="Email"
                   className="form__input form__input_theme_dark form__input_name_email" required value={email}
                   onChange={handleChangeEmail}/>
            <span className="form__error-message form__error-message_field_name"></span>
          </label>

          <label className="form__group">
            <input type="password" name="password" placeholder="Пароль"
                   className="form__input form__input_theme_dark form__input_name_password" required value={password}
                   onChange={handleChangePassword}/>
            <span className="form__error-message form__error-message_field_name"></span>
          </label>

          <div className="login__bottom">
            <button type="submit" className="button button_theme_dark form__button">Зарегистрироваться</button>
            <Link to="/sign-in" className="login__link opacity-effect">
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
