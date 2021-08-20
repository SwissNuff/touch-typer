import { useState, useEffect } from "react";
import "./App.css";

import DisplayBoard from "./components/DisplayBoard";
import Header from "./components/Header";

function App() {
  const [displayText, setDisplayText] = useState("Loading...");

  // For fetching Game of Thrones Qoute API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://got-quotes.herokuapp.com/quotes");
        const json = await response.json();
        setDisplayText(json.quote.replace(/[.,*’'`!?]/g, "") + " ");
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />
      <DisplayBoard displayText={displayText} />
    </div>
  );
}

export default App;
