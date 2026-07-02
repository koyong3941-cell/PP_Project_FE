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
      background: #ddd;
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
  height: 50vh;
  padding: 20px;
  scroll-snap-align: start;
`;

export const SectionMiddle = styled.section`
  height: 50vh;
  padding: 20px;
  scroll-snap-align: start;
`;

export const SectionBottom = styled.section`
  height: 100vh;
  padding: 20px;
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

/* TOP GRID */
export const FlowerGrid = styled.div`
  display: flex;
  gap: 15px;
`;

export const Card = styled.div`
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 12px;

  .img {
    width: 100%;
    height: 80px;
    background: #dff5df;
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
  display: flex;
  gap: 20px;

  .chart {
    flex: 1;
    height: 200px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
`;

/* BOTTOM BIG GRAPH */
export const BigGraphBox = styled.div`
  height: 100%;
  background: white;
  border-radius: 16px;

  font-size: 18px;
  color: #666;
`;
