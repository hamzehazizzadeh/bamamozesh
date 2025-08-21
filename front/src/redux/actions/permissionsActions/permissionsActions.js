import { convertPermission, decodeJWT } from "./../../../utils";

export const setPermissionsAction = (accessToken) => {
  const permissions = decodeJWT(accessToken)?.permissions;

  return async (dispatch) => {
    await dispatch({
      type: "SET_PERMISSIONS",
      payload: convertPermission(permissions || []),
    });
  };
};

export const clearPermissionsAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_PERMISSIONS" });
  };
};
