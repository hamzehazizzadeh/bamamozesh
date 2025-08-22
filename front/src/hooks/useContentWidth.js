import { useDispatch, useSelector } from "react-redux";

import { setLayoutAction } from "../redux/actions/layoutActions/layoutActions";

const useContentWidth = () => {
  const dispatch = useDispatch();

  const contentWidth = useSelector((state) => state.layout.contentWidth);

  // ** Toggles Content Width
  const setContentWidth = (val) =>
    dispatch(setLayoutAction("contentWidth", val));

  return [contentWidth, setContentWidth];
};

export default useContentWidth;
