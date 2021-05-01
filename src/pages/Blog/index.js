import { Image, Row, Col } from "antd";
import { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

const Blog = (props) => {
  const { id } = props.location.state;

  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/blogs/${id}`)
      .then((response) => {
        console.log(response.data);
        setBlog(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        {blog.title}
      </h1>
      <S.Container>
        <Row justify="center">
          <Col lg={12} md={24} sm={24} xs={24}>
            {!!blog.image && (
              <Image
                src={`data:image/${
                  blog.image.contentType
                };base64,${new Buffer.from(blog.image.data).toString(
                  "base64"
                )}`}
                style={{
                  objectFit: "scale-down",
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                }}
              />
            )}
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            {blog.content}
          </Col>
        </Row>
      </S.Container>
    </>
  );
};

export default Blog;
