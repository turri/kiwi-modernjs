import React from "react";
import { render } from "react-dom";
import Form from "./Form";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Form />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
