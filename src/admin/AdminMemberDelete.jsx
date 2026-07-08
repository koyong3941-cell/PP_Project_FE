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
const AdminMemberDelete = () => {
  const [admins, setAdmins] = useState("");
  const navi = useNavigate();
  const { success, error } = useAlertify();
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const deleted = window.confirm("정말삭제하시겠습니까?");

    if (!deleted) {
      return;
    }
    isLoading(true);
    setStatus("삭제하겠습니다");
  };

  return (
    <Overlay>
      <Modal>
        <Title>회원을 삭제하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <AddButton
              type="button"
              onClick={() => {
                navi("/admin");
              }}
            >
              삭제
            </AddButton>
            <CancelButton
              type="button"
              onClick={() => {
                navi("/admin");
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
export default AdminMemberDelete;
