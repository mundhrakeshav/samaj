import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  Dropdown,
} from "react-bootstrap";
import { Web3Context } from "../../context/Web3Context";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./SearchPage.css";

const SearchPage = () => {
  const { searchAddress } = useParams();
  const [isLoading, setLoading] = useState(true);
  const { samajContract, userAddress, sendTransaction } = useContext(
    Web3Context
  );
  const [isRegistered, setRegisteration] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Payment Option");
  const [paymentMethodId, setPaymentMethodId] = useState(1);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    samajContract.methods
      .users(searchAddress)
      .call()
      .then((response) => {
        console.log(response);
        setUser(response);
        if (!response.isRegistered) {
          setRegisteration(false);
          return;
        } else {
          setRegisteration(true);
          getDetails(response);
        }
      });
  };

  const supportUserDai = () => {
    let functionData = samajContract.methods.supportUserDai(
      "10000000000000000000",
      userAddress,
      searchAddress
    );
    sendTransaction(functionData);
  };

  const supportUserKM = () => {
    let functionData = samajContract.methods.supportUserKM(
      "10000000000000000000",
      userAddress,
      searchAddress
    );
    sendTransaction(functionData);
  };

  const getDetails = async (user) => {
    const response = await axios.get(
      `https://ipfs.io/ipfs/${user.profileDetailsIPFSHash}`
    );
    setUserData(response.data);
    setLoading(false);
  };

  const purchaseButton = () => {
    if (user.isCreator) {
      return (
        <Col>
          <Button
            className="purchase-button"
            variant="dark"
            size="sm"
            onClick={() => {
              const functionData = samajContract.methods.purchaseCreatorToken(
                searchAddress,
                "10000000000000000000",
                paymentMethodId
              );
              sendTransaction(functionData);
            }}>
            Purchase
          </Button>
        </Col>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    if (!isRegistered) {
      return <h1>Not Registered</h1>;
    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <img
                  height="128px"
                  src={`https://ipfs.io/ipfs/${user.profileImageIPFShash}`}
                  alt="Profile Image"
                />
              </Col>
              <Col xs={8} className="details-column">
                <Col xl={8}>
                  <Row className="username">{userData.userName}</Row>
                  <Row className="bio">{userData.bio}</Row>
                </Col>
                <br />
                <Col>
                  <Row>
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle
                        variant="dark"
                        id="dropdown-basic"
                        size="sm">
                        {paymentMethod}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onSelect={() => {
                            setPaymentMethod("DAI");
                            setPaymentMethodId(1);
                          }}>
                          DAI
                        </Dropdown.Item>
                        <Dropdown.Item
                          onSelect={() => {
                            setPaymentMethod("KM");
                            setPaymentMethodId(2);
                          }}>
                          KM
                        </Dropdown.Item>
                        <Dropdown.Item
                          onSelect={() => {
                            setPaymentMethod("USD");
                            setPaymentMethodId(3);
                          }}>
                          USD
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Col>
                      <Button
                        className="tip-button"
                        variant="dark"
                        size="sm"
                        onClick={() => {
                          // console.log(user);
                          if (paymentMethodId == 1) supportUserDai();
                          else supportUserKM();
                        }}>
                        Support User
                      </Button>
                    </Col>
                    {purchaseButton()}
                  </Row>
                </Col>
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
                <Link
                  to={`/searchblogs/${searchAddress}/${user.numberOfBlogs}`}
                  className="link">
                  <Button variant="dark" className="link-button">
                    View Blogs
                  </Button>
                </Link>
              </Card>
            </Row>{" "}
            <Row>
              <Card
                style={{ width: "100%" }}
                className="card researchPapers-card">
                <Card.Body>
                  <Card.Title>ResearchPapers</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.numberOfResearchPapers} Papers Yet
                  </Card.Subtitle>
                </Card.Body>
                <Link
                  to={`/searchpapers/${searchAddress}/${user.numberOfResearchPapers}`}
                  className="link">
                  <Button variant="dark" className="link-button">
                    View ResearchPapers
                  </Button>
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
        </div>
      );
    }
  }
};

export default SearchPage;
