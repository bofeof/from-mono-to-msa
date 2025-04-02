import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const Header = lazy(() =>
  import("../../header/src/components/Header").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Footer = lazy(() =>
  import("../../footer/src/components/Footer").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Profile = lazy(() =>
  import("../../profile/src/components/Profile").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Cards = lazy(() =>
  import("../../cards/src/components/Cards").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const Auth = lazy(() =>
  import("../../auth/src/components/Auth").catch(() => {
    return {
      default: () => <div className="error">Component is not available!</div>,
    };
  })
);

const App = () => {
  function onSignOut() {
    // // при вызове обработчика onSignOut происходит удаление jwt
    // localStorage.removeItem("jwt");
    // setIsLoggedIn(false);
    // // После успешного вызова обработчика onSignOut происходит редирект на /signin
    // history.push("/signin");
  }

  function onEditProfile() {}
  function onAddPlace() {}
  function onEditAvatar() {}

  function onCardClick() {}
  function onCardLike() {}
  function onCardDelete() {}

  function onLogin() {}
  function onRegister() {}

  return (
    <div className="app page">
      <BrowserRouter>
        <Suspense fallback="loading…">
          <Header onSignOut={onSignOut} />
        </Suspense>

        <Suspense fallback="loading…">
          <Auth onLogin={onLogin} onRegister={onRegister} />
        </Suspense>

        <Suspense fallback="loading…">
          <Profile
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
          />
        </Suspense>

        <Suspense fallback="loading…">
          <Cards
            cards
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        </Suspense>

        <Suspense fallback="loading…">
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
