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
const AdminBoardData = () => {
  const navi = useNavigate();
  const [status, useStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = window.confirm("데이터를 복구하겠습니다");

    if (!data) {
      return;
    }
    isLoading(true);
    setStatus("복구완료!");
  };
  return (
    <Overlay>
      <Modal>
        <Title>DB를 복구하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <ButtonBox>
            <AddButton
              type="submit"
              onClick={() => {
                navi("/admin/board");
              }}
            >
              복구
            </AddButton>
            <CancelButton
              type="button"
              onClick={() => {
                navi("/admin/board");
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
export default AdminBoardData;
