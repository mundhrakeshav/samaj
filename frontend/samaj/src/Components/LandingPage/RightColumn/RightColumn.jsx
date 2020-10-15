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
import { toast } from "react-toastify";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "./RightColumn.css";
import serverConfig from "../../../serverConfig";
const web3 = new Web3();
var BN = web3.utils.BN;

toast.configure();

const RightColumn = () => {
  const {
    samajContractAddress,
    userAddress,
    erc20ApproveWithSignContract,
    erc20NonApproveWithSignContract,
    usdContract,
    sendTransactionToERC20ApproveWithSignature,
  } = useContext(Web3Context);
  const [daiBalance, setDaiBalance] = useState(0);
  const [usdBalance, setUSDBalance] = useState(0);
  const [kmBalance, setkmBalance] = useState(0);
  const [daiAllowance, setDaiAllowance] = useState(0);
  const [kmAllowance, setkmAllowance] = useState(0);
  const [daiAmount, setDaiAmount] = useState();
  const [kmAmount, setKmAmount] = useState();

  const [product] = useState({
    name: "SamajUSD",
    price: "100",
  });

  const handleToken = async (token, addresses) => {
    console.log(token, addresses);
    const response = await axios.post(`${serverConfig.baseUrl}/payviacard`, {
      token,
      product,
      address: userAddress,
    });
    console.log(response.data);
    const { status } = response.data;
    alert(status);
    if (status == "success") {
      toast("Success! Balance will be updated in a moment", {
        type: "success",
      });
    } else {
      toast("Something went wrong", {
        type: "error",
      });
    }
  };

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

    usdContract.methods
      .balanceOf(userAddress)
      .call()
      .then((usd) => {
        setUSDBalance(usd / 10 ** 18);
      });

    // console.log(usdContract.methods);
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
        This minting function is only for testing and development:
        <br />
        <Button
          variant="dark"
          className="mint-button button"
          onClick={() => {
            erc20ApproveWithSignContract.methods
              .mint(userAddress, "1000000000000000000000")
              .send({ from: userAddress });
          }}>
          Mint Dai
        </Button>
        <Button
          variant="dark"
          className="mint-button button"
          onClick={() => {
            erc20NonApproveWithSignContract.methods
              .mint(userAddress, "1000000000000000000000")
              .send({ from: userAddress });
          }}>
          Mint KM
        </Button>
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
        <Button
          variant="dark"
          className="km-button button"
          onClick={increaseKMAllowance}>
          Allow 100 Token Transfer
        </Button>
      </Container>

      <br />

      <Container>
        <hr />
        <Row className="km-head head">USD: </Row>
        <Row className="km-balance balance">
          <Col>Balance:</Col>
          <Col>{usdBalance} USD</Col>
        </Row>

        <br />
      </Container>
      <StripeCheckout
        name="SamajUSD"
        stripeKey="pk_test_51H4LU8KNc2CAIgjv7287ALDDieK9w456yt9gun8DvEgU45dCcIxspp7hwmILzHGetXHFxNynnbHJOBvu3l2lk1e0004I7LOSzl"
        token={handleToken}
        bitcoin
        amount={10000}
        currency="USD"
      />
      <br />
      <br />

      <Button
        variant="dark"
        className="creator-button button"
        onClick={() => {}}>
        Become a creator
      </Button>
    </div>
  );
};

export default RightColumn;
