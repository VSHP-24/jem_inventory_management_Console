import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateCategory } from "../categories/useCreateCategory";

function CategoryForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createCategory } = useCreateCategory();

  function onSubmit(data) {
    createCategory({ ...data }, { onSuccess: (data) => reset() });
  }

  function onError(errors) {
    // console.log(errors);
    return null;
  }
  return (
    <>
      <p>New Category </p>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Category Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isCreating}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow>
          <button type="reset">Cancel</button>
          <button disabled={isCreating}>Create</button>
        </FormRow>
      </Form>
    </>
  );
}

export default CategoryForm;
