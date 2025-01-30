import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import { useCreatePart } from "./useCreatePart";
import { useEditPart } from "./useEditPart";

function PartForm({ type, partToEdit = {}, onCloseModal }) {
  ////////////////////////////////////////////////////
  // AUTOFILL EXISTING PARTS DETAILS IN EDIT SESSION
  ////////////////////////////////////////////////////
  const { id: editId, ...editValues } = partToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createPart } = useCreatePart();
  const { isEditing, editPart } = useEditPart();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editPart({ ...data }, { onSuccess: onCloseModal });
    } else createPart({ ...data }, { onSuccess: () => reset() });
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
            disabled={isWorking}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Length" error={errors?.length?.message}>
          <Input
            type="number"
            id="length"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("length", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Inside Diameter"
          error={errors?.insideDiameter?.message}
        >
          <Input
            type="number"
            id="insideDiameter"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("insideDiameter", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Outside Diameter"
          error={errors?.outsideDiameter?.message}
        >
          <Input
            type="number"
            id="outsideDiameter"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("outsideDiameter", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Thread Diameter"
          error={errors?.threadDiameter?.message}
        >
          <Input
            type="number"
            id="threadDiameter"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("threadDiameter", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Thread Pitch" error={errors?.threadPitch?.message}>
          <Input
            type="number"
            id="threadPitch"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("threadPitch", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Shank Length" error={errors?.shankLength?.message}>
          <Input
            type="number"
            id="shankLength"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("shankLength", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Head Height" error={errors?.headHeight?.message}>
          <Input
            type="number"
            id="headHeight"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("headHeight", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Head Diameter" error={errors?.headDiameter?.message}>
          <Input
            type="number"
            id="headDiameter"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("headDiameter", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Allen Key Size" error={errors?.allenKeySize?.message}>
          <Input
            type="number"
            placeholder="Enter the dimension in mm"
            id="allenKeySize"
            disabled={isWorking}
            {...register("allenKeySize", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Width" error={errors?.width?.message}>
          <Input
            type="number"
            id="width"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("width", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Thickness" error={errors?.thickness?.message}>
          <Input
            type="number"
            id="thickness"
            placeholder="Enter the dimension in mm"
            disabled={isWorking}
            {...register("thickness", {
              min: {
                value: 1,
                message: "*Minimum Value should be atleast 1mm",
              },
            })}
          />
        </FormRow>

        <FormRow label="Material" error={errors?.material?.message}>
          <Input
            type="text"
            id="material"
            placeholder="Enter the type of Material"
            disabled={isWorking}
            {...register("material")}
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
            {isEditSession ? "Edit Part" : "Create Part"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default PartForm;
