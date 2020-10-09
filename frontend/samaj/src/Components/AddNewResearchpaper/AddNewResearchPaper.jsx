import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./AddNewResearchPaper.css";
const AddNewReasearchPaper = () => {
  return (
    <div className="form-wrapper">
      <Form className="blog-upload-form">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Abstract</Form.Label>
          <Form.Control as="textarea" rows={5} className="input blog-input" />
        </Form.Group>

        <Row>
          <Col>
            <Form.File
              className="profile-image-input"
              label="Attach a DOC"
              // onChange={(event) => {
              //   event.preventDefault();
              //   setImage(URL.createObjectURL(event.target.files[0]));
              //   const file = event.target.files[0];
              //   const reader = new window.FileReader();
              //   reader.readAsArrayBuffer(file);
              //   reader.onloadend = () => {
              //     setBuffer(Buffer(reader.result));
              //   };
              // }}
            />
          </Col>
          <Col xs={7} className="submit-button-column">
            <Button variant="dark" className="submit-button">
              Add ResearchPaper
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewReasearchPaper;
