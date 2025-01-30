import styled from "styled-components";

import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import ResetPasswordForm from "../features/authentication/ResetPasswordForm";

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

  @media ${device.laptopL} {
    gap: 0.75rem;
    grid-template-columns: 20rem;
  }

  @media ${device.laptopS} {
    gap: 0.75rem;
    grid-template-columns: 24rem;
  }

  @media ${device.tablet} {
    gap: 0.75rem;
    grid-template-columns: 24rem;
  }
  @media ${device.mobileM} {
    gap: 0.8rem;
    grid-template-columns: 18rem;
  }
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  color: var(--color-gold-100);
`;

function ResetPassword() {
  return (
    <LoginLayout>
      <Logo allowRedirect={false} height="2.4rem" />

      <StyledHeading as="h3">
        {`Set a password that you won't forget next time 😜`}
      </StyledHeading>

      <ResetPasswordForm displayDirection="vertical" />
    </LoginLayout>
  );
}

export default ResetPassword;
