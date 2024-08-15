import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectCategories from "../categories/SelectCategories";

import { useCreateSubCategory } from "../subCategories/useCreateSubCategory";

function SubCategoryForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createSubCategory } = useCreateSubCategory();

  function onSubmit(data) {
    createSubCategory({ ...data }, { onSuccess: (data) => reset() });
  }

  function onError(errors) {
    // console.log(errors);
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="SubCategory Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
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
          <button type="reset">Cancel</button>
          <button disabled={isCreating}>Create</button>
        </FormRow>
      </Form>
    </>
  );
}

export default SubCategoryForm;
