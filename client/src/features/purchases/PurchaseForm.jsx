import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import SelectParts from "../parts/SelectParts";
import { useCreatePurchase } from "./useCreatePurchase";

function PurchaseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isCreating, createPurchase } = useCreatePurchase();

  function onSubmit(data) {
    createPurchase({ ...data }, { onSuccess: () => reset() });
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
            disabled={isCreating}
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
            placeholder="Enter Number of Products Purchased"
            disabled={isCreating}
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
            disabled={isCreating}
            {...register("vendor", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <Select
            name="status"
            id="status"
            disabled={isCreating}
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
            type="reset"
            // onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button size="large" variation="primary" disabled={isCreating}>
            Create Purchase
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default PurchaseForm;
