import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Home">
        Kesjab
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Home
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Profile
      </Tab>
    </Tabs>
  );
};

export default LandingPage;
