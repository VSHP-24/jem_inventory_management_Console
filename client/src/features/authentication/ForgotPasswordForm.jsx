import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForgotPassword } from "./useForgotPassword";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";

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
          // This makes this form better for password managers
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
