import React, { useContext, useEffect } from "react";
import "./App.css";
import Appbar from "./Components/Appbar/Appbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Web3Context } from "./context/Web3Context";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { init, userAddress, isLoading } = useContext(Web3Context);

  useEffect(() => {
    console.log(isLoading, "isLoadingh");
    init();
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  } else
    return (
      <div className="App">
        <Router>
          <Appbar />
          <LandingPage />
        </Router>
      </div>
    );

  // return isLoading ? (
  // <span>Loading...</span>
  // // ) : (
  //   <div className="App">
  //     <Router>
  //       <Appbar />
  //       <LandingPage />
  //     </Router>
  //   </div>
  // );
}

export default App;
