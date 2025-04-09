import React from "react";
import ReactDOM from "react-dom";
import Cards from "./components/Cards";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: cards</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <div>Карточки</div>
    <Cards></Cards>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
