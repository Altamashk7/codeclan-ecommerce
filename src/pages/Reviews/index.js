import { useState, useEffect } from "react";

import { Avatar, Row, Col, Space, Upload, Image, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";

import * as S from "./styles";
import TextArea from "../../common/TextArea";
import Input from "../../common/Input";
import Button from "../../common/Button";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewImage, setReviewImage] = useState({});
  const [userImage, setUserImage] = useState({});

  useEffect(() => {
    axios
      .get("/reviews")
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitReview = () => {
    const fmData = new FormData();

    if (name === "") {
      message.error("Please fill the name");
    } else if (comment === "") {
      message.error("Please fill the comment");
    } else if (rating === 0) {
      message.error("Please fill the rating");
    } else {
      fmData.append("name", name);
      fmData.append("comment", comment);
      fmData.append("rating", rating);
      fmData.append("email", email);
      fmData.append("userimage", userImage);
      fmData.append("commentimages", reviewImage);

      axios
        .post("/reviews", fmData)
        .then((response) => {
          console.log(response.data);
          setReviews([response.data, ...reviews]);
          setName("");
          setComment("");
          setRating(0);
          setEmail("");
          message.success("Review posted successfully !");
        })
        .catch((error) => {
          message.error("Some error occured !");
          console.log(error);
        });
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Reviews
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Our happy customers :)
      </p>

      <S.Container>
        <p>
          {!!reviews && (
            <>
              <span>{reviews.length}</span> Comments
            </>
          )}
        </p>
      </S.Container>
      <S.Container>
        <Space direction="vertical">
          <Row>
            <Space>
              <Col>
                <Upload
                  accept="image/png, image/jpeg"
                  beforeUpload={(file) => {
                    setUserImage(file);
                    return false;
                  }}
                >
                  <Avatar size="large" icon={<UserOutlined />} />
                </Upload>
              </Col>
              <Col>
                <TextArea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setShowName(true);
                  }}
                  rows="2"
                  cols="200"
                  name="comment"
                  style={{ paddingLeft: "10px" }}
                  placeholder="Leave a message ..."
                />
              </Col>
              <Col>
                <Upload
                  beforeUpload={(file) => {
                    setReviewImage(file);
                    return false;
                  }}
                  accept="image/png, image/jpeg"
                >
                  <S.CameraIcon />
                </Upload>
              </Col>
            </Space>
          </Row>
          <Row>
            <Col style={{ marginRight: "48px" }}></Col>
            <Col>
              <StarRatings
                rating={rating}
                starHoverColor="#2e3559"
                starRatedColor="#d9a91a"
                changeRating={(r) => {
                  setRating(r);
                  setShowName(true);
                }}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
              />
            </Col>
          </Row>
          {showName === true ? (
            <Row style={{ paddingLeft: "48px" }} align="middle">
              <Col lg={7}>
                <Input
                  value={name}
                  onChange={(val) => setName(val)}
                  label="Name"
                />
              </Col>
              <Col lg={1}></Col>
              <Col lg={7}>
                <Input
                  type="email"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  label="E-mail (Optional)"
                />
              </Col>
              <Col lg={1}></Col>
              <Col lg={7}>
                <Button height="50px" onClick={() => submitReview()}>
                  Submit
                </Button>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Space>
      </S.Container>

      <br />
      <br />
      <br />

      {/* List of all reviews   */}
      <S.Container>
        <Space direction="vertical">
          {!!reviews &&
            reviews.map((review, index) => {
              return (
                <div
                  style={{ marginTop: index === 0 ? "0px" : "30px" }}
                  key={index}
                >
                  <Row align="top">
                    <Col>
                      {!!review.userimage ? (
                        <Avatar
                          size="large"
                          icon={
                            <Image
                              src={`data:image/${
                                review.userimage.contentType
                              };base64,${new Buffer.from(
                                review.userimage.data
                              ).toString("base64")}`}
                            />
                          }
                        />
                      ) : (
                        <Avatar size="large" icon={<UserOutlined />} />
                      )}
                    </Col>
                    <Col style={{ marginLeft: "5px" }}>
                      <p>{review.comment}</p>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#d9a91a"
                        numberOfStars={5}
                        starDimension="20px"
                      />
                    </Col>
                  </Row>

                  {!!review.commentimages && (
                    <Row justify="start">
                      <Col style={{ marginRight: "48px" }}></Col>
                      <Col>
                        <Image
                          src={`data:image/${
                            review.commentimages.contentType
                          };base64,${new Buffer.from(
                            review.commentimages.data
                          ).toString("base64")}`}
                          style={{
                            objectFit: "cover",
                            maxWidth: "500px",
                            maxHeight: "300px",
                          }}
                        />
                      </Col>
                    </Row>
                  )}

                  <Row>
                    <Col style={{ marginRight: "48px" }}></Col>
                    <Col>
                      <Row>
                        <Space>
                          <Col>
                            <strong>{review.name}</strong>
                          </Col>
                          <Col></Col>
                          {review.email !== "" && (
                            <Col>
                              <strong>( {review.email} )</strong>
                            </Col>
                          )}
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                </div>
              );
            })}
        </Space>
      </S.Container>
    </>
  );
};

export default Reviews;
