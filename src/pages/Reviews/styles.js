import styled from "styled-components";
import { CameraOutlined } from "@ant-design/icons";

export const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;

  @media only screen and (max-width: 768px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export const CameraIcon = styled(CameraOutlined)`
  font-size: 20px;
  border: 1px solid #eee;
  padding: 10px;
  transition: border-color 0.3s ease-in;

  &:hover {
    border: 1px solid black;
  }
`;
