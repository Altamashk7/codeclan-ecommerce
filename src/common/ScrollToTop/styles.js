import { CaretUpOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const Up = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: fixed;
  right: 100px;
  bottom: 50px;
  z-index: 10;
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const UpIcon = styled(CaretUpOutlined)`
  color: #d9a91a;
  font-size: 30px;
  font-weight: bolder;
`;
