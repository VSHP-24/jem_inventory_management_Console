import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";
import { device } from "../utils/devices";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 36rem;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 1rem;
  background-color: var(--color-grey-900);
  padding: 1rem;

  @media ${device.tablet} {
    gap: 1rem;
    grid-template-columns: 24rem;
  }

  @media ${device.mobileM} {
    gap: 0.8rem;
    grid-template-columns: 18rem;
  }
`;

const StyledHeading = styled(Heading)`
  color: var(--color-gold-100);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo allowRedirect={false} height="3.2rem" />
      <StyledHeading as="h3">Log in to your account</StyledHeading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
