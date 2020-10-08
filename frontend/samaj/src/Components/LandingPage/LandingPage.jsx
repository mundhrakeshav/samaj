import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LandingPage.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Profile from "../Profile/Profile";
import LeftColumn from "./LeftColumn/LeftColumn";
const LandingPage = () => {
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
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
