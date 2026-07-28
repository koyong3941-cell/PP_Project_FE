import api from "./axios";
export const getBoards = (page = 0) => {
  return api.get(`/boards?page=${page}`);
};

export const getBoard = (boardNo) => {
  return api.get(`/boards/${boardNo}`);
};

export const createBoard = (fromData) => {
  return api.post("/boards", fromData);
};

export const updateBoard = (boardNo, fromData) => {
  return api.patch(`/boards/${boardNo}`, fromData);
};

export const deleteBoard = (boardNo) => {
  return api.delete(`/boards/${boardNo}`);
};

export const searchBoard = (page, keyword, target) => {
  return api.get("/boards/search", {
    params: {
      page,
      keyword,
      target,
    },
  });
};

export const getCategory = () => {
  return api.get("/boards/category");
};

export const likeBoard = (boardNo) => {
  return api.post(`/boards/${boardNo}/like`);
};

export const dislikeBoard = (boardNo) => {
  return api.post(`/boards/${boardNo}/dislike`);
};

export const getReaction = (boardNo) => {
  return api.get(`/boards/${boardNo}/reactions`);
};
