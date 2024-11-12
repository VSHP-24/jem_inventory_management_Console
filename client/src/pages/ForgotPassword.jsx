import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 1.2rem;
  background-color: var(--color-grey-900);
`;

const StyledHeading = styled(Heading)`
  color: var(--color-gold-100);
`;

function ForgotPassword() {
  return (
    <LoginLayout>
      <Logo allowRedirect={false} height="3.2rem" />
      <StyledHeading as="h3">Trouble Logging in?</StyledHeading>
      <ForgotPasswordForm />
    </LoginLayout>
  );
}

export default ForgotPassword;
