import styled from "styled-components";
import Heading from "../../ui/Heading";
import { formatDate, formatStatus } from "../../utils/helpers";
import Table from "../../ui/Table";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledPurchaseDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 10rem 1fr;
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

function PurchaseDetailPage({ purchase }) {
  const {
    part,
    quantity,
    vendor,
    orderPlacedOnDate,
    orderStatusUpdateOn,
    status,
  } = purchase;

  return (
    <StyledDetailPage>
      <StyledPurchaseDetails>
        <StyledHeading as="h2">PURCHASE DETAILS</StyledHeading>

        <StyledRow>
          <StyledHeader>Part Name</StyledHeader>
          <StyledDetails>{part.name ? part.name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Quantity</StyledHeader>
          <StyledDetails>{quantity ? quantity : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Vendor</StyledHeader>
          <StyledDetails>{vendor ? vendor : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Purchase Created On</StyledHeader>
          <StyledDetails>
            {orderPlacedOnDate ? formatDate(orderPlacedOnDate) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Status</StyledHeader>
          <StyledDetails>
            {status ? formatStatus(status) : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Status Modified On</StyledHeader>
          <StyledDetails>
            <Table columns="1fr 1fr" menuListRequired={false}>
              <Table.Header>
                <div>Status</div>
                <div>Modified On</div>
              </Table.Header>
              <Table.Body
                data={orderStatusUpdateOn}
                render={(status) => (
                  <Table.Row columns="10rem 10rem" key={status.id}>
                    <div>{formatStatus(status.updatedStatus)}</div>
                    <div>{formatDate(status.updatedOn)}</div>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledRow>
      </StyledPurchaseDetails>
    </StyledDetailPage>
  );
}

export default PurchaseDetailPage;
