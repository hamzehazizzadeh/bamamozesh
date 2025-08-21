import { createContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAuthAction } from "../../redux/actions/authActions/authActions";
import {
  setLoadingFalseAction,
  setLoadingTrueAction,
} from "../../redux/actions/loadingActions/loadingActions";
import {
  toastErrorMessage,
  toastSuccessMessage,
} from "../../utils/toastMessage/toastMessage";
import {
  forgotPasswordAuthService,
  loginAuthService,
  registerAuthService,
} from "../../services/userServices";

export const authContext = createContext({
  handleRegister: () => {},
  handleLogin: () => {},
  handleForgetPassword: () => {},
});

const AuthContext = ({ children }) => {
  // Redux Dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const afterLogin = (data) => {
    dispatch(setAuthAction(data.accessToken));
    navigate("/", { replace: true });
  };

  // Register
  const handleRegister = async (userData) => {
    const objData = {
      ...userData,
    };

    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await registerAuthService(objData);
      if (status === 200) {
        afterLogin(data.result);
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data?.resultMessage);
        }
      }
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  // Login
  const handleLogin = async (userData) => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await loginAuthService(userData);
      if (status === 200) {
        afterLogin(data.result);
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  // Forget Password
  const handleForgetPassword = async (userData) => {
    try {
      dispatch(setLoadingTrueAction());
      const { data, status } = await forgotPasswordAuthService(userData);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        navigate("/auth/login", {
          replace: true,
        });
      }
    } catch ({ response }) {
      if (response && response.status)
        toastErrorMessage(response.data.resultMessage);
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  return (
    <authContext.Provider
      value={{
        handleRegister,
        handleLogin,
        handleForgetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
