import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

import SearchTable from "../../../components/ui/SearchTable";
import useUploadFile from "../../../hooks/useUploadFile";
import SiteTitle from "../../../helpers/SiteTitle/SiteTitle";
import UserInfoAvatar from "../../../components/ui/UserInfoAvatar";
import Badge from "../../../components/ui/Badge";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import InputGroup from "../../../components/ui/InputGroup";
import AvatarCropper from "../../../components/ui/AvatarCropper";
import SelectGroup from "../../../components/ui/SelectGroup";
import { userAdminContext } from "../../../context/AdminContext/UserAdminContext/UserAdminContext";
import {
  changePasswordForAdminValidation,
  createUserForAdminValidation,
  editUserForAdminValidation,
} from "../../../utils/validation/validation";
import {
  convertGenderToText,
  convertPermissionToText,
  convertRoleToText,
  genderTypeItems,
  rolePermissions,
  userRoleItems,
} from "../../../utils/enum";
import { convertDate } from "../../../utils";
import Switch from "../../../components/ui/Switch";
import { areYouSureMessage } from "../../../utils/toastMessage/toastMessage";
import EmptyData from "../../../components/ui/EmptyData";

const UsersAdmin = () => {
  const navigate = useNavigate();

  const { handleUploadFile } = useUploadFile();

  const {
    users,
    user,
    setUser,
    role,
    filter,
    setFilter,
    pageCount,
    itemsCount,
    pageNumber,
    setPageNumber,
    isShowModal,
    handleShowModal,
    handleHideModal,
    handleGetUsers,
    handleCreateUser,
    handleEditUser,
    handleChangeUserConfirm,
    handleDeleteUser,
  } = useContext(userAdminContext);

  useEffect(() => {
    handleGetUsers();
  }, [pageNumber, role, itemsCount, filter]);

  // Validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      permissions: [],
    },
    resolver: yupResolver(
      isEmpty(user) ? createUserForAdminValidation : editUserForAdminValidation
    ),
  });

  console.log(errors);

  return (
    <>
      <SiteTitle title="کاربران" />

      <Card noborder>
        <SearchTable
          title="کاربران"
          filter={filter}
          setFilter={setFilter}
          endItem={
            <Button
              icon="ph:plus"
              text="افزودن کاربر جدید"
              className="btn-primary font-normal min-h-[42px]"
              iconClass="text-lg"
              onClick={() => {
                handleShowModal();
                reset();
              }}
            />
          }
        />

        <div className="overflow-x-auto -mx-5">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700 ">
                  <tr>
                    <th className="table-th">#</th>
                    <th className="table-th">کاربر</th>
                    <th className="table-th">کد ملی</th>
                    <th className="table-th">شماره همراه</th>
                    <th className="table-th">نقش</th>
                    <th className="table-th">تاریخ ثبت نام</th>
                    <th className="table-th">وضعیت</th>
                    <th className="table-th" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                  {!isEmpty(users) &&
                    users.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-30  transition-all duration-200"
                      >
                        <td className="table-td">{index + 1}</td>
                        <td className="table-td">
                          <UserInfoAvatar
                            avatar={item?.avatar}
                            title={`${item?.firstName} ${item?.lastName}`}
                            subTitle={item?.email}
                          />
                        </td>
                        <td className="table-td">{item.nationalNumber}</td>
                        <td className="table-td">{item.phoneNumber}</td>
                        <td className="table-td">
                          {convertRoleToText(item.role)}
                        </td>
                        <td className="table-td">
                          {convertDate(item.createdAt, "jYYYY/jMM/jDD - HH:mm")}
                        </td>
                        <td className="table-td">
                          <Badge
                            label={item.isConfirm ? "فعال" : "غیرفعال"}
                            className={`${
                              item.isConfirm
                                ? "bg-green-500 text-green-700"
                                : "bg-red-500 text-red-700"
                            } bg-opacity-10`}
                          />
                        </td>
                        <td className="table-td">
                          <div className="text-center">
                            <Dropdown
                              classMenuItems="left-0 w-[140px] top-[110%]"
                              label={
                                <span className="text-lg text-center h-7 w-7 inline-flex justify-center items-center bg-transparent hover:bg-gray-200 transition-all duration-200 rounded-full leading-none">
                                  <Icon icon="heroicons-outline:dots-horizontal" />
                                </span>
                              }
                            >
                              <div className="divide-y divide-gray-100 dark:divide-gray-800 bg-white">
                                <div
                                  onClick={() => {
                                    reset();
                                    handleShowModal(item, setValue);
                                  }}
                                >
                                  <div className="hover:bg-indigo-500/10 hover:text-indigo-500 w-full border-b border-b-gray-400 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse">
                                    <span className="text-base">
                                      <Icon icon="solar:pen-new-square-broken" />
                                    </span>
                                    <span className="text-sm">ویرایش</span>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    setUser({ ...item, isPassword: true })
                                  }
                                >
                                  <div className="hover:bg-indigo-500/10 hover:text-indigo-500 w-full border-b border-b-gray-400 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse">
                                    <span className="text-base">
                                      <Icon icon="solar:password-minimalistic-input-broken" />
                                    </span>
                                    <span className="text-sm">
                                      تغییر کلمه عبور
                                    </span>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    areYouSureMessage(
                                      () => handleChangeUserConfirm(item._id),
                                      `آیا از ${
                                        !item.isConfirm ? "فعال" : "غیرفعال"
                                      } کردن کاربر ${item.firstName} ${
                                        item.lastName
                                      } مطمئنید؟`
                                    )
                                  }
                                >
                                  <div
                                    className={`hover:bg-${
                                      !item.isConfirm ? "green" : "red"
                                    }-500/10 hover:text-${
                                      !item.isConfirm ? "green" : "red"
                                    }-500 w-full border-b border-b-gray-400 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse`}
                                  >
                                    <span className="text-base">
                                      <Icon
                                        icon={
                                          !item.isConfirm
                                            ? "solar:check-circle-broken"
                                            : "solar:close-circle-broken"
                                        }
                                      />
                                    </span>
                                    <span className="text-sm">
                                      {!item.isConfirm ? "فعال" : "غیرفعال"}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    areYouSureMessage(
                                      () => handleDeleteUser(item._id),
                                      `آیا از حذف کاربر ${item.firstName} ${item.lastName} مطمئنید؟`
                                    )
                                  }
                                >
                                  <div className="hover:bg-red-500/10 hover:text-red-500 w-full border-b border-b-gray-400 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse">
                                    <span className="text-base">
                                      <Icon icon="solar:trash-bin-trash-broken" />
                                    </span>
                                    <span className="text-sm">حذف</span>
                                  </div>
                                </div>
                              </div>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {!isEmpty(users) ? (
          <div className="flex justify-center mt-6 items-center">
            <Pagination
              totalPages={pageCount}
              currentPage={pageNumber}
              handlePageChange={setPageNumber}
            />
          </div>
        ) : (
          <EmptyData />
        )}
      </Card>

      <Modal
        title={isEmpty(user) ? "افزودن کاربر جدید" : "ویرایش کاربر"}
        activeModal={isShowModal}
        onClose={handleHideModal}
      >
        <AvatarCropper
          onRemove={() => setValue("avatar", "")}
          value={watch("avatar")}
          onChange={(file) =>
            handleUploadFile(file, (e) => setValue("avatar", e), 1)
          }
        />

        <form
          autoComplete="off"
          onSubmit={handleSubmit(
            isEmpty(user) ? handleCreateUser : handleEditUser
          )}
          className="space-y-3"
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
          {isEmpty(user) && (
            <>
              <SelectGroup
                name="role"
                label="نقش"
                options={userRoleItems.map((item) => ({
                  label: convertRoleToText(item),
                  value: item,
                }))}
                prepend={<Icon icon="solar:code-2-broken" />}
                placeholder="نقش را انتخاب نمایید"
                register={register}
                error={errors.role}
                merged
              />
              <InputGroup
                name="password"
                type="password"
                label="کلمه عبور"
                prepend={<Icon icon="solar:password-minimalistic-brokenn" />}
                placeholder="کلمه عبور را وارد نمایید"
                register={register}
                error={errors.password}
                merged
              />
              <InputGroup
                name="confirmPassword"
                type="password"
                label="تکرار کلمه عبور"
                prepend={<Icon icon="solar:password-minimalistic-brokenn" />}
                placeholder="تکرار کلمه عبور را وارد نمایید"
                register={register}
                error={errors.confirmPassword}
                merged
              />
            </>
          )}
          {watch("role") && !isEmpty(rolePermissions[watch("role")]) && (
            <>
              <div className="text-gray-900 text-base dark:text-gray-300 font-medium text-right">
                دسترسی ها
              </div>
              <div className="grid grid-cols-3 gap-3">
                {rolePermissions[watch("role")].map((item) => (
                  <div className="col-span-1">
                    <Switch
                      label={convertPermissionToText(item)}
                      value={watch("permissions").includes(item)}
                      onChange={(e) =>
                        setValue(
                          "permissions",
                          e.target.checked
                            ? [...watch("permissions"), item]
                            : watch("permissions").filter((i) => i !== item)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <Button
            type="submit"
            text={`${isEmpty(user) ? "افزودن" : "ویرایش"} کاربر`}
            className="btn btn-primary block w-full text-center "
          />
        </form>
      </Modal>

      <ChangePassword />
    </>
  );
};

export default UsersAdmin;

const ChangePassword = () => {
  const { user, setUser, handleChangeUserPassword } =
    useContext(userAdminContext);

  // Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordForAdminValidation),
  });

  useEffect(() => {
    reset();
  }, [user.isPassword]);

  return (
    <Modal
      title={`ویرایش کلمه عبور ${user?.firstName} ${user?.lastName}`}
      activeModal={user.isPassword}
      onClose={() => setUser({})}
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleChangeUserPassword)}
        className="space-y-3"
      >
        <InputGroup
          name="password"
          label="کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:password-minimalistic-brokenn" />}
          register={register}
          error={errors.password}
          merged
        />
        <InputGroup
          name="confirmPassword"
          label="تکرار کلمه عبور"
          type="password"
          placeholder="کلمه عبور خودرا وارد نمایید"
          prepend={<Icon icon="solar:password-minimalistic-brokenn" />}
          register={register}
          error={errors.confirmPassword}
          merged
        />
        <Button
          type="submit"
          text="ویرایش کلمه عبور"
          className="btn btn-primary block w-full text-center "
        />
      </form>
    </Modal>
  );
};
