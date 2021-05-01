import { Row, Col, Radio, message } from "antd";
import Button from "../../common/Button";
import Input from "../../common/Input";
import * as S from "./styles";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Product = (props) => {
  const { id } = props.location.state;
  const [product, setProduct] = useState({});

  const [colour, setColour] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const addToCart = () => {
    const oldproduct = localStorage.getItem("products")
      ? localStorage.getItem("products")
      : "[]";
    const arrayproduct = JSON.parse(oldproduct);

    let flag = false;
    arrayproduct.forEach((element) => {
      if (element.id === product._id) {
        flag = true;
      }
    });
    if (flag) {
      message.error("Product already exists in the cart");
    } else if (quantity === 0) {
      message.error("Please select quantity");
    } else if (!!product.totalColours && colour === "") {
      message.error("Please select colour");
    } else {
      const newProduct = {
        name: product.name,
        id: product._id,
        image: product.image,
        discountedPrice:
          product.originalPrice -
          (product.originalPrice * product.discountPercentage) / 100,
        originalPrice: product.originalPrice,
        quantity: quantity,
        colour: colour,
      };
      arrayproduct.push(newProduct);

      localStorage.setItem("products", JSON.stringify(arrayproduct));

      message.success("Product added to cart !");
    }
  };

  return (
    <>
      <S.Container>
        <Row>
          <Col lg={12} md={24} sm={24} xs={24}>
            <div style={{ position: "sticky", top: "20px" }}>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={
                  !!product.images && colour === ""
                    ? product.images.length + 1
                    : 1
                }
                isPlaying={true}
                infinite={true}
                isIntrinsicHeight={true}
                hasMasterSpinner={true}
              >
                {colour !== "" ? (
                  <Slider>
                    <Slide index={0}>
                      <div>
                        {product.images &&
                          product.images.map((image, index) => {
                            if (image.colour === colour) {
                              return (
                                <Image
                                  key={index}
                                  hasMasterSpinner={true}
                                  src={`data:image/${
                                    image.contentType
                                  };base64,${image.data.toString("base64")}`}
                                />
                              );
                            } else {
                              return <></>;
                            }
                          })}
                      </div>
                    </Slide>
                  </Slider>
                ) : (
                  <>
                    <Slider>
                      <Slide index={0}>
                        <div>
                          {!!product.image && (
                            <Image
                              hasMasterSpinner={true}
                              src={`data:image/${
                                product.image.contentType
                              };base64,${new Buffer.from(
                                product.image.data
                              ).toString("base64")}`}
                              alt={product.name}
                            />
                          )}
                        </div>
                      </Slide>
                      {product.images &&
                        product.images.map((image, index) => (
                          <Slide index={index + 1} key={index}>
                            <div key={image}>
                              {!!image && (
                                <Image
                                  hasMasterSpinner={true}
                                  src={`data:image/${
                                    image.contentType
                                  };base64,${image.data.toString("base64")}`}
                                />
                              )}
                            </div>
                          </Slide>
                        ))}
                    </Slider>
                  </>
                )}

                <S.SlideButtons>
                  <ButtonBack
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "1px solid black",
                      marginRight: "5px",
                    }}
                  >
                    <LeftOutlined />
                  </ButtonBack>
                  <ButtonNext
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "1px solid black",
                      marginRight: "5px",
                    }}
                  >
                    <RightOutlined />
                  </ButtonNext>
                </S.SlideButtons>
              </CarouselProvider>
            </div>
          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <S.Container>
              <h1>{product.name}</h1>
              <div style={{ display: "inline-flex" }}>
                {!!product.discountPercentage &&
                  product.discountPercentage !== 0 && (
                    <p
                      style={{
                        marginRight: "10px",
                        textDecoration: "line-through",
                      }}
                    >
                      <strong>₹ {product.originalPrice}</strong>
                    </p>
                  )}

                <p>
                  <strong>
                    ₹{" "}
                    {product.originalPrice -
                      (product.originalPrice * product.discountPercentage) /
                        100}
                  </strong>
                </p>
              </div>

              <p>
                {!!product.discountPercentage &&
                  product.discountPercentage !== 0 &&
                  product.discountPercentage + "% OFF"}
              </p>

              {!!product.images &&
                product.images.length !== 0 &&
                product.totalColours !== 0 && (
                  <>
                    <p>
                      <strong>Colour</strong>
                    </p>

                    <Radio.Group buttonStyle="outline">
                      {product.images !== undefined &&
                        product.images.map((img, index) => {
                          if (!!img.colour) {
                            return (
                              <Radio.Button
                                key={index}
                                style={{
                                  backgroundColor: img.colour,
                                  marginRight: "5px",
                                  color: img.colour,
                                }}
                                onChange={(val) => setColour(val.target.value)}
                                value={img.colour}
                              ></Radio.Button>
                            );
                          } else {
                            return <></>;
                          }
                        })}
                    </Radio.Group>
                  </>
                )}

              <p>
                <strong>Quantity</strong>
              </p>
              <Input
                type="number"
                value={quantity}
                onChange={(val) => setQuantity(val)}
                label="Quantity"
              />

              <br />
              <br />
              <Button onClick={() => addToCart()}>Add to Cart</Button>
              <br />
              <br />
              <p>
                <strong>About this product</strong>
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
            </S.Container>
          </Col>
        </Row>
      </S.Container>
    </>
  );
};

export default Product;
