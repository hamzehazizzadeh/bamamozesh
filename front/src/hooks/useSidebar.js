const useSidebar = () => {
  // const collapsed = useSelector((state) => state.layout.isCollapsed);
  const collapsed = {};

  // ** Toggles Menu Collapsed
  // const setMenuCollapsed = (val) => dispatch(handleSidebarCollapsed(val));
  const setMenuCollapsed = () => {};

  return [collapsed, setMenuCollapsed];
};

export default useSidebar;
