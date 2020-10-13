import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaNewspaper,
  FaBlogger,
  FaUpload,
  FaLock,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LeftColumn.css";

const LeftColumn = () => {
  return (
    <Container className="left-column-container">
      <Row className="left-column-row">
        <Link to="/">
          <Button variant="dark" className="left-column-button">
            <FaHome /> Home
          </Button>
        </Link>
      </Row>
      <Row>
        <Link to="/profile">
          <Button variant="dark" className="left-column-button">
            <FaUser /> Profile
          </Button>
        </Link>
      </Row>
      <br />
      <Row>
        <Link to="/addnewblog">
          <Button variant="dark" className="left-column-button">
            <FaBlogger /> Blog
          </Button>
        </Link>
      </Row>{" "}
      <Row>
        <Link to="/addnewpaper">
          <Button variant="dark" className="left-column-button">
            <FaNewspaper /> Paper
          </Button>
        </Link>
      </Row>{" "}
      <Row>
        <Link to="/addnewpatent">
          <Button variant="dark" className="left-column-button">
            <FaLock /> Patent
          </Button>
        </Link>
      </Row>
      <Row>
        <Link to="/addnewpost">
          <Button variant="dark" className="left-column-button">
            <FaUpload /> Post
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default LeftColumn;
