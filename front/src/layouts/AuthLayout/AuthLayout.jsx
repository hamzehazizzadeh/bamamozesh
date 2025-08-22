import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "@/assets/images/logo/logo-c.svg";
import VectorsImage from "@/assets/images/vectors-image/vectors-1.svg";

const AuthLayout = ({ children }) => {
  const title = useSelector((state) => state.title);

  return (
    <div className="auth-wrapper text-center">
      <div className="auth-page-height">
        <div className="h-full grid grid-cols-12 relative ">
          <div className="xl:col-span-8 lg:col-span-7 col-span-12 lg:block hidden bg-indigo-100">
            <div className="w-full h-full 2xl:max-w-4xl xl:max-w-2xl max-w-lg p-6 mx-auto items-center justify-center flex">
              <img src={VectorsImage} alt="" className="block" />
            </div>
          </div>
          <div className="xl:col-span-4 lg:col-span-5  col-span-12  ">
            <div className="bg-white h-full py-6 px-14 flex flex-col justify-center">
              <div className="grow flex flex-col justify-center items-center">
                <div className="h-[200px] w-[200px]">
                  <Link to="/">
                    <img
                      src={Logo}
                      alt="لوگو"
                      className="object-contain object-center h-full"
                    />
                  </Link>
                </div>
                <div className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-1 mt-5">
                  {title.title}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {title.endContent}
                </div>
                <div className="w-full text-right">{children}</div>
              </div>
              <div className="mt-8 flex justify-center text-xs text-gray-400  ">
                <a href="/">حریم خصوصی</a>
                <div className="mx-3 my-1 w-px bg-gray-200" />
                <a href="/">خدمات</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
