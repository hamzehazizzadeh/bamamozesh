import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const useMobileMenu = () => {
  const dispatch = useDispatch();
  // const mobileMenu = useSelector((state) => state.layout.mobileMenu);
  const mobileMenu = {};
  const location = useLocation();

  // ** Toggles Mobile Menu
  // const setMobileMenu = (val) => dispatch(handleMobileMenu(val));
  const setMobileMenu = () => {};

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
