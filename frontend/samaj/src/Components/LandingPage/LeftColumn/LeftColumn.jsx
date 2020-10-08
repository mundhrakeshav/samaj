import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LeftColumn.css";

const LeftColumn = () => {
  return (
    <Container className="left-column-container">
      <Row class="left-column-row">
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
    </Container>
  );
};

export default LeftColumn;
