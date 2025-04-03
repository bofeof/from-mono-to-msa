import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./index.css";

import api from "./utils/api";
import { CurrentUserContext } from "../../shared/contexts/CurrentUserContext";

const Header = lazy(() =>
  import("header/Header").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Footer = lazy(() =>
  import("footer/Footer").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Profile = lazy(() =>
  import("profile/Profile").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Cards = lazy(() =>
  import("cards/Cards").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Login = lazy(() =>
  import("auth/Login").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Register = lazy(() =>
  import("auth/Register").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const App = () => {
  // function onSignOut() {
  // // при вызове обработчика onSignOut происходит удаление jwt
  // localStorage.removeItem("jwt");
  // setIsLoggedIn(false);
  // // После успешного вызова обработчика onSignOut происходит редирект на /signin
  // history.push("/signin");
  // }

  // function onEditProfile() {}
  // function onAddPlace() {}
  // function onEditAvatar() {}

  // function onCardClick() {}
  // function onCardLike() {}
  // function onCardDelete() {}

  // const [currentUser, setCurrentUser] = React.useState({});
  // const [cards, setCards] = React.useState([]);

  // React.useEffect(() => {
  //   api
  //     .getAppInfo()
  //     .then(([cardData, userData]) => {
  //       setCurrentUser(userData);
  //       setCards(cardData);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const [jwt, setJwt] = useState("");

  // const handleJwtChange = (event) => {
  //   // Эта функция получает нотификации о событиях изменения jwt
  //   setJwt(event.detail);
  // };

  useEffect(() => {
    // addEventListener("jwt-change", handleJwtChange); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
    // return () => removeEventListener("jwt-change", handleJwtChange); // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Suspense fallback="loading…">
            <Header></Header>
          </Suspense>

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={
                <Suspense fallback="loading…">
                  <>
                    <Profile></Profile>
                    <Cards></Cards>
                  </>
                </Suspense>
              }
            />
            <Route path="/signin">
              <Suspense fallback="loading…">
                <Login></Login>
              </Suspense>
            </Route>
            <Route path="/signup">
              <Suspense fallback="loading…">
                <Register></Register>
              </Suspense>
            </Route>
          </Switch>
          <Suspense fallback="loading…">
            <Cards />
          </Suspense>

          <Suspense fallback="loading…">
            <Footer></Footer>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
