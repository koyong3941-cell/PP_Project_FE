import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #fff;
  font-family: Pretendard, sans-serif;
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 60px;
`;

export const HomeIcon = styled.img`
  width: 34px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
`;

export const LogoArea = styled.div`
  width: 220px;
`;

export const Logo = styled.h1`
  font-size: 64px;
  line-height: 58px;
  font-weight: 700;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Path = styled.div`
  margin-bottom: 40px;
  font-size: 22px;
`;

export const ProfileArea = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
`;

export const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Id = styled.div`
  font-size: 13px;
  color: #666;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Name = styled.h2`
  margin: 0;
  font-size: 40px;
`;

export const NameInput = styled.input`
  font-size: 32px;
  font-weight: 700;

  border: 1px solid #ccc;
  border-radius: 6px;

  padding: 4px 10px;
  outline: none;

  width: 250px;
`;

export const EditButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;
  font-size: 20px;
`;

export const RemoveButton = styled.button`
  margin-top: 10px;

  border: none;
  background: none;

  color: #777;
  cursor: pointer;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  width: 600px;
  gap: 10px;
`;

export const Notice = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  height: 48px;

  border: 1px solid #ddd;
  border-radius: 6px;

  padding: 0 15px;

  margin-bottom: 20px;
`;

export const EmailRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const EmailInput = styled.input`
  width: 220px;
  height: 48px;

  border: 1px solid #ddd;
  border-radius: 6px;

  padding: 0 15px;
`;

export const Select = styled.select`
  width: 220px;
  height: 48px;

  border-radius: 6px;
  border: 1px solid #ddd;
`;

export const ButtonArea = styled.div`
  margin-top: 120px;

  display: flex;
  justify-content: flex-end;

  gap: 15px;
`;

export const EditButtonSubmit = styled.button`
  width: 120px;
  height: 48px;

  border-radius: 24px;

  background: #111;
  color: white;

  border: none;

  cursor: pointer;
  font-weight: 700;
`;

export const WithdrawButton = styled.button`
  width: 120px;
  height: 48px;

  border-radius: 24px;

  background: #ff4b4b;
  color: white;

  border: none;

  cursor: pointer;
  font-weight: 700;
`;
