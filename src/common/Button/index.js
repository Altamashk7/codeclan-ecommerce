import * as S from "./styles";

const Button = ({ color, width, height, children, onClick }) => (
  <S.Button
    color={color}
    width={width}
    onClick={onClick}
    style={{ height: height }}
  >
    {children}
  </S.Button>
);

export default Button;
