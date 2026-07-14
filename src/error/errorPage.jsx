import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import errorImage from "../assets/errorPage.png";

const ErrorPage = ({ errorInfo }) => {
  const location = useLocation();
  const title =
    location.state?.title || errorInfo?.title || "페이지를 찾을 수 없습니다.";
  const description =
    location.state?.description ||
    errorInfo?.description ||
    "요청하신 페이지가 존재하지 않거나\n이동 또는 삭제되었을 수 있습니다.";

  return (
    <Container>
      <Image src={errorImage} alt="Error" />
      <Title>{title}</Title>
      <Description>
        {description.split("\n").map((text, index) => (
          <div key={index}>{text}</div>
        ))}
      </Description>
      <HomeButton to="/">홈으로 돌아가기</HomeButton>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: #f8faf7;
`;

const Image = styled.img`
  width: 100%;
  max-width: 700px;
  object-fit: contain;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2f4f2f;
  margin-bottom: 16px;
  font-weight: 700;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 36px;
`;

const HomeButton = styled(Link)`
  padding: 14px 32px;
  border-radius: 10px;
  background: #4caf50;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #388e3c;
    transform: translateY(-2px);
  }
`;
