import { lazy, useState } from "react";
import { Row, Col, message } from "antd";
import { withTranslation } from "react-i18next";

import * as S from "./styles";
import axios from "axios";

const Block = lazy(() => import("../Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const Contact = ({ title, content, id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const onSubmit = () => {
    if (name === "") {
      message.error("Please enter name");
    } else if (email === "") {
      message.error("Please enter email");
    } else if (query === "") {
      message.error("Please enter your message");
    } else {
      const data = {
        name: name,
        email: email,
        message: query,
      };

      axios
        .post("https://myindianthings-backend.herokuapp.com/contacts", data)
        .then((response) => {
          console.log(response.data);
          message
            .success("Message sent successfully !")
            .then(() => (window.location.pathname = "/contact"));
        })
        .catch((error) => {
          message.error("Some error occured !");
          console.log(error);
        });
    }
  };

  return (
    <S.ContactContainer id={id}>
      <S.Contact>
        <Row type="flex" justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24}>
            <Block padding={true} title={title} content={content} />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <S.FormGroup>
              <Col span={24}>
                <Input
                  type="text"
                  label="Your Name"
                  value={name}
                  onChange={(val) => setName(val)}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  label="Your Email"
                  value={email}
                  onChange={(val) => setEmail(val)}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  name="query"
                  rows={4}
                  value={query}
                  onChange={(e) => {
                    e.preventDefault();
                    setQuery(e.target.value);
                  }}
                />
              </Col>
              <S.ButtonContainer>
                <Button onClick={() => onSubmit()}>Submit</Button>
              </S.ButtonContainer>
            </S.FormGroup>
          </Col>
        </Row>
      </S.Contact>
    </S.ContactContainer>
  );
};

export default withTranslation()(Contact);
