import { useEffect } from "react";
import { useDispatch } from "react-redux";

import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import { clearAuthAction } from "../../../redux/actions/authActions/authActions";
import { removeCookies } from "../../../utils";

const LogOutAuth = () => {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await removeCookies("accessToken");
    dispatch(clearAuthAction());
  };

  useEffect(() => {
    handleLogOut();
  }, []);

  return (
    <>
      <SiteTitle
        title="خروج از حساب کاربری"
        endContent="شما درحال خروج از حساب کاربری می باشید"
      />

      <p>لطفا منتظر بمانید...</p>
    </>
  );
};

export default LogOutAuth;
