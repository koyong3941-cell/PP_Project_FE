import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import React from "react";
import {
  Container,
  LeftPanel,
  RightPanel,
  ScrollArea,
  SectionTop,
  SectionMiddle,
  SectionBottom,
  Card,
  FlowerGrid,
  GraphBox,
  BigGraphBox,
  Title,
  SubText,
} from "./MyPage.styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const dummyFlowers = [
  { name: "페페로미아", status: "성장중", progress: 62 },
  { name: "수국", status: "건강", progress: 78 },
  { name: "몬스테라", status: "주의", progress: 40 },
];

const MyPage = () => {
  const { user, logout } = useAuth();
  const navi = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [co2Index, setCo2Index] = useState("");
  const [oxygenIndex, setOxygenIndex] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");

  const profileImg =
    user?.delYn === "N" && user?.imgPath && user?.saveName
      ? `${user.imgPath}/${user.saveName}`
      : "/assets/unknown.png";

  const normalizedData = chartData.map((d) => ({
    date: d.measureDate,

    co2: Math.min(100, Math.floor(d.co2 / 10)), // 400~500 → 40~50

    spo2: d.spo2, // 이미 0~100

    humidity: d.humidity, // 0~100

    temperature: Math.floor(d.temperature * 3), // 25°C → 75 (스케일링)
  }));

  useEffect(() => {
    api.get("/sensors").then((res) => {
      setChartData(res.data.data);
    });
  }, []);

  const handleNavigation = (path) => {
    if (path === "/logout") {
      logout();
      navi("/");
    } else {
      navi(path);
    }
  };

  return (
    <Container>
      {/* LEFT */}
      <LeftPanel>
        <h2>마이페이지</h2>
        <ul>
          <li>회원 정보</li>
          <li>식물 상태</li>
          <li>커뮤니티</li>
          <li>공지사항</li>
        </ul>
      </LeftPanel>

      {/* CENTER SCROLL */}
      <ScrollArea>
        {/* 1. TOP 50% */}
        <SectionTop>
          <Title>🌿 내 식물 현황</Title>

          <FlowerGrid>
            {dummyFlowers.map((item, idx) => (
              <Card key={idx}>
                <div className="img" />
                <h4>{item.name}</h4>
                <SubText>{item.status}</SubText>

                <div className="bar">
                  <div style={{ width: `${item.progress}%` }} />
                </div>
              </Card>
            ))}
          </FlowerGrid>
        </SectionTop>

        {/* 2. MIDDLE 50% */}
        <SectionMiddle>
          <Title>📊 성장 분석</Title>

          <GraphBox>
            <div className="chart fake1">광합성 효율 그래프</div>
            <div className="chart fake2">수분 유지율 그래프</div>
          </GraphBox>
        </SectionMiddle>

        {/* 3. BOTTOM 100% */}
        <SectionBottom>
          <Title>📈 식물 실내 환경 측정기</Title>
          <BigGraphBox>
            <ResponsiveContainer width="98%" height={500}>
              <LineChart
                data={normalizedData}
                margin={{ top: 100, right: 10, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                  interval={0}
                  tickMargin={8}
                />

                <Tooltip />
                <Legend />

                <Line
                  type="natural"
                  dataKey="co2"
                  stroke="#F4B942"
                  name="이산화탄소"
                />
                <Line
                  type="natural"
                  dataKey="spo2"
                  stroke="#4F46E5"
                  name="산소"
                />
                <Line
                  type="natural"
                  dataKey="humidity"
                  stroke="#FF5A5F"
                  name="습도"
                />
                <Line
                  type="natural"
                  dataKey="temperature"
                  stroke="#2CB67D"
                  name="온도"
                />
              </LineChart>
            </ResponsiveContainer>
          </BigGraphBox>
        </SectionBottom>
      </ScrollArea>

      {/* 우측 유저 정보 섹션 */}
      <RightPanel>
        <div className="profile">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${profileImg})` }}
          />
          <h3>{user.memberId}님</h3>
          <p>{user.memberName}</p>
        </div>

        <div className="quick">
          <button onClick={() => handleNavigation("/plant")}>식물검색</button>{" "}
          {/* 식물 검색 페이지 구현 시 해당 페이지로 랜딩되어야 함 */}
          <button onClick={() => handleNavigation("/profile-edit")}>
            내 정보 수정
          </button>
          <button onClick={() => handleNavigation("/logout")}>로그아웃</button>
        </div>
      </RightPanel>
    </Container>
  );
};

export default MyPage;
