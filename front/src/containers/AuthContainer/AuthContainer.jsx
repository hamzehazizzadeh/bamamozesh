import { Route, Routes, Navigate } from "react-router-dom";
import { isEmpty } from "lodash";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import AuthContext from "../../context/AuthContext/AuthContext";
import LogInAuth from "../../pages/Auth/LogInAuth/LogInAuth";
import RegisterAuth from "../../pages/Auth/RegisterAuth/RegisterAuth";
import LogOutAuth from "../../pages/Auth/LogOutAuth/LogOutAuth";
import ForgetPasswordAuth from "../../pages/Auth/ForgetPasswordAuth/ForgetPasswordAuth";
import NotFoundPage from "../../pages/Page/NotFoundPage/NotFoundPage";
import { decodeJWT, getCookies } from "../../utils";
import { convertRoleToPath } from "../../utils/enum";

const AuthContainer = () => {
  const accessToken = getCookies("accessToken");

  const isLogin = !isEmpty(accessToken);
  const decodedToken = decodeJWT(accessToken);

  const redirectUrl = `/${convertRoleToPath(decodedToken?.role)}`;

  return (
    <AuthLayout>
      <AuthContext>
        <Routes>
          {/* Log In */}
          <Route
            index
            path="/login"
            element={isLogin ? <Navigate to={redirectUrl} /> : <LogInAuth />}
          />
          {/* Register */}
          <Route
            path="/register"
            element={isLogin ? <Navigate to={redirectUrl} /> : <RegisterAuth />}
          />
          {/* Forget Password */}
          <Route
            path="/forget-password"
            element={
              isLogin ? <Navigate to={redirectUrl} /> : <ForgetPasswordAuth />
            }
          />
          {/* Log Out */}
          <Route path="/logout" element={<LogOutAuth />} />
          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContext>
    </AuthLayout>
  );
};

export default AuthContainer;
