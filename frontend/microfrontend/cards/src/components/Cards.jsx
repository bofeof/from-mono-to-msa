import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Card from "./Card";

export default function Cards({ cards, onCardClick, onCardLike, onCardDelete })
{

    cards = null // tmp
  return (
    <section className="places page__section">
      <ul className="places__list">
        {cards?.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}
