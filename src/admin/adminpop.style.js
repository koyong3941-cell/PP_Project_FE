import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 30px 25px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  margin-bottom: 25px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  color: red;
  font-size: 11px;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  height: 48px;
  border: 1px solid #bbb;
  border-radius: 7px;
  padding: 0 15px;
  margin-bottom: 15px;
  font-size: 15px;

  &:focus {
    outline: none;
    border: 1px solid #ff5b5b;
  }
`;

export const Error = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 15px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const AddButton = styled.button`
  width: 130px;
  height: 45px;
  border: none;
  border-radius: 25px;
  background: #000;
  color: white;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  width: 130px;
  height: 45px;
  border: none;
  border-radius: 25px;
  background: #ff2d2d;
  color: white;
  cursor: pointer;
`;
