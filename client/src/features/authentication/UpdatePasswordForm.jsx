import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdatePassword } from "./useUpdatePassword";

function UpdatePasswordForm({ displayDirection = "horizontal" }) {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { updatePassword, isPending } = useUpdatePassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !passwordConfirm) return;
    updatePassword(
      { passwordCurrent, password, passwordConfirm },
      {
        onSettled: () => {
          setPasswordCurrent("");
          setPassword("");
          setPasswordConfirm("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow displayDirection={displayDirection} label="Current Password">
        <Input
          type="password"
          id="passwordCurrent"
          value={passwordCurrent}
          onChange={(e) => setPasswordCurrent(e.target.value)}
          disabled={isPending}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection} label="New Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection} label="Confirm New Password">
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

export default UpdatePasswordForm;
