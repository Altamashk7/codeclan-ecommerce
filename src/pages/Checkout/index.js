import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { Row, Col, Image, message } from "antd";
import Button from "../../common/Button";
import Input from "../../common/Input";
import axios from "axios";
import { Radio } from "antd";

const options = [
  { label: "Cash On Delivery", value: "COD" },
  { label: "Card Payment", value: "Card" },
  { label: "UPI", value: "UPI" },
  { label: "Other", value: "Other" },
];

const Checkout = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(JSON.parse(localStorage.getItem("products")));
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (
    name,
    email,
    phone,
    address,
    price,
    ourOrderId
  ) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(
      "https://myindianthings-backend.herokuapp.com/payment/orders",
      {
        amount: price,
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_wWXoxoQf1kjrSm", // Enter the Key ID generated from the Dashboard
      amount: amount * 100,
      currency: currency,
      name: "MyIndianThings",
      description: "Payment for your order at MyIndianThings",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          ourOrderId: ourOrderId,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "https://myindianthings-backend.herokuapp.com/payment/success",
          data
        );

        message
          .success(result.data.msg)
          .then(() => (window.location.pathname = "/thankyou"));
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const submitOrder = () => {
    if (name === "") {
      message.error("Please fill the name");
    } else if (email === "") {
      message.error("Please fill the email");
    } else if (phone === "") {
      message.error("Please fill the phone number");
    } else if (address1 === "" && address2 === "") {
      message.error("Please provide an address");
    } else if (state === "") {
      message.error("Please fill the state");
    } else if (city === "") {
      message.error("Please fill the city");
    } else if (zip === "") {
      message.error("Please fill the zip code");
    } else if (paymentMethod === "") {
      message.error("Please enter the payment method");
    } else {
      // const fmData = new FormData();

      const orderItems = [];
      let totalPrice = 0;
      JSON.parse(localStorage.getItem("products")).forEach((product) => {
        const temp = {
          product: product.id,
          price: product.discountedPrice * product.quantity,
          quantity: parseInt(product.quantity),
          colour: product.colour,
        };

        orderItems.push(temp);

        totalPrice = totalPrice + product.discountedPrice * product.quantity;
      });

      const data = {
        name: name,
        email: email,
        phone: phone,
        shippingAddress1: address1,
        shippingAddress2: address2,
        city: city,
        state: state,
        zip: zip,
        orderItems: orderItems,
        paymentMethod: paymentMethod,
      };

      axios
        .post("https://myindianthings-backend.herokuapp.com/orders", data)
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("products");
          if (response.data.paymentMethod !== "COD") {
            displayRazorpay(
              name,
              email,
              phone,
              address1,
              totalPrice,
              response.data._id
            );
          } else {
            window.location.pathname = "/thankyou";
          }
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
        Checkout
      </h1>
      <S.Container>
        <Row>
          <S.OuterCols lg={12} md={12} sm={24} xs={24}>
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(val) => setName(val)}
            />

            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(val) => setEmail(val)}
            />

            <Input
              type="tel"
              label="Phone Number"
              value={phone}
              onChange={(val) => setPhone(val)}
            />

            <Input
              type="text"
              label="Address Line 1"
              value={address1}
              onChange={(val) => setAddress1(val)}
            />

            <Input
              type="text"
              label="Address Line 2"
              value={address2}
              onChange={(val) => setAddress2(val)}
            />

            <Input
              type="text"
              label="State"
              value={state}
              onChange={(val) => setState(val)}
            />

            <Input
              type="text"
              label="City"
              value={city}
              onChange={(val) => setCity(val)}
            />

            <Input
              type="text"
              label="Zip Code"
              value={zip}
              onChange={(val) => setZip(val)}
            />

            <p>Choose Payment Method</p>
            <Radio.Group
              size="large"
              options={options}
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            />

            <br />

            <Button width="30" onClick={() => submitOrder()}>
              Continue to payment
            </Button>
          </S.OuterCols>
          <S.OuterCols lg={12} md={12} sm={24} xs={24}>
            {cartProducts !== null &&
            cartProducts !== undefined &&
            cartProducts.length !== 0 ? (
              cartProducts.map((product, index) => {
                return (
                  <S.ProductContainer align="middle" key={index}>
                    <Col span={4}>
                      {!!product.image && (
                        <Image
                          src={`data:image/${
                            product.image.contentType
                          };base64,${new Buffer.from(
                            product.image.data
                          ).toString("base64")}`}
                          alt={product.name}
                        />
                      )}
                    </Col>
                    <Col span={2}></Col>
                    <Col span={18}>
                      <S.NameSpan>{product.name}</S.NameSpan>
                      <span>Quantity : {product.quantity}</span>
                      <br />
                      <span>
                        {product.originalPrice !== product.discountedPrice && (
                          <>
                            <span
                              style={{
                                marginRight: "10px",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{product.originalPrice * product.quantity}
                            </span>{" "}
                            |{" "}
                          </>
                        )}

                        <span
                          style={{
                            marginLeft:
                              product.originalPrice !== product.discountedPrice
                                ? "10px"
                                : "0px",
                          }}
                        >
                          ₹{product.discountedPrice * product.quantity}
                        </span>
                      </span>
                      <br />
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const allItems = JSON.parse(
                            localStorage.getItem("products")
                          );
                          const filteredItems = allItems.filter(
                            (items) => items.id !== product.id
                          );
                          localStorage.setItem(
                            "products",
                            JSON.stringify(filteredItems)
                          );
                          setCartProducts(filteredItems);
                        }}
                      >
                        <DeleteOutlined />
                        Remove
                      </span>
                    </Col>
                  </S.ProductContainer>
                );
              })
            ) : (
              <S.ProductContainer align="middle">
                <Col span={24}>No items in the cart</Col>
              </S.ProductContainer>
            )}
          </S.OuterCols>
        </Row>
      </S.Container>
    </>
  );
};

export default Checkout;
