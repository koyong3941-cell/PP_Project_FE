import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const TitleWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;

  .icon {
    font-size: 18px;
    margin-top: 2px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

export const Content = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.4;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;

  &.cancel {
    background: #fff;
    border: 1px solid #ddd;
    color: #333;
  }

  &.confirm {
    background: #ff3b30;
    color: #fff;
  }

  &.ok {
    background: #ff3b30;
    color: #fff;
    width: 100%;
  }
`;
