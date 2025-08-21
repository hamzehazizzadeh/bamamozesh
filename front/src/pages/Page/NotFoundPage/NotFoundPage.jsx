import { Link } from "react-router-dom";

import ErrorImage from "../../../assets/images/all-img/404.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 container mx-auto ">
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <img src={ErrorImage} alt="" className=" h-[250px] mx-auto" />
        <h4 className="  capitalize text-4xl my-4">
          <span className=" text-5xl text-red-500 font-bold">404</span> - صفحه
          مورد نظر یافت نشد
        </h4>
        <div className=" text-base font-normal mb-10">
          به نظر می رسد که شما سعی دارید به صفحه ای دسترسی پیدا کنید که حذف شده
          و یا هرگز وجود نداشته
          <Link to="/">بازگشت به خانه</Link>
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          to="/"
          className="btn btn-primary light transition-all duration-150 block text-center"
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
