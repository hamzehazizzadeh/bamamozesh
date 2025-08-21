import { useSelector, useDispatch } from "react-redux";

const useSemiDark = () => {
  const dispatch = useDispatch();
  // const isSemiDark = useSelector((state) => state.layout.semiDarkMode);
  const isSemiDark = {};

  // const setSemiDark = (val) => dispatch(handleSemiDarkMode(val));
  const setSemiDark = () => {};

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;
