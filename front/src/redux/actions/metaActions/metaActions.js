import { getMetaUserService } from "../../../services/userServices";
import { getCookies } from "../../../utils";

export const setMetaAction = () => {
  return async (dispatch) => {
    try {
      const { status, data } = await getMetaUserService();
      if (status === 200) {
        await dispatch({ type: "SET_META", payload: data.result });
      }
    } catch ({ response }) {
      console.log("Net Boof get meta");
    }
  };
};

export const clearMetaAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_META", payload: {} });
  };
};
