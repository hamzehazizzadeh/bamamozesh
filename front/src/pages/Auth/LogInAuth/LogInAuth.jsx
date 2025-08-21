import { useContext } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import { authContext } from "../../../context/AuthContext/AuthContext";
import { loginUserValidation } from "../../../utils/validation/validation";

const LogInAuth = () => {
  const { handleLogin } = useContext(authContext);

  // Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginUserValidation),
  });

  return (
    <>
      <SiteTitle
        title="ورود به حساب کاربری"
        endContent="برای ورود به سامانه اطلاعات خود را وارد نمایید"
      />

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <InputGroup
          name="phoneNumber"
          type="text"
          label="شماره موبایل"
          placeholder="شماره موبایل خود را وارد نمایید"
          prepend={<Icon icon="solar:iphone-broken" />}
          register={register}
          error={errors.phoneNumber}
          merged
        />
        <InputGroup
          name="password"
          label="کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:lock-password-broken" />}
          register={register}
          error={errors.password}
          merged
        />

        <div className="flex justify-between">
          <Link
            to="/auth/forget-password"
            className="text-sm text-gray-400 dark:text-gray-400 hover:text-indigo-500 hover:underline  "
          >
            کلمه عبور خود را فراموش کرده‌اید؟
          </Link>
        </div>

        <Button
          type="submit"
          text="ورود به حساب کاربری"
          className="btn btn-primary block w-full text-center "
        />
      </form>
      <div className=" text-center text-sm mt-5 space-x-1 rtl:space-x-reverse mb-1  ">
        <span>حساب کاربری ندارید؟</span>
        <span>
          <Link to="/auth/register" className=" text-indigo-500">
            ثبت نام کنید
          </Link>
        </span>
      </div>
    </>
  );
};

export default LogInAuth;
