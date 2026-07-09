import { Route } from "react-router-dom";

import Board from "../board/Board";
import BoardDetail from "../board/BoardDetail";
import BoardWrite from "../board/BoardWrite";
import BoardChage from "../board/BoardChange";

export const BoardRoutes = [
  <Route key="board" path="/board" element={<Board />} />,
  <Route key="board-detail" path="/board/:boardNo" element={<BoardDetail />} />,
  <Route key="board-write" path="/board/write" element={<BoardWrite />} />,
  <Route
    key="board-edit"
    path="/board/:boardNo/edit"
    element={<BoardChage />}
  />,
];
