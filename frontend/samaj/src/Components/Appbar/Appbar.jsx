import React, { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { MdPermIdentity } from "react-icons/md";
import "./Appbar.css";
import { Web3Context } from "../../context/Web3Context";
import { useHistory } from "react-router-dom";

const Appbar = () => {
  const { userAddress } = useContext(Web3Context);
  const [searchAddress, setSearchAddress] = useState();
  let history = useHistory();

  const handleClick = () => {
    history.push(`/user/${searchAddress}`);
  };

  return (
    <Container fluid className="appbar-container">
      <div className="appbar">
        <Row>
          <Col>
            <Navbar>
              <Navbar.Brand className="appbar-brand">
                <span>समाज</span>
              </Navbar.Brand>
            </Navbar>
          </Col>
          <Col>
            <Form inline className="form" onSubmit={handleClick}>
              <FormControl
                type="text"
                size="sm"
                placeholder="Search"
                className="mr-sm-2 form-inputbox"
                onChange={(event) => {
                  setSearchAddress(event.target.value);
                }}
              />
            </Form>
          </Col>
          <Col className="column-last">
            <span>
              <OverlayTrigger
                placement="top"
                trigger="hover | trigger"
                overlay={<Tooltip>View Account</Tooltip>}>
                <a
                  href={`https://rinkeby.etherscan.io/address/${userAddress}`}
                  className="user-address">
                  <MdPermIdentity size="1.5rem" className="user-icon" />
                  {userAddress ? userAddress : <Spinner animation="border" />}
                </a>
              </OverlayTrigger>
            </span>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Appbar;
