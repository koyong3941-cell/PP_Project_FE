import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import profileDefaultImg from "../assets/unknown.png";
import plantDefaultImg from "../assets/plant.jpg";
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
  FlowerContainer,
  ScrollButton,
  NoData,
  ProfileAvatar,
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
  BarChart,
  Bar,
} from "recharts";

const MyPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/error"
        replace
        state={{
          title: "로그인이 필요합니다.",
          description: "로그인 후 이용할 수 있는 페이지입니다.",
        }}
      />
    );
  }
  const flowerRef = useRef(null);
  const navi = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [co2Index, setCo2Index] = useState("");
  const [oxygenIndex, setOxygenIndex] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [plantData, setPlantData] = useState([]);
  const [plantCap, setPlantCap] = useState(null);
  const size = 50;

  const profileImg =
    user?.delYn === "N" && user?.imgPath && user?.saveName
      ? `http://localhost${user.imgPath}${user.saveName}`
      : profileDefaultImg;

  const carbonData = plantCap
    ? [
        {
          name: "소형",
          value: plantCap.smallPlantCap,
        },
        {
          name: "중형",
          value: plantCap.middlePlantCap,
        },
        {
          name: "대형",
          value: plantCap.bigPlantCap,
        },
      ]
    : [];

  const normalizedData = Object.values(
    chartData.reduce((acc, d) => {
      const date = d.measureDate;

      if (!acc[date]) {
        acc[date] = {
          date,
          co2: Math.min(100, Math.floor(d.co2 / 10)),
          spo2: d.spo2,
          humidity: d.humidity,
          temperature: Math.floor(d.temperature * 3),
        };
      }

      return acc;
    }, {}),
  );

  console.log(normalizedData.map((d) => d.date));

  const scrollFlower = (direction) => {
    if (!flowerRef.current) return;

    flowerRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    api.get("/sensors").then((res) => {
      setChartData(res.data.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("/mypage", {
        params: {
          size: size,
        },
      })
      .then((res) => {
        setPlantData(res.data.data.content);
        setPlantCap(res.data.data);
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
          <li onClick={() => handleNavigation("/board")}>커뮤니티</li>
          <li onClick={() => handleNavigation("/notice")}>공지사항</li>
        </ul>
      </LeftPanel>

      {/* CENTER SCROLL */}
      <ScrollArea>
        {/* 1. TOP 50% */}
        <SectionTop>
          <Title>🌿 내 식물 현황</Title>

          <FlowerContainer>
            <ScrollButton onClick={() => scrollFlower("left")}>◀</ScrollButton>

            <FlowerGrid ref={flowerRef}>
              {plantData.length > 0 ? (
                plantData.map((item) => (
                  <Card key={item.plantNo}>
                    <div
                      className="img"
                      onClick={() => handleNavigation("/memberPlant")}
                      style={{
                        backgroundImage: `url(${
                          item.imgPath && item.saveName
                            ? `http://localhost${item.imgPath}${item.saveName}`
                            : plantDefaultImg
                        })`,
                      }}
                    />

                    <h4>{item.plantName}</h4>

                    <SubText>
                      {item.classification}
                      <br />
                      소형 : {item.smallPlant} / 중형 : {item.middlePlant} /
                      대형 :{item.bigPlant}
                    </SubText>

                    <div className="bar">
                      <div
                        style={{
                          width: `${Math.max(0, Math.min(item.carbonCapture, 100))}%`,
                        }}
                      />
                    </div>
                  </Card>
                ))
              ) : (
                <NoData>데이터가 없습니다.</NoData>
              )}
            </FlowerGrid>

            <ScrollButton onClick={() => scrollFlower("right")}>▶</ScrollButton>
          </FlowerContainer>
        </SectionTop>

        {/* 2. MIDDLE 50% */}
        <SectionMiddle>
          <Title>🌱 전체 탄소포집량</Title>

          <GraphBox>
            {plantCap ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={carbonData} layout="vertical">
                  <XAxis type="number" />

                  <YAxis type="category" dataKey="name" />

                  <Tooltip />

                  <Bar dataKey="value" fill="#4caf50" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <NoData height="250px">데이터가 없습니다.</NoData>
            )}
          </GraphBox>

          {plantCap ? (
            <h3>총 탄소포집량 : {plantCap.countAllPlantCap}</h3>
          ) : (
            <h3>총 탄소포집량 : 데이터가 없습니다.</h3>
          )}
        </SectionMiddle>

        {/* 3. BOTTOM 100% */}
        <SectionBottom>
          <Title>📈 식물 실내 환경 측정기</Title>
          <BigGraphBox>
            {normalizedData.length > 0 ? (
              <ResponsiveContainer width="98%" height={500}>
                <LineChart
                  data={normalizedData}
                  margin={{ top: 100, right: 10, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" interval="preserveStartEnd" />

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
            ) : (
              <div className="noData">데이터가 없습니다.</div>
            )}
          </BigGraphBox>
        </SectionBottom>
      </ScrollArea>

      {/* 우측 유저 정보 섹션 */}
      <RightPanel>
        <div className="profile">
          <ProfileAvatar image={profileImg} />
          <h3>{user.memberId}님</h3>
          <p>{user.memberName}</p>
        </div>

        <div className="quick">
          <button onClick={() => handleNavigation("/")}>홈</button>{" "}
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
