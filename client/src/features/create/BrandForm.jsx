import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateBrand } from "../brands/useCreateBrand";

function BrandForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createBrand } = useCreateBrand();

  function onSubmit(data) {
    createBrand({ ...data }, { onSuccess: (data) => reset() });
  }

  function onError(errors) {
    // console.log(errors);
    return null;
  }
  return (
    <>
      <p>New Brand </p>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Brand Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isCreating}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Brand Logo" error={errors?.brandLogo?.message}>
          <Input
            type="text"
            id="brandLogo"
            {...register("brandLogo", { required: "*This field is required" })}
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

export default BrandForm;
