import axios from "axios";

export const getBoards = (page = 0) => {
  return axios.get(`/boards?page=${page}`);
};

export const getBoard = (boardNo) => {
  return axios.get(`/boards/${boardNo}`);
};

export const createBoard = (fromData) => {
  return axios.post("boards", fromData);
};

export const updateBoard = (boardNo, fromData) => {
  return axios.patch(`/boards/${boardNo}`, fromData);
};

export const deleteBoard = (boardNo) => {
  return axios.delete(`/boards/${boardNo}`);
};

export const searchBoard = (page, keyword, target) => {
  return axios.get("/boards/search", {
    params: {
      page,
      keyword,
      target,
    },
  });
};

export const getCategory = () => {
  return axios.get("/boards/category");
};

export const likeBoard = (boardNo) => {
  return axios.post(`/boards/${boardNo}/like`);
};

export const dislikeBoard = (boardNo) => {
  return axios.post(`/boards/${boardNo}/dislike`);
};

export const getReaction = (boardNo) => {
  return axios.get(`/boards/${boardNo}/reactions`);
};
