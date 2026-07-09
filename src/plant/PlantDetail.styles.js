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

/* ---------------------------- Rating -------------------------------- */

export const RatingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const RatingSummary = styled.section`
  background: #fbfaf5;
  border: 1px solid #e7e2d6;
  border-radius: 14px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 32px;
  align-items: center;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const AverageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-right: 1px solid #e7e2d6;
  padding-right: 24px;

  strong {
    font-size: 40px;
    font-weight: 800;
    color: #23291f;
    line-height: 1;
  }

  span {
    font-size: 13px;
    color: #8a8578;
  }

  @media (max-width: 560px) {
    border-right: none;
    padding-right: 0;
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

export const WriteReviewButton = styled.button`
  padding: 10px 18px;
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
`;

/* ---------------------------- Reviews -------------------------------- */

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

export const ReviewCard = styled.article`
  padding: 20px 0;
  border-bottom: 1px solid #ece8dc;

  &:last-child {
    border-bottom: none;
  }
`;

export const ReviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Nickname = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #2b2b26;
`;

export const ReviewDate = styled.span`
  font-size: 12.5px;
  color: #a29d8f;
`;

export const MyReviewTag = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: #3f6b4a;
  background: #e7efe8;
  padding: 3px 8px;
  border-radius: 999px;
`;

export const ReviewContent = styled.p`
  margin: 8px 0 12px;
  font-size: 14.5px;
  line-height: 1.6;
  color: #3c382f;
  white-space: pre-line;
`;

export const ReviewImageRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ReviewImage = styled.img`
  width: 84px;
  height: 84px;
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

export const LikeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 600;
  color: ${(props) => (props.$liked ? "#d2574c" : "#a29d8f")};
`;

export const ReviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

export const ReviewTitle = styled.h3`
  margin: 4px 0 0;
  font-size: 15.5px;
  font-weight: 700;
  color: #23291f;
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
