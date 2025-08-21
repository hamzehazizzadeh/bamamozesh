import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

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

      <section className="auth bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src="/assets/images/auth/auth-img.png" alt="" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div className="text-center">
              <Link to="/" className="mb-40 max-w-290-px">
                <img src="/assets/images/logo.svg" alt="" />
              </Link>
              <p>
                <Icon icon="solar:logout-3-broken" className="display-1" />
              </p>
              <h4 className="mb-12">خروج از حساب کاربری</h4>
              <p className="mb-32 text-secondary-light text-lg">
                شما درحال خروج از حساب کاربری می باشید
              </p>
              <p className="mb-32 text-secondary-light">لطفا منتظر بمانید...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogOutAuth;
