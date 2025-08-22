import { createContext } from "react";
import { useDispatch } from "react-redux";

import {
  setLoadingFalseAction,
  setLoadingTrueAction,
} from "../../../redux/actions/loadingActions/loadingActions";
import {
  changePasswordAuthService,
  editInfoUserService,
} from "../../../services/userServices";
import {
  deliverySuccessMessage,
  toastErrorMessage,
  toastSuccessMessage,
} from "../../../utils/toastMessage/toastMessage";
import { setUserAction } from "../../../redux/actions/userActions/userActions";

export const profileUserContext = createContext({
  handleEditUserInfo: () => {},
  handleChangePassword: () => {},
});

const ProfileUserContext = ({ children }) => {
  const dispatch = useDispatch();

  // Edit User Info
  const handleEditUserInfo = async (userData) => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await editInfoUserService(userData);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        dispatch(setUserAction());
      }
    } catch ({ response }) {
      if (response && response.status)
        toastErrorMessage(response.data.resultMessage);
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  // Change Password
  const handleChangePassword = async (userData) => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await changePasswordAuthService(userData);
      if (status === 200) {
        deliverySuccessMessage(data.resultMessage, "/auth/logout", "3000");
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
      <profileUserContext.Provider
        value={{
          handleEditUserInfo,
          handleChangePassword,
        }}
      >
        {children}
      </profileUserContext.Provider>
    </>
  );
};

export default ProfileUserContext;
