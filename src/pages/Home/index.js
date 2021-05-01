import { lazy, useState, useEffect } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import axios from "axios";
import { Button, Input, Modal, Row, Col, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showBanner, toggleShowBanner] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`/products/newArrivals`)
      .then((response) => {
        console.log(response.data);
        setNewArrivals(response.data);
      })
      .catch((error) => console.log(error.response));

    window.onload = () => {
      setTimeout(() => {
        toggleShowBanner(true);
      }, 2000);
    };
  }, []);

  const submitEmail = () => {
    console.log(email);
    axios
      .post("/mail", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        toggleShowBanner(false);
        message.success("Thanks for subscribing to our mailing list !");
      })
      .catch((err) => {
        console.log(err.response);
        message.error("Please try again. Some error occured !");
      });
  };

  return (
    <Container>
      <Modal
        footer={null}
        centered
        visible={showBanner}
        onCancel={() => toggleShowBanner(false)}
        closable={false}
        bodyStyle={{ backgroundColor: "#2e3559" }}
      >
        <div style={{ textAlign: "right" }}>
          <CloseCircleOutlined
            style={{ color: "white", fontSize: "20px" }}
            onClick={() => toggleShowBanner(false)}
          />
        </div>

        <h1 style={{ color: "white" }}>Register & Get special discounts</h1>

        <hr style={{ height: "2px", color: "#a69b8f" }} />
        <Row style={{ color: "white" }} align="middle">
          <Col
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              fontSize: "15px ",
              marginRight: "10px",
            }}
          >
            UPTO
          </Col>{" "}
          <Col style={{ fontSize: "50px", color: "#d9a91a" }}>50% OFF</Col>
        </Row>
        <h4 style={{ color: "white" }}>
          <span style={{ color: "#d9a91a" }}>+</span> EXTRA 15% OFF
        </h4>
        <hr style={{ height: "2px", color: "#a69b8f" }} />
        <h4 style={{ color: "white" }}>ON ALL PRODUCTS</h4>
        <Row>
          <Col lg={19} md={15} sm={15} xs={15}>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: "transparent", color: "white" }}
            />
          </Col>
          <Col lg={1} md={1} sm={1} xs={1}></Col>
          <Col lg={4} md={8} sm={8} xs={8}>
            <Button
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => submitEmail()}
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      </Modal>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        data={categories}
        url="/category"
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />

      <MiddleBlock title="New Arrivals" data={newArrivals} url="/product" />

      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
      <ContactFrom
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
