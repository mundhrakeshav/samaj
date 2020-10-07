import React, { useContext, useEffect } from "react";
import "./App.css";
import Appbar from "./Components/Appbar/Appbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Web3Context } from "./context/Web3Context";

function App() {
  const { init, userAddress } = useContext(Web3Context);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <Appbar />
      Keshav
      <button
        onClick={() => {
          console.log(userAddress);
        }}>
        KESHAV
      </button>
    </div>
  );
}

export default App;
