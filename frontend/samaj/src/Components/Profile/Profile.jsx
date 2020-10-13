import React, { useContext, useEffect } from "react";
import { Col, Container, Button, Row, Spinner, Card } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { Web3Context } from "../../context/Web3Context";
import axios from "axios";
import "./Profile.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profileIsLoading, toggleProfileLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [creatorContract, setCreatorContract] = useState(null);

  const { user } = useContext(UserContext);
  const { samajContract, sendTransaction } = useContext(Web3Context);

  console.log(user);

  useEffect(() => {
    initialiseData();
  }, []);

  const initialiseData = async () => {
    const response = await axios.get(
      `https://ipfs.io/ipfs/${user.profileDetailsIPFSHash}`
    );
    setUserData(response.data);
    toggleProfileLoading(false);
    console.log(response.data);
  };

  const tag = user.isCreator ? "Creator" : "";

  if (profileIsLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <Container fluid className="head-container">
        <Row className="head-row">
          <Col className="image-column">
            <img
              height="128px"
              src={`https://ipfs.io/ipfs/${user.profileImageIPFShash}`}
              alt="Profile Image"
            />
          </Col>
          <Col xs={8} className="details-column">
            <Row className="username">{userData.userName}</Row>
            <Row className="bio">{userData.bio}</Row>
            <Row className="bio">{tag}</Row>

            <br />
            <Button
              onClick={(e) => {
                e.preventDefault();
                // console.log(user);
                let _tokenName = prompt("Name");
                let _tokenSymbol = prompt("symbol");
                let _confirm = window.confirm("Confirm or deny");
                if (_confirm) {
                  const functionData = samajContract.methods.becomeCreator(
                    _tokenName,
                    _tokenSymbol
                  );
                  sendTransaction(functionData);
                }
              }}
              variant="dark"
              className="become-creator-button">
              Let's bet your potential
            </Button>
          </Col>
        </Row>
        <Row>
          <Card style={{ width: "100%" }} className="card blogs-card">
            <Card.Body>
              <Card.Title>Blogs</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.numberOfBlogs} Blogs Yet
              </Card.Subtitle>
            </Card.Body>
            <Link to="/blogs" className="link">
              <Button variant="dark" className="link-button">
                View Blogs
              </Button>
            </Link>
          </Card>
        </Row>
        <Row>
          <Card style={{ width: "100%" }} className="card researchPapers-card">
            <Card.Body>
              <Card.Title>ResearchPapers</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.numberOfResearchPapers} Papers Yet
              </Card.Subtitle>
            </Card.Body>{" "}
            <Link to="/researchPaper" className="link">
              <Button variant="dark" className="link-button">
                View ResearchPapers
              </Button>{" "}
            </Link>
          </Card>
        </Row>
        <Row>
          <Card className="card posts-card">
            <Card.Body>
              <Card.Title>posts</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.numberOfMiscPosts} Posts Yet
              </Card.Subtitle>
            </Card.Body>
            <Button variant="dark">View Posts</Button>
          </Card>
        </Row>
        <Row>
          <Card style={{ width: "100%" }} className="card patents-card">
            <Card.Body>
              <Card.Title>Patents</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.numberOfPatents} Patents Yet
              </Card.Subtitle>
            </Card.Body>
            <Button variant="dark">View Patents</Button>
          </Card>
        </Row>{" "}
      </Container>
    );
  }
};

export default Profile;
