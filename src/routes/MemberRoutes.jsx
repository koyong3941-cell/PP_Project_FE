import { Route } from "react-router-dom";

import SignUp from "../signup/SignUp";
import Login from "../login/login";
import ProfileEdit from "../mypage/ProfileEdit";

export const MemberRoutes = [
  <Route key="signup" path="/signup" element={<SignUp />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="profile-edit" path="/profile-edit" element={<ProfileEdit />} />,
];
