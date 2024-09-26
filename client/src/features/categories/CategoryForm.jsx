import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateCategory } from "./useCreateCategory";
import Button from "../../ui/Button";

import { useEditCategory } from "./useEditCategory";

function CategoryForm({ categoryToEdit = {}, setShowForm }) {
  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editCategory({ ...data }, { onSuccess: setShowForm((show) => !show) });
    } else createCategory({ ...data }, { onSuccess: () => reset() });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Category Name" error={errors?.name?.message}>
          <Input
            type="text"
            placeholder="Enter a Category Name"
            id="name"
            disabled={isWorking}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow>
          <Button
            size="medium"
            variation="secondary"
            type={isEditSession ? "button" : "reset"}
          >
            Cancel
          </Button>
          <Button size="large" variation="primary" disabled={isWorking}>
            {isEditSession ? "Edit Category" : "Create Category"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CategoryForm;
