import { useState, useEffect } from "react";
import "./App.css";

import DisplayBoard from "./components/DisplayBoard";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <DisplayBoard />
    </div>
  );
}

export default App;
