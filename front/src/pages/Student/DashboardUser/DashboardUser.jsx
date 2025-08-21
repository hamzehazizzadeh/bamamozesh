import { dashboardUserContext } from "../../../context/UserContext/DashboardUserContext/DashboardUserContext";

const DashboardUser = () => {
  const { overview, handleGetOverview } = useContext(dashboardUserContext);

  useEffect(() => {
    handleGetOverview();
  }, []);

  return (
    <>
      <SiteTitle title="خانه" />
    </>
  );
};

export default DashboardUser;
