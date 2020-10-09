import React, { useState, useContext } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "./RegisterScreen.css";
import { Web3Context } from "../../../context/Web3Context";

const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "http",
});

const RegisterScreen = () => {
  const { samajContract, userAddress, sendTransaction } = useContext(
    Web3Context
  );

  const [profileImage, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [profileImageBuffer, setBuffer] = useState(null);
  const [bio, setBio] = useState("");
  const [profileImageHash, setProfileImageHash] = useState(null);

  return (
    <div className="input-form">
      <Form.Label>Register </Form.Label>
      <InputGroup className="mb-3  ">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1" className="input-prepend">
            UserName
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="input username-input"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-3 ">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1" className="input-prepend">
            Bio
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="textarea"
          className="input bio-input"
          onChange={(e) => {
            setBio(e.target.value);
            console.log(e.target.value);
          }}
        />
      </InputGroup>
      <Form.File
        className="profile-image-input "
        label="Select your profile Image"
        onChange={(event) => {
          event.preventDefault();
          setImage(URL.createObjectURL(event.target.files[0]));
          const file = event.target.files[0];
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
          };
        }}
      />
      <br />
      <Row>
        <Col>
          <Button
            variant="dark"
            onClick={async () => {
              console.log("Keshav");
              const imageIpfsResponse = await ipfs.add(profileImageBuffer);
              const profileData = JSON.stringify({
                userName,
                bio,
              });
              const profileDataIpfsResponse = await ipfs.add(profileData);
              console.log(samajContract.methods);
              const functionData = samajContract.methods.createUser(
                imageIpfsResponse.path,
                profileDataIpfsResponse.path
              );
              sendTransaction(functionData);
            }}>
            Register
          </Button>
        </Col>{" "}
        <br />
        <Col>
          {profileImage ? (
            <img
              src={profileImage}
              height="256"
              width="256"
              className="profile-image"
            />
          ) : (
            <span></span>
          )}{" "}
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
