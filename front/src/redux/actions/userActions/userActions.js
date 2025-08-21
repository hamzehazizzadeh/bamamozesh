import { getInfoUserService } from "../../../services/userServices";

export const setUserAction = (userInfo) => {
  return async (dispatch) => {
    if (userInfo) {
      await dispatch({ type: "SET_USER", payload: userInfo });
    } else {
      try {
        const { status, data } = await getInfoUserService();
        if (status === 200) {
          await dispatch({ type: "SET_USER", payload: data.result });
        }
      } catch ({ response }) {
        console.log("Bam Amozesh get profile");
      }
    }
  };
};

export const clearUserAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_USER", payload: {} });
  };
};
