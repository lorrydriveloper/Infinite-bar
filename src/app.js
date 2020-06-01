import React from "react";
import { render } from "react-dom";

const App = () => {
  return (
    <div className="main-container">
      <h1>Image gallery</h1>
      <div className="infinite-bar"></div>
      <div className="sign">
        <p>Create by: Pedro David Garcia Lopez 02/06/2020</p>
      </div>
    </div>
  );
};

render(<App/>, document.getElementById('root'))