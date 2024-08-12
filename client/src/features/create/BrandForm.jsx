import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { createBrand } from "../../services/apiBrands";

function BrandForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success(` New Brand successfully created `);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    // console.log(data);
    mutate(data);
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
