import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Web3Context } from "../../../context/Web3Context";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
const SearchPapers = () => {
  const { user } = useContext(UserContext);
  const { searchAddress, numberOfPapers } = useParams();

  const { samajContract } = useContext(Web3Context);
  const [papers, setPapers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, [papers]);

  const init = async () => {
    for (let i = 0; i < numberOfPapers; i++) {
      let paper = await samajContract.methods
        .getResearchPaper(searchAddress, i)
        .call();

      console.log(paper);
      let paperDetails = await axios.get(
        `http://ipfs.io/ipfs/${paper.ipfsDetailsHash}`
      );

      papers.push({
        paperDetails: paperDetails.data,
        paperDocHash: paper.ipfsImageHash,
      });
    }
    console.log(papers, "blogs");
    setLoading(false);
  };

  const blogsElement = papers.map((paper, index) => {
    return (
      <div key={index} className="blogs-wrapper">
        <Card className="paper">
          <Card.Title className="paper-abstract">
            {paper.paperDetails}
          </Card.Title>
          <Card.Footer>
            <Row>
              <a
                href={`http://ipfs.io/ipfs/${paper.paperDocHash}`}
                className="link-to-blog">
                <Button variant="dark" className="link-to-blog-button">
                  Read Complete Paper
                </Button>
              </a>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  if (isLoading) return <div>Loading...</div>;
  else return <div>{blogsElement}</div>;
};

export default SearchPapers;
