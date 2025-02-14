import NavTabs from "../../ui/NavTabs";

function ManageTableNavTabs() {
  return (
    <NavTabs
      stylingType="manageTableNavFilter"
      fieldComponent="tableType"
      options={[
        { value: "brands", label: "Brands" },
        { value: "bikes", label: "Bikes" },
        { value: "categories", label: "Categories" },
        { value: "subCategories", label: "SubCategories" },
      ]}
    />
  );
}

export default ManageTableNavTabs;
