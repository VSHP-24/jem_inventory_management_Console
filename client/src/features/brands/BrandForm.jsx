import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

import { useCreateBrand } from "./useCreateBrand";
import supabase, { supabaseUrl } from "../../services/supabase";
import { useEditBrand } from "./useEditBrand";

function BrandForm({ brandToEdit = {}, onCloseModal }) {
  ////////////////////////////////////////////////////
  // AUTOFILL EXISTING BRAND DETAILS IN EDIT SESSION
  ////////////////////////////////////////////////////
  const { id: editId, ...editValues } = brandToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createBrand } = useCreateBrand();
  const { isEditing, editBrand } = useEditBrand();

  const isWorking = isCreating || isEditing;

  async function onSubmit(data) {
    //CHECK IF BRAND LOGO IS A LINK OR A NEW FILE
    const hasImagePath = data.brandLogo?.startsWith?.(supabaseUrl);

    //SET IMAGE NAME BEFORE UPLOADING IT TO STORAGE BUCKET
    const imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
      "/",
      ""
    );

    //THE STORAGE LINK IS SET IN DB
    const imagePath = hasImagePath
      ? data.brandLogo
      : `${supabaseUrl}/storage/v1/object/public/brandLogos/${imageName}`;

    //IF BRAND LOGO IS A FILE , HERE IT UPLOADS TO THE STORAGE BUCKET
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("brandLogos")
        .upload(imageName, data.brandLogo[0]);

      if (storageError)
        toast.error(
          "Brand Logo could not be uploaded and the brand was not created"
        );
    }

    if (isEditSession) {
      editBrand({ ...data, brandLogo: imagePath }, { onSuccess: onCloseModal });
    } else
      createBrand({ ...data, brandLogo: imagePath }, { onSuccess: reset() });
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
            placeholder="Enter a Brand Name"
            disabled={isWorking}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Brand Logo" error={errors?.brandLogo?.message}>
          <FileInput
            accept="image/*"
            id="brandLogo"
            {...register("brandLogo", {
              required: isEditSession ? false : "*Brand Logo is required",
              validate: (value) => {
                if (
                  !value.startsWith?.(supabaseUrl) &&
                  !value[0].type.startsWith("image")
                )
                  return "*Brand Logo should be an image";
              },
            })}
          />
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
            {isEditSession ? "Edit Brand" : "Create Brand"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default BrandForm;
