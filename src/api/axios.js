import axios from "axios";

const BASE_URL = "http://localhost/api";

const api = axios.create({ baseURL: BASE_URL });

/* 인터셉터 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* 
  응답 인터셉터 
  함수 두개를 받는데 모든 응답이 여기 지나가면서 결과에 따라 갈림
  첫 번째 함수 : 응답이 성공일 때 실행 => 온 거 그대로 전달
  두 번째 함수 : 응답이 실패일 때 실행 => refresh 로직을 거치고 전달
*/
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config: original, response } = err;
    // console.log(original);
    // console.log(response);

    if (response.status !== 401) {
      return Promise.reject(err);
    }

    const isExpired = String(response.data).includes("토큰만료");

    if (!isExpired || original._retry) {
      return Promise.reject(err);
    }

    original._retry = true;
    // _retry : 재시도한 요청이 또 401로 오면 이미 refresh 한것을 인지해서 무한루프를 막는 용도

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      console.log(data);

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // 막혔던 원래 요청을 시도
      original.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return api(original);
    } catch (e) {
      // refresh토큰도 만료/ 이상한 토큰 -> 로그아웃
      ["token", "refreshToken", "memberName", "memberId", "role"].forEach((k) =>
        localStorage.removeItem(k),
      );

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

      return Promise.reject(e);
    }
  },
);

export default api;
