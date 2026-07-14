import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { detailStyles as s } from "./NoticeDetail.styles";
import api from "../api/axios";
import { useAlertify } from "../hooks/useAlertify";

const NoticeDetail = () => {
  const { noticeNo } = useParams();
  const { user } = useAuth();
  const navi = useNavigate();

  const [noticeDetail, setNoticeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const { success, error } = useAlertify();

  const findNoticeDetail = async () => {
    try {
      const result = await api.get(`/notices/${noticeNo}`);

      if (result.data?.data) {
        setNoticeDetail(result.data.data);
        console.log(result.data.data);
      }
    } catch (err) {
      console.error("공지사항 조회 실패:", err);
      error("공지사항을 불러오지 못했습니다.");
    }
  };

  const handleDeleteNotice = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await api.delete(`/notices/${noticeNo}`);

      success("삭제되었습니다.");
      navi("/notice");
    } catch (err) {
      console.error("공지사항 삭제 실패:", err);
      error("삭제 실패");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await findNoticeDetail();
      setLoading(false);
    };

    fetchData();
  }, [noticeNo]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!noticeDetail) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={s.container}>
      {/* 상단 */}
      <div style={s.topRow}>
        <h2 style={s.pageTitle}>공지사항</h2>

        <div style={s.topBtns}>
          <button style={s.btnEdit} onClick={() => navi("/notice")}>
            목록
          </button>
        </div>
      </div>

      {/* 제목 */}
      <p style={s.postTitle}>[공지사항]{noticeDetail.noticeTitle}</p>

      {/* 작성 정보 */}
      <div style={s.meta}>
        <span style={s.metaWriter}>{noticeDetail.memberName}</span>

        <span style={s.metaDot}>작성일</span>

        <span style={s.metaDate}>{noticeDetail.createDate}</span>

        <span
          style={{
            marginLeft: "auto",
            fontSize: "13px",
            color: "#999",
          }}
        >
          조회수 : {noticeDetail.noticeCount}
        </span>
      </div>

      {/* 이미지 */}
      {noticeDetail.noticeImages?.length > 0 &&
        noticeDetail.noticeImages.map((img) => (
          <img
            key={img.imgOrder}
            src={`http://localhost${img.imgPath}${img.saveName}`}
            alt={img.originalName}
            style={s.postImg}
          />
        ))}

      {/* 본문 */}
      <div style={s.postBody}>
        <p>{noticeDetail.noticeContent}</p>
      </div>
    </div>
  );
};

export default NoticeDetail;
