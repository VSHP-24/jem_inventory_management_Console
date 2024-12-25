import styled from "styled-components";

import Heading from "../../ui/Heading";

import { formatDate } from "../../utils/helpers";
import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;

  @media ${device.laptopL} {
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const StyledUserDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 5rem;
  align-items: center;

  @media ${device.laptopL} {
    gap: 2rem;
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const StyledHeader = styled.div`
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const StyledDetails = styled.div`
  font-weight: 300;
`;

const StyledHeading = styled(Heading)`
  padding-bottom: 2rem;
`;

function UserDetailPage({ user }) {
  const { name, email, role, accountCreatedOnDate, passwordChangedAt } = user;
  return (
    <StyledDetailPage>
      <StyledUserDetails>
        <StyledHeading as="h2">USER DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Email</StyledHeader>
          <StyledDetails>{email ? email : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Role</StyledHeader>
          <StyledDetails>{role ? role : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Account Created On</StyledHeader>
          <StyledDetails>
            {accountCreatedOnDate
              ? formatDate(accountCreatedOnDate)
              : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Password Changed At</StyledHeader>
          <StyledDetails>
            {passwordChangedAt ? formatDate(passwordChangedAt) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledUserDetails>
    </StyledDetailPage>
  );
}

export default UserDetailPage;
