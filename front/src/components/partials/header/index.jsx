import clsx from "clsx";

import Icon from "@/components/ui/Icon";
import SwitchDark from "./Tools/SwitchDark";
import HorizentalMenu from "./Tools/HorizentalMenu";
import useWidth from "@/hooks/useWidth";
import useMenulayout from "@/hooks/useMenulayout";
import Logo from "./Tools/Logo";
import SearchBox from "./Tools/SearchBox";
import Profile from "./Tools/Profile";
import useMobileMenu from "@/hooks/useMobileMenu";

const Header = ({ className = "custom-class" }) => {
  const { width, breakpoints } = useWidth();

  const [menuType] = useMenulayout();

  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const handleOpenMobileMenu = () => setMobileMenu(!mobileMenu);

  return (
    <header
      className={clsx(
        className,
        "transition-all duration-300 has-sticky-header"
      )}
    >
      <div className="app-header md:px-6 px-[15px] transition-all  duration-300 backdrop-blur-[6px] bg-white dark:bg-gray-800 shadow-base py-3 vertical_menu">
        <div className="flex justify-between items-center h-full relative">
          <div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
            {width < breakpoints.xl && <Logo />}
            <div>
              <SearchBox />
            </div>
          </div>

          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            <SwitchDark />

            <Profile />

            <div
              className="cursor-pointer text-gray-900 dark:text-white text-2xl xl:hidden  block"
              onClick={handleOpenMobileMenu}
            >
              <Icon icon="heroicons-outline:menu-alt-3" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
