import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useContext } from "react";
import { authContext } from "../../../context/AuthContext/AuthContext";
import { forgotPasswordValidation } from "../../../utils/validation/validation";

const ForgetPasswordAuth = () => {
  const { handleForgetPassword } = useContext(authContext);

  // Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidation),
  });

  return (
    <>
      <SiteTitle
        title="بازیابی کلمه عبور"
        endContent="برای بازیابی کلمه عبور، کد ملی و شماره موبایل خود را وارد کنید"
      />

      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleForgetPassword)}
        className="space-y-3"
      >
        <InputGroup
          name="nationalNumber"
          label="کدملی"
          type="text"
          register={register}
          placeholder="کدملی را وارد نمایید"
          error={errors.nationalNumber}
          prepend={<Icon icon="solar:user-id-broken" />}
          merged
        />
        <InputGroup
          name="phoneNumber"
          label="شماره موبایل"
          type="text"
          register={register}
          placeholder="شماره موبایل را وارد نمایید"
          error={errors.phoneNumber}
          prepend={<Icon icon="solar:iphone-broken" />}
          merged
        />

        <Button
          type="submit"
          text="بازیابی کلمه عبور"
          className="btn btn-primary block w-full text-center "
        />
      </form>
      <div className=" text-center text-sm mt-5 space-x-1 rtl:space-x-reverse mb-1">
        <Link to="/auth/login" className="text-indigo-500">
          بازگشت به صفحه ورود
        </Link>
      </div>
    </>
  );
};

export default ForgetPasswordAuth;
