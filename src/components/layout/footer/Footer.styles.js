import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 220px;
  padding: 60px 40px;
  background: #7aa4ad;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Section = styled.div`
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
  }
  p {
    margin: 4px 0;
    font-size: 14px;
    font-weight: 700; /* 500에서 700(Bold)으로 변경 */
    color: rgb(0, 0, 0);
  }
`;

export const BrandingArea = styled.div`
  text-align: right;
  h1 {
    font-size: 65px;
    margin: 0 0 10px 10px;
    font-family: "Playfair Display", serif;
    font-weight: 700;
    color: #ffffff !important;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  a {
    color: #000000;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: #8dcf9b;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
