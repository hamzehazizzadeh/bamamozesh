import { useDispatch } from "react-redux";

const useContentWidth = () => {
  const dispatch = useDispatch();
  const contentWidth = {};

  // ** Toggles Content Width
  // const setContentWidth = (val) => dispatch(handleContentWidth(val));
  const setContentWidth = () => {};

  return [contentWidth, setContentWidth];
};

export default useContentWidth;
