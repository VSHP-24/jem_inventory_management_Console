import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectCategories from "../categories/SelectCategories";
import Button from "../../ui/Button";

import { useCreateSubCategory } from "./useCreateSubCategory";
import { useEditSubCategory } from "./useEditSubCategory";

function SubCategoryForm({ subCategoryToEdit = {}, onCloseModal }) {
  ////////////////////////////////////////////////////////////
  // AUTOFILL EXISTING SUBCATEGORY DETAILS IN EDIT SESSION
  ////////////////////////////////////////////////////////////
  const { id: editId, category, ...editValues } = subCategoryToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession
      ? { category: category.id, ...editValues }
      : {},
  });

  const { isCreating, createSubCategory } = useCreateSubCategory();
  const { isEditing, editSubCategory } = useEditSubCategory();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editSubCategory({ ...data }, { onSuccess: onCloseModal });
    } else createSubCategory({ ...data }, { onSuccess: () => reset() });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="SubCategory Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            placeholder="Enter a SubCategory Name"
            disabled={isWorking}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Category" error={errors?.category?.message}>
          <Select
            name="category"
            id="category"
            {...register("category", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectCategories />
          </Select>
        </FormRow>

        <FormRow>
          <Button
            size="medium"
            variation="secondary"
            type={isEditSession ? "button" : "reset"}
            onClick={onCloseModal}
          >
            Cancel
          </Button>

          <Button size="large" variation="primary" disabled={isWorking}>
            {isEditSession ? "Edit SubCategory" : "Create SubCategory"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SubCategoryForm;
