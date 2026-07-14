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

const AdminPlantsPlus = () => {
  const [plantName, setPlantName] = useState("");
  const [classification, setClassification] = useState("");
  const [carbonCapture, setCarbonCapture] = useState("");
  const [plantInfo, setPlantInfo] = useState("");
  const [growthInfo, setGrowthInfo] = useState("");
  const [plantApi, setPlantApi] = useState("");
  const [files, setFiles] = useState([]); // File 객체 배열
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const alert = useAlertify();
  const fileInputRef = useRef(null);

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

  // 특정 파일 제거
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 첨부사진 버튼
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // 취소 → 식물 목록
  const handleCancel = () => {
    navi("/admin/plant");
  };

  // 탄소포집량: 숫자만 허용
  const handleCarbonChange = (e) => {
    const value = e.target.value;
    // 빈 값 또는 숫자만 허용
    if (value === "" || /^\d+$/.test(value)) {
      setCarbonCapture(value);
    }
  };

  // 추가 (등록)
  const handleSubmit = async () => {
    if (!plantName.trim()) {
      alert.warning("식물 이름(제목)을 입력해주세요.");
      return;
    }
    if (!classification.trim()) {
      alert.warning("식물종을 입력해주세요.");
      return;
    }
    if (carbonCapture === "" || carbonCapture === null) {
      alert.warning("탄소포집량을 입력해주세요.");
      return;
    }
    if (!plantInfo.trim()) {
      alert.warning("식물 정보를 입력해주세요.");
      return;
    }
    if (!growthInfo.trim()) {
      alert.warning("재배 환경 정보를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("plantName", plantName.trim());
      formData.append("classification", classification.trim());
      formData.append("carbonCapture", carbonCapture); // Integer
      formData.append("plantInfo", plantInfo.trim());
      formData.append("growthInfo", growthInfo.trim());
      if (plantApi.trim()) {
        formData.append("plantApi", plantApi.trim());
      }

      // 이미지 파일 (DTO: List<MultipartFile> imageFiles)
      files.forEach((file) => {
        formData.append("imageFiles", file);
      });

      // POST /admins/plants (공지사항과 동일 패턴)
      const res = await api.post("/admins/plants", formData, {
        headers: {
          "Content-Type": undefined, // multipart boundary 자동
        },
      });

      alert.success(res.data?.message || "식물이 등록되었습니다.");
      navi("/admin/plant");
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
          <Title>식물추가</Title>
        </Header>

        <Toolbar />

        {/* 제목 = plantName */}
        <h4>제목</h4>
        <Toolbar>
          <SearchInput
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            placeholder="제목 (식물 이름)"
            maxLength={20}
          />
        </Toolbar>

        <Toolbar />

        {/* 식물종 + 탄소포집량 */}
        <h4>식물종 / 탄소포집량</h4>
        <Toolbar style={{ gap: "12px", flexWrap: "wrap" }}>
          <SearchInput
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            placeholder="식물종 (자유 입력)"
            maxLength={20}
            style={{ flex: 1, minWidth: "180px" }}
          />
          <SearchInput
            type="text"
            inputMode="numeric"
            value={carbonCapture}
            onChange={handleCarbonChange}
            placeholder="탄소포집량 (숫자만)"
            style={{ width: "160px" }}
          />
        </Toolbar>

        <Toolbar />

        {/* 식물 정보 + 재배 환경 (좌우 배치) */}
        <Toolbar
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* 왼쪽: 식물 정보 */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>식물 정보</h4>
            <BoardText
              value={plantInfo}
              onChange={(e) => setPlantInfo(e.target.value)}
              placeholder="식물 정보를 입력하세요"
              style={{
                width: "100%",
                minHeight: "160px",
                resize: "vertical",
              }}
            />
          </div>

          {/* 오른쪽: 재배 환경 */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>재배 환경</h4>
            <BoardText
              value={growthInfo}
              onChange={(e) => setGrowthInfo(e.target.value)}
              placeholder="재배 환경 정보를 입력하세요"
              style={{
                width: "100%",
                minHeight: "160px",
                resize: "vertical",
              }}
            />
          </div>
        </Toolbar>

        {/* 첨부사진 + API 링크 + 버튼 */}
        <Toolbar
          style={{
            marginTop: "20px",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {/* 왼쪽: 선택된 파일 칩들 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              flex: 1,
              minHeight: "36px",
              alignItems: "center",
              minWidth: "180px",
            }}
          >
            {files.length === 0 ? (
              <SearchInput
                placeholder="식물사진.jpg"
                disabled
                style={{ maxWidth: "200px", background: "#f9f9f9" }}
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

          <AddButton type="button" onClick={handleAttachClick}>
            첨부 사진
          </AddButton>

          {/* API 링크 (단순 입력, 버튼 기능 없음) */}
          <SearchInput
            value={plantApi}
            onChange={(e) => setPlantApi(e.target.value)}
            placeholder="농촌진흥청 API링크"
            maxLength={300}
            style={{ maxWidth: "260px" }}
          />
          {/* 링크 버튼은 기능 없이 그대로 두거나 제거 가능. 요청에 따라 유지 */}
          <AddButton type="button" onClick={() => {}} style={{ opacity: 0.7 }}>
            링크
          </AddButton>

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

export default AdminPlantsPlus;
