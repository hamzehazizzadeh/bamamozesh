import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Menu } from "@headlessui/react";
import { showAvatar } from "../../../../utils";
import { convertRoleToPath, convertRoleToText } from "../../../../utils/enum";

const ProfileLabel = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="rounded-full transition-all duration-300 h-9 w-9">
      <img
        src={showAvatar(user.avatar)}
        alt=""
        className="block w-full h-full object-cover rounded-full ring-1 ring-indigo-700 ring-offset-4 dark:ring-offset-gray-700"
      />
    </div>
  );
};

const Profile = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const ProfileMenu = [
    {
      label: "ویرایش حساب کاربری",
      icon: "solar:user-broken",
      status: "green",
      action: () => {
        navigate(`/${convertRoleToPath(auth.role)}/profile`);
      },
    },
    {
      label: "ویرایش کلمه عبور",
      icon: "solar:pen-new-square-broken",
      status: "blue",
      action: () => {
        navigate(`/${convertRoleToPath(auth.role)}/profile/changed-password`);
      },
    },
  ];

  const handleLogout = () => navigate("/auth/logout");

  return (
    <Dropdown label={<ProfileLabel />} classMenuItems="w-[220px] top-[58px]  ">
      <div className="flex items-center px-4 py-3 border-b border-gray-10 mb-3">
        <div className="flex-none ltr:mr-[10px] rtl:ml-[10px]">
          <div className="h-[46px] w-[46px] rounded-full">
            <img
              src={showAvatar(user.avatar)}
              alt=""
              className="block w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 text-gray-700 dark:text-white text-sm font-semibold">
          <span className=" truncate w-full block">
            {user.firstName} {user.lastName}
          </span>
          <span className="block font-light text-xs capitalize">
            {convertRoleToText(user?.role)}
          </span>
        </div>
      </div>
      <div className=" space-y-3">
        {ProfileMenu.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <div
                onClick={() => item.action()}
                className={`${
                  active
                    ? "text-indigo-500"
                    : "text-gray-600 dark:text-gray-300"
                } block transition-all duration-150 group`}
              >
                <div className="block cursor-pointer px-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span
                      className={`flex-none h-9 w-9 inline-flex items-center justify-center group-hover:scale-110 transition-all duration-200  rounded-full text-2xl  text-white ${
                        item.status === "cyan" ? "bg-cyan-500 " : ""
                      } ${item.status === "blue" ? "bg-indigo-500 " : ""} ${
                        item.status === "red" ? "bg-red-500 " : ""
                      } ${item.status === "green" ? "bg-green-500 " : ""} ${
                        item.status === "yellow" ? "bg-yellow-500 " : ""
                      }`}
                    >
                      <Icon icon={item.icon} />
                    </span>
                    <span className="block text-sm">{item.label}</span>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>
        ))}
        <Menu.Item onClick={handleLogout}>
          <div className="block cursor-pointer px-4 border-t border-gray-10 py-3 mt-1 text-indigo-500">
            <Button
              icon="solar:logout-3-broken"
              rotate={2}
              text="خروج از حساب کاربری"
              className="btn-danger block w-full btn-sm"
            />
          </div>
        </Menu.Item>
      </div>
    </Dropdown>
  );
};

export default Profile;
