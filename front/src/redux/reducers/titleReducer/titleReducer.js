export const titleReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return action.payload;
    case "CLEAR_TITLE":
      return {};
    default:
      return state;
  }
};
