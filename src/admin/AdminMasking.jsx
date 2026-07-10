import { useState } from "react";
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

const AdminMasking = () => {
  const [member, setMember] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();
  const { success, error } = useAlertify();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!memberPwd) {
      setStatus("비밀번호를 꼭 입력하세요");
      return;
    }

    isLoading(true);
    setStatus("");

    try {
      const result = await api.post("/admin/masking", {
        memberPwd,
      });
      setMember(result.data);
      success("회원 마스킹 해제");
      navi("/admin/member");
    } catch (err) {
      console.error("마스킹 해제 에러:", err.response?.data);
      setStatus("비밀번호가 올바르지 않습니다");
    } finally {
      isLoading(false);
    }
  };
  return (
    <Overlay>
      <Modal>
        <Title>회원 마스킹을 해제 하시겠습니까?</Title>
        <Form onSubmit={onSubmit}>
          <Input
            type="password"
            placeholder="비밀번호(영문,숫자,특수기호 포함 20자)"
            value={memberPwd}
            onChange={(e) => setMemberPwd(e.target.value)}
          />
          {status && <Error>{status}</Error>}
          <ButtonBox>
            <AddButton type="submit">해제</AddButton>
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
export default AdminMasking;
