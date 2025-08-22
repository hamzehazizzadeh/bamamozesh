import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import InputGroup from "../../../components/ui/InputGroup";
import useUploadFile from "../../../hooks/useUploadFile";
import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import SelectGroup from "../../../components/ui/SelectGroup";
import Badge from "../../../components/ui/Badge";
import AvatarCropper from "../../../components/ui/AvatarCropper";
import { profileUserContext } from "../../../context/UserContext/ProfileUserContext/ProfileUserContext";
import {
  changePasswordValidation,
  editUserValidation,
} from "../../../utils/validation/validation";
import { showAvatar } from "../../../utils";
import { areYouSureMessage } from "../../../utils/toastMessage/toastMessage";
import {
  convertGenderToText,
  convertRoleToPath,
  convertRoleToText,
  genderTypeItems,
} from "../../../utils/enum";

const ProfileUser = () => {
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const basePath = convertRoleToPath(auth.role);
  const tabs = [
    {
      key: `/${basePath}/profile`,
      label: "ویرایش حساب کاربری",
      content: <EditProfile />,
      icon: "solar:user-broken",
    },
    {
      key: `/${basePath}/profile/changed-password`,
      label: "ویرایش کلمه عبور",
      content: <ChangePassword />,
      icon: "solar:pen-new-square-broken",
    },
  ];

  const selectedTab = tabs.find((_t) => _t.key === pathname);

  if (isEmpty(selectedTab)) return null;

  return (
    <div>
      <SiteTitle title={selectedTab.label} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card
              title={
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className=" shrink-0">
                    <Avatar
                      src={showAvatar(user.avatar)}
                      className="h-14 w-14"
                      imgClass=""
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                  <div className="text-gray-700 dark:text-white text-sm font-semibold  ">
                    <span className=" truncate w-full block">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="block font-light text-xs   capitalize">
                      {convertRoleToText(user?.role)}
                    </span>
                  </div>
                </div>
              }
            >
              <ul className=" space-y-2">
                {tabs.map((item) => (
                  <Link
                    key={item.key}
                    className={`${
                      item.key === selectedTab.key
                        ? "bg-indigo-500 text-white"
                        : ""
                    } flex space-x-3 rtl:space-x-reverse px-3 py-2 rounded-md hover:bg-indigo-500/10 hover:text-indigo-500 capitalize  cursor-pointer`}
                    to={item.key}
                    replace
                  >
                    <div className="flex-none text-xl ">
                      <Icon icon={item.icon} />
                    </div>
                    <div className="flex-1 text-sm">{item.label}</div>
                  </Link>
                ))}
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12 space-y-5">
            {selectedTab && (
              <Card title={selectedTab.label}>
                <motion.div
                  key={selectedTab.key}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedTab.content}
                </motion.div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  const { handleEditUserInfo } = useContext(profileUserContext);

  const { handleUploadFile } = useUploadFile();

  // Validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserValidation),
  });

  const handleSetInfo = () => {
    reset({
      avatar: user?.avatar,
      firstName: user?.firstName,
      lastName: user?.lastName,
      fatherName: user?.fatherName,
      gender: user?.gender,
      nationalNumber: user?.nationalNumber,
      phoneNumber: user?.phoneNumber,
      unionName: user?.unionName,
      businessCategory: user?.businessCategory,
      workAddress: user?.workAddress,
      email: user?.email,
    });
  };

  useEffect(() => {
    if (!isEmpty(user)) handleSetInfo();
  }, [user]);

  return (
    <>
      <AvatarCropper
        onRemove={() => setValue("avatar", "")}
        value={watch("avatar")}
        onChange={(file) =>
          handleUploadFile(file, (e) => setValue("avatar", e), 1)
        }
      />

      <form
        className="space-y-3"
        autoComplete="off"
        onSubmit={handleSubmit((d) =>
          areYouSureMessage(
            () => handleEditUserInfo(d),
            "آیا از ویرایش اطلاعات حساب کاربری اطمینان دارید؟"
          )
        )}
      >
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
          disabled
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
          disabled
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

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            text="بازنشانی"
            onClick={handleSetInfo}
            className="btn btn-danger col-span-1 text-center"
          />
          <Button
            type="submit"
            text="ذخیره"
            className="btn btn-primary col-span-2 text-center "
          />
        </div>
      </form>
    </>
  );
};

const ChangePassword = () => {
  const { handleChangePassword } = useContext(profileUserContext);

  // Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidation),
  });

  return (
    <>
      <form
        className="space-y-3"
        autoComplete="off"
        onSubmit={handleSubmit((d) =>
          areYouSureMessage(
            () => handleChangePassword(d),
            "آیا از ویرایش کلمه عبور اطمینان دارید؟"
          )
        )}
      >
        <InputGroup
          name="password"
          label="کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:lock-password-broken" />}
          register={register}
          append={
            <Badge
              label="قدیم"
              className="bg-indigo-500 text-indigo-700 bg-opacity-10"
            />
          }
          error={errors.password}
          merged
        />
        <InputGroup
          name="newPassword"
          label="کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:lock-password-broken" />}
          register={register}
          append={
            <Badge
              label="جدید"
              className="bg-indigo-500 text-indigo-700 bg-opacity-10"
            />
          }
          error={errors.newPassword}
          merged
        />
        <InputGroup
          name="confirmPassword"
          label="تکرار کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:lock-password-broken" />}
          register={register}
          append={
            <Badge
              label="جدید"
              className="bg-indigo-500 text-indigo-700 bg-opacity-10"
            />
          }
          error={errors.confirmPassword}
          merged
        />

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            text="بازنشانی"
            onClick={() => reset()}
            className="btn btn-danger col-span-1 text-center"
          />
          <Button
            type="submit"
            text="ذخیره"
            className="btn btn-primary col-span-2 text-center"
          />
        </div>
      </form>
    </>
  );
};
