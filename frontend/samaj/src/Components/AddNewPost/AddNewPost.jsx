import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const AddNewPost = () => {
  return (
    <div className="form-wrapper">
      <Form className="blog-upload-form">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="input details-input"
          />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="dark" type="submit">
              Add Post
            </Button>
          </Col>
          <Col>
            <Form.File
              className="profile-image-input "
              label="Select your profile Image"
              onChange={(event) => {
                //   event.preventDefault();
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

export default AddNewPost;
