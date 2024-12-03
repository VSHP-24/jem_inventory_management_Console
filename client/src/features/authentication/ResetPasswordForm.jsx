import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useResetPassword } from "./useResetPassword";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";

function ResetPasswordForm({ displayDirection = "horizontal" }) {
  const { resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    resetPassword({ ...data }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password"
        error={errors?.password?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="password"
          placeholder="Enter your New Password"
          autoComplete="current-password"
          disabled={isPending}
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
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Enter your New Password to confirm"
          disabled={isPending}
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

export default ResetPasswordForm;
