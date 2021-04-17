import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h3>Make all the cells dark to win.</h3>
      <Board />
    </div>
  );
}

export default App;
