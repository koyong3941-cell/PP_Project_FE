import styled from "styled-components";

export const LogoImage = styled.img`
  width: 300px;
  height: 200px;
  transform: translate(0px, 0px);
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #223028;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
`;

export const MainBanner = styled.div`
  width: 100%;
  padding: 12px;
  background-color: #223028;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

export const RequiredStar = styled.span`
  color: red;
  margin-left: 3px;
`;

export const Pstyled = styled.a`
  display: block;
  margin-top: 5px;
  margin-left: 3px;
`;

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const EmailInput = styled(Input)`
  flex: 1;
`;

export const EmailSelect = styled.select`
  flex: 1;
  padding: 10px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
`;
