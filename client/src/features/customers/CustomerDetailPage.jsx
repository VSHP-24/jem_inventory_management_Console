import styled from "styled-components";
import Heading from "../../ui/Heading";
import { formatDate } from "../../utils/helpers";
import Table from "../../ui/Table";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  display: grid;
  grid-template-columns: 50rem 20rem;
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledCustomerDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 12.5rem 1fr;
  align-items: center;
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
    orderHistory,
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

        <StyledRow>
          <StyledHeader>Order History</StyledHeader>
          <StyledDetails>
            <Table
              columns="20rem 5rem 10rem 10rem 10rem"
              menuListRequired={false}
              modalWindowedTable={true}
            >
              <Table.Header>
                <div>Order Id</div>
                <div>Cost</div>
                <div>Payment Method</div>
                <div>Payment Status</div>
                <div>Ordered On</div>
              </Table.Header>
              <Table.Body
                data={orderHistory}
                render={(order) => (
                  <Table.Row
                    columns="20rem 5rem 10rem 10rem 10rem"
                    key={order.id}
                  >
                    <div>{order.id}</div>
                    <div>{order.cost}</div>
                    <div>{order.paymentMethod}</div>
                    <div>{order.paymentStatus}</div>
                    <div>{formatDate(order.createdAt)}</div>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledRow>
      </StyledCustomerDetails>
    </StyledDetailPage>
  );
}

export default CustomerDetailPage;
