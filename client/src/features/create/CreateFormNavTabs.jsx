import NavTabs from "../../ui/NavTabs";

function CreateFormTabs() {
  return (
    <NavTabs
      fieldComponent="formType"
      options={[
        { value: "new-brand", label: "New Brand" },
        { value: "new-bike", label: "New Bike" },
        { value: "new-category", label: "New Category" },
        { value: "new-subCategory", label: "New SubCategory" },
        { value: "new-part", label: "New Part" },
        { value: "new-product", label: "New Product" },
      ]}
    />
  );
}

export default CreateFormTabs;
