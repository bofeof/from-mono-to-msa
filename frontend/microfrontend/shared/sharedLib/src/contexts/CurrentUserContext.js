import React, { createContext, useState } from 'react';

export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  jwt: null,
  setJwt: () => {},
  cards: [],
  setCards: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [jwt, setJwt] = useState('');

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, cards, setCards, jwt, setJwt }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
