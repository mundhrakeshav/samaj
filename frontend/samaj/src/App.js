import React, { useContext, useEffect } from "react";
import "./App.css";
import Appbar from "./Components/Appbar/Appbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Web3Context } from "./context/Web3Context";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function App() {
  const { init, userAddress, isLoading } = useContext(Web3Context);

  useEffect(() => {
    console.log(isLoading, "isLoading");
    init();
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <span>Loading!!</span>
        <span>Please reload after connecting metamask</span>
      </div>
    );
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
