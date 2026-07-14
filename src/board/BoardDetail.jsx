import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { detailStyles as s } from "./BoardDetail.styles";
import Board from "./Board";
import api from "../api/axios";
import { writeStyles } from "./BoardWrite.styles";
import { useAlertify } from "../hooks/useAlertify";
import defaultImg from "../assets/unknown.png";

const BoardDetail = () => {
  const { user } = useAuth();
  const { boardNo } = useParams();
  const { commentNo } = useParams();
  const navi = useNavigate();
  const [comment, setComment] = useState("");
  const [boardDetail, setBoardDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("");
  const [reaction, setReaction] = useState({
    likeCount: 0,
    dislikeCount: 0,
  });
  const { success, error } = useAlertify();
  const [editingCommentNo, setEditingCommentNo] = useState(null);
  const [editComment, setEditComment] = useState("");

  const boardLike = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post(`/boards/${boardNo}/like`);
      await findBoardReaction();
      success("좋아요 설정에 성공하였습니다.");
    } catch (err) {
      error("좋아요 설정에 실패하였습니다.");
    }
  };

  const boardDislike = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post(`/boards/${boardNo}/dislike`);
      await findBoardReaction();
      success("싫어요 설정에 성공하였습니다.");
    } catch (err) {
      error("싫어요 설정에 실패하였습니다.");
    }
  };

  const findBoardDetail = async () => {
    try {
      const result = await api.get(`/boards/${boardNo}`);

      if (result.data?.data) {
        setBoardDetail(result.data.data);
        console.log(result);
      }
    } catch (err) {
      console.error("게시글 로딩 실패:", err);
    }
  };

  const findBoardReaction = async () => {
    try {
      const result = await api.get(`/boards/${boardNo}/reactions`);

      console.log(result.data.data);

      if (result.data?.data) {
        setReaction(result.data.data);
      }
    } catch (err) {
      console.error("좋아요 조회 실패:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await api.post(`/boards/${boardNo}/comments`, {
        commentContent: comment,
      });

      setComment("");

      await findCommentList();
      success("댓글 작성에 성공하였습니다.");
    } catch (err) {
      console.error("댓글 작성 실패:", err.response?.data);
      error("댓글 작성에 실패했습니다.");
    }
  };

  const findCommentList = async () => {
    try {
      const result = await api.get(`/boards/${boardNo}/comments`);
      console.log(result);
      if (result.data?.data) {
        setComments(result.data.data);
      }
    } catch (err) {
      error("댓글 조회 실패");
    }
  };

  const handleEditBoard = () => {
    if (!user) {
      error("로그인이 필요합니다.");
      navi("/login");
      return;
    }

    if (user?.memberName !== boardDetail.memberName) {
      error("작성자만 수정이 가능합니다.");
      return;
    }

    navi(`/board/${boardNo}/edit`);
  };

  const handleDeleteComment = async (commentNo) => {
    try {
      const result = await api.delete(
        `/boards/${boardNo}/comments/${commentNo}`,
      );

      await findCommentList();
      success("댓글 삭제에 성공하였습니다.");
    } catch (err) {
      error("댓글 삭제 실패");
    }
  };

  const handleEditCommentOpen = (commentNo, content) => {
    setEditingCommentNo(commentNo);
    setEditComment(content);
  };

  const handleEditComment = async (commentNo) => {
    try {
      const result = await api.patch(
        `/boards/${boardNo}/comments/${commentNo}`,
        { commentContent: editComment },
      );
      await findCommentList();
      success("댓글 수정에 성공하였습니다.");
      setEditingCommentNo(null);
      setEditComment("");
    } catch (err) {
      error("댓글 수정 실패");
    }
  };

  const handleToggleCommentLike = async (commentNo) => {
    try {
      const target = comments.find((c) => c.commentNo === commentNo);

      if (target.liked) {
        await api.delete(`/boards/${boardNo}/comments/${commentNo}/like`);
        error("좋아요 취소에 성공하였습니다!");
      } else {
        await api.post(`/boards/${boardNo}/comments/${commentNo}/like`);
        success("좋아요 추가에 성공하였습니다!");
      }

      setComments((prev) =>
        prev.map((c) =>
          c.commentNo === commentNo
            ? {
                ...c,
                liked: !c.liked,
                commentLikeCount: c.liked
                  ? c.commentLikeCount - 1
                  : c.commentLikeCount + 1,
              }
            : c,
        ),
      );
    } catch (err) {
      error("좋아요 설정에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        findBoardDetail(),
        findBoardReaction(),
        findCommentList(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [boardNo]);

  const handleDeleteBoard = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    api
      .delete(`/boards/${boardNo}`, {
        withCredentials: true, // JWT 쿠키 or Authorization 헤더 사용 시
      })
      .then(() => navi("/board"))
      .catch((err) => error("삭제 실패:", err));
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
        <div style={s.topBtns}>
          <button style={s.btnEdit} onClick={() => navi(`/board/`)}>
            목록
          </button>
          {Number(user?.memberNo) === Number(boardDetail.memberNo) && (
            <>
              <button
                style={s.btnEdit}
                onClick={() => navi(`/board/${boardNo}/edit`)}
              >
                수정
              </button>
              <button style={s.btnDel} onClick={handleDeleteBoard}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 게시글 제목 */}
      <p style={s.postTitle}>
        [{boardDetail.categoryName}] {boardDetail.boardTitle}
      </p>

      {/* 작성자 */}
      <div style={s.meta}>
        <span style={s.metaWriter}>{boardDetail.memberName}</span>
        <span style={s.metaDot}>작성일</span>
        <span style={s.metaDate}>{boardDetail.createDate}</span>
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
        <img />
      )}

      {/* 본문 */}
      <div style={s.postBody}>
        <p>{boardDetail.boardContent}</p>
      </div>

      {/* 좋아요/싫어요 */}
      <div style={s.likeRow}>
        <button style={s.btnLike} onClick={boardLike}>
          좋아요 ({reaction.boardLike})
        </button>
        <button style={s.btnDislike} onClick={boardDislike}>
          싫어요 ({reaction.boardDislike})
        </button>
      </div>

      <hr style={s.divider} />

      {/* 댓글 목록 */}
      {comments.map((c) => (
        <div key={c.commentNo} style={s.comment}>
          <div style={s.commentHeader}>
            <img
              src={
                c.imgPath && c.saveName
                  ? `http://localhost${c.imgPath}${c.saveName}`
                  : defaultImg
              }
              alt="profile"
              style={s.cAvatar}
            />
            <span style={s.cName}>{c.memberName}</span>
            <span style={s.cCount}>{c.commentLikeCount}</span>
            {/* 좋아요 아이콘 */}
            <span
              style={{
                ...s.cThumb,
                cursor: "pointer",
                color: c.liked ? "#3b82f6" : undefined,
              }}
              onClick={() => handleToggleCommentLike(c.commentNo)}
            >
              👍
            </span>

            {Number(user?.memberNo) === Number(c.memberNo) && (
              <div style={s.cActions}>
                <button
                  style={s.cBtnEdit}
                  onClick={() =>
                    handleEditCommentOpen(c.commentNo, c.commentContent)
                  }
                >
                  수정
                </button>
                <button
                  style={s.cBtnDel}
                  onClick={() => handleDeleteComment(c.commentNo)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div style={s.cBody}>{c.commentContent}</div>
        </div>
      ))}
      {/* 댓글 수정 */}
      {editingCommentNo && (
        <div style={s.inputArea}>
          <div style={s.cInputHeader}>
            <img
              src={
                user?.delYn === "N" && user?.imgPath && user?.saveName
                  ? `http://localhost${user.imgPath}${user.saveName}`
                  : defaultImg
              }
              alt="profile"
              style={s.cAvatar}
            />

            <span style={s.cName}>{currentUser}</span>
          </div>

          <textarea
            style={s.cTextarea}
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />

          <div style={s.cSubmitRow}>
            <button
              style={s.btnSubmit}
              onClick={() => handleEditComment(editingCommentNo)}
            >
              수정 완료
            </button>
            <button
              style={s.btnDel}
              onClick={() => {
                setEditingCommentNo(null);
                setEditComment("");
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
      {/* 댓글 입력 */}
      <div style={s.inputArea}>
        <div style={s.cInputHeader}>
          <img
            src={
              user?.delYn === "N" && user?.imgPath && user?.saveName
                ? `http://localhost${user.imgPath}${user.saveName}`
                : defaultImg
            }
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
