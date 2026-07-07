import styled from "styled-components";

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */
export const tokens = {
  ink: "#1a1a17",
  paper: "#ffffff",
  mist: "#f2f1ee",
  clay: "#8a5a3b",
  cream: "#f6efe4",
  border: "rgba(26, 26, 23, 0.08)",
  serif: "'Georgia', 'Times New Roman', serif",
  sans: "'Helvetica Neue', Arial, sans-serif",
};

/* ------------------------------------------------------------------ */
/*  Page shell — one-page scroll                                       */
/* ------------------------------------------------------------------ */
export const Page = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  font-family: ${tokens.sans};
  color: ${tokens.ink};

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Section = styled.section`
  height: 90vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
`;

/* ------------------------------------------------------------------ */
/*  Section 1 — intro                                                  */
/* ------------------------------------------------------------------ */
export const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  height: 100%;
  background: ${tokens.paper};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const IntroCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 10vw;
  gap: 50px;
`;

export const Heading = styled.h1`
  font-family: ${tokens.serif};
  font-weight: 700;
  font-size: clamp(2.6rem, 5vw, 3.6rem);
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.01em;
`;

export const SubLines = styled.p`
  font-size: 1rem;
  line-height: 1.9;
  color: ${tokens.ink};
  margin: 0;
  font-weight: 500;
`;

export const LeadLine = styled.p`
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.8;
  margin: 0;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  background: ${tokens.ink};
  color: ${tokens.paper};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 7px 16px;
  border-radius: 999px;
`;

export const BodyText = styled.p`
  font-size: 0.92rem;
  line-height: 1.8;
  color: rgba(26, 26, 23, 0.72);
  margin: 0;
  max-width: 34ch;
`;

export const IntroVisual = styled.div`
  position: relative;
  background: ${tokens.mist};
  overflow: hidden;

  img {
    position: absolute;
    top: 1%;
    right: 1%;
    width: auto;
    height: 110%;
    object-fit: contain;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 2 — banner                                                 */
/* ------------------------------------------------------------------ */
export const BannerSection = styled.section`
  height: 90vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const BannerImageWrap = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 40%,
      rgba(20, 12, 4, 0.55) 100%
    );
  }
`;

export const BannerQuote = styled.p`
  position: absolute;
  right: 6vw;
  bottom: 12%;
  max-width: 720px;
  text-align: right;
  color: ${tokens.paper};
  font-family: ${tokens.serif};
  font-size: 2.6rem;
  line-height: 1.55;
  z-index: 2;

  strong {
    color: #e7c873;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    right: 5vw;
    left: 5vw;
    max-width: none;
    font-size: 1rem;
  }
`;

export const BannerFooter = styled.div`
  height: 64px;
  background: ${tokens.mist};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 6vw;
`;

export const StepLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(26, 26, 23, 0.55);
`;

export const FooterCaption = styled.span`
  justify-self: center;
  font-size: 0.8rem;
  color: rgba(26, 26, 23, 0.75);
`;

export const NavArrows = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 14px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    color: ${tokens.ink};
    opacity: 0.6;
    transition: opacity 0.2s ease;
    padding: 4px;

    &:hover {
      opacity: 1;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Shared — section header (title + divider + optional badge)         */
/* ------------------------------------------------------------------ */
export const ContentSection = styled.section`
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  padding: 7vh 6vw 6vh;
  background: ${tokens.paper};
  display: flex;
  flex-direction: column;
`;

export const ContentSection2 = styled.section`
  height: 120vh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  padding: 7vh 6vw 6vh;
  background: ${tokens.paper};
  display: flex;
  flex-direction: column;
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 24px;
  border-bottom: 1px solid ${tokens.border};
  padding-bottom: 18px;
`;

export const SectionTitle = styled.h2`
  font-family: ${tokens.serif};
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
`;

export const ActionBadge = styled.button`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  background: ${tokens.ink};
  color: ${tokens.paper};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 7px 16px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  margin-top: 18px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export const EdgeNavButton = styled.button`
  position: absolute;
  bottom: 6vh;
  ${(props) => (props.$side === "left" ? "left: 6vw;" : "right: 6vw;")}
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${tokens.border};
  background: ${tokens.paper};
  color: ${tokens.ink};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition:
    opacity 0.2s ease,
    background 0.2s ease;
  z-index: 2;

  &:hover {
    opacity: 1;
    background: ${tokens.mist};
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 3 — 리뷰하기 (reviews)                                      */
/* ------------------------------------------------------------------ */
export const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;
  flex: 1;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewImageFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${(props) =>
    props.$image
      ? `url(${props.$image}) center / cover no-repeat`
      : tokens.mist};
  border-radius: 2px;
  overflow: hidden;

  /* Placeholder look while the real photo is loaded from the DB */
  ${(props) =>
    !props.$image &&
    `
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(26, 26, 23, 0.35);
      font-size: 0.75rem;
    `}
`;

export const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const ReviewName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${tokens.ink};
`;

export const ReviewRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

export const Stars = styled.span`
  font-size: 0.7rem;
  color: #c9a13b;
  letter-spacing: 1px;
`;

export const ReviewCount = styled.span`
  font-size: 0.65rem;
  color: rgba(26, 26, 23, 0.5);
`;

/* ------------------------------------------------------------------ */
/*  Section 4 — 유저 게시판 (user board)                                */
/* ------------------------------------------------------------------ */
export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
  flex: 1;
  overflow: hidden;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const BoardImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
