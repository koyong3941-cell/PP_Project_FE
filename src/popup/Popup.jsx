import React from "react";
import {
  Overlay,
  Modal,
  Header,
  TitleWrap,
  CloseBtn,
  Content,
  Footer,
  Button,
} from "./Popup.styles";

const Popup = ({
  open = false,
  type = "confirm", // confirm | alert | success
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  onClose,
}) => {
  if (!open) return null;

  const renderFooter = () => {
    switch (type) {
      case "confirm":
        return (
          <Footer>
            <Button className="cancel" onClick={onCancel || onClose}>
              {cancelText}
            </Button>
            <Button className="confirm" onClick={onConfirm}>
              {confirmText}
            </Button>
          </Footer>
        );

      case "success":
      case "alert":
        return (
          <Footer>
            <Button className="ok" onClick={onConfirm || onClose}>
              {confirmText}
            </Button>
          </Footer>
        );

      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "confirm":
        return "⚠️";
      case "success":
        return "✔️";
      case "alert":
        return "ℹ️";
      default:
        return "";
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleWrap>
            <div className="icon">{getIcon()}</div>
            <div className="title">{title}</div>
          </TitleWrap>

          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Content>{message}</Content>

        {renderFooter()}
      </Modal>
    </Overlay>
  );
};

export default Popup;
