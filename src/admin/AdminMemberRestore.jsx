import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import {
  AddButton,
  ButtonBox,
  CancelButton,
  Form,
  Modal,
  Overlay,
  Title,
} from "./adminpop.style";

const AdminMemberRestore = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const restored = window.confirm("정말 복구하시겠습니까?");

    if (!restored) {
      return;
    } else {
      navi("/admin/member/restored");
    }
    isLoading(true);
    setStatus("복구하겠습니다");
  };

  return (
    <Overlay>
      <Modal>
        <Title>회원을 복구하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <AddButton
              type="submit"
              onClick={() => {
                navi("/admin/member");
              }}
            >
              복구
            </AddButton>
            <CancelButton
              type="button"
              onClick={() => {
                navi("/admin/member");
              }}
            >
              취소
            </CancelButton>
          </ButtonBox>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default AdminMemberRestore;
