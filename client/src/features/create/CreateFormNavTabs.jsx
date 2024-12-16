import NavTabs from "../../ui/NavTabs";

function CreateFormTabs() {
  return (
    <NavTabs
      stylingType="createFormTabs"
      fieldComponent="formType"
      options={[
        { value: "new-brand", label: "Brand" },
        { value: "new-bike", label: "Bike" },
        { value: "new-category", label: "Category" },
        { value: "new-subCategory", label: "SubCategory" },
        { value: "new-part", label: "Part" },
        { value: "new-product", label: "Product" },
        { value: "new-purchase", label: "Purchase" },
      ]}
    />
  );
}

export default CreateFormTabs;
