# PlantPlants

> 식물 재배 난이도와 탄소포집 성능을 공유하는 친환경 원예 커뮤니티

## 1. 왜 만들었는지?

평소 영화 리뷰 사이트를 자주 이용하던 팀원이 자기가 보유한 식물도 리뷰하고 재배 난이도 및 생존력 등 정보를 공유해서 타인에게 추천도를 공유하면 좋겠다는 아이디어를 가지고 만들었습니다. <br>
또한 각 식물 데이터의 탄소 흡수량 데이터를 활용하여 개인이 보유한 식물 숫자를 기반하여 환경기여도를 확인 할 수 있게 추가적으로 구현하였습니다.

---

## 2. 팀원

**팀명** : Team Agile

| 이름 | GitHub | Email | 담당 | 소개 |
|------|--------|-------|------|------|
| 성현 | [<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" height="20">](https://github.com/koyong3941-cell) | `koyong3941@gmail.com` | 팀장 | 조직의 목표와 서비스의 책임을 우선적으로 고려하며, 프로젝트의 방향성에 맞는 개발을 지향합니다. |
| 민범 | [<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" height="20">](https://github.com/lovely0503) | `minbeom0503@naver.com` | 팀원 및 유지보수 | 창조적인 아이디어와 긍정적사고 그리고 인간성 포기하지 않는 마인드로 프로젝트에서 서브적인 역할을 맡고 있습니다!! 어떤 곳을 가도 자신감이 넘칩니다! |
| 세웅 | [<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" height="20">](https://github.com/CU0-0) | `bill97720@naver.com` | 팀원 | 꾸준한 학습과 기술 습득을 통해 성장하고 있습니다. 협업을 중요하게 생각하며, 팀과 함께 성장하는 개발자가 되고 싶습니다. |
| 일섭 | [<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" height="20">](https://github.com/lno001) | `lno001@hotmail.com` | 팀원 | 팀 내에서 의견 조율을 맡고 있습니다. 이번 프로젝트로 팀원간 협동의 중요성에 대해 배워갔습니다. |

---

## 기술 스택
<img src="https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=openjdk&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Spring%20Boot-3.5.16-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/MyBatis-3.0.5-000000?style=for-the-badge&logo=mybatis&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/JWT-JJWT%200.12.3-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Springdoc%20OpenAPI-2.8.16-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/React%20Router-7CA0F0?style=for-the-badge&logo=reactrouter&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">

---

## 3. 기간 및 개발 분기

**개발 기간** : 2026.06.04 ~ 2026.07.15

### 개발 분기
- **1주차** : 친환경 탄소중립 식물 원예 커뮤니티 사이트의 방향성 및 세부 기능 구성 논의 
- **2주차** : 개발 환경 구성 및 기술 검증, 기본 CRUD 구조 테스트
- **3주차** : 기초기획, 유스케이스 작성 및 화면설계, 개발 명세 작성 시작
- **4주차** : 기획 완료, 개발 시작
- **5주차** : 기본 기능 개발 완료
- **6주차** : MVP 기능 개발 완료
  
---

## 4. 이 프로젝트가 무엇을 하는건지?

**주사용자**  
친환경 식물 재배 난이도 및 탄소포집 성능 지표가 필요한 사용자

**특징**
- 개발자 친환경 원예 블로그 운영
- 소규모 ~ 대규모 모임 기능 지원
- 탄소포집 식물 리뷰

---

## 5. 아키텍처 구조
<p align="center">
  <img src="./assets/architecture.png" width="800">
</p>

### **ERD**  
[![ERD](https://img.shields.io/badge/ERD-바로가기-4B8BBE?style=for-the-badge&logo=diagrams.net&logoColor=white)](https://www.erdcloud.com/d/7gtfTPgReKwTqd7Eg)

---

## 6. 주요기능

### MVP 및 주요 페이지별 시나리오

#### 회원 인증 및 MVP(탄소집계) (담당: 윤성현)
- 회원 및 탄소집계 MVP 기능 개발(BE/FE)
  - Spring Security와 JWT 기반 인증 시스템 구현
  - 공기감지 센서 개발 및 연동 구현
  - 사용자 활동 데이터를 기반으로 탄소 포집량 계산 로직 구현
  - 식물별 탄소포집 계수를 적용한 탄소 저감량 산출 기능 개발
  - 마이페이지 내 탄소집계 정보 조회 화면 구현

#### Admin관리자 페이지 및 MVP(공지사항) (담당: 강민범)
- 식물 원예 커뮤니티 중 프론트 엔드 작업에서는 관리자 페이지 작업을 수행했으며 백엔드 작업에서는 공지사항 페이지를 수행하였습니다. 
  - 그와 연동되는 db에서는 다양한 식물의 정보들을 수집 그리고 게시글을 늘리는 작업을 하였습니다. 
  - 아이디어 회의나 중간회의 에서는 탄소포집 측정 부분이나 식물을 키우는 유저들에게 커뮤니티를 활용하여 자연적으로 얻게되는 지식 리뷰 시스템을 통한 식물에 대한 피드백등으로 식물 원예커뮤니티를 활용하면서 얻게 되는 장점들을 토론 했던것 같습니다.

#### 메인페이지 및 MVP(식물, 게시글) (담당: 지세웅)
- 프론트 엔드
  - 식물리스트 페이지, 식물 상세정보 페이지를 구현했습니다
  - 게시글 리스트 페이지, 게시글 상세 페이지, 게시글 작성 페이지, 게시글 수정 페이지를 구현했습니다
  - 메인 페이지, 에러 페이지를 구현했습니다
- 백엔드에서는 식물 관련, 회원 보유 식물 관련 기능을 구현했습니다

#### 식물 정보 관리 및 MVP(CRUD) (담당: 이일섭)
- 관리자용 식물 정보 관리 및 검색 기능 개발 (BE/FE)
  - 식물 목록을 조회하고 페이지 단위로 나누어 보여주는 기능 구현
  - 식물명, 종류, 작성자 등 여러 조건으로 검색할 수 있는 기능 개발
  - 검색 시 키워드와 검색 대상에 따라 서버에서 동적으로 결과를 조회하도록 구현
  - 선택한 식물을 삭제하거나 복구하는 기능 추가 (실제 삭제가 아닌 상태 변경 방식)
  - React 관리자 화면과 Spring Boot API를 연동하여 검색·선택·삭제까지 동작하게 구현
