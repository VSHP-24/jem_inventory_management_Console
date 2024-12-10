import NavTabs from "../../ui/NavTabs";

function DashboardFilter() {
  return (
    <NavTabs
      fieldComponent="dataDuration"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
        { value: "all", label: "All" },
      ]}
      width="40rem"
    />
  );
}

export default DashboardFilter;
