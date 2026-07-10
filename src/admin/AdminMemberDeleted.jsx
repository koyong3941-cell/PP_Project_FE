import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AddButton, Form, Modal, Overlay, Title } from "./adminpop.style";
const AdminMemberDeleted = () => {
  const navi = useNavigate();
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Overlay>
      <Modal>
        <Title>이미 삭제된 회원입니다</Title>
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
export default AdminMemberDeleted;
