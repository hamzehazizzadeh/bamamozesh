import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { userRoleItems } from "../utils/enum";

const useMenuData = () => {
  const auth = useSelector((state) => state.auth);
  const permissions = useSelector((state) => state.permissions);

  const [menu, setMenu] = useState([]);

  const admin = [
    {
      isHeadr: true,
      title: "خانه",
    },

    {
      title: "خانه",
      isHide: true,
      icon: "solar:home-smile-angle-broken",
      link: "/admin",
    },
  ];
  const student = [
    {
      isHeadr: true,
      title: "خانه",
    },

    {
      title: "خانه",
      isHide: true,
      icon: "solar:home-smile-angle-broken",
      link: "/student",
    },
  ];

  useEffect(() => {
    const items = {
      [userRoleItems[0]]: admin,
      [userRoleItems[1]]: student,
    };

    setMenu(items[auth?.role || userRoleItems[1]].filter(Boolean));
  }, [auth, permissions]);

  return menu;
};

export default useMenuData;
