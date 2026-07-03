import { useNavigate } from "react-router-dom";
import { styles } from "./Board.styles";
import { writeStyles } from "./BoardWrite.styles";
import { useRef, useState } from "react";

const BoardChage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("첨부할 사진을 선택하세요");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    // TODO: API 연동
    navigate("/board");
  };

  return (
    <div style={writeStyles.container}>
      <p style={writeStyles.title}>게시글</p>
      <p style={writeStyles.sub}>수정</p>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          제목<span style={writeStyles.req}>*</span>
        </label>
        <input style={writeStyles.input} type="text" placeholder="제목" />
      </div>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          카테고리<span style={writeStyles.req}>*</span>
        </label>
        <select style={writeStyles.select}>
          <option value="">카테고리</option>
          <option>자유</option>
          <option>질문</option>
          <option>정보</option>
        </select>
      </div>

      <div style={writeStyles.formRow}>
        <label style={writeStyles.label}>
          내용<span style={writeStyles.req}>*</span>
        </label>
        <textarea style={writeStyles.textarea} placeholder="내용" />
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
        <button style={writeStyles.btnList} onClick={() => navigate("/board")}>
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
