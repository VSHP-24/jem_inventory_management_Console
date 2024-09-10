import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectCategories from "../categories/SelectCategories";

import { useCreateSubCategory } from "./useCreateSubCategory";
import Button from "../../ui/Button";

function SubCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isCreating, createSubCategory } = useCreateSubCategory();

  function onSubmit(data) {
    createSubCategory({ ...data }, { onSuccess: () => reset() });
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
            disabled={isCreating}
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
          <Button size="medium" variation="secondary" type="reset">
            Cancel
          </Button>
          <Button size="large" variation="primary" disabled={isCreating}>
            Create
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SubCategoryForm;
