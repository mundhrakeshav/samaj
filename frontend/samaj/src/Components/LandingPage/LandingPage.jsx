import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LandingPage.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Profile from "../Profile/Profile";
import { Web3Context } from "../../context/Web3Context";

import LeftColumn from "./LeftColumn/LeftColumn";
import { useEffect } from "react";
const LandingPage = () => {
  const { samajContract, getChainID } = useContext(Web3Context);
  useEffect(() => {
    samajContract.methods
      .users("0x08a9c12fA5a5d4e7e2131908D398C807cE805118")
      .call()
      .then(console.log);
  }, []);
  return (
    <Container className="landingpage" fluid>
      <Row>
        <Col xl={2} className="left-column">
          <LeftColumn />
        </Col>
        <Col xl={7} className="middle-column">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/profile" component={Profile} exact />
          </Switch>
        </Col>
        <Col xl={3} className="right-column">
          3 of 3
          <button
            onClick={async () => {
              samajContract.methods
                .users("0x08a9c12fA5a5d4e7e2131908D398C807cE805118")
                .call()
                .then(console.log);
            }}>
            CLICK
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
