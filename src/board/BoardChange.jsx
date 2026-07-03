import { useNavigate, useParams } from "react-router-dom";
import { styles } from "./Board.styles";
import { writeStyles } from "./BoardWrite.styles";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

const BoardChage = () => {
  const navigate = useNavigate();
  const { boardNo } = useParams();
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("첨부할 사진을 선택하세요");
  const [imageFile, setImageFile] = useState(null);

  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [categoryNo, setCategoryNo] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberNo, setMemberNo] = useState("");

  useEffect(() => {
    Promise.all([api.get("/boards/category"), api.get(`/boards/${boardNo}`)])
      .then(([categoryRes, boardRes]) => {
        const categoryList = categoryRes.data?.data ?? [];
        setCategories(categoryList);

        const board = boardRes.data?.data;
        if (board) {
          setBoardTitle(board.boardTitle ?? "");
          setBoardContent(board.boardContent ?? "");

          // boardDetail 응답엔 categoryName만 있으므로 이름으로 categoryNo를 찾음
          const matched = categoryList.find(
            (c) => c.categoryName === board.categoryName,
          );
          if (matched) setCategoryNo(matched.categoryNo);
        }
      })
      .catch((err) => console.error("게시글 로딩 실패:", err))
      .finally(() => setLoading(false));
  }, [boardNo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("boardTitle", boardTitle);
    formData.append("boardContent", boardContent);
    formData.append("categoryNo", categoryNo);
    formData.append("memberNo", memberNo);
    if (imageFile) {
      formData.append("imageFiles", imageFile);
    }

    api
      .patch(`/boards/${boardNo}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then(() => navigate(`/board/${boardNo}`))
      .catch((err) => {
        console.error(
          "수정 실패:",
          JSON.stringify(err.response?.data, null, 2),
        );
      });
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div style={writeStyles.container}>
      <p style={writeStyles.title}>게시글</p>
      <p style={writeStyles.sub}>수정</p>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          제목<span style={writeStyles.req}>*</span>
        </label>
        <input
          style={writeStyles.input}
          type="text"
          placeholder="제목"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          카테고리<span style={writeStyles.req}>*</span>
        </label>
        <select
          style={writeStyles.select}
          value={categoryNo}
          onChange={(e) => setCategoryNo(e.target.value)}
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
          placeholder="내용"
          value={boardContent}
          onChange={(e) => setBoardContent(e.target.value)}
        />
      </div>

      <div style={writeStyles.fileRow}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
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
        <button
          style={writeStyles.btnList}
          onClick={() => navigate(`/board/${boardNo}`)}
        >
          취소하기
        </button>
        <button style={writeStyles.btnSubmit} onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default BoardChage;
