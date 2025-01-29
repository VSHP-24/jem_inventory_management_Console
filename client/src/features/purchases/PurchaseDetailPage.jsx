import styled from "styled-components";

import Heading from "../../ui/Heading";
import Table from "../../ui/Table";

import { formatDate, formatStatus } from "../../utils/helpers";
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
    font-size: 1.2rem;
  }

  @media ${device.mobileM} {
    padding: 1rem;
  }
`;

const StyledPurchaseDetails = styled.main``;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media ${device.laptopS} {
    display: grid;
    grid-template-columns: 10rem 1fr;
  }

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
`;

const StyledTableHeader = styled.div`
  font-size: 1rem;

  @media ${device.laptopS} {
    font-size: 0.75rem;
  }
`;
const StyledTableDetails = styled.div`
  font-size: 1rem;

  @media ${device.laptopS} {
    font-size: 0.75rem;
  }
`;

function PurchaseDetailPage({ purchase }) {
  const {
    part,
    quantity,
    vendor,
    orderPlacedOnDate,
    orderStatusUpdateOn,
    status,
    purchaseCost,
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
          <StyledHeader>Purchase Cost</StyledHeader>
          <StyledDetails>
            {purchaseCost ? `₹ ${purchaseCost}` : "--- NA ---"}
          </StyledDetails>
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

        <StyledTable>
          <StyledHeader>Status Modified On</StyledHeader>
          <StyledDetails>
            <Table
              columns="1fr 1fr"
              menuListRequired={false}
              modalWindowedTable={true}
            >
              <Table.Header>
                <StyledTableHeader>Status</StyledTableHeader>
                <StyledTableHeader>Modified On</StyledTableHeader>
              </Table.Header>

              <Table.Body
                data={orderStatusUpdateOn}
                render={(status) => (
                  <Table.Row columns="10rem 10rem" key={status.id}>
                    <StyledTableDetails>
                      {formatStatus(status.updatedStatus)}
                    </StyledTableDetails>
                    <StyledTableDetails>
                      {formatDate(status.updatedOn)}
                    </StyledTableDetails>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledTable>
      </StyledPurchaseDetails>
    </StyledDetailPage>
  );
}

export default PurchaseDetailPage;
