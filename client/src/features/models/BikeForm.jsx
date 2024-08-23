import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectBrands from "../brands/SelectBrands";

import Textarea from "../../ui/Textarea";

import { useCreateModel } from "./useCreateModel";

function BikeForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createModel } = useCreateModel();

  function onSubmit(data) {
    createModel({ ...data }, { onSuccess: (data) => reset() });
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
            disabled={isCreating}
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
            disabled={isCreating}
            {...register("version")}
          />
        </FormRow>

        <FormRow label="Bike Model Year" error={errors?.year?.message}>
          <Input
            type="text"
            id="year"
            disabled={isCreating}
            {...register("year", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Bike Image" error={errors?.bikeImage?.message}>
          <Input
            type="text"
            id="bikeImage"
            {...register("bikeImage", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea type="text" id="description" {...register("description")} />
        </FormRow>

        <FormRow>
          <button type="reset">Cancel</button>
          <button disabled={isCreating}>Create</button>
        </FormRow>
      </Form>
    </>
  );
}

export default BikeForm;
