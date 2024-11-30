import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import StyledNavLink from "../../ui/StyledNavLink";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";

function LoginForm({ displayDirection = "vertical" }) {
  const [email, setEmail] = useState("admin@jem.com");
  const [password, setPassword] = useState("passwordforadmin@123");

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow displayDirection={displayDirection} label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>

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
