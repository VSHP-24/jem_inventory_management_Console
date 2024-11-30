import NavTabs from "../../ui/NavTabs";

function UsersNavTabs() {
  return (
    <NavTabs
      fieldComponent={"userOptions"}
      options={[
        { value: "myProfile", label: "My Profile" },
        { value: "updatePassword", label: "Update Password" },
        { value: "createStaffProfile", label: "Create Staff Profile" },
        { value: "allUsers", label: "All Users" },
      ]}
    />
  );
}

export default UsersNavTabs;
