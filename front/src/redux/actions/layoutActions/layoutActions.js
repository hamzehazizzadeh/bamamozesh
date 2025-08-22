import themeConfig from "@/configs/themeConfig";

const initialDarkMode = () => {
  const item = localStorage.getItem("darkMode");
  return item ? item === "true" : themeConfig.layout.darkMode;
};

const initialSidebarCollapsed = () => {
  const item = localStorage.getItem("isCollapsed");
  return item ? item === "true" : themeConfig.layout.menu.isCollapsed;
};

const initialSemiDarkMode = () => {
  const item = localStorage.getItem("semiDarkMode");
  return item ? item === "true" : themeConfig.layout.semiDarkMode;
};

const initialType = () => {
  const item = localStorage.getItem("type");
  return item ? JSON.parse(item) : themeConfig.layout.type;
};

const initialState = {
  isRTL: true,
  darkMode: initialDarkMode(),
  isCollapsed: initialSidebarCollapsed(),
  customizer: themeConfig.layout.customizer,
  semiDarkMode: initialSemiDarkMode(),
  contentWidth: themeConfig.layout.contentWidth,
  type: initialType(),
  menuHidden: themeConfig.layout.menu.isHidden,
  mobileMenu: themeConfig.layout.mobileMenu,
};

export const setLayoutAction = (key, value) => {
  console.log(value);
  return async (dispatch) => {
    await dispatch({
      type: "SET_LAYOUT",
      payload: { ...initialState, ...(key && { [key]: value }) },
    });
    if (key) localStorage.setItem(key, value);
  };
};

export const clearLayoutAction = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_LAYOUT", payload: {} });
  };
};
