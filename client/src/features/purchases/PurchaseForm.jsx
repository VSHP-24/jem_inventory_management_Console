import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import SelectParts from "../parts/SelectParts";
import { useCreatePurchase } from "./useCreatePurchase";
import { useEditPurchase } from "./useEditPurchase";

function PurchaseForm({ purchaseToEdit = {}, onCloseModal }) {
  const { id: editId, part, ...editValues } = purchaseToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession
      ? {
          part: part.id,
          ...editValues,
        }
      : "",
  });

  const { isCreating, createPurchase } = useCreatePurchase();
  const { isEditing, editPurchase } = useEditPurchase();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editPurchase({ ...data }, { onSuccess: onCloseModal });
    } else createPurchase({ ...data }, { onSuccess: () => reset() });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Part" error={errors?.part?.message}>
          <Select
            name="part"
            id="part"
            disabled={isWorking}
            {...register("part", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectParts />
          </Select>
        </FormRow>

        <FormRow label="Quantity" error={errors?.quantity?.message}>
          <Input
            type="number"
            id="quantity"
            placeholder="Enter Number of Parts Purchased"
            disabled={isWorking}
            {...register("quantity", {
              required: "*This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Vendor Name" error={errors?.vendor?.message}>
          <Input
            type="text"
            placeholder="Enter a Vendor Name"
            id="vendor"
            disabled={isWorking}
            {...register("vendor", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <Select
            name="status"
            id="status"
            disabled={isWorking}
            {...register("status", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <option value={"order_placed"}>Order Placed</option>

            <option value={"order_received"}>Order Received</option>
            <option value={"cancelled"}>Order Cancelled</option>
          </Select>
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
            {isEditSession ? "Edit Purchase" : "Create Purchase"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default PurchaseForm;
