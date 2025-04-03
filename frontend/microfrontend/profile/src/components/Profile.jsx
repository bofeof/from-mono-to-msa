import React from "react";
import { CurrentUserContext } from "../../../shared/contexts/CurrentUserContext";
import defailtUserPic from "../../../shared/styles/images/avatar.jpg";

import "./index.css";

export default function Profile() {
  const onEditProfile = () => {};
  const onAddPlace = () => {};
  const onEditAvatar = () => {};

  const imageStyleDefault = { backgroundImage: `url(${defailtUserPic})` };

  return (
    <section className="profile page__section">
      <div
        className="profile__image"
        onClick={onEditAvatar}
        style={CurrentUserContext.avatar || imageStyleDefault}></div>
      <div className="profile__info">
        <h1 className="profile__title">
          {CurrentUserContext.name || "John Doe"}
        </h1>
        <button
          className="profile__edit-button"
          type="button"
          onClick={onEditProfile}></button>
        <p className="profile__description">
          {CurrentUserContext.about || "about John Doe"}
        </p>
      </div>
      <button
        className="profile__add-button"
        type="button"
        onClick={onAddPlace}></button>
    </section>
  );
}
