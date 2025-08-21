import { getMetaUserService } from "../../../services/userServices";

export const setMetaAction = () => {
  return async (dispatch) => {
    try {
      const { status, data } = await getMetaUserService();
      if (status === 200) {
        await dispatch({ type: "SET_META", payload: data.result });
      }
    } catch ({ response }) {
      console.log("Bam Amozesh get meta");
    }
  };
};

export const clearMetaAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_META", payload: {} });
  };
};
