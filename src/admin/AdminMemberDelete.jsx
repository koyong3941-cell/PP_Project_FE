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
  const navi = useNavigate();
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const deleted = window.confirm("정말 삭제하시겠습니까?");

    if (!deleted) {
      return;
    } else {
      navi("/admin/member/deleted");
    }
    isLoading(true);
    setStatus("삭제완료");
  };

  return (
    <Overlay>
      <Modal>
        <Title>회원을 삭제하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <CancelButton
              type="submit"
              onClick={() => {
                navi("/admin");
              }}
            >
              삭제
            </CancelButton>
            <AddButton
              type="button"
              onClick={() => {
                navi("/admin");
              }}
            >
              취소
            </AddButton>
          </ButtonBox>
        </Form>
      </Modal>
    </Overlay>
  );
};
export default AdminMemberDelete;
