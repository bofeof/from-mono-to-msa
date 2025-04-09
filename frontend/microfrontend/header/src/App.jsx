import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

const App = () => (
  <BrowserRouter>
    <div className="container">
      <div>Name: header</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Empty CSS</div>
      <Header></Header>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("app"));
