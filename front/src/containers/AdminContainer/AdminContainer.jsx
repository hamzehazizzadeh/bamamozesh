import { Routes, Navigate, Route } from "react-router-dom";
import { isEmpty } from "lodash";

import DashboardUser from "../../pages/Student/DashboardUser/DashboardUser";
import DashboardUserContext from "../../context/UserContext/DashboardUserContext/DashboardUserContext";
import NotFoundPage from "./../../pages/Page/NotFoundPage/NotFoundPage";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { decodeJWT, getCookies } from "../../utils";
import { userRoleItems } from "../../utils/enum";

const AdminContainer = () => {
  const accessToken = getCookies("accessToken");

  const isLogin = !isEmpty(accessToken);

  const role = decodeJWT(accessToken)?.role;

  if (!isLogin || role !== userRoleItems[0]) return <Navigate to="/" replace />;

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

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AdminContainer;
