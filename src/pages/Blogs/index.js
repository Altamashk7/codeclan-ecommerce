import { Card, Row, Col } from "antd";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://myindianthings-backend.herokuapp.com/blogs")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        All Posts
      </h1>
      <S.Container>
        {!!blogs &&
          blogs.map((blog, index) => {
            return (
              <Link
                key={index}
                to={{
                  pathname: "/blog",
                  state: {
                    id: blog._id,
                  },
                }}
              >
                <Card style={{ marginBottom: "10px" }} hoverable>
                  <Row align="middle">
                    <Col span={4}>
                      {!!blog.image && (
                        <img
                          style={{
                            objectFit: "scale-down",
                            width: "100%",
                            height: "auto",
                            maxHeight: "150px",
                          }}
                          alt={blog.title}
                          src={`data:image/${
                            blog.image.contentType
                          };base64,${new Buffer.from(blog.image.data).toString(
                            "base64"
                          )}`}
                        />
                      )}
                    </Col>
                    <Col span={1}></Col>
                    <Col span={19}>
                      <p>
                        <strong>{blog.title}</strong>
                      </p>
                      <p
                        style={{
                          WebkitLineClamp: 3,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.content}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </Link>
            );
          })}
      </S.Container>
    </>
  );
};

export default Blogs;
