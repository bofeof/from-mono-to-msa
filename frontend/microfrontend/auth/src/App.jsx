import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

import "./index.css";

const App = () => (
  <BrowserRouter>
    <div className="container">
      <div>Name: auth</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Empty CSS</div>
      <div>Регистрация</div>
      <Register></Register>
      <div>Логин</div>
      <Login></Login>
    </div>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
