import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./BlogsPage.css";
import { UserContext } from "../../../context/UserContext";
import { Web3Context } from "../../../context/Web3Context";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const BlogsPage = () => {
  const { user } = useContext(UserContext);

  const { samajContract } = useContext(Web3Context);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, [blogs]);

  const init = async () => {
    for (let i = 0; i < user.numberOfBlogs; i++) {
      let blog = await samajContract.methods
        .getBlog(user.userAddress, i)
        .call();

      let blogDetails = await axios.get(
        `http://ipfs.io/ipfs/${blog.ipfsDetailsHash}`
      );

      blogs.push({
        blogDetails: blogDetails.data,
        imageHash: blog.ipfsImageHash,
      });
    }
    console.log(blogs, "blogs");
    setLoading(false);
  };

  const blogsElement = blogs.map((blog, index) => {
    return (
      <div key={index} className="blogs-wrapper">
        <Card className="blog">
          <Card.Title className="blog-title">
            {blog.blogDetails.title}
          </Card.Title>
          <Card.Body className="blog-body">{blog.blogDetails.body}</Card.Body>
          <Card.Footer>
            <Row>
              <Link to={`blogs/${index}`} className="link-to-blog">
                <Button variant="dark" className="link-to-blog-button">
                  Read Full Blog
                </Button>
              </Link>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  if (isLoading) return <div>Loading...</div>;
  else return <div>{blogsElement}</div>;
};

export default BlogsPage;
