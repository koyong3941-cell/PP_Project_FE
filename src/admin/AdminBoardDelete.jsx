import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const AdminBoardDelete = () => {
  const navi = useNavigate();
  const [status, useStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const { boardNo } = useParams();
  const onDelete = async (e) => {
    e.preventDefault();
    if (!confirm("정말삭제하시겠습니까?")) return;

    try {
      await api.delete(`/boards/${boardNo}`);
      //navi("/admin/board");
    } catch {
      alert("삭제에 실패했습니다");
      //navi("/admin/board");
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>게시글을 삭제하시겠습니까?</Title>
        <Form onSubmit={onDelete}>
          <ButtonBox>
            <CancelButton type="submit">삭제</CancelButton>
            <AddButton
              type="button"
              onClick={() => {
                navi("/admin/board");
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
export default AdminBoardDelete;
