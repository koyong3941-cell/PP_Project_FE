import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Wrapper,
  StateBox,
  TopSection,
  ImageBox,
  InfoCol,
  Eyebrow,
  PlantName,
  StatRow,
  StatChip,
  InfoList,
  InfoListItem,
  Section,
  SectionTitle,
  CareBox,
  EmptyReviewBox,
  EmptyReviewTitle,
  EmptyReviewHint,
  RatingSummary,
  SummaryCol,
  SummaryLabel,
  AverageBlock,
  StarRow,
  BarList,
  BarRow,
  BarTrack,
  BarFill,
  WriteReviewButton,
  WriteReviewWideButton,
  ReviewFormBox,
  ReviewFormHeader,
  CancelButton,
  SubmitReviewButton,
  RatingFieldLabel,
  StarPicker,
  FormTitleInput,
  FormContentTextarea,
  FormImageRow,
  FormImageThumb,
  RemoveImageButton,
  AddImageButton,
  ReviewCountTitle,
  ReviewList,
  ReviewCard,
  ReviewHead,
  ReviewerInfo,
  Nickname,
  ReviewDate,
  MyReviewTag,
  ReviewTitle,
  ReviewContent,
  ReviewImageRow,
  ReviewImage,
  ReviewFooter,
  ReviewFooterLeft,
  LikeBadge,
  EditButton,
  ReviewDeleteButton,
  Pagination,
  PageButton,
  AddPlantSection,
  AddPlantHeader,
  AddPlantHint,
  SizeGrid,
  SizeCol,
  SizeLabel,
  SizeMeta,
  SizeInputRow,
  SizeInput,
  SizeUnit,
  AddPlantActions,
  AddPlantButton,
  ChangeButton,
  DeleteButton,
} from "./PlantDetail.styles1_2";
import { useAlertify } from "../hooks/useAlertify";

/**
 * 실제 DTO 기준
 *
 * PlantDto
 *  - plantNo, memberNo, plantName, classification, count,
 *    carbonCapture, createDate, plantInfo, growthInfo, plantApi, delYn
 *  - plantImages: [{ imgPath, saveName, ... }]  (이미지 상세 응답에 포함된다고 가정)
 *
 * PlantRatingDto
 *  - totalRating: number        // 전체 리뷰 개수
 *  - averageRating: number      // 평균 별점 (5점 만점으로 가정)
 *  - one, two, three, four, five: number   // 별점 구간별 개수
 *  - hasMyReview: boolean       // 로그인한 회원이 이미 리뷰를 작성했는지
 *
 * PlantReviewDto (rating: 1~10, 반점 단위 → 화면 표시는 rating / 2)
 *  - reviewNo, memberNo, plantNo, rating, reviewTitle, reviewContent,
 *    createDate, delYn, memberName, likeCount, isLiked,
 *    plantReviewImages: PlantReviewImgDto[]
 *
 * PlantReviewImgDto
 *  - imgNo, reviewNo, originalName, saveName, imgPath, imgOrder, createDate, delYn
 *
 * PageResponse<T>
 *  - content, page, size, totalPages, totalElements
 */

const SIZE_META = [
  { key: "small", label: "소", range: "0~10cm" },
  { key: "middle", label: "중", range: "10~20cm" },
  { key: "big", label: "대", range: "20~30cm" },
];
const IMG_HOST = "http://localhost";
const STAR_KEYS = ["five", "four", "three", "two", "one"];
const STAR_LABEL = { five: 5, four: 4, three: 3, two: 2, one: 1 };

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// rating 필드는 1~10 (0.5점 단위) 이므로 5점 만점으로 환산
function toFiveScale(rating) {
  return (rating ?? 0) / 2;
}

function Stars({ value = 0 }) {
  const rounded = Math.round(value);
  return (
    <StarRow>
      {[5, 4, 3, 2, 1].map((n) => (
        <span key={n}>{n <= rounded ? "★" : "☆"}</span>
      ))}
    </StarRow>
  );
}

function toLines(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function reviewImageSrc(img) {
  const path = img?.imgPath || "/uploads/plant/";
  const name = img?.saveName || "plant.png";
  return `${IMG_HOST}${path}${name}`;
}

export default function PlantDetail1() {
  const { user } = useAuth();
  const { success, error } = useAlertify();
  // 로그인한 사용자의 memberNo는 useAuth()의 user.memberNo로 판단합니다.
  const [ownedSizes, setOwnedSizes] = useState(null); // null = 아직 미보유
  const [sizeInputs, setSizeInputs] = useState({
    small: "",
    middle: "",
    big: "",
  });
  const [isEditingOwned, setIsEditingOwned] = useState(false);
  const [savingOwned, setSavingOwned] = useState(false);
  const handleSizeInputChange = (key, value) => {
    const onlyDigits = value.replace(/[^0-9]/g, "");
    setSizeInputs((prev) => ({ ...prev, [key]: onlyDigits }));
  };
  const { plantNo } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const handleAddPlant = async () => {
    setSavingOwned(true);
    try {
      const res = await api.post(
        `/members/${user.memberNo}/plants/${plantNo}`,
        buildSizePayload(),
      );
      setOwnedSizes(res.data?.data ?? buildSizePayload());
      setIsEditingOwned(false);
    } catch (err) {
      console.log(err.response);
      alert("식물 추가에 실패했습니다.");
    } finally {
      setSavingOwned(false);
    }
  };
  const [rating, setRating] = useState(null);
  const handleUpdatePlant = async () => {
    setSavingOwned(true);
    try {
      const res = await api.patch(
        `/members/${user.memberNo}/plants/${plantNo}`,
        buildSizePayload(),
      );
      setOwnedSizes(res.data?.data ?? buildSizePayload());
      setIsEditingOwned(false);
    } catch (err) {
      alert("변경에 실패했습니다.");
    } finally {
      setSavingOwned(false);
    }
  };
  const buildSizePayload = () => ({
    smallPlant: Number(sizeInputs.small) || 0,
    middlePlant: Number(sizeInputs.middle) || 0,
    bigPlant: Number(sizeInputs.big) || 0,
  });

  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(true);

  // 리뷰 작성 / 수정 폼
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewNo, setEditingReviewNo] = useState(null);
  const [formRating, setFormRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImages, setFormImages] = useState([]); // { file?, preview, existing?, imgNo? }
  const [submittingReview, setSubmittingReview] = useState(false);

  const resetReviewForm = () => {
    setFormRating(0);
    setFormTitle("");
    setFormContent("");
    setFormImages([]);
    setEditingReviewNo(null);
  };

  const openNewReviewForm = () => {
    resetReviewForm();
    setShowReviewForm(true);
  };

  const openEditReviewForm = (review) => {
    setEditingReviewNo(review.reviewNo);
    setFormRating(toFiveScale(review.rating));
    setFormTitle(review.reviewTitle ?? "");
    setFormContent(review.reviewContent ?? "");
    setFormImages(
      (review.plantReviewImages ?? []).map((img) => ({
        preview: reviewImageSrc(img),
        existing: true,
        imgNo: img.imgNo,
      })),
    );
    setShowReviewForm(true);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    resetReviewForm();
  };

  const handleFormImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const next = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    }));
    setFormImages((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const handleRemoveFormImage = (index) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    formRating > 0 &&
    formTitle.trim().length > 0 &&
    formContent.trim().length > 0;

  const handleSubmitReview = async () => {
    if (!isFormValid || submittingReview) return;
    setSubmittingReview(true);
    try {
      const payload = new FormData();
      payload.append("rating", String(Math.round(formRating * 2)));
      payload.append("reviewTitle", formTitle.trim());
      payload.append("reviewContent", formContent.trim());
      formImages
        .filter((img) => !img.existing)
        .forEach((img) => payload.append("images", img.file));

      if (editingReviewNo) {
        await api.patch(
          `/plants/${plantNo}/reviews/${editingReviewNo}`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        success?.("리뷰를 수정했어요.");
      } else {
        await api.post(`/plants/${plantNo}/reviews`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        success?.("리뷰를 등록했어요.");
      }
      closeReviewForm();
      fetchReviews(reviewPage);
      const ratingRes = await api.get(`/plants/${plantNo}/reviews/rating`);
      setRating(ratingRes.data?.data ?? null);
    } catch (err) {
      error?.("리뷰 저장에 실패했습니다.");
    } finally {
      setSubmittingReview(false);
    }
  };

  // 삭제 중인 리뷰 번호 (버튼 disabled 처리용)
  const [deletingReviewNo, setDeletingReviewNo] = useState(null);

  const handleDeleteReview = async (reviewNo) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;
    setDeletingReviewNo(reviewNo);
    try {
      await api.delete(`/api/plants/${plantNo}/reviews/${reviewNo}`);
      success?.("리뷰를 삭제했어요.");
      if (editingReviewNo === reviewNo) {
        closeReviewForm();
      }
      fetchReviews(reviewPage);
      const ratingRes = await api.get(`/plants/${plantNo}/reviews/rating`);
      setRating(ratingRes.data?.data ?? null);
    } catch (err) {
      error?.("리뷰 삭제에 실패했습니다.");
    } finally {
      setDeletingReviewNo(null);
    }
  };

  // 좋아요 토글 (타인 리뷰에서만 사용)
  const handleToggleLike = async (reviewNo) => {
    try {
      const res = await api.post(`/plants/${plantNo}/reviews/${reviewNo}/like`);
      const { isLiked, likeCount } = res.data?.data ?? {};
      setReviews((prev) =>
        prev.map((r) =>
          r.reviewNo === reviewNo
            ? {
                ...r,
                isLiked: isLiked ?? !r.isLiked,
                likeCount: likeCount ?? r.likeCount,
              }
            : r,
        ),
      );
    } catch (err) {
      error?.("좋아요 처리에 실패했습니다.");
    }
  };

  const handleDeletePlant = async () => {
    if (!window.confirm("보유한 식물 정보를 삭제할까요?")) return;
    setSavingOwned(true);
    try {
      await api.delete(`/members/${user.memberNo}/plants/${plantNo}`);
      setOwnedSizes(null);
      setSizeInputs({ small: "", middle: "", big: "" });
      setIsEditingOwned(false);
    } catch (err) {
      alert("삭제에 실패했습니다.");
    } finally {
      setSavingOwned(false);
    }
  };
  // 보유 식물 정보
  useEffect(() => {
    let ignore = false;
    async function fetchOwned() {
      if (!user?.memberNo) return; // 로그인 안 했으면 조회 스킵
      try {
        const res = await api.get(
          `/members/${user.memberNo}/plants/${plantNo}`,
        );
        const data = res.data?.data;
        if (ignore || !data) return;
        setOwnedSizes(data);
        setSizeInputs({
          small: String(data.smallPlant ?? 0),
          middle: String(data.middlePlant ?? 0),
          big: String(data.bigPlant ?? 0),
        });
      } catch (err) {
        if (err.response?.status === 404) {
          setOwnedSizes(null);
        } else {
          console.error(err);
        }
      }
    }
    fetchOwned();
    return () => {
      ignore = true;
    };
  }, [plantNo, user?.memberNo]);
  // 식물 상세 + 평점 요약
  useEffect(() => {
    let ignore = false;

    async function fetchPlant() {
      setLoading(true);
      setLoadError(null);
      try {
        const [plantRes, ratingRes] = await Promise.all([
          api.get(`/plants/${plantNo}`),
          api.get(`/plants/${plantNo}/reviews/rating`),
        ]);
        if (ignore) return;
        setPlant(plantRes.data?.data ?? null);
        setRating(ratingRes.data?.data ?? null);
      } catch (err) {
        setLoadError("식물 정보를 불러오지 못했습니다.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPlant();
    return () => {
      ignore = true;
    };
  }, [plantNo]);

  // 리뷰 목록 (페이지네이션)
  const fetchReviews = useCallback(
    async (page) => {
      setReviewLoading(true);
      try {
        const res = await api.get(`/plants/${plantNo}/reviews`, {
          params: { page },
        });
        const data = res.data?.data;
        setReviews(data?.content ?? []);
        setTotalPages(data?.totalPages ?? 0);
        setTotalReviewCount(data?.totalElements ?? data?.content?.length ?? 0);
      } catch (err) {
        setReviews([]);
        setTotalReviewCount(0);
      } finally {
        setReviewLoading(false);
      }
    },
    [plantNo],
  );

  useEffect(() => {
    fetchReviews(reviewPage);
  }, [fetchReviews, reviewPage]);

  if (loading) {
    return (
      <Wrapper>
        <StateBox>불러오는 중입니다...</StateBox>
      </Wrapper>
    );
  }

  if (loadError || !plant) {
    return (
      <Wrapper>
        <StateBox>{loadError ?? "식물 정보를 찾을 수 없습니다."}</StateBox>
      </Wrapper>
    );
  }

  const infoLines = toLines(plant.plantInfo);
  const careLines = toLines(plant.growthInfo);

  const barCounts = STAR_KEYS.map((key) => rating?.[key] ?? 0);
  const maxBarCount = Math.max(1, ...barCounts);
  const hasReviews = (rating?.totalRating ?? 0) > 0;

  const coverImage = plant.plantImages?.[0]
    ? `${IMG_HOST}${plant.plantImages[0].imgPath || "/uploads/plant/"}${
        plant.plantImages[0].saveName || "plant.png"
      }`
    : `${IMG_HOST}/uploads/plant/plant.png`;

  return (
    <Wrapper>
      {/* ---------------- 상단: 이미지 + 기본 정보 ---------------- */}
      <TopSection>
        <ImageBox>
          <img src={coverImage} alt={plant.plantName} />
        </ImageBox>

        <InfoCol>
          <Eyebrow>{plant.classification || "식물 도감"}</Eyebrow>
          <PlantName>{plant.plantName}</PlantName>

          <StatRow>
            <StatChip>
              <span>분류</span>
              <span>{plant.classification || "-"}</span>
            </StatChip>
            <StatChip>
              <span>조회수</span>
              <span>{plant.count ?? 0}개</span>
            </StatChip>
            <StatChip>
              <span>탄소 흡수량</span>
              <span>{plant.carbonCapture ?? 0}g</span>
            </StatChip>
            <StatChip>
              <span>등록일</span>
              <span>{formatDate(plant.createDate)}</span>
            </StatChip>
          </StatRow>

          {infoLines.length > 0 && (
            <InfoList>
              {infoLines.map((line, idx) => (
                <InfoListItem key={idx}>{line}</InfoListItem>
              ))}
            </InfoList>
          )}
        </InfoCol>
      </TopSection>

      {/* ---------------- 재배 및 유지 관리 ---------------- */}
      {careLines.length > 0 && (
        <Section>
          <SectionTitle>재배 및 유지 관리</SectionTitle>
          <CareBox>
            <InfoList>
              {careLines.map((line, idx) => (
                <InfoListItem key={idx}>{line}</InfoListItem>
              ))}
            </InfoList>
          </CareBox>
        </Section>
      )}

      {/* ---------------- 식물 추가하기 / 추가됨 ---------------- */}
      <AddPlantSection>
        <AddPlantHeader>
          {ownedSizes ? "식물 추가됨" : "식물 추가하기"}
        </AddPlantHeader>
        <AddPlantHint>
          {ownedSizes
            ? "보유하신 식물 수량을 확인하거나 수정할 수 있어요."
            : "해당 식물을 소유하고 있다면 추가해 보세요."}
        </AddPlantHint>

        <SizeGrid>
          {SIZE_META.map(({ key, label, range }) => (
            <SizeCol key={key}>
              <SizeLabel>{label}</SizeLabel>
              <SizeMeta>크기 {range}</SizeMeta>
              <SizeInputRow>
                <SizeInput
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="0"
                  value={sizeInputs[key]}
                  onChange={(e) => handleSizeInputChange(key, e.target.value)}
                  disabled={savingOwned || (ownedSizes && !isEditingOwned)}
                />
                <SizeUnit>개</SizeUnit>
              </SizeInputRow>
            </SizeCol>
          ))}

          <AddPlantActions>
            {!ownedSizes && (
              <AddPlantButton onClick={handleAddPlant} disabled={savingOwned}>
                추가하기
              </AddPlantButton>
            )}

            {ownedSizes && !isEditingOwned && (
              <>
                <ChangeButton
                  onClick={() => setIsEditingOwned(true)}
                  disabled={savingOwned}
                >
                  변경하기
                </ChangeButton>
                <DeleteButton
                  onClick={handleDeletePlant}
                  disabled={savingOwned}
                >
                  삭제하기
                </DeleteButton>
              </>
            )}

            {ownedSizes && isEditingOwned && (
              <AddPlantButton
                onClick={handleUpdatePlant}
                disabled={savingOwned}
              >
                저장하기
              </AddPlantButton>
            )}
          </AddPlantActions>
        </SizeGrid>
      </AddPlantSection>

      {/* ---------------- 평점 & 리뷰 ---------------- */}
      <Section>
        {!hasReviews && !showReviewForm && (
          /* 리뷰가 하나도 없을 때: 중앙 정렬 안내 박스 */
          <EmptyReviewBox>
            <EmptyReviewTitle>평점 & 리뷰</EmptyReviewTitle>
            <EmptyReviewHint>
              아직 등록된 리뷰가 없어요. 첫 리뷰를 남겨보세요.
            </EmptyReviewHint>
            <WriteReviewButton onClick={openNewReviewForm}>
              리뷰 작성하기
            </WriteReviewButton>
          </EmptyReviewBox>
        )}

        {(hasReviews || showReviewForm) && (
          <>
            {hasReviews && (
              <>
                <SectionTitle>
                  평점 & 리뷰 ({rating?.totalRating ?? 0})
                </SectionTitle>

                <RatingSummary>
                  <SummaryCol>
                    <SummaryLabel>Summary</SummaryLabel>
                    <BarList>
                      {STAR_KEYS.map((key, idx) => {
                        const cnt = barCounts[idx];
                        const percent = (cnt / maxBarCount) * 100;
                        return (
                          <BarRow key={key}>
                            <span>{STAR_LABEL[key]}</span>
                            <BarTrack>
                              <BarFill $percent={percent} />
                            </BarTrack>
                            <span>{cnt}</span>
                          </BarRow>
                        );
                      })}
                    </BarList>
                  </SummaryCol>

                  <AverageBlock>
                    <strong>{(rating?.averageRating ?? 0).toFixed(1)}</strong>
                    <span>{rating?.totalRating ?? 0} Reviews</span>
                  </AverageBlock>
                </RatingSummary>
              </>
            )}

            {showReviewForm ? (
              /* ---------------- 리뷰 작성 / 수정 폼 ---------------- */
              <ReviewFormBox>
                <ReviewFormHeader>
                  <CancelButton onClick={closeReviewForm}>
                    취소하기
                  </CancelButton>
                  <SubmitReviewButton
                    type="button"
                    $active={isFormValid}
                    disabled={!isFormValid || submittingReview}
                    onClick={handleSubmitReview}
                  >
                    작성하기
                  </SubmitReviewButton>
                </ReviewFormHeader>

                <RatingFieldLabel>평점:</RatingFieldLabel>
                <StarPicker>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} onClick={() => setFormRating(n)}>
                      {n <= formRating ? "★" : "☆"}
                    </span>
                  ))}
                </StarPicker>

                <FormTitleInput
                  placeholder="제목"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
                <FormContentTextarea
                  placeholder="리뷰 내용"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />

                <FormImageRow>
                  {formImages.map((img, idx) => (
                    <FormImageThumb key={img.imgNo ?? img.preview ?? idx}>
                      <img src={img.preview} alt={`review-${idx}`} />
                      <RemoveImageButton
                        type="button"
                        onClick={() => handleRemoveFormImage(idx)}
                      >
                        ×
                      </RemoveImageButton>
                    </FormImageThumb>
                  ))}
                  <AddImageButton>
                    +
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFormImageChange}
                    />
                  </AddImageButton>
                </FormImageRow>
              </ReviewFormBox>
            ) : (
              hasReviews && (
                <WriteReviewWideButton
                  disabled={rating?.hasMyReview}
                  onClick={openNewReviewForm}
                >
                  {rating?.hasMyReview
                    ? "이미 리뷰를 작성했어요"
                    : "리뷰 남기기"}
                </WriteReviewWideButton>
              )
            )}

            {/* ---------------- 리뷰 목록 ---------------- */}
            {hasReviews && (
              <ReviewCountTitle>리뷰({totalReviewCount})</ReviewCountTitle>
            )}

            {hasReviews && reviewLoading ? (
              <StateBox>리뷰를 불러오는 중입니다...</StateBox>
            ) : hasReviews && reviews.length === 0 ? (
              <StateBox>아직 작성된 리뷰가 없습니다.</StateBox>
            ) : hasReviews ? (
              <ReviewList>
                {reviews.map((review) => {
                  const myMemberNo = user?.memberNo;
                  const isMine =
                    myMemberNo != null && review.memberNo === myMemberNo;
                  return (
                    <ReviewCard key={review.reviewNo}>
                      <ReviewHead>
                        <ReviewerInfo>
                          <Nickname>{review.memberName || "익명"}</Nickname>
                          <ReviewDate>
                            {formatDate(review.createDate)}
                          </ReviewDate>
                          {isMine && <MyReviewTag>내 리뷰</MyReviewTag>}
                        </ReviewerInfo>
                        <Stars value={toFiveScale(review.rating)} />
                      </ReviewHead>

                      <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                      <ReviewContent>{review.reviewContent}</ReviewContent>

                      {review.plantReviewImages?.length > 0 && (
                        <ReviewImageRow>
                          {review.plantReviewImages.map((img, index) => (
                            <ReviewImage
                              key={img.imgNo ?? `${img.saveName}-${index}`}
                              src={reviewImageSrc(img)}
                              alt={img.originalName || "review-image"}
                            />
                          ))}
                        </ReviewImageRow>
                      )}

                      <ReviewFooter>
                        <ReviewFooterLeft>
                          {isMine && (
                            <>
                              <EditButton
                                onClick={() => openEditReviewForm(review)}
                              >
                                수정하기
                              </EditButton>
                              <ReviewDeleteButton
                                disabled={deletingReviewNo === review.reviewNo}
                                onClick={() =>
                                  handleDeleteReview(review.reviewNo)
                                }
                              >
                                삭제하기
                              </ReviewDeleteButton>
                            </>
                          )}
                        </ReviewFooterLeft>

                        {isMine ? (
                          // 내 리뷰: 좋아요 개수만 표시 (클릭 불가)
                          <LikeBadge>♥ {review.likeCount ?? 0}</LikeBadge>
                        ) : (
                          // 타인 리뷰: 좋아요 버튼 + 개수 (클릭해서 토글)
                          <LikeBadge
                            as="button"
                            type="button"
                            $liked={review.isLiked}
                            onClick={() => handleToggleLike(review.reviewNo)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            {review.isLiked ? "♥" : "♡"} {review.likeCount ?? 0}
                          </LikeBadge>
                        )}
                      </ReviewFooter>
                    </ReviewCard>
                  );
                })}
              </ReviewList>
            ) : null}

            {/* ---------------- 페이지네이션 ---------------- */}
            {hasReviews && totalPages > 1 && (
              <Pagination>
                <PageButton
                  disabled={reviewPage === 0}
                  onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                >
                  ‹
                </PageButton>
                {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
                  <PageButton
                    key={p}
                    $active={p === reviewPage}
                    onClick={() => setReviewPage(p)}
                  >
                    {p + 1}
                  </PageButton>
                ))}
                <PageButton
                  disabled={reviewPage >= totalPages - 1}
                  onClick={() =>
                    setReviewPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                >
                  ›
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </Section>
    </Wrapper>
  );
}
