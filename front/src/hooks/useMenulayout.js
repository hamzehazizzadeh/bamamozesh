import { useDispatch, useSelector } from "react-redux";

import { setLayoutAction } from "../redux/actions/layoutActions/layoutActions";

const useMenuLayout = () => {
  const dispatch = useDispatch();
  const menuType = useSelector((state) => state.layout.type);

  const setMenuLayout = (value) => {
    dispatch(setLayoutAction("type", value));
  };

  return [menuType, setMenuLayout];
};

export default useMenuLayout;
