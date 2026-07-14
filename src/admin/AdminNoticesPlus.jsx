import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAlertify } from "../hooks/useAlertify";
import Sidebars from "./Sidebars";
import {
  AddButton,
  BoardText,
  ButtonGroup,
  Container,
  Header,
  Main,
  SearchInput,
  Title,
  Toolbar,
} from "./admin.style";

const AdminNoticesPlus = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const alert = useAlertify();
  const fileInputRef = useRef(null);

  // 파일 선택 핸들러 (여러 개 가능, 최대 5장)
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    // 이미지 파일만 필터
    const imageFiles = selected.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== selected.length) {
      alert.warning(
        "이미지 파일만 첨부할 수 있습니다. (jpg, jpeg, png, gif, webp)",
      );
    }

    // 최대 5장 제한 (백엔드 검증과 동일)
    setFiles((prev) => {
      const combined = [...prev, ...imageFiles];
      if (combined.length > 5) {
        alert.warning("이미지는 최대 5장까지 업로드할 수 있습니다.");
        return combined.slice(0, 5);
      }
      return combined;
    });

    // input 초기화 (같은 파일 다시 선택 가능하게)
    e.target.value = "";
  };

  // 특정 파일 제거
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 첨부사진 버튼 클릭 → 숨겨진 input 트리거
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // 취소 → 공지사항 목록으로
  const handleCancel = () => {
    navi("/admin/notices");
  };

  // 추가 (등록)
  const handleSubmit = async () => {
    if (!noticeTitle.trim()) {
      alert.warning("제목을 입력해주세요.");
      return;
    }
    if (!noticeContent.trim()) {
      alert.warning("내용을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("noticeTitle", noticeTitle.trim());
      formData.append("noticeContent", noticeContent.trim());

      files.forEach((file) => {
        formData.append("imageFiles", file);
      });

      const res = await api.post("/admins/notices", formData, {
        headers: {
          "Content-Type": undefined,
        },
      });

      alert.success(res.data?.message || "공지사항이 등록되었습니다.");
      navi("/admin/notice");
    } catch (err) {
      console.error("등록 실패:", err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "등록에 실패했습니다. 다시 시도해주세요.";
        alert.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>공지사항 추가</Title>
        </Header>

        <Toolbar />

        {/* 제목 */}
        <h4>제목</h4>
        <Toolbar>
          <SearchInput
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            placeholder="제목"
          />
        </Toolbar>

        <Toolbar />

        {/* 내용 */}
        <BoardText
          value={noticeContent}
          onChange={(e) => setNoticeContent(e.target.value)}
          placeholder="내용"
        />

        <Toolbar style={{ alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              flex: 1,
              minHeight: "36px",
              alignItems: "center",
              minWidth: "200px",
            }}
          >
            {files.length === 0 ? (
              <SearchInput
                placeholder="식물사진/.jpg"
                disabled
                style={{ maxWidth: "220px", background: "#f9f9f9" }}
              />
            ) : (
              files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 10px",
                    background: "#f0f0f0",
                    border: "1px solid #ddd",
                    borderRadius: "20px",
                    fontSize: "13px",
                    maxWidth: "200px",
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "15px",
                      color: "#666",
                      padding: "0 2px",
                      lineHeight: 1,
                      fontWeight: "bold",
                    }}
                    title="첨부 취소"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 숨겨진 file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* 첨부사진 버튼 */}
          <AddButton type="button" onClick={handleAttachClick}>
            첨부사진
          </AddButton>

          {/* 취소 / 추가 버튼 */}
          <ButtonGroup>
            <AddButton type="button" onClick={handleCancel}>
              취소
            </AddButton>
            <AddButton
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "등록 중..." : "추가"}
            </AddButton>
          </ButtonGroup>
        </Toolbar>
      </Main>
    </Container>
  );
};

export default AdminNoticesPlus;
