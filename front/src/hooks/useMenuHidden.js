import { useDispatch } from "react-redux";

const useMenuHidden = () => {
  const dispatch = useDispatch();
  // const menuHidden = useSelector((state) => state.layout.menuHidden);
  const menuHidden = {};

  const setMenuHidden = (value) => {
    // dispatch(handleMenuHidden(value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;
