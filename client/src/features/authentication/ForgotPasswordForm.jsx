import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForgotPassword } from "./useForgotPassword";
import SpinnerMini from "../../ui/SpinnerMini";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isPending } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    forgotPassword(
      { email },
      {
        onSettled: () => {
          setEmail("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Send Password Reset Link" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ForgotPasswordForm;
