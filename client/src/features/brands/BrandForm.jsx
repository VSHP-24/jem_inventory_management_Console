import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateBrand } from "./useCreateBrand";
import FileInput from "../../ui/FileInput";
import supabase, { supabaseUrl } from "../../services/supabase";

function BrandForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createBrand } = useCreateBrand();

  async function onSubmit(data) {
    const imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/brandLogos/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("brandLogos")
      .upload(imageName, data.brandLogo[0]);

    if (storageError)
      throw new Error(
        "Brand Logo could not be uploaded and the brand was not created"
      );
    createBrand(
      { ...data, brandLogo: imagePath },
      { onSuccess: (data) => reset() }
    );
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
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
          <FileInput
            accept="image/*"
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
