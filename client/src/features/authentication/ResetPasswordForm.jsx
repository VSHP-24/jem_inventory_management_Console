import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useResetPassword } from "./useResetPassword";
import SpinnerMini from "../../ui/SpinnerMini";

function ResetPasswordForm() {
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
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label="Confirm Password">
        <Input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Reset Password" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPasswordForm;
