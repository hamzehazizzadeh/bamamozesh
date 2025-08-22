import { useDispatch, useSelector } from "react-redux";

import { setLayoutAction } from "../redux/actions/layoutActions/layoutActions";

const useMenuHidden = () => {
  const dispatch = useDispatch();
  const menuHidden = useSelector((state) => state.layout.menuHidden);

  const setMenuHidden = (value) => {
    dispatch(setLayoutAction("menuHidden", value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;
