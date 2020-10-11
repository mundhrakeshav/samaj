import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./LandingPage.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import Profile from "../Profile/Profile";
import { Web3Context } from "../../context/Web3Context";
import { UserContext } from "../../context/UserContext";

import LeftColumn from "./LeftColumn/LeftColumn";
import RegisterScreen from "./RegisterLandingScreen/RegisterScreen";
import { useState } from "react";
import AddNewBlog from "../AddNewBlog/AddNewBlog";
import AddNewreasearchpaper from "../AddNewResearchpaper/AddNewResearchPaper";
import AddNewPatent from "../AddNewPatent/AddNewPatent";
import AddNewPost from "../AddNewPost/AddNewPost";
import RightColumn from "./RightColumn/RightColumn";
import BlogsPage from "../Profile/BlogsPage/BlogsPage";
import DetailedBlog from "../Profile/DetailedBlog/DetailedBlog";

const LandingPage = () => {
  const { samajContract, userAddress } = useContext(Web3Context);
  const { user, setUser } = useContext(UserContext);

  const [isRegistered, setRegisteration] = useState(false);
  useEffect(() => {
    samajContract.methods
      .users(userAddress)
      .call()
      .then((response) => {
        response.userAddress = userAddress;
        setUser(response);
        setRegisteration(response.isRegistered);
      });
  }, []);

  if (isRegistered) {
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
              <Route path="/addnewblog" component={AddNewBlog} exact />
              <Route
                path="/addnewpaper"
                component={AddNewreasearchpaper}
                exact
              />
              <Route path="/addnewpatent" component={AddNewPatent} exact />
              <Route path="/addnewpost" component={AddNewPost} exact />
              <Route path="/blogs" component={BlogsPage} exact />
              <Route path="/blogs/:blogId" component={DetailedBlog} exact />
            </Switch>
          </Col>
          <Col xl={3} className="right-column">
            <RightColumn />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <RegisterScreen />;
  }
};

export default LandingPage;
