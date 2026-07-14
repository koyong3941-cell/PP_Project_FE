import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const AdminNoticeEdit = () => {
  const { noticeNo } = useParams(); // /admin/notice/edit/:noticeNo
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [files, setFiles] = useState([]); // File 객체 배열 (기존 유지 + 새로 추가)
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navi = useNavigate();
  const alert = useAlertify();
  const fileInputRef = useRef(null);

  // 기존 이미지 URL 생성 함수 (프로젝트 환경에 맞게 수정하세요)
  // baseURL = "http://localhost/api" 기준 → http://localhost/uploads/notice/xxx
  const getImageUrl = (img) => {
    const base = (api.defaults.baseURL || "http://localhost/api").replace(
      /\/api\/?$/,
      "",
    );
    // img.imgPath = "/uploads/notice/" , img.saveName = "uuid.jpg"
    return `${base}${img.imgPath || "/uploads/notice/"}${img.saveName}`;
  };

  // ==================== 상세 조회 + 기존 이미지를 File로 변환 ====================
  useEffect(() => {
    if (!noticeNo) {
      alert.error("잘못된 접근입니다.");
      navi("/admin/notice");
      return;
    }

    const fetchDetail = async () => {
      try {
        setFetching(true);
        const res = await api.get(`/admins/notices/${noticeNo}`);
        const data = res.data?.data || res.data;

        setNoticeTitle(data.noticeTitle || "");
        setNoticeContent(data.noticeContent || "");

        // 기존 첨부 이미지들을 File 객체로 변환해서 files 상태에 넣기
        // (백엔드가 수정 시 기존 이미지를 전부 삭제하고 imageFiles만 다시 저장하기 때문)
        const images = data.noticeImages || data.images || [];
        if (images.length > 0) {
          const loadedFiles = await Promise.all(
            images.map(async (img) => {
              try {
                const url = getImageUrl(img);
                const response = await fetch(url, {
                  // 토큰이 필요하면 헤더 추가 (보통 정적 파일은 공개)
                  // headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });
                if (!response.ok) {
                  console.warn("이미지 fetch 실패:", url);
                  return null;
                }
                const blob = await response.blob();
                const fileName =
                  img.originalName ||
                  img.saveName ||
                  `image_${img.imgOrder}.jpg`;
                return new File([blob], fileName, {
                  type: blob.type || "image/jpeg",
                });
              } catch (e) {
                console.warn("기존 이미지 로드 실패:", img, e);
                return null;
              }
            }),
          );
          setFiles(loadedFiles.filter(Boolean));
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403) {
          alert.error("관리자 권한이 없습니다.");
          navi("/");
        } else {
          alert.error("공지사항을 불러오는데 실패했습니다.");
          navi("/admin/notice");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchDetail();
  }, [noticeNo]);

  // 파일 선택 핸들러 (여러 개 가능, 최대 5장)
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    const imageFiles = selected.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== selected.length) {
      alert.warning(
        "이미지 파일만 첨부할 수 있습니다. (jpg, jpeg, png, gif, webp)",
      );
    }

    setFiles((prev) => {
      const combined = [...prev, ...imageFiles];
      if (combined.length > 5) {
        alert.warning("이미지는 최대 5장까지 업로드할 수 있습니다.");
        return combined.slice(0, 5);
      }
      return combined;
    });

    e.target.value = "";
  };

  // 특정 파일 제거 (기존/신규 동일)
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 첨부사진 버튼
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // 취소 → 목록
  const handleCancel = () => {
    navi("/admin/notice");
  };

  // 수정 제출
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
      formData.append("noticeNo", noticeNo); // 백엔드 DTO noticeNo 세팅용
      formData.append("noticeTitle", noticeTitle.trim());
      formData.append("noticeContent", noticeContent.trim());

      // 현재 남아있는 모든 파일(기존 유지 + 새로 추가)을 다시 보냄
      // 백엔드가 기존 이미지를 전부 삭제 후 imageFiles만 다시 저장하기 때문
      files.forEach((file) => {
        formData.append("imageFiles", file);
      });

      // PATCH + multipart
      const res = await api.patch(`/admins/notices/${noticeNo}`, formData, {
        headers: {
          "Content-Type": undefined, // boundary 자동 생성
        },
      });

      alert.success(res.data?.message || "공지사항이 수정되었습니다.");
      navi("/admin/notice");
    } catch (err) {
      console.error("수정 실패:", err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "수정에 실패했습니다. 다시 시도해주세요.";
        alert.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container>
        <Sidebars />
        <Main>
          <Header>
            <Title>공지사항 수정</Title>
          </Header>
          <Toolbar>
            <span style={{ color: "#666" }}>불러오는 중...</span>
          </Toolbar>
        </Main>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>공지사항 수정</Title>
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

        {/* 첨부파일 + 버튼 영역 */}
        <Toolbar style={{ alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          {/* 왼쪽: 선택된 파일 칩들 (둥근 테두리 + X) */}
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
                placeholder="식물사진.jpg"
                disabled
                style={{ maxWidth: "220px", background: "#f9f9f9" }}
              />
            ) : (
              files.map((file, index) => (
                <div
                  key={`${file.name}-${index}-${file.size}`}
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

          {/* 취소 / 수정 버튼 */}
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
              {loading ? "수정 중..." : "수정"}
            </AddButton>
          </ButtonGroup>
        </Toolbar>
      </Main>
    </Container>
  );
};

export default AdminNoticeEdit;
