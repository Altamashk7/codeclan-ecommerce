import * as S from "./styles";

const Input = () => {
  const scrollUp = () => {
    const element = document.getElementById("intro");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <S.Up onClick={scrollUp}>
      <S.UpIcon />
    </S.Up>
  );
};

export default Input;
