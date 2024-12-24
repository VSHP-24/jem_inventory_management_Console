import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import { useForgotPassword } from "./useForgotPassword";

function ForgotPasswordForm({ displayDirection = "vertical" }) {
  const { forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    forgotPassword({ ...data }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Email address"
        error={errors?.email?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="email"
          id="email"
          placeholder="Enter your email address"
          autoComplete="username"
          disabled={isPending}
          {...register("email", { required: "*This field is required" })}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Send Password Reset Link" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ForgotPasswordForm;
