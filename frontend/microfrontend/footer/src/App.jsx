import React from "react";
import ReactDOM from "react-dom";
import Footer from "./components/Footer";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: footer</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Footer></Footer>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
