import styled from "styled-components";

/* ------------------------------------------------------------------ */
/*  팔레트 / 톤                                                         */
/*  - Background : 따뜻한 아이보리                                       */
/*  - Primary    : 짙은 보태니컬 그린                                     */
/*  - Accent     : 앰버(별점/포인트)                                     */
/* ------------------------------------------------------------------ */

export const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 96px;
  color: #2b2b26;
  font-family:
    "Pretendard",
    "Apple SD Gothic Neo",
    -apple-system,
    sans-serif;
`;

export const StateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  color: #8a8578;
  font-size: 15px;
`;

/* ---------------------------- Header ------------------------------ */

export const TopSection = styled.section`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 40px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  background: #eef0e6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Eyebrow = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #3f6b4a;
  letter-spacing: 0.02em;
`;

export const PlantName = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #23291f;
`;

export const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StatChip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  background: #f1efe6;
  border-radius: 10px;
  min-width: 96px;

  span:first-child {
    font-size: 12px;
    color: #8a8578;
  }
  span:last-child {
    font-size: 15px;
    font-weight: 700;
    color: #2b2b26;
  }
`;

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoListItem = styled.li`
  position: relative;
  padding-left: 14px;
  font-size: 14.5px;
  line-height: 1.6;
  color: #444038;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #3f6b4a;
  }
`;

export const ApiLinkButton = styled.a`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding: 10px 16px;
  border-radius: 10px;
  background: #3f6b4a;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: #345a3e;
  }
`;

/* ---------------------------- Sections ----------------------------- */

export const Section = styled.section`
  margin-top: 56px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 19px;
  font-weight: 700;
  color: #23291f;
`;

export const CareBox = styled.div`
  background: #fbfaf5;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
  padding: 24px 26px;
`;

/* ---------------------------- Rating: Empty state --------------------- */

export const EmptyReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 56px 24px;
  background: #fbfaf5;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
`;

export const EmptyReviewTitle = styled.h2`
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  color: #23291f;
`;

export const EmptyReviewHint = styled.p`
  margin: 0 0 14px;
  font-size: 13.5px;
  color: #8a8578;
`;

/* ---------------------------- Rating -------------------------------- */

export const RatingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

/* bars on the left, average block on the right */
export const RatingSummary = styled.section`
  background: #fbfaf5;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 1fr 190px;
  gap: 32px;
  align-items: center;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SummaryLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #8a8578;
  letter-spacing: 0.02em;
`;

export const AverageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-left: 1px solid #e7e2d6;
  padding-left: 24px;

  strong {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 32px;
    font-weight: 800;
    color: #23291f;
    line-height: 1;
  }

  strong::after {
    content: "★";
    font-size: 20px;
    color: #e3a73b;
  }

  span {
    font-size: 13px;
    color: #8a8578;
  }

  @media (max-width: 560px) {
    border-left: none;
    padding-left: 0;
    padding-top: 20px;
    border-top: 1px solid #e7e2d6;
  }
`;

export const StarRow = styled.div`
  display: flex;
  gap: 2px;
  color: #e3a73b;
  font-size: 15px;
`;

export const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr 34px;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  color: #8a8578;
`;

export const BarTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: #eceadf;
  overflow: hidden;
`;

export const BarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: #e3a73b;
  width: ${(props) => props.$percent || 0}%;
  transition: width 0.4s ease;
`;

/* small outline button (used in empty state) */
export const WriteReviewButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #3f6b4a;
  background: #fff;
  color: #3f6b4a;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #3f6b4a;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #fff;
    color: #3f6b4a;
  }
`;

/* wide filled button under the rating summary */
export const WriteReviewWideButton = styled.button`
  width: 100%;
  height: 46px;
  margin-top: 16px;
  border-radius: 10px;
  border: none;
  background: #23291f;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #35392c;
  }

  &:disabled {
    background: #cfcabc;
    cursor: not-allowed;
  }
`;

/* ---------------------------- Review form (작성 / 수정) ---------------------------- */

export const ReviewFormBox = styled.div`
  background: #fff;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
  padding: 20px 22px;
  margin-top: 16px;
`;

export const ReviewFormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 13.5px;
  color: #8a8578;
  cursor: pointer;

  &:hover {
    color: #5c584d;
  }
`;

export const SubmitReviewButton = styled.button`
  padding: 9px 22px;
  border-radius: 8px;
  border: none;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#e3a73b" : "#f1efe6")};
  color: ${(props) => (props.$active ? "#fff" : "#a29d8f")};

  &:disabled {
    cursor: not-allowed;
  }
`;

export const RatingFieldLabel = styled.div`
  font-size: 12.5px;
  color: #a29d8f;
  margin-bottom: 6px;
`;

export const StarPicker = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 18px;
  font-size: 22px;
  color: #e3a73b;
  line-height: 1;

  span {
    cursor: pointer;
  }
`;

export const FormTitleInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #e7e2d6;
  border-radius: 8px;
  font-size: 14px;
  color: #2b2b26;
  margin-bottom: 10px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3f6b4a;
  }
`;

export const FormContentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 14px;
  border: 1px solid #e7e2d6;
  border-radius: 8px;
  font-size: 14px;
  color: #2b2b26;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 14px;

  &:focus {
    outline: none;
    border-color: #3f6b4a;
  }
`;

export const FormImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FormImageThumb = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #eef0e6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const AddImageButton = styled.label`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  border: 1px dashed #cfcabc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #a29d8f;
  cursor: pointer;
  background: #fbfaf5;

  &:hover {
    border-color: #3f6b4a;
    color: #3f6b4a;
  }

  input {
    display: none;
  }
`;

/* ---------------------------- Reviews -------------------------------- */

export const ReviewCountTitle = styled.h3`
  margin: 40px 0 16px;
  font-size: 16px;
  font-weight: 700;
  color: #23291f;
`;

export const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ReviewCard = styled.article`
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  background: #fff;
  border: 1px solid #ece8dc;
  border-radius: 12px;
`;

export const ReviewHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 10px;
`;

export const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Nickname = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #2b2b26;
`;

export const ReviewDate = styled.span`
  font-size: 12px;
  color: #a29d8f;
`;

export const MyReviewTag = styled.span`
  align-self: flex-start;
  font-size: 11.5px;
  font-weight: 600;
  color: #3f6b4a;
  background: #e7efe8;
  padding: 3px 8px;
  border-radius: 999px;
`;

export const ReviewTitle = styled.h4`
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: #23291f;
`;

export const ReviewContent = styled.p`
  margin: 8px 0 12px;
  font-size: 14px;
  line-height: 1.6;
  color: #3c382f;
  white-space: pre-line;
`;

export const ReviewImageRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const ReviewImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 10px;
  background: #eef0e6;
`;

export const EditButton = styled.button`
  font-size: 12.5px;
  color: #8a8578;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #3f6b4a;
  }
`;

export const ReviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
`;

export const ReviewFooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LikeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 600;
  color: ${(props) => (props.$liked ? "#d2574c" : "#a29d8f")};
`;

/* ---------------------------- Pagination -------------------------------- */

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 28px;
`;

export const PageButton = styled.button`
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$active ? "#3f6b4a" : "#e7e2d6")};
  background: ${(props) => (props.$active ? "#3f6b4a" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#5c584d")};
  font-size: 13px;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ---------------------------- Add Plant ------------------------------ */

export const AddPlantSection = styled.section`
  margin-top: 32px;
  padding: 24px 28px;
  background: #fbfaf5;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
`;

export const AddPlantHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #23291f;
  margin-bottom: 4px;
`;

export const AddPlantHint = styled.p`
  margin: 0 0 18px;
  font-size: 13px;
  color: #a29d8f;
`;

export const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SizeCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SizeLabel = styled.span`
  font-size: 13.5px;
  font-weight: 700;
  color: #2b2b26;
`;

export const SizeMeta = styled.span`
  font-size: 12px;
  color: #a29d8f;
`;

export const SizeInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SizeInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e7e2d6;
  border-radius: 8px;
  font-size: 14px;
  color: #2b2b26;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #3f6b4a;
  }

  &:disabled {
    background: #f1efe6;
    color: #8a8578;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SizeUnit = styled.span`
  font-size: 13px;
  color: #8a8578;
  white-space: nowrap;
`;

export const AddPlantActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddPlantButton = styled.button`
  height: 40px;
  padding: 0 22px;
  border-radius: 10px;
  border: none;
  background: #23291f;
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #35392c;
  }

  &:disabled {
    background: #cfcabc;
    cursor: not-allowed;
  }
`;

export const ChangeButton = styled.button`
  height: 40px;
  padding: 0 22px;
  border-radius: 10px;
  border: 1px solid #cfcabc;
  background: #f1efe6;
  color: #5c584d;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #e7e2d6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  height: 40px;
  padding: 0 22px;
  border-radius: 10px;
  border: none;
  background: #d2574c;
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #b8483e;
  }

  &:disabled {
    background: #e5b3ae;
    cursor: not-allowed;
  }
`;
