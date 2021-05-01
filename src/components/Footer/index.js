import { lazy, Fragment, useEffect, useState } from "react";
import { Row, Col, message, Input, Button } from "antd";
import Fade from "react-reveal/Fade";
import axios from "axios";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Container = lazy(() => import("../../common/Container"));

const Footer = () => {
  const [categories, setCategories] = useState([]);

  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get("https://myindianthings-backend.herokuapp.com/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
        style={{ marginLeft: "10px" }}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  const submitEmail = () => {
    console.log(email);
    axios
      .post("https://myindianthings-backend.herokuapp.com/mail", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        setEmail("");
        message.success("Thanks for subscribing to our mailing list !");
      })
      .catch((err) => {
        console.log(err.response);
        message.error("Please try again. Some error occured !");
      });
  };

  return (
    <Fragment>
      <Fade bottom>
        <S.Extra>
          <Container border="true">
            <h1 style={{ textAlign: "center", paddingTop: "3rem" }}>
              Subsribe to our mailing list
            </h1>
            <Row align="middle" justify="center" style={{ paddingTop: "1rem" }}>
              <Col lg={19} md={15} sm={15} xs={15}>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col lg={1} md={1} sm={1} xs={1}></Col>
              <Col lg={4} md={8} sm={8} xs={8}>
                <Button onClick={() => submitEmail()}>SUBMIT</Button>
              </Col>
            </Row>
          </Container>
        </S.Extra>
        <S.Footer>
          <Container>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Language>Contact</S.Language>
                <S.Large to="tel:9723708470">Call : 9723708470</S.Large>
                <S.Large to="mailto:myindianthingss@gmail.com">
                  Mail : myindianthingss@gmail.com
                </S.Large>
                <S.Para>
                  Having trouble in anything ? Feel free href reach out.
                </S.Para>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24}>
                <S.Title>Policy</S.Title>
                <S.Large to="/">Application Security</S.Large>
                <S.Large to="/">Software Principles</S.Large>
                <S.Large to="/">Application Security</S.Large>
                <S.Large to="/">Software Principles</S.Large>
                <S.Large to="/">Application Security</S.Large>
              </Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Title>About Us</S.Title>
                <S.Para>
                  ​We provide high quality indian products for your home and
                  offices.We provide high quality indian products for your home
                  and offices.We provide high quality indian products for your
                  home and offices.We provide high quality indian products for
                  your home and offices.
                </S.Para>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Empty />
                <S.Language>ADDRESS</S.Language>
                <S.Para>No 64, Kanakapura road</S.Para>
                <S.Para>Bangalore 560082</S.Para>
                <S.Para>India</S.Para>
              </Col>

              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Title>Top selling categories</S.Title>
                {!!categories &&
                  categories.map((category, index) => {
                    return (
                      <S.Large
                        key={index}
                        to={{
                          pathname: "/category",
                          state: {
                            id: category._id,
                          },
                        }}
                      >
                        {category.name}
                      </S.Large>
                    );
                  })}
              </Col>
            </Row>
          </Container>
        </S.Footer>
        <S.Extra>
          <Container border="true">
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              style={{ paddingTop: "3rem" }}
            >
              <Col>
                <S.NavLink href="/">
                  <S.LogoContainer>
                    <SvgIcon
                      src="logo.svg"
                      aria-label="homepage"
                      width="101px"
                      height="64px"
                    />
                  </S.LogoContainer>
                </S.NavLink>
              </Col>
              <Col>
                <S.FooterContainer>
                  <SocialLink
                    href="https://instagram.com"
                    src="instagram.svg"
                  />
                  <SocialLink href="https://facebook.com" src="facebook.svg" />
                </S.FooterContainer>
              </Col>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default Footer;
