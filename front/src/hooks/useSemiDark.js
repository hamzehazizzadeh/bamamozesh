import { useSelector, useDispatch } from "react-redux";

import { setLayoutAction } from "../redux/actions/layoutActions/layoutActions";

const useSemiDark = () => {
  const dispatch = useDispatch();

  const isSemiDark = useSelector((state) => state.layout.semiDarkMode);

  const setSemiDark = (val) => dispatch(setLayoutAction("semiDarkMode", val));

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;
