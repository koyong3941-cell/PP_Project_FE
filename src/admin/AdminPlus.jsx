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
  Label,
  Modal,
  Overlay,
  Title,
} from "./adminpop.style";
const AdminPlus = () => {
  const [admins, setAdmins] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const navi = useNavigate();
  const { success, error } = useAlertify();
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!memberId || !memberPwd) {
      setStatus("아이디랑 비밀번호를 꼭 입력하세요");
      return;
    }

    isLoading(true);
    setStatus("");

    try {
      const result = await api.post("/admin/plus", {
        memberId,
        memberPwd,
        memberEmail,
      });
      setAdmins(result.data);
      success("관리자 추가");
      navi("/admin");
    } catch (err) {
      console.error("관리자 추가 에러:", err.response?.data);
      setStatus("아이디 또는 비밀번호 또는 이메일이 올바르지 않습니다");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>관리자를 추가하시겠습니까?</Title>

        <Form onSubmit={onSubmit}>
          <Label>사용할 수 있는 아이디입니다</Label>
          <Input
            placeholder="아이디(6~20자)"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />

          <Label>사용가능한 비밀번호 입니다</Label>
          <Input
            type="password"
            placeholder="비밀번호 (영문, 숫자, 특수기호 포함 8~20자)"
            value={memberPwd}
            onChange={(e) => setMemberPwd(e.target.value)}
          />

          <Label>사용가능한 이메일 입니다</Label>
          <Input
            placeholder="이메일 (@khaca.com)"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />

          {status && <Error>{status}</Error>}

          <ButtonBox>
            <AddButton type="submit">추가</AddButton>
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
export default AdminPlus;
