import Select from "react-select";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import InputGroup from "@/components/ui/InputGroup";
import SelectGroup from "@/components/ui/SelectGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { authContext } from "../../../context/AuthContext/AuthContext";
import { registerUserValidation } from "../../../utils/validation/validation";
import { convertGenderToText, genderTypeItems } from "../../../utils/enum";

const RegisterAuth = () => {
  const { handleRegister } = useContext(authContext);

  // Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerUserValidation),
  });

  return (
    <>
      <SiteTitle
        title="ایجاد حساب کاربری"
        endContent="برای ثبت نام در سامانه اطلاعات خود را وارد نمایید"
      />

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
        <InputGroup
          name="firstName"
          type="text"
          label="نام"
          prepend={<Icon icon="solar:user-broken" />}
          placeholder="نام را وارد نمایید"
          register={register}
          error={errors.firstName}
          merged
        />
        <InputGroup
          name="lastName"
          type="text"
          label="نام خانوادگی"
          prepend={<Icon icon="solar:user-circle-broken" />}
          placeholder="نام خانوادگی را وارد نمایید"
          register={register}
          error={errors.lastName}
          merged
        />
        <InputGroup
          name="fatherName"
          type="text"
          label="نام پدر"
          prepend={<Icon icon="solar:shield-user-broken" />}
          placeholder="نام پدر را وارد نمایید"
          register={register}
          error={errors.fatherName}
          merged
        />
        <SelectGroup
          name="gender"
          label="جنسیت"
          options={genderTypeItems.map((item) => ({
            label: convertGenderToText(item),
            value: item,
          }))}
          prepend={<Icon icon="solar:code-2-broken" />}
          placeholder="جنسیت را انتخاب نمایید"
          register={register}
          error={errors.gender}
          merged
        />
        <InputGroup
          name="nationalNumber"
          type="text"
          label="کدملی"
          prepend={<Icon icon="solar:user-id-broken" />}
          placeholder="کدملی را وارد نمایید"
          register={register}
          error={errors.nationalNumber}
          merged
        />
        <InputGroup
          name="phoneNumber"
          type="text"
          label="شماره موبایل"
          prepend={<Icon icon="solar:iphone-broken" />}
          placeholder="شماره موبایل را وارد نمایید"
          register={register}
          error={errors.phoneNumber}
          merged
        />
        <InputGroup
          name="unionName"
          type="text"
          label="اسم اتحادیه"
          prepend={<Icon icon="solar:buildings-2-broken" />}
          placeholder="اسم اتحادیه را وارد نمایید"
          register={register}
          error={errors.unionName}
          merged
        />
        <InputGroup
          name="businessCategory"
          type="text"
          label="رسته صنفی"
          prepend={<Icon icon="solar:buildings-broken" />}
          placeholder="رسته صنفی را وارد نمایید"
          register={register}
          error={errors.businessCategory}
          merged
        />
        <InputGroup
          name="workAddress"
          type="text"
          label="آدرس محل کار"
          prepend={<Icon icon="solar:streets-map-point-broken" />}
          placeholder="آدرس محل کار را وارد نمایید"
          register={register}
          error={errors.workAddress}
          merged
        />
        <InputGroup
          name="email"
          type="text"
          label="پست الکترونیک"
          prepend={<Icon icon="solar:letter-broken" />}
          placeholder="پست الکترونیک را وارد نمایید"
          register={register}
          error={errors.email}
          merged
        />
        <InputGroup
          name="password"
          type="password"
          label="کلمه عبور"
          prepend={<Icon icon="solar:lock-password-broken" />}
          placeholder="کلمه عبور را وارد نمایید"
          register={register}
          error={errors.password}
          merged
        />
        <InputGroup
          name="confirmPassword"
          type="password"
          label="تکرار کلمه عبور"
          prepend={<Icon icon="solar:lock-password-broken" />}
          placeholder="تکرار کلمه عبور را وارد نمایید"
          register={register}
          error={errors.confirmPassword}
          merged
        />

        <Button
          type="submit"
          text="ایجاد حساب کاربری"
          className="btn btn-primary block w-full text-center "
        />
      </form>
      <div className=" text-center text-sm mt-5 space-x-1 rtl:space-x-reverse mb-1  ">
        <span>حساب کاربری دارید؟</span>
        <span>
          <Link to="/auth/login" className="text-indigo-500">
            ورود به حساب کاربری
          </Link>
        </span>
      </div>
    </>
  );
};

export default RegisterAuth;
