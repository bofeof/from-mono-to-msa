import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "sharedLib/CurrentUserContext";

import defailtUserPic from "../../../shared/styles/images/avatar.jpg";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "./utils/api";

import "./index.css";

export default function Profile() {
  const { currentUser, setCurrentUser, cards, setCards } =
    useContext(CurrentUserContext);

  useEffect(() => {
    console.log("restart useeffects");
    api
      .getUserInfo()
      .then((res) => {
        if (JSON.stringify(res) !== JSON.stringify(currentUser)) {
          setCurrentUser(res);
        }
        console.log("пользователь:", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  function handleEditProfileClick() {
    // TODO: дописать логику
    console.log("edit profile popup");
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    // TODO: дописать логику
    console.log("edit avatar popup");
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    // TODO: дописать логику
    console.log("add card popup");
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <section className="profile page__section">
        <div
          className="profile__image"
          onClick={handleEditAvatarClick}
          style={{
            backgroundImage: `url(${currentUser?.avatar || defailtUserPic})`,
          }}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name || "John Doe"}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfileClick}></button>
          <p className="profile__description">
            {currentUser?.about || "about John Doe"}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={handleAddPlaceClick}></button>
      </section>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />
    </>
  );
}
