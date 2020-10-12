import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { Web3Context } from "../../context/Web3Context";

const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const AddNewPatent = () => {
  return (
    <div className="form-wrapper">
      <Form className="blog-upload-form">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Enter Title"
            className="input title-input"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="input details-input"
          />
        </Form.Group>
        <input type="date" />
        <br />
        <Row>
          <Col>
            <br />
            <Button
              variant="dark"
              type="submit"
              onClick={() => {
                alert("Patents Havent been enabled");
              }}>
              Add Patent
            </Button>
          </Col>
          <Col>
            <Form.File
              className="profile-image-input"
              label="Attach a File"
              onChange={(event) => {
                event.preventDefault();
                //   setImage(URL.createObjectURL(event.target.files[0]));
                //   const file = event.target.files[0];
                //   const reader = new window.FileReader();
                //   reader.readAsArrayBuffer(file);
                //   reader.onloadend = () => {
                //     setBuffer(Buffer(reader.result));
                //   };
              }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewPatent;
