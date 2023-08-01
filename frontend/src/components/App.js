import React from 'react';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {ProtectedRoute} from './ProtectedRoute'
import Login from "./Login";
import Register from "./Register";
import * as userAuth from '../utils/userAuth'
import InfoTooltip from "./InfoTooltip";
import HeaderMobile from "./HeaderMobile";
import UseWindowWidth from "../utils/useWindowWidth";

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [isError, setError] = React.useState(false)
    const [isLoggedIn, setLoggedIn] = React.useState(false)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [isMobile, setIsMobile] = React.useState(false);
    const {width} = UseWindowWidth();
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
                ([dataUser, dataCard]) => {
                    setCurrentUser(dataUser)
                    setCards(dataCard);
                }).catch((err) => {
                console.log(err)
            })
        }
    }, [isLoggedIn])

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            userAuth.getContent(jwt).then((data) => {
                if (!data) {
                    return
                }
                setEmail(data.data.email)
                setLoggedIn(true);
                navigate('/')
            })
                .catch(() => {
                    setLoggedIn(false)
                })
        }
    }

    React.useEffect(() => {
        tokenCheck();
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((elem) => elem['_id'] === currentUser['_id']);
        const request = !isLiked ? api.addLikeCard(card['_id']) : api.deleteLikeCard(card['_id']);
        request.then((item) => {
            setCards((cards) => cards.map((elem) => elem['_id'] === card['_id'] ? item : elem));
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card['_id']).then((item) => {
            setCards(cards.filter((elem) => elem['_id'] === card['_id'] ? '' : item));
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleClickEditProfilePopup = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }

    const handleClickAddPlacePopup = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    const handleClickEditAvatarPopup = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setInfoTooltipOpen(false)
    }

    const handleUpdateUser = (dataUser) => {
        api.setUserInfo(dataUser).then((newDataUser) => {
            setCurrentUser(newDataUser);
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleUpdateAvatar = (avatar) => {
        api.editUserAvatar(avatar).then((newAvatar) => {
            setCurrentUser(newAvatar);
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.addNewCard(cardData).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        }).catch((err) => {
            console.log(err)
        })
    }

    const addInfoTooltipFalse = () => {
        setInfoTooltipOpen(true)
        setError(true)
    }

    const addInfoTooltipSucces = () => {
        setInfoTooltipOpen(true)
        setError(false)
    }

    const handleLogAuth = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setEmail('');
        setPassword('')
        setCurrentUser({})
        setCards([]);
    }

    React.useEffect(() => {
        if (width <= 480) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className={`page ${
                isLoggedIn ? '' : `page_registration-authorization`}`}>
                {isMobile && isLoggedIn ?
                    <HeaderMobile email={email} onSignOut={handleLogAuth} /> :
                    <Header email={email} onSignOut={handleLogAuth} isLoggedIn={isLoggedIn}/>
                }
                <Routes>
                    <Route path='/' element={<ProtectedRoute element={Main}
                                                             isLoggedIn={isLoggedIn}
                                                             onEditProfile={handleClickEditProfilePopup}
                                                             onAddPlace={handleClickAddPlacePopup}
                                                             onEditAvatar={handleClickEditAvatarPopup}
                                                             onCardClick={handleCardClick}
                                                             cards={cards}
                                                             onCardLike={handleCardLike}
                                                             onCardDelete={handleCardDelete}/>}/>
                    <Route path="/sign-up"
                           element={<Register addInfoTooltipFalse={addInfoTooltipFalse}
                                              addInfoTooltipSucces={addInfoTooltipSucces}
                                              email={email}
                                              setEmail={setEmail}
                                              password={password}
                                              setPassword={setPassword}
                                              navigate={navigate}/>}/>
                    <Route path="/sign-in"
                           element={<Login onLogin={() => setLoggedIn(true)}
                                           email={email}
                                           setEmail={setEmail}
                                           password={password}
                                           setPassword={setPassword}
                                           addInfoTooltipFalse={addInfoTooltipFalse}
                                           navigate={navigate}/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace={true}/>}
                    />
                </Routes>
                {isLoggedIn && <Footer/>}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    selectedCard={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isError={isError}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
