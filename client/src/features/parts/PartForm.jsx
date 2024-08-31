import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreatePart } from "./useCreatePart";
import Button from "../../ui/Button";

function PartForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm();

  const { isCreating, createPart } = useCreatePart();

  function onSubmit(data) {
    createPart({ ...data }, { onSuccess: (data) => reset() });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Part Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            placeholder="Enter a Part Name"
            disabled={isCreating}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Length" error={errors?.length?.message}>
          <Input
            type="number"
            id="length"
            disabled={isCreating}
            {...register("length")}
          />
        </FormRow>

        <FormRow
          label="Inside Diameter"
          error={errors?.insideDiameter?.message}
        >
          <Input
            type="number"
            id="insideDiameter"
            disabled={isCreating}
            {...register("insideDiameter")}
          />
        </FormRow>

        <FormRow
          label="Outside Diameter"
          error={errors?.outsideDiameter?.message}
        >
          <Input
            type="number"
            id="outsideDiameter"
            disabled={isCreating}
            {...register("outsideDiameter")}
          />
        </FormRow>

        <FormRow
          label="Thread Diameter"
          error={errors?.threadDiameter?.message}
        >
          <Input
            type="number"
            id="threadDiameter"
            disabled={isCreating}
            {...register("threadDiameter")}
          />
        </FormRow>

        <FormRow label="Thread Pitch" error={errors?.threadPitch?.message}>
          <Input
            type="number"
            id="threadPitch"
            disabled={isCreating}
            {...register("threadPitch")}
          />
        </FormRow>

        <FormRow label="Shank Length" error={errors?.shankLength?.message}>
          <Input
            type="number"
            id="shankLength"
            disabled={isCreating}
            {...register("shankLength")}
          />
        </FormRow>

        <FormRow label="Head Height" error={errors?.headHeight?.message}>
          <Input
            type="number"
            id="headHeight"
            disabled={isCreating}
            {...register("headHeight")}
          />
        </FormRow>

        <FormRow label="Head Diameter" error={errors?.headDiameter?.message}>
          <Input
            type="number"
            id="headDiameter"
            disabled={isCreating}
            {...register("headDiameter")}
          />
        </FormRow>

        <FormRow label="Allen Key Size" error={errors?.allenKeySize?.message}>
          <Input
            type="number"
            id="allenKeySize"
            disabled={isCreating}
            {...register("allenKeySize")}
          />
        </FormRow>

        <FormRow label="Width" error={errors?.width?.message}>
          <Input
            type="number"
            id="width"
            disabled={isCreating}
            {...register("width")}
          />
        </FormRow>

        <FormRow label="Thickness" error={errors?.thickness?.message}>
          <Input
            type="number"
            id="thickness"
            disabled={isCreating}
            {...register("thickness")}
          />
        </FormRow>

        <FormRow label="Material" error={errors?.material?.message}>
          <Input
            type="text"
            id="material"
            disabled={isCreating}
            {...register("material")}
          />
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

export default PartForm;
