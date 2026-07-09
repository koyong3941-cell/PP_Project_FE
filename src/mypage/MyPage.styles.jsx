import styled from "styled-components";

/* 전체 */
export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f5f7f6;
  font-family: sans-serif;
`;

/* LEFT */
export const LeftPanel = styled.div`
  width: 220px;
  background: white;
  padding: 20px;
  border-right: 1px solid #eee;

  ul {
    margin-top: 20px;
    padding: 0;
    list-style: none;

    li {
      padding: 10px 0;
      color: #444;
      cursor: pointer;
    }
  }
`;

/* RIGHT */
export const RightPanel = styled.div`
  width: 260px;
  background: white;
  border-left: 1px solid #eee;
  padding: 20px;

  .profile {
    text-align: center;
    margin-bottom: 30px;

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #ddd;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 auto 10px;
    }
  }

  .quick button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    background: #f0f0f0;
    cursor: pointer;
  }
`;

/* SCROLL AREA */
export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

/* SECTION */
export const SectionTop = styled.section`
  height: 35vh;
  padding: 20px;
  scroll-snap-align: start;
`;

export const SectionMiddle = styled.section`
  height: 35vh;
  padding: 20px;
  scroll-snap-align: start;
`;

export const SectionBottom = styled.section`
  height: 100vh;
  padding: 65px;
  scroll-snap-align: start;
`;

/* TEXT */
export const Title = styled.h2`
  margin-bottom: 15px;
`;

export const SubText = styled.p`
  font-size: 12px;
  color: #777;
`;

/* 식물 카드 영역 + 버튼 */
export const FlowerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/* 카드 가로 스크롤 */
export const FlowerGrid = styled.div`
  display: flex;
  gap: 15px;
  flex: 1;
  overflow-x: auto;
  scroll-behavior: smooth;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* 좌우 버튼 */
export const ScrollButton = styled.button`
  width: 35px;
  height: 35px;
  flex-shrink: 0;

  border-radius: 50%;
  border: none;
  background: white;

  cursor: pointer;
  font-size: 18px;
`;

/* CARD */
export const Card = styled.div`
  min-width: 250px;

  background: white;
  padding: 15px;
  border-radius: 12px;

  .img {
    width: 100%;
    height: 150px;

    background-color: #dff5df;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border-radius: 8px;
    margin-bottom: 10px;
  }

  .bar {
    height: 6px;
    background: #eee;
    border-radius: 4px;
    margin-top: 10px;

    div {
      height: 100%;
      background: #4caf50;
      border-radius: 4px;
    }
  }
`;

/* MIDDLE */
export const GraphBox = styled.div`
  height: 270px;
  background: white;
  border-radius: 12px;
  padding: 20px;
`;

/* BOTTOM */
export const BigGraphBox = styled.div`
  height: 100%;
  background: white;
  border-radius: 16px;

  font-size: 18px;
  color: #666;
`;
