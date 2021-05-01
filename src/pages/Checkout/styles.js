import styled from "styled-components";
import { Col, Row } from "antd";

export const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;

  @media only screen and (max-width: 768px) {
    margin-left: 0%;
    margin-right: 0%;
  }
`;

export const OuterCols = styled(Col)`
  padding: 10px;
`;

export const ProductContainer = styled(Row)`
  padding: 10px;
  border: 2px solid black;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 20px;
`;

export const NameSpan = styled.div`
  font-size: 18px;
`;
