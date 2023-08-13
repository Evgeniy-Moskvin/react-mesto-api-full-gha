import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { auth } from '../utils/auth';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: '', });
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);

  const navigate = useNavigate();

  function handleCardsChange(data) {
    setCards(data);
  }

  React.useEffect(() => {
    tokenCheck();
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([dataCards, dataUser]) => {
        handleCardsChange(dataCards);
        setCurrentUser(dataUser);
      })
      .catch(err => console.error(err));
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ link: 'reset', name: 'reset' });
    setIsInfoTooltipPopupOpen(false);
  }

  const handleCardClick = ({ link, name }) => {
    setSelectedCard({ link: link, name: name });
    setIsImagePopupOpen(true);
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    //const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.error(err));
  }

  const handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => !(c._id === card._id))
        );
      })
      .catch(err => console.error(err));
  }

  const handleUpdateUser = ({ name, about }) => {
    api.updateUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  const handleUpdateAvatar = (avatar) => {

    api.updateUserAvatar({ image: avatar.avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link })
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }


  const handleRegister = ({userEmail, userPassword}) => {

    return auth
      .signUp(userEmail, userPassword)
      .then((res) => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipPopupOpen(true);

        /*if (res.ok) {
          setIsRegistrationSuccess(true);
        } else {
          setIsRegistrationSuccess(false);
        }
        setIsInfoTooltipPopupOpen(true);*/
      })
      .catch((err) => {
        setIsRegistrationSuccess(false);
        console.error(err);
      });
  };

  const closePopupRegistration = () => {
    if (isRegistrationSuccess) {
      setIsRegistrationSuccess(false);
      navigate('/sign-in', {replace: true});
    }
    setIsInfoTooltipPopupOpen(false);
  };

  const handleLogin = ({userEmail, userPassword}) => {
    return auth
      .signIn(userEmail, userPassword)
      .then((res) => {
        localStorage.setItem('userEmail', userEmail);
        // if (res.token) {
        //   localStorage.setItem('userEmail', userEmail);
        // }
        setLoggedIn(true);
        setUserData({
          email: userEmail,
        })
        navigate('/', {replace: true});
        /*if (res.ok) {
          res.json().then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
            }
          });
          setLoggedIn(true);
          setUserData({
            email: userEmail,
          })
          navigate('/', {replace: true});
        } else {
          setIsInfoTooltipPopupOpen(true);
        }*/
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        console.error(err)
      });
  }

  const handleLogOut = () => {
    return auth
      .signOut()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem('userEmail');
        navigate('/sign-in');
      })
      .catch((err) => console.error(err));
    // setUserData({
    //   email: '',
    // });
    // localStorage.removeItem('userEmail');
    // setLoggedIn(false);
    // navigate('/sign-in');
  };

  const tokenCheck = () => {
    if (localStorage.getItem('userEmail')) {
      //const userEmail = localStorage.getItem('userEmail');
      auth
        //.tokenCheck(userEmail)
        .tokenCheck()
        .then((res) => {
          if (res) {
            // setUserData({
            //   email: res.email,
            // });
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          loggedIn={loggedIn}
          userData={userData}
          handleLogOut={handleLogOut}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Main
                      cards={cards}
                      handleCardsChange={handleCardsChange}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />

                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>

                    <PopupWithForm
                      name={'confirm'}
                      title={'Вы уверены?'}
                      buttonName={'Да'}
                    />

                    <ImagePopup
                      card={selectedCard}
                      onCardClick={handleCardClick}
                      isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                    />
                  </>
                }
              />
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Register
                  handleRegister={handleRegister}
                />

                <InfoTooltip
                  name={'info-registration'}
                  isOpen={isInfoTooltipPopupOpen}
                  onClose={closePopupRegistration}
                  isSuccess={isRegistrationSuccess}
                />
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Login
                  handleLogin={handleLogin}
                />

                <InfoTooltip
                  name={'info-login'}
                  isOpen={isInfoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  isSuccess={false}
                />
              </>
            }
          />

          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
