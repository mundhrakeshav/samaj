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
import "./AddNewResearchPaper.css";

const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "http",
});
const AddNewReasearchPaper = () => {
  const { samajContract, userAddress, sendTransaction } = useContext(
    Web3Context
  );
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Payment Option");
  const [paymentMethodId, setPaymentMethodId] = useState(1);
  const [abstract, setAbstract] = useState();

  const [doc, setDoc] = useState();
  const [docBuffer, setDocBuffer] = useState();

  return (
    <div className="form-wrapper">
      <Form className="blog-upload-form">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Abstract</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="input blog-input"
            onChange={(event) => {
              setAbstract(event.target.value);
            }}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.File
              className="profile-image-input"
              label="Attach a DOC"
              onChange={(event) => {
                event.preventDefault();
                const file = event.target.files[0];
                const reader = new window.FileReader();
                reader.readAsArrayBuffer(file);
                reader.onloadend = () => {
                  setDocBuffer(Buffer(reader.result));
                };
              }}
            />
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
          <Col xs={7} className="submit-button-column">
            <Button
              variant="dark"
              className="submit-button"
              onClick={async () => {
                const abstractIpfsResponse = await ipfs.add(abstract);
                const docIpfsResponse = await ipfs.add(docBuffer);
                const docIpfsHash = docIpfsResponse.path;
                const abstractIpfsHash = abstractIpfsResponse.path;
                const functionData = await samajContract.methods.addResearchPaper(
                  docIpfsHash,
                  abstractIpfsHash,
                  paymentMethodId
                );
                sendTransaction(functionData);
              }}>
              Add ResearchPaper
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewReasearchPaper;
