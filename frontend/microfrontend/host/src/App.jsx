import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { checkToken } from "./utils/api";

import ProtectedRoute from "./routes/ProtectedRoute";
import { CurrentUserContext } from "../../shared/contexts/CurrentUserContext";

import "./index.css";


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

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [jwt, setJwt] = useState("");

  const handleJwtChange = (event) => {
    // Эта функция получает нотификации о событиях изменения jwt
    setJwt(event.detail);
  };

  useEffect(() => {
    addEventListener("jwt-change", handleJwtChange); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
    return () => removeEventListener("jwt-change", handleJwtChange); // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {

    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((res) => {
          // setEmail(res.data.email);
          // setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  const HomePage = () => (
    <>
      <Suspense fallback={<div>loading…</div>}>
        <Profile />
      </Suspense>
      <Suspense fallback={<div>loading…</div>}>
        <Cards />
      </Suspense>
    </>
  );

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, jwt, cards, setJwt, setCurrentUser, setCards }}>
      <BrowserRouter>
        <div className="page">
          <div className="page__content">
            <Suspense fallback="loading…">
              <Header></Header>
            </Suspense>

            <Switch>
              <ProtectedRoute exact path="/" jwt={jwt} component={HomePage} />;
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
    </CurrentUserContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
