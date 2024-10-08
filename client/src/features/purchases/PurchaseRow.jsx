import styled from "styled-components";

import Table from "../../ui/Table";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useEditPurchase } from "./useEditPurchase";
import PurchaseDetailPage from "./PurchaseDetailPage";
import { formatDate, formatStatus } from "../../utils/helpers";
import { useDeletePurchase } from "./useDeletePurchase";
import PurchaseForm from "./PurchaseForm";
import { useEditPart } from "../parts/useEditPart";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const StyledStatus = styled.span`
  background-color: ${(props) =>
    props.status === "order_received" && "#306844"};
  background-color: ${(props) => props.status === "order_placed" && "#FF0000"};
  background-color: ${(props) =>
    props.status === "cancelled" && "var(--color-grey-500)"};

  padding: 0 0.5rem;
  font-weight: 500;
  justify-self: center;
  border-radius: 0.4rem;
`;

const StyledVendor = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledDate = styled.div`
  justify-self: center;
`;

const StyledButton = styled(Button)`
  padding-left: 0.2rem;
  cursor: pointer;
  border: none;
  padding: 0.2rem;
  background-color: var(--color-gold-200);
  text-decoration: none;
  display: inline-block;

  color: ${(props) => props.type === "check" && "#306844"};

  color: ${(props) => props.type === "cross" && "#FF0000"};

  :hover {
    background-color: var(--color-gold-700);
  }
`;

function PurchaseRow({ purchase, index, id }) {
  const {
    part,
    quantity,
    vendor,
    orderPlacedOnDate,
    status,
    orderStatusUpdateOn,
  } = purchase;

  const { isEditing, editPurchase } = useEditPurchase();
  const { isDeleting, deletePurchase } = useDeletePurchase();
  const { editPart } = useEditPart();

  function handleCheckClick() {
    editPurchase({ ...purchase, status: "order_received" });
    part.quantity += quantity;
    editPart({ ...part });
  }

  function handleCrossClick() {
    editPurchase({ ...purchase, status: "cancelled" });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Purchase"
      detailPageContent={<PurchaseDetailPage purchase={purchase} />}
      editFormContent={<PurchaseForm purchaseToEdit={purchase} />}
      deleteContentFrom={deletePurchase}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      <div>{part.name}</div>
      <StyledVendor>{vendor}</StyledVendor>
      <div>{quantity}</div>
      <StyledDate>{formatDate(orderPlacedOnDate)}</StyledDate>
      <StyledContainer>
        <StyledStatus status={status}>{formatStatus(status)}</StyledStatus>
        {status === "order_placed" && (
          <div>
            <StyledButton
              type="check"
              onClick={handleCheckClick}
              disabled={isEditing}
            >
              <HiOutlineCheck />
            </StyledButton>
            <StyledButton
              type="cross"
              onClick={handleCrossClick}
              disabled={isEditing}
            >
              <HiOutlineXMark />
            </StyledButton>
          </div>
        )}
      </StyledContainer>
      <StyledDate>
        {formatDate(
          orderStatusUpdateOn[orderStatusUpdateOn.length - 1].updatedOn
        )}
      </StyledDate>
    </Table.Row>
  );
}

export default PurchaseRow;
