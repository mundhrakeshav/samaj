import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Web3Context } from "../../../context/Web3Context";
import { Spinner, Card } from "react-bootstrap";
import axios from "axios";
import "./DetailedBlog.css";
const DetailedBlog = () => {
  const { samajContract, userAddress } = useContext(Web3Context);
  const [blog, setBlog] = useState({});
  const [blogImageHash, setImageHash] = useState("");

  const { blogId } = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const _blog = await samajContract.methods
      .getBlog(userAddress, blogId)
      .call();

    const _blogBodyHash = _blog.ipfsDetailsHash;
    setImageHash(_blog.ipfsImageHash);

    const _blogBodyResponse = await axios.get(
      `http://ipfs.io/ipfs/${_blogBodyHash}`
    );
    const _blogBody = _blogBodyResponse.data;
    console.log(_blogBody);
    setBlog(_blogBody);
    setLoading(false);
  };

  if (!isLoading) {
    return (
      <div className="card-wrapper-detailed-blog">
        <Card className="blog-detailed-blog">
          <Card.Img
            variant="top"
            src={`http://ipfs.io/ipfs/${blogImageHash}`}
            height="50%"
            width="50%"
            className="blog-image-detailed-blog"
          />

          <Card.Title className="blog-title-detailed-blog">
            {blog.title}
          </Card.Title>
          <Card.Body className="blog-body-detailed-blog">{blog.body}</Card.Body>
        </Card>
      </div>
    );
  } else {
    return <div>Kehsavb</div>;
  }
};

export default DetailedBlog;
