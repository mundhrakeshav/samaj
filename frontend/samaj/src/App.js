import React, { useContext, useEffect } from "react";
import "./App.css";
import Appbar from "./Components/Appbar/Appbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Web3Context } from "./context/Web3Context";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { init, userAddress } = useContext(Web3Context);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <Router>
        <Appbar />
        <LandingPage />
        Keshav
        <button
          onClick={() => {
            console.log(userAddress);
          }}>
          KESHAV
        </button>
      </Router>
    </div>
  );
}

export default App;
