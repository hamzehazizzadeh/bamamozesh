import { createContext, useState } from "react";
import { useDispatch } from "react-redux";

import { getOverviewUserService } from "../../../services/userServices";
import { toastErrorMessage } from "../../../utils/toastMessage/toastMessage";
import {
  setLoadingFalseAction,
  setLoadingTrueAction,
} from "../../../redux/actions/loadingActions/loadingActions";

export const dashboardUserContext = createContext({
  overview: {},
  setOverview: () => {},
  handleGetOverview: () => {},
});

const DashboardUserContext = ({ children }) => {
  const dispatch = useDispatch();

  const [overview, setOverview] = useState({});

  // Get Overview
  const handleGetOverview = async () => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await getOverviewUserService();
      if (status === 200) {
        setOverview(data.result);
      }
    } catch ({ response }) {
      if (response && response.status)
        toastErrorMessage(response.data.resultMessage);
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  return (
    <>
      <dashboardUserContext.Provider
        value={{ overview, setOverview, handleGetOverview }}
      >
        {children}
      </dashboardUserContext.Provider>
    </>
  );
};

export default DashboardUserContext;
