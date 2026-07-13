import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import {
  AddButton,
  ButtonBox,
  CancelButton,
  Error,
  Form,
  Input,
  Modal,
  Overlay,
  Title,
} from "./adminpop.style";
const AdminCategoryPlus = () => {
  const { user } = useAuth();
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();
  const { success, error } = useAlertify();

  useEffect(() => {
    if (!user) {
      navi("/login");
      return;
    }

    if (user.role !== "ROLE_ADMIN") {
      error("관리자만 접근할수 있습니다");
      navi("/");
    }
  }, [user, navi]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post(`/admins/${categoryNo}/category`);
      await findBoardReaction();
      success("카테고리 추가");
      navi("/admin/category");
    } catch (err) {
      console.error("카테고리 추가 에러:", err.response?.data);
      setStatus("카테고리 이름을 확인해주세요");
    }
  };
  return (
    <Overlay>
      <Modal>
        <Title>추가 할 카테고리 이름을 적어주세요</Title>
        <Form onSubmit={onSubmit}>
          <Input
            type="name"
            placeholder="카테고리 이름(1~20자)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {status && <Error>{status}</Error>}
          <ButtonBox>
            <AddButton type="submit">추가</AddButton>
            <CancelButton
              type="button"
              onClick={() => {
                navi("/admin/category");
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
export default AdminCategoryPlus;
