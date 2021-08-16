import "./App.css";
import DisplayBoard from "./components/DisplayBoard";
import Header from "./components/Header";
import TypingInput from "./components/TypingInput";

function App() {
  return (
    <div className="container">
      <Header player="Arian" />
      <DisplayBoard />
      <TypingInput />
    </div>
  );
}

export default App;
