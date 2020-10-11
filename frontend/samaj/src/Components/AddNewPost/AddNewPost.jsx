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
  protocol: "http",
});
const AddNewPost = () => {
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Payment Option");
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [caption, setCaption] = useState();
  const [postImage, setPostImage] = useState();
  const [postImageBuffer, setPostImageBuffer] = useState();

  const { samajContract, userAddress, sendTransaction } = useContext(
    Web3Context
  );

  return (
    <div className="form-wrapper">
      <Form className="blog-upload-form">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="input caption-input"
            onChange={(event) => {
              setCaption(event.target.value);
            }}
          />
        </Form.Group>
        <Container>
          <Row>
            <Col>
              <Form.File
                className="image-input "
                label="Select a Image"
                onChange={(event) => {
                  event.preventDefault();
                  setPostImage(URL.createObjectURL(event.target.files[0]));
                  const file = event.target.files[0];
                  const reader = new window.FileReader();
                  reader.readAsArrayBuffer(file);
                  reader.onloadend = () => {
                    setPostImageBuffer(Buffer(reader.result));
                  };
                }}
              />{" "}
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
            </Col>
            <Col>
              <img src={postImage} height="128px" />
              <Button
                variant="dark"
                className="submit-button"
                onClick={async (e) => {
                  console.log(caption);
                  console.log(postImageBuffer);
                  console.log(paymentMethodId);
                  const captionIpfsResponse = await ipfs.add(caption);
                  const imageIpfsResponse = await ipfs.add(postImageBuffer);

                  const captionIpfsHash = captionIpfsResponse.path;
                  const imageIpfsHash = imageIpfsResponse.path;

                  const functionData = samajContract.methods.addMiscPost(
                    imageIpfsHash,
                    captionIpfsHash,
                    paymentMethodId
                  );
                  sendTransaction(functionData);
                }}>
                Add Post
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default AddNewPost;
