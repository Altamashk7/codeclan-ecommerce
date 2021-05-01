import { Row, Col, Card } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import * as S from "./styles";

const { Meta } = Card;

const MiddleBlock = ({ title, data, url }) => {
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <Col>
            {title && <h6>{title}</h6>}
            <Row type="flex" justify="center">
              {data.length !== 0 ? (
                data.map((val) => {
                  return (
                    <S.ImageCol
                      key={val._id}
                      xl={6}
                      lg={6}
                      md={10}
                      sm={20}
                      xs={20}
                    >
                      <Link
                        to={{
                          pathname: url,
                          state: {
                            id: val._id,
                          },
                        }}
                      >
                        {!!val.image && (
                          <Card
                            bordered={false}
                            hoverable
                            cover={
                              <img
                                height="100%"
                                alt={val.name}
                                src={`data:image/${
                                  val.image.contentType
                                };base64,${new Buffer.from(
                                  val.image.data
                                ).toString("base64")}`}
                              />
                            }
                          >
                            <Meta title={val.name} />
                          </Card>
                        )}
                      </Link>
                    </S.ImageCol>
                  );
                })
              ) : (
                <Col>
                  <LoadingOutlined style={{ fontSize: "30px" }} />
                </Col>
              )}
            </Row>
          </Col>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(MiddleBlock);
