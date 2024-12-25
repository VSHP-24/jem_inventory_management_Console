import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import StyledNavLink from "../../ui/StyledNavLink";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";

import { useLogin } from "./useLogin";

function LoginForm({ displayDirection = "vertical" }) {
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "admin@jem.com", password: "passwordforadmin@123" },
  });

  async function onSubmit(data) {
    login({ ...data }, { onSuccess: () => reset() });
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

      <FormRow
        label="Password"
        error={errors?.password?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", { required: "*This field is required" })}
        />
      </FormRow>

      <StyledNavLink type="vertical" to="/forgotPassword">
        Forgot Password?
      </StyledNavLink>

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
