import React, { useRef } from "react";
import heroPlant from "../assets/main_hero.png"; // 677 x 1014
import bannerSoil from "../assets/second_banner.png"; // 1920 x 653
import boardShelf from "../assets/main_board_1.png"; // 유저 게시판 - 1
import boardFern from "../assets/main_board_2.png"; // 유저 게시판 - 2

import {
  Page,
  Section,
  IntroGrid,
  IntroCopy,
  Heading,
  SubLines,
  LeadLine,
  Badge,
  BodyText,
  IntroVisual,
  BannerSection,
  BannerImageWrap,
  BannerQuote,
  BannerFooter,
  StepLabel,
  FooterCaption,
  NavArrows,
  ContentSection,
  SectionHeaderRow,
  SectionTitle,
  ActionBadge,
  EdgeNavButton,
  ReviewList,
  ReviewCard,
  ReviewImageFrame,
  ReviewMeta,
  ReviewName,
  ReviewRating,
  Stars,
  ReviewCount,
  BoardGrid,
  BoardImageFrame,
  ContentSection2,
} from "./main.styles";

// TODO: DB 연동 - 아래 리뷰 목록은 임시 데이터입니다.
// image가 없으면 카드가 플레이스홀더로 표시되며, DB에서 받아온 URL로 채워주면 됩니다.
const REVIEW_ITEMS = [
  {
    id: 1,
    name: "Strelitzia nicolai",
    rating: 5,
    reviewCount: 2479,
    image: null,
  },
  {
    id: 2,
    name: "Ficus microcarpa",
    rating: 5,
    reviewCount: 2479,
    image: null,
  },
  { id: 3, name: "Aloe vera", rating: 5, reviewCount: 2479, image: null },
  { id: 4, name: "Aloe vera", rating: 5, reviewCount: 2479, image: null },
];

// TODO: DB 연동 - 유저 게시판 카드 목록도 실제로는 DB에서 가져올 예정입니다.
// 지금은 전달받은 이미지 2장을 기본값으로 사용합니다.
const BOARD_ITEMS = [
  { id: 1, image: boardShelf, alt: "식물로 채운 매장 인테리어" },
  { id: 2, image: boardFern, alt: "손으로 들고 있는 고사리 잎" },
];

const SECTION_COUNT = 4;

export default function Main_2() {
  const pageRef = useRef(null);

  const scrollToSection = (index) => {
    const page = pageRef.current;
    if (!page) return;
    const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, index));
    page.scrollTo({ top: clamped * page.clientHeight, behavior: "smooth" });
  };

  return (
    <Page ref={pageRef}>
      {/* Section 1 — Intro */}
      <Section>
        <IntroGrid>
          <IntroCopy>
            <Heading>
              Plant
              <br />
              Plants
            </Heading>

            <SubLines>
              당신만의 재배 방법을 공유하고
              <br />
              타인의 피드백을 받으세요
            </SubLines>

            <LeadLine>세상에는 여러가지 방법이 있습니다.</LeadLine>

            <Badge>콘텐츠</Badge>

            <BodyText>
              나만의 작은 팁이 누군가에게는 거대한 영감이 됩니다.
              <br />
              당신의 방법을 등록하고, 세상의 피드백을 마주해보세요.
            </BodyText>
          </IntroCopy>

          <IntroVisual>
            <img src={heroPlant} alt="유칼립투스 화분 식물" />
          </IntroVisual>
        </IntroGrid>
      </Section>

      {/* Section 2 — Banner */}
      <BannerSection>
        <BannerImageWrap>
          <img src={bannerSoil} alt="흙에 모종을 심는 손" />
          <BannerQuote>
            <strong>Learn how</strong> we take care of your plant
            <br />
            at every stage of its journey from our
            <br />
            greenhouse to your home.
          </BannerQuote>
        </BannerImageWrap>

        <BannerFooter>
          <StepLabel>STEP 1</StepLabel>
          <FooterCaption>We put everything together</FooterCaption>
          <NavArrows>
            <button aria-label="이전" onClick={() => scrollToSection(0)}>
              ‹
            </button>
            <button aria-label="다음" onClick={() => scrollToSection(2)}>
              ›
            </button>
          </NavArrows>
        </BannerFooter>
      </BannerSection>

      {/* Section 3 — 리뷰하기 */}
      <ContentSection>
        <SectionHeaderRow>
          <SectionTitle>리뷰하기</SectionTitle>
        </SectionHeaderRow>

        <ActionBadge>모두보기</ActionBadge>

        <ReviewList>
          {REVIEW_ITEMS.map((item) => (
            <ReviewCard key={item.id}>
              <ReviewImageFrame $image={item.image}>
                {!item.image && "이미지 준비중"}
              </ReviewImageFrame>
              <ReviewMeta>
                <ReviewName>{item.name}</ReviewName>
                <ReviewRating>
                  <Stars>{"★".repeat(item.rating)}</Stars>
                  <ReviewCount>
                    {item.reviewCount.toLocaleString()} reviews
                  </ReviewCount>
                </ReviewRating>
              </ReviewMeta>
            </ReviewCard>
          ))}
        </ReviewList>

        <EdgeNavButton
          $side="left"
          aria-label="이전"
          onClick={() => scrollToSection(1)}
        >
          ‹
        </EdgeNavButton>
        <EdgeNavButton
          $side="right"
          aria-label="다음"
          onClick={() => scrollToSection(3)}
        >
          ›
        </EdgeNavButton>
      </ContentSection>

      {/* Section 4 — 유저 게시판 */}
      <ContentSection2>
        <SectionHeaderRow>
          <SectionTitle>유저 게시판</SectionTitle>
        </SectionHeaderRow>

        <BoardGrid>
          {BOARD_ITEMS.map((item) => (
            <BoardImageFrame key={item.id}>
              <img src={item.image} alt={item.alt} />
            </BoardImageFrame>
          ))}
        </BoardGrid>

        <EdgeNavButton
          $side="left"
          aria-label="이전"
          onClick={() => scrollToSection(1)}
        >
          ‹
        </EdgeNavButton>
        <EdgeNavButton
          $side="right"
          aria-label="다음"
          onClick={() => scrollToSection(3)}
        >
          ›
        </EdgeNavButton>
      </ContentSection2>
    </Page>
  );
}
