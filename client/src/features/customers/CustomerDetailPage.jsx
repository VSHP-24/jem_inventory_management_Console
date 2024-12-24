import styled from "styled-components";

import Heading from "../../ui/Heading";

import { formatDate } from "../../utils/helpers";
import { device } from "../../utils/devices";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const StyledCustomerDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 12.5rem 1fr;
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

function CustomerDetailPage({ customer }) {
  const {
    user,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingPostCode,
    shippingCountry,
    billingAddress,
    billingCity,
    billingState,
    billingPostCode,
    billingCountry,
    phoneNumber,
  } = customer;

  return (
    <StyledDetailPage>
      <StyledCustomerDetails>
        <StyledHeading as="h2">CUSTOMER DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{user.name ? user.name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Email</StyledHeader>
          <StyledDetails>
            {user.email ? user.email : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shipping Address</StyledHeader>
          <StyledDetails>
            {shippingAddress ? shippingAddress : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shipping City</StyledHeader>
          <StyledDetails>
            {shippingCity ? shippingCity : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shipping State</StyledHeader>
          <StyledDetails>
            {shippingState ? shippingState : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shipping PostCode</StyledHeader>
          <StyledDetails>
            {shippingPostCode ? shippingPostCode : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Shipping Country</StyledHeader>
          <StyledDetails>
            {shippingCountry ? shippingCountry : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Billing Address</StyledHeader>
          <StyledDetails>
            {billingAddress ? billingAddress : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Billing City</StyledHeader>
          <StyledDetails>
            {billingCity ? billingCity : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Billing State</StyledHeader>
          <StyledDetails>
            {billingState ? billingState : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Billing PostCode</StyledHeader>
          <StyledDetails>
            {billingPostCode ? billingPostCode : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Billing Country</StyledHeader>
          <StyledDetails>
            {billingCountry ? billingCountry : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Phone Number</StyledHeader>
          <StyledDetails>
            {phoneNumber ? phoneNumber : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Password Modified On</StyledHeader>
          <StyledDetails>
            {user.passwordChagedAt
              ? formatDate(user.passwordChagedAt)
              : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledCustomerDetails>
    </StyledDetailPage>
  );
}

export default CustomerDetailPage;
