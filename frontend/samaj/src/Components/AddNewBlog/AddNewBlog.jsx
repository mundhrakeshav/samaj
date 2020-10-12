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
import "./AddNewBlog.css";

const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const AddNewBlog = () => {
  const { samajContract, userAddress, sendTransaction } = useContext(
    Web3Context
  );
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Payment Option");
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [blogImage, setBlogImage] = useState();
  const [blogImageBuffer, setBlogImageBuffer] = useState();

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
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              className="input blog-input"
              onChange={(event) => {
                setBody(event.target.value);
              }}
            />
          </Form.Group>

          <Row>
            <Col xs={5}>
              <Form.File
                className="profile-image-input"
                label="Attach a cover Image"
                onChange={(event) => {
                  event.preventDefault();
                  setBlogImage(URL.createObjectURL(event.target.files[0]));
                  const file = event.target.files[0];
                  const reader = new window.FileReader();
                  reader.readAsArrayBuffer(file);
                  reader.onloadend = () => {
                    setBlogImageBuffer(Buffer(reader.result));
                  };
                }}
              />
            </Col>

            <Col xs={7} className="submit-button-column">
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <Button
                  variant="dark"
                  className="submit-button"
                  onClick={async () => {
                    setLoading(true);
                    const resposneImage = await ipfs.add(blogImageBuffer);
                    const ipfsImageHash = resposneImage.path;
                    const blogDetails = JSON.stringify({
                      title,
                      body,
                    });
                    const responseData = await ipfs.add(blogDetails);
                    const ipfsDetailsHash = responseData.path;
                    console.log(
                      ipfsDetailsHash, //QmV65prKLSmcGGcYo1EK9FaURiUoJ3CBVTbHCYzgPFAmTs
                      ipfsImageHash, //QmRVLDZpExaSWtsWaqqf1gVPRyR4iFNYtg5iCtMpthJGxg
                      paymentMethodId //1
                    );
                    const functionData = samajContract.methods.addBlog(
                      ipfsImageHash,
                      ipfsDetailsHash,
                      paymentMethodId
                    );
                    sendTransaction(functionData);
                    setLoading(false);
                  }}>
                  Add Blog
                </Button>
              )}
            </Col>
            <Dropdown className="dropdown">
              <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm">
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
            <img
              src={blogImage}
              height="25%"
              width="25%"
              className="blog-image"
            />
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddNewBlog;
