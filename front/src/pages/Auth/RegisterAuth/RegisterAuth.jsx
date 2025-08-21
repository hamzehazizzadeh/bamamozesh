import { Link } from "react-router-dom";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import VectorsImage from "@/assets/images/vectors-image/vectors-1.svg";
import Logo from "@/assets/images/logo/logo-c.svg";
import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { authContext } from "../../../context/AuthContext/AuthContext";
import { registerUserValidation } from "../../../utils/validation/validation";

const RegisterAuth = () => {
  const loading = useSelector((state) => state.loading);

  const { handleRegister } = useContext(authContext);

  // Validation
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerUserValidation),
  });

  return (
    <>
      <SiteTitle title="ایجاد حساب کاربری" />

      <div className="h-full grid grid-cols-12 ">
        <div className="xl:col-span-8 lg:col-span-7 col-span-12 lg:block hidden  bg-indigo-100">
          <div className=" w-full 2xl:max-w-4xl xl:max-w-2xl max-w-lg p-6 mx-auto ">
            <img
              src={VectorsImage}
              alt="image name"
              className="  block mx-auto"
            />
          </div>
        </div>
        <div className="xl:col-span-4 lg:col-span-5  col-span-12">
          <div className="bg-white h-full py-6 px-14 flex flex-col justify-center">
            {/* logo wrapper start */}
            <div className="grow flex flex-col justify-center">
              <div className="h-[62px] w-[62px]">
                <Link to="/">
                  <img
                    src={Logo}
                    alt=""
                    className=" object-contain object-center h-full"
                  />
                </Link>
              </div>
              <div className=" text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-1 mt-5">
                Welcome To Admin DashSpace
              </div>
              <div className=" text-gray-500 dark:text-gray-400 text-sm mb-6">
                Please sign in to continue
              </div>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-3 "
              >
                <InputGroup
                  name="name"
                  type="text"
                  prepend={<Icon icon="ph:lock-simple" />}
                  placeholder=" Enter your name"
                  register={register}
                  error={errors.name}
                  disabled={loading}
                  merged
                />
                <InputGroup
                  name="email"
                  type="email"
                  prepend={<Icon icon="ph:lock-simple" />}
                  placeholder=" Enter your email"
                  register={register}
                  error={errors.email}
                  disabled={loading}
                  merged
                />
                <InputGroup
                  name="password"
                  type="password"
                  prepend={<Icon icon="ph:lock-simple" />}
                  placeholder=" Enter your password"
                  register={register}
                  error={errors.password}
                  merged
                  disabled={loading}
                />

                <Button
                  type="submit"
                  text="Create an account"
                  className="btn btn-primary block w-full text-center "
                  isLoading={loading}
                />
              </form>
              <div className=" text-center text-sm mt-5 space-x-1 rtl:space-x-reverse mb-1  ">
                <span>Already have an account</span>
                <span>
                  <Link to="/login2" className=" text-indigo-500">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAuth;
