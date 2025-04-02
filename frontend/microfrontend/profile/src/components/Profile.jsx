import React from "react";

import { CurrentUserContext } from "../../../shared/contexts/CurrentUserContext";

import "./index.css";


export default function Profile({ onEditProfile, onAddPlace, onEditAvatar}) {
  return (
    <section className="profile page__section">
    <div
      className="profile__image"
      onClick={onEditAvatar}
      style={CurrentUserContext.avatar}></div>
    <div className="profile__info">
      <h1 className="profile__title">{CurrentUserContext.name || 'username'}</h1>
      <button
        className="profile__edit-button"
        type="button"
        onClick={onEditProfile}></button>
      <p className="profile__description">{CurrentUserContext.about || 'about smth'}</p>
    </div>
    <button
      className="profile__add-button"
      type="button"
      onClick={onAddPlace}></button>
  </section>

  )

}
