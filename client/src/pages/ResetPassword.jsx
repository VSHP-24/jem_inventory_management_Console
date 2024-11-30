import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import ResetPasswordForm from "../features/authentication/ResetPasswordForm";

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

function ResetPassword() {
  return (
    <LoginLayout>
      <Logo allowRedirect={false} height="3.2rem" />
      <StyledHeading as="h3">
        {`Set a password that you won't forget next time 😜`}
      </StyledHeading>
      <ResetPasswordForm displayDirection="vertical" />
    </LoginLayout>
  );
}

export default ResetPassword;
