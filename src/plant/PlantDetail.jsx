import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import {
  AddImageButton,
  AddPlantActions,
  AddPlantButton,
  AddPlantHeader,
  AddPlantHint,
  AddPlantSection,
  AverageBlock,
  BarFill,
  BarList,
  BarRow,
  BarTrack,
  CancelButton,
  CareBox,
  ChangeButton,
  DeleteButton,
  EditButton,
  EmptyReviewBox,
  EmptyReviewHint,
  EmptyReviewTitle,
  Eyebrow,
  FormContentTextarea,
  FormImageRow,
  FormImageThumb,
  FormTitleInput,
  ImageBox,
  InfoCol,
  InfoList,
  InfoListItem,
  LikeBadge,
  MyReviewTag,
  Nickname,
  PageButton,
  Pagination,
  PlantName,
  RatingFieldLabel,
  RatingSummary,
  RemoveImageButton,
  ReviewCard,
  ReviewContent,
  ReviewCountTitle,
  ReviewDate,
  ReviewDeleteButton,
  ReviewFooter,
  ReviewFooterLeft,
  ReviewFormBox,
  ReviewFormHeader,
  ReviewHead,
  ReviewImage,
  ReviewImageRow,
  ReviewList,
  ReviewTitle,
  ReviewerInfo,
  Section,
  SectionTitle,
  SizeCol,
  SizeGrid,
  SizeInput,
  SizeInputRow,
  SizeLabel,
  SizeMeta,
  SizeUnit,
  StarPicker,
  StarRow,
  StatChip,
  StatRow,
  StateBox,
  SubmitReviewButton,
  SummaryCol,
  SummaryLabel,
  TopSection,
  Wrapper,
  WriteReviewButton,
  WriteReviewWideButton,
} from "./PlantDetail.styles";

const SIZE_META = [
  { key: "small", label: "소", range: "0~10cm" },
  { key: "middle", label: "중", range: "10~20cm" },
  { key: "big", label: "대", range: "20~30cm" },
];
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
  if (!img?.imgPath || !img?.saveName) {
    return null;
  }
  return `${img.imgPath}${img.saveName}`;
}

export default function PlantDetail() {
  const { user } = useAuth();
  const { success, error } = useAlertify();
  const [ownedSizes, setOwnedSizes] = useState(null);
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

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewNo, setEditingReviewNo] = useState(null);
  const [formRating, setFormRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImages, setFormImages] = useState([]);
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
        .forEach((img) => payload.append("imageFiles", img.file));

      if (editingReviewNo) {
        const keepImgNos = formImages
          .filter((img) => img.existing)
          .map((img) => img.imgNo);

        keepImgNos.forEach((no) => payload.append("keepImgNos", no));
        payload.append("hasKeepImgNos", "true");

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

  const [deletingReviewNo, setDeletingReviewNo] = useState(null);

  const handleDeleteReview = async (reviewNo) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;
    setDeletingReviewNo(reviewNo);
    try {
      await api.delete(`/plants/${plantNo}/reviews/${reviewNo}`);
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

  const handleToggleLike = async (review) => {
    const { reviewNo, isLiked } = review;
    try {
      if (isLiked) {
        await api.delete(`/plants/${plantNo}/reviews/${reviewNo}/like`);
      } else {
        await api.post(`/plants/${plantNo}/reviews/${reviewNo}/like`);
      }
      setReviews((prev) =>
        prev.map((r) =>
          r.reviewNo === reviewNo
            ? {
                ...r,
                isLiked: !isLiked,
                likeCount: isLiked
                  ? Math.max(0, (r.likeCount ?? 0) - 1)
                  : (r.likeCount ?? 0) + 1,
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
  useEffect(() => {
    let ignore = false;
    async function fetchOwned() {
      if (!user?.memberNo) return;
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
    ? `${plant.plantImages[0].imgPath}${plant.plantImages[0].saveName}`
    : null;

  return (
    <Wrapper>
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

      <Section>
        {!hasReviews && !showReviewForm && (
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
                    <strong>
                      {(rating?.averageRating / 2 ?? 0).toFixed(1)}
                    </strong>
                    <span>{rating?.totalRating ?? 0} Reviews</span>
                  </AverageBlock>
                </RatingSummary>
              </>
            )}

            {showReviewForm ? (
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
                    myMemberNo != null &&
                    review.memberNo != null &&
                    Number(myMemberNo) === Number(review.memberNo);
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
                          <LikeBadge>♥ {review.likeCount ?? 0}</LikeBadge>
                        ) : (
                          <LikeBadge
                            as="button"
                            type="button"
                            $liked={review.isLiked}
                            onClick={() => handleToggleLike(review)}
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
