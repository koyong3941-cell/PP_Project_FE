import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AddButton, Form, Modal, Overlay, Title } from "./adminpop.style";
const AdminMemberRestored = () => {
  const navi = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Overlay>
      <Modal>
        <Title>이미 활성화 된 회원 입니다</Title>
        <Form onSubmit={onSubmit}>
          <AddButton
            onClick={() => {
              navi("/admin/member");
            }}
          >
            확인
          </AddButton>
        </Form>
      </Modal>
    </Overlay>
  );
};
export default AdminMemberRestored;
