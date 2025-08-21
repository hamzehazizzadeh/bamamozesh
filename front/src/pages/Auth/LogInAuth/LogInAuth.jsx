import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "@/assets/images/logo/logo-c.svg";
import VectorsImage from "@/assets/images/vectors-image/vectors-1.svg";
import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import { authContext } from "../../../context/AuthContext/AuthContext";
import { loginUserValidation } from "../../../utils/validation/validation";

const LogInAuth = () => {
  const loading = useSelector((state) => state.loading);

  const { handleLogIn } = useContext(authContext);

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
      <SiteTitle title="ورود به حساب کاربری" />

      <div className="h-full grid grid-cols-12 relative ">
        <div className="xl:col-span-8 lg:col-span-7 col-span-12 lg:block hidden  bg-indigo-100">
          <div className=" w-full 2xl:max-w-4xl xl:max-w-2xl max-w-lg p-6 mx-auto ">
            <img
              src={VectorsImage}
              alt="image name"
              className="  block mx-auto"
            />
          </div>
        </div>
        <div className="xl:col-span-4 lg:col-span-5  col-span-12  ">
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
                Welcome Back
              </div>
              <div className=" text-gray-500 dark:text-gray-400 text-sm mb-6">
                Please sign in to continue
              </div>
              <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4 ">
                <InputGroup
                  name="phoneNumber"
                  type="phoneNumber"
                  label="phoneNumber"
                  placeholder="phoneNumber"
                  prepend="@"
                  defaultValue="DashSpace@gmail.com"
                  register={register}
                  error={errors.phoneNumber}
                  merged
                  disabled={loading}
                />
                <InputGroup
                  name="password"
                  label="password"
                  type="password"
                  placeholder="password"
                  prepend={<Icon icon="ph:lock-simple" />}
                  defaultValue="DashSpace"
                  register={register}
                  error={errors.password}
                  merged
                  disabled={loading}
                />

                <div className="flex justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-400 dark:text-gray-400 hover:text-indigo-500 hover:underline  "
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  text="Sign in"
                  className="btn btn-primary block w-full text-center "
                  // isLoading={isLoading}
                />
              </form>
              <div className=" text-center text-sm mt-5 space-x-1 rtl:space-x-reverse mb-1  ">
                <span> Don't have Account?</span>
                <span>
                  <Link to="/register2" className=" text-indigo-500">
                    Create account
                  </Link>
                </span>
              </div>
            </div>
            <div className="">
              <div className="mt-8 flex justify-center text-xs text-gray-400  ">
                <a href="#">Privacy Notice</a>
                <div className="mx-3 my-1 w-px bg-gray-200 "></div>
                <a href="#">Term of service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInAuth;
