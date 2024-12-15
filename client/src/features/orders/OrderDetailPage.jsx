import styled from "styled-components";
import Table from "../../ui/Table";
import { formatDate, formatStatus } from "../../utils/helpers";
import Heading from "../../ui/Heading";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 70rem;
`;

const StyledOrderDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 15rem 1fr;
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

function OrderDetailPage({ order }) {
  const {
    user,
    orderItems,
    cost,
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
    paymentMethod,
    paymentStatus,
    orderStatus,
    orderStatusUpdateOn,
    createdAt,
  } = order;

  return (
    <StyledDetailPage>
      <StyledOrderDetails>
        <StyledHeading as="h2">ORDER DETAILS</StyledHeading>
        <StyledRow>
          <StyledHeader>Customer Name</StyledHeader>
          <StyledDetails>
            {user.user.name ? user.user.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
        <StyledRow>
          <StyledHeader>Customer Email</StyledHeader>
          <StyledDetails>
            {user.user.email ? user.user.email : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Ordered Items</StyledHeader>
          <StyledDetails>
            <Table
              columns=".75fr 2fr 1fr 1fr"
              menuListRequired={false}
              modalWindowedTable={true}
            >
              <Table.Header>
                <div>Sl No.</div>
                <div>Product Name</div>
                <div>Quantity</div>
                <div>Cost</div>
              </Table.Header>
              <Table.Body
                data={orderItems}
                render={(item, i) => (
                  <Table.Row columns=".75fr 3fr 1fr 1fr" key={item.id}>
                    <div>
                      {(i <= 8 && `0${i + 1}`) ||
                        (i === 9 && `${i + 1}`) ||
                        i + 1}
                    </div>
                    <div>{item.product.name}</div>
                    <div>{item.quantity}</div>
                    <div>{`₹ ${item.cost}`}</div>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Total Cost</StyledHeader>
          <StyledDetails>{cost ? `₹ ${cost}` : "--- NA ---"}</StyledDetails>
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
          <StyledHeader>Payment Method</StyledHeader>
          <StyledDetails>
            {paymentMethod ? formatStatus(paymentMethod) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
        <StyledRow>
          <StyledHeader>Payment Status</StyledHeader>
          <StyledDetails>
            {paymentStatus ? formatStatus(paymentStatus) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
        <StyledRow>
          <StyledHeader>Order Status</StyledHeader>
          <StyledDetails>
            {orderStatus ? formatStatus(orderStatus) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
        <StyledRow>
          <StyledHeader>Order Created On</StyledHeader>
          <StyledDetails>{createdAt ? createdAt : "--- NA ---"}</StyledDetails>
        </StyledRow>
        <StyledRow>
          <StyledHeader>Order Status Modified On</StyledHeader>
          <StyledDetails>
            <Table
              columns="10rem 20rem"
              menuListRequired={false}
              modalWindowedTable={true}
            >
              <Table.Header>
                <div>Status</div>
                <div>Modified On</div>
              </Table.Header>
              <Table.Body
                data={orderStatusUpdateOn}
                render={(status) => (
                  <Table.Row columns="10rem 20rem" key={status.id}>
                    <div>{formatStatus(status.updatedStatus)}</div>
                    <div>{formatDate(status.updatedOn)}</div>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledRow>
      </StyledOrderDetails>
    </StyledDetailPage>
  );
}

export default OrderDetailPage;
