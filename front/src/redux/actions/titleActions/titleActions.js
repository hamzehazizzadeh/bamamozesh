export const setTitleAction = (payload) => {
  return async (dispatch) => {
    await dispatch({ type: "SET_TITLE", payload });
  };
};

export const clearTitleAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_TITLE" });
  };
};
