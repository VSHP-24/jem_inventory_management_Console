import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectBrands from "../brands/SelectBrands";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

import supabase, { supabaseUrl } from "../../services/supabase";
import { useEditModel } from "./useEditModel";
import { useCreateModel } from "./useCreateModel";

function ModelForm({ modelToEdit = {}, onCloseModal }) {
  /////////////////////////////////////////////////////////
  // AUTOFILL EXISTING BIKE MODEL DETAILS IN EDIT SESSION
  /////////////////////////////////////////////////////////
  const { id: editId, brand, ...editValues } = modelToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? { brand: brand.id, ...editValues } : {},
  });

  const { isCreating, createModel } = useCreateModel();
  const { isEditing, editModel } = useEditModel();

  const isWorking = isCreating || isEditing;

  async function onSubmit(data) {
    //CHECK IF BIKE MODEL HAS A LINK OR A NEW FILE
    const hasImagePath = data.bikeImage?.startsWith?.(supabaseUrl);

    //SET IMAGE NAME BEFORE UPLOADING IT TO STORAGE BUCKET
    const imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
      "/",
      ""
    );

    //THE STORAGE LINK IS SET IN DB
    const imagePath = hasImagePath
      ? data.bikeImage
      : `${supabaseUrl}/storage/v1/object/public/bikeModelImages/${imageName}`;

    //IF BIKE MODEL IMAGE IS A FILE , HERE IT UPLOADS TO THE STORAGE BUCKET
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("bikeModelImages")
        .upload(imageName, data.bikeImage[0]);

      if (storageError)
        toast.error(
          "Bike Image could not be uploaded and the bike model was not created"
        );
    }

    if (isEditSession) {
      editModel({ ...data, bikeImage: imagePath }, { onSuccess: onCloseModal });
    } else
      createModel(
        { ...data, bikeImage: imagePath },
        { onSuccess: () => reset() }
      );
  }

  function onError(errors) {
    return null;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Bike Model Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            placeholder="Enter a Bike Model"
            disabled={isWorking}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Brand" error={errors?.brand?.message}>
          <Select
            name="brand"
            id="brand"
            {...register("brand", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectBrands />
          </Select>
        </FormRow>

        <FormRow label="Bike Version" error={errors?.version?.message}>
          <Input
            type="text"
            id="version"
            placeholder="Enter the Bike Version e.g. v1"
            disabled={isWorking}
            {...register("version")}
          />
        </FormRow>

        <FormRow label="Bike Model Year" error={errors?.year?.message}>
          <Input
            type="text"
            id="year"
            placeholder="Enter the Bike Model Year e.g.2024"
            disabled={isWorking}
            {...register("year", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Bike Image" error={errors?.bikeImage?.message}>
          <FileInput
            accept="image/*"
            id="bikeImage"
            {...register("bikeImage", {
              required: isEditSession ? false : "*This field is required",
              validate: (value) => {
                if (
                  !value.startsWith?.(supabaseUrl) &&
                  !value[0].type.startsWith("image")
                )
                  return "*Bike Picture should be an image";
              },
            })}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            type="text"
            placeholder="Enter a brief description about the Bike Model"
            id="description"
            {...register("description")}
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
            {isEditSession ? "Edit Model" : "Create Model"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default ModelForm;
