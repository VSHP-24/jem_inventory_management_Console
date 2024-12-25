import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUpdatePassword } from "./useUpdatePassword";

function UpdatePasswordForm({ displayDirection = "horizontal" }) {
  const { updatePassword, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    updatePassword({ ...data }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.passwordCurrent?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="passwordCurrent"
          disabled={isPending}
          placeholder="Enter Current Password"
          {...register("passwordCurrent", {
            required: "*This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="New Password"
        error={errors?.password?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          placeholder="Enter New Password"
          {...register("password", {
            required: "*This field is required",
            minLength: {
              value: 8,
              message: "Password should contain atleast 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm New Password"
        error={errors?.passwordConfirm?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          placeholder="Enter Password to confirm"
          {...register("passwordConfirm", {
            required: "*This field is required",
            validate: (value) =>
              String(value) === String(getValues().password) ||
              "*Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Reset Password" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
