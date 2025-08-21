import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";

import { setTitleAction } from "../../redux/actions/titleActions/titleActions";

const SiteTitle = ({
  title,
  backUrl,
  isVisibleSuffix = true,
  endContent = null,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setTitleAction({ title, endContent, ...(backUrl && { backUrl }) })
    );
  }, [title, endContent, backUrl]);

  return (
    <Helmet>
      <title>
        {title} {isVisibleSuffix ? " | سامانه جامع آموزش اصناف بم" : ""}
      </title>
    </Helmet>
  );
};

export default SiteTitle;
