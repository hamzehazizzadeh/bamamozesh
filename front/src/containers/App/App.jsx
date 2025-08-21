import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminContainer from "../AdminContainer/AdminContainer";
import StudentContainer from "../StudentContainer/StudentContainer";
import PublicContainer from "../PublicContainer/PublicContainer";
import AuthContainer from "../AuthContainer/AuthContainer";
import NotFoundPage from "./../../pages/Page/NotFoundPage/NotFoundPage";
import PreLoader from "../../helpers/PreLoader/PreLoader";
import NotificationListener from "../../helpers/NotificationListener/NotificationListener";
import { decodeJWT, getCookies } from "../../utils";
import { setUserAction } from "../../redux/actions/userActions/userActions";
import {
  clearAuthAction,
  setAuthAction,
} from "../../redux/actions/authActions/authActions";
import { setMetaAction } from "../../redux/actions/metaActions/metaActions";
import { setSocketActions } from "./../../redux/actions/socketActions/socketActions";

const App = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const loader = useSelector((state) => state.loader);

  const accessToken = getCookies("accessToken");

  useEffect(() => {
    if (accessToken) {
      const decodedToken = decodeJWT(accessToken);
      const dateNow = Date.now() / 1000;
      if (decodedToken?.exp < dateNow) dispatch(clearAuthAction());
      else dispatch(setAuthAction(accessToken));
    }
  });

  useEffect(() => {
    if (accessToken) {
      // Connect with Socket IO
      dispatch(setSocketActions(accessToken));
      // Get User Profiles
      dispatch(setUserAction());
    }
    // Get Meta
    dispatch(setMetaAction());
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <main className="App relative">
      {loader && <PreLoader />}

      {/* React Toastify */}
      <ToastContainer position="bottom-left" rtl />

      {/* Notification */}
      <NotificationListener />

      <Routes>
        {/* Admin Container */}
        <Route path="/admin/*" element={<AdminContainer />} />
        {/* Student Container */}
        <Route path="/student/*" element={<StudentContainer />} />
        {/* Auth Container */}
        <Route path="/auth/*" element={<AuthContainer />} />
        {/* Public Container */}
        <Route path="/*" element={<PublicContainer />} />
        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default App;
