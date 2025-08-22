import { Routes, Navigate, Route } from "react-router-dom";
import { isEmpty } from "lodash";

import DashboardUser from "../../pages/Student/DashboardUser/DashboardUser";
import DashboardUserContext from "../../context/UserContext/DashboardUserContext/DashboardUserContext";
import ProfileUserContext from "../../context/UserContext/ProfileUserContext/ProfileUserContext";
import ProfileUser from "../../pages/User/ProfileUser/ProfileUser";
import NotFoundPage from "../../pages/Page/NotFoundPage/NotFoundPage";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { decodeJWT, getCookies } from "../../utils";
import { userRoleItems } from "../../utils/enum";

const StudentContainer = () => {
  const accessToken = getCookies("accessToken");

  const isLogin = !isEmpty(accessToken);

  const role = decodeJWT(accessToken)?.role;

  if (!isLogin || role !== userRoleItems[1]) return <Navigate to="/" replace />;

  return (
    <MainLayout>
      <Routes>
        {/* Dashboard */}
        <Route
          index
          element={
            <DashboardUserContext>
              <DashboardUser />
            </DashboardUserContext>
          }
        />

        {/* Profile */}

        {["/profile", "/profile/changed-password"].map((key) => (
          <Route
            key={key}
            path={key}
            element={
              <ProfileUserContext>
                <ProfileUser />
              </ProfileUserContext>
            }
          />
        ))}

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default StudentContainer;
