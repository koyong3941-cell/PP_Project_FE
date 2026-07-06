import { useNavigate } from "react-router-dom";
import { styles } from "./Board.styles";
import { writeStyles } from "./BoardWrite.styles";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

const BoardWrite = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("첨부할 사진을 선택하세요");
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    boardTitle: "",
    boardContent: "",
    categoryNo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/boards/category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("카테고리 불러오기 실패", err);
      });
  }, []);
  const handleWrite = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileWrite = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (
      !form.boardTitle.trim() ||
      !form.boardContent.trim() ||
      !form.categoryNo
    ) {
      setError("제목, 카테고리, 내용을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("boardTitle", form.boardTitle);
    formData.append("boardContent", form.boardContent);
    formData.append("categoryNo", form.categoryNo);
    if (file) {
      formData.append("imageFiles", file);
    }

    try {
      setSubmitting(true);

      await api.post("/boards", formData);

      navigate("/board");
    } catch (e) {
      console.error(e);

      setError(
        e.response?.data?.message ||
          e.response?.data?.error ||
          e.message ||
          "등록 중 오류가 발생했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={writeStyles.container}>
      <p style={writeStyles.title}>게시글</p>
      <p style={writeStyles.sub}>등록</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          제목<span style={writeStyles.req}>*</span>
        </label>
        <input
          style={writeStyles.input}
          type="text"
          name="boardTitle"
          placeholder="제목"
          value={form.boardTitle}
          onChange={handleWrite}
        />
      </div>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          카테고리<span style={writeStyles.req}>*</span>
        </label>
        <select
          style={writeStyles.select}
          name="categoryNo"
          value={form.categoryNo}
          onChange={handleWrite}
        >
          <option value="">카테고리</option>
          {categories.map((c) => (
            <option key={c.categoryNo} value={c.categoryNo}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          내용<span style={writeStyles.req}>*</span>
        </label>
        <textarea
          style={writeStyles.textarea}
          name="boardContent"
          placeholder="내용"
          value={form.boardContent}
          onChange={handleWrite}
        />
      </div>

      <div style={writeStyles.fileRow}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileWrite}
        />
        <span style={writeStyles.fileName}>{fileName}</span>
        <button
          style={styles.button}
          onClick={() => fileInputRef.current.click()}
        >
          첨부 사진
        </button>
      </div>

      <div style={writeStyles.actions}>
        <button style={writeStyles.btnList} onClick={() => navigate("/board")}>
          목록으로
        </button>
        <button
          style={writeStyles.btnSubmit}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
