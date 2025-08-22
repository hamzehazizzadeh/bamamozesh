import { useDispatch, useSelector } from "react-redux";

import { setLayoutAction } from "../redux/actions/layoutActions/layoutActions";

const useMobileMenu = () => {
  const dispatch = useDispatch();

  const mobileMenu = useSelector((state) => state.layout.mobileMenu);

  // ** Toggles Mobile Menu
  const setMobileMenu = (val) => dispatch(setLayoutAction("mobileMenu", val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
