import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

import { useEditOrder } from "./useEditOrder";

function OrderForm({ orderToEdit = {}, onCloseModal }) {
  ////////////////////////////////////////////////////
  // AUTOFILL EXISTING ORDER DETAILS IN EDIT SESSION
  ////////////////////////////////////////////////////
  const { orderStatus } = orderToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orderStatus,
    },
  });

  const { isEditing, editOrder } = useEditOrder();

  function onSubmit(data) {
    editOrder({ ...orderToEdit, ...data }, { onSuccess: onCloseModal });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Order Status" error={errors?.orderStatus?.message}>
          <Select
            name="orderStatus"
            id="orderStatus"
            disabled={isEditing}
            {...register("orderStatus", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <option value={"order_placed"}>Order Placed</option>
            <option value={"order_confirmed"}>Order Confirmed</option>
            <option value={"order_shipped"}>Order Shipped</option>
            <option value={"cancelled"}>Order Cancelled</option>
          </Select>
        </FormRow>

        <FormRow>
          <Button
            size="medium"
            variation="secondary"
            type={isEditing ? "button" : "reset"}
            onClick={onCloseModal}
          >
            Cancel
          </Button>

          <Button size="large" variation="primary" disabled={isEditing}>
            Edit Order Status
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default OrderForm;
