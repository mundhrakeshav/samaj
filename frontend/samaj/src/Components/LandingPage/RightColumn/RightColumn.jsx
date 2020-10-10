import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Web3 from "web3";
import { Web3Context } from "../../../context/Web3Context";
import "./RightColumn.css";
const web3 = new Web3();
var BN = web3.utils.BN;

const RightColumn = () => {
  const {
    samajContractAddress,
    userAddress,
    erc20ApproveWithSignContract,
    erc20NonApproveWithSignContract,
    sendTransactionToERC20ApproveWithSignature,
  } = useContext(Web3Context);
  const [daiBalance, setDaiBalance] = useState(0);
  const [kmBalance, setkmBalance] = useState(0);
  const [daiAllowance, setDaiAllowance] = useState(0);
  const [kmAllowance, setkmAllowance] = useState(0);
  const [daiAmount, setDaiAmount] = useState();
  const [kmAmount, setKmAmount] = useState();

  useEffect(() => {
    init();
  }, []);

  console.log("K");
  const init = async () => {
    erc20ApproveWithSignContract.methods
      .balanceOf(userAddress)
      .call()
      .then((dai) => {
        setDaiBalance(dai / 10 ** 18);
      });
    erc20ApproveWithSignContract.methods
      .allowance(userAddress, samajContractAddress)
      .call()
      .then((dai) => {
        setDaiAllowance(dai / 10 ** 18);
      });

    erc20NonApproveWithSignContract.methods
      .balanceOf(userAddress)
      .call()
      .then((km) => {
        setkmBalance(km / 10 ** 18);
      });

    erc20NonApproveWithSignContract.methods
      .allowance(userAddress, samajContractAddress)
      .call()
      .then((km) => {
        setkmAllowance(km / 10 ** 18);
      });
  };

  const increaseDaiAllowance = () => {
    console.log(daiAmount);
    const requiredAllowance = daiAmount * 10 ** 18;
    const approveWithSignatureFunctionData = erc20ApproveWithSignContract.methods.approveViaSignature(
      samajContractAddress,
      "100000000000000000000"
    );
    sendTransactionToERC20ApproveWithSignature(
      approveWithSignatureFunctionData
    );
  };

  const increaseKMAllowance = () => {
    erc20NonApproveWithSignContract.methods
      .approve(samajContractAddress, "100000000000000000000")
      .send({ from: userAddress });
  };

  return (
    <div className="right-column">
      <Container>
        <Row className="dai-head head">Dai: </Row>

        <Row className="dai-balance balance">
          <Col>Balance:</Col>
          <Col>{daiBalance} DAI</Col>
        </Row>

        <Row className="dai-allowance allowance">
          <Col>Allowance:</Col>
          <Col>{daiAllowance} DAI</Col>
        </Row>
        <br />

        <br />
        <Button
          variant="dark"
          className="dai-button button"
          onClick={increaseDaiAllowance}>
          Allow 100 Token Transfer
        </Button>

        <hr />

        <Row className="km-head head">KM: </Row>

        <Row className="km-balance balance">
          <Col>Balance:</Col>
          <Col>{kmBalance} KM</Col>
        </Row>

        <Row className="km-allowance allowance">
          <Col>Allowance:</Col>
          <Col>{kmAllowance} KM</Col>
        </Row>
        <br />

        <br />
        <Button
          variant="dark"
          className="km-button button"
          onClick={increaseKMAllowance}>
          Allow 100 Token Transfer
        </Button>
      </Container>
    </div>
  );
};

export default RightColumn;
