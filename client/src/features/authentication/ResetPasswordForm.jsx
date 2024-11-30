import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useResetPassword } from "./useResetPassword";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";

function ResetPasswordForm({ displayDirection = "horizontal" }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { resetPassword, isPending } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !passwordConfirm) return;
    resetPassword(
      { password, passwordConfirm },
      {
        onSettled: () => {
          setPassword("");
          setPasswordConfirm("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow displayDirection={displayDirection} label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection} label="Confirm Password">
        <Input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          disabled={isPending}
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
