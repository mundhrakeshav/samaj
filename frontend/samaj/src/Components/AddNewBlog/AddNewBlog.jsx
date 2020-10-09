import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./AddNewBlog.css";

const AddNewBlog = () => {
  return (
    <div className="form-wrapper">
      <Container>
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
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={5} className="input blog-input" />
          </Form.Group>

          <Row>
            <Col xs={5}>
              <Form.File
                className="profile-image-input"
                label="Attach a cover Image"
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
                Add Blog
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddNewBlog;
