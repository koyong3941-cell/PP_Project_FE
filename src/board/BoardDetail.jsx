import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { detailStyles as s } from "./BoardDetail.styles";
import axios from "axios";
import Board from "./Board";

const BoardDetail = () => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [boardDetail, setBoardDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        writer: currentUser,
        body: comment,
        date: "방금",
        likes: 0,
        isMine: true,
        liked: false,
      },
    ]);
    setComment("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };
  const handleToggleCommentLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c,
      ),
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost/api/boards/${boardNo}`)
      .then((result) => {
        if (result.data && result.data.data) {
          setBoardDetail(result.data.data);
        }
      })
      .catch((err) => console.error("게시글 로딩 실패:", err))
      .finally(() => setLoading(false));
  }, [boardNo]);

  const handleDeleteBoard = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    axios
      .delete(`http://localhost/api/boards/${boardNo}`, {
        withCredentials: true, // JWT 쿠키 or Authorization 헤더 사용 시
      })
      .then(() => navigate("/board"))
      .catch((err) => console.error("삭제 실패:", err));
  };
  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!boardDetail) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <div style={s.container}>
      {/* 상단 */}
      <div style={s.topRow}>
        <h2 style={s.pageTitle}>자유게시판</h2>
        <div style={s.topBtns}>
          <button
            style={s.btnEdit}
            onClick={() => navigate(`/board/${boardNo}/edit`)}
          >
            수정
          </button>
          <button style={s.btnDel} onClick={handleDeleteBoard}>
            삭제
          </button>
        </div>
      </div>

      {/* 게시글 제목 */}
      <p style={s.postTitle}>{boardDetail.boardTitle}</p>

      {/* 작성자 */}
      <div style={s.meta}>
        <span style={s.metaWriter}>{boardDetail.memberId}</span>
        <span style={s.metaDot}>·</span>
        <span style={s.metaDate}>{boardDetail.createdAt}</span>
        <span style={{ marginLeft: "auto", fontSize: "13px", color: "#999" }}>
          조회수: {boardDetail.count}
        </span>
      </div>
      {/* 이미지 */}
      {boardDetail.boardImages?.length > 0 ? (
        boardDetail.boardImages.map((img) => (
          <img
            key={img.imgOrder}
            src={`http://localhost${img.imgPath}${img.saveName}`}
            alt={img.originalName}
            style={s.postImg}
          />
        ))
      ) : (
        <img
          src="https://placehold.co/400x250"
          alt="기본이미지"
          style={s.postImg}
        />
      )}

      {/* 본문 */}
      <div style={s.postBody}>
        <p>{boardDetail.boardContent}</p>
      </div>

      {/* 좋아요/싫어요 */}
      <div style={s.likeRow}>
        <button style={s.btnLike}>좋아요 (0)</button>
        <button style={s.btnDislike}>싫어요 (0)</button>
      </div>

      <hr style={s.divider} />

      {/* 댓글 목록 */}
      {comments.map((c) => (
        <div key={c.id} style={s.comment}>
          <div style={s.commentHeader}>
            <img
              src={boardDetail.writer || "https://placehold.co/28x28"}
              alt="profile"
              style={s.cAvatar}
            />
            <span style={s.cName}>{c.writer}</span>
            <span style={s.cCount}>{c.likes}</span>
            {/* 좋아요 아이콘 */}
            <span
              style={{
                ...s.cThumb,
                cursor: "pointer",
                color: c.liked ? "#3b82f6" : undefined, // 눌렀을 때 색 강조 (선택사항)
              }}
              onClick={() => handleToggleCommentLike(c.id)}
            >
              👍
            </span>
            {c.isMine && (
              <div style={s.cActions}>
                <button style={s.cBtnEdit}>수정</button>
                <button
                  style={s.cBtnDel}
                  onClick={() => handleDeleteComment(c.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div style={s.cBody}>{c.body}</div>
        </div>
      ))}

      {/* 댓글 입력 */}
      <div style={s.inputArea}>
        <div style={s.cInputHeader}>
          <img
            src="https://placehold.co/28x28"
            alt="profile"
            style={s.cAvatar}
          />
          <span style={s.cName}>{currentUser}</span>
        </div>

        <textarea
          style={s.cTextarea}
          placeholder="작성할 댓글을 입력합니다"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div style={s.cSubmitRow}>
          <button style={s.btnSubmit} onClick={handleCommentSubmit}>
            댓글 달기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
