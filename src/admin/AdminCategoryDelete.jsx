import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
const AdminCategoryDelete = () => {
  const navi = useNavigate();
  const [status, useStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const deleted = window.confirm("정말 삭제하시겠습니까?");

    if (!deleted) {
      return;
    }
    isLoading(true);
    setStatus("삭제완료!");
  };

  return (
    <Overlay>
      <Modal>
        <Title>카테고리를 삭제하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <CancelButton
              type="submit"
              onClick={() => {
                navi("/admin/category");
              }}
            >
              삭제
            </CancelButton>
            <AddButton
              type="button"
              onClick={() => {
                navi("/admin/category");
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
export default AdminCategoryDelete;
