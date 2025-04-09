import React, { createContext, useState, useMemo } from 'react';

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  jwt: '',
  setJwt: () => {},
  cards: [],
  setCards: () => {},
  email: '',
  setEmail: () => {}
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [jwt, setJwt] = useState('');
  const [email, setEmail] = useState('');

  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    cards,
    setCards,
    jwt,
    setJwt,
    email,
    setEmail
  }), [currentUser, cards, jwt]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};
