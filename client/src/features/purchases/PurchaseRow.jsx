import styled, { css } from "styled-components";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";

import Table from "../../ui/Table";
import Button from "../../ui/Button";
import PurchaseDetailPage from "./PurchaseDetailPage";
import PurchaseForm from "./PurchaseForm";
import RestoreButton from "../../ui/RestoreButton";

import { useEditPart } from "../parts/useEditPart";
import { useEditPurchase } from "./useEditPurchase";
import { useDeletePurchase } from "./useDeletePurchase";
import { formatDate, formatStatus } from "../../utils/helpers";
import { device } from "../../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const columnType = {
  orderDetails: css`
    font-size: 1.2rem;
    word-break: break-word;
    @media ${device.laptopL} {
      grid-column: 3;
      font-size: 1rem;
    }
    @media ${device.mobileM} {
      grid-column: 3;
      font-size: 0.8rem;
    }
  `,

  heading: css`
    font-weight: 600;
    display: none;

    @media ${device.laptopL} {
      grid-column: 2;
      display: block;
    }
  `,
};

const StyledColumnLaptopL = styled.div`
  ${(props) => columnType[props.type]}
`;

const StyledStatus = styled.span`
  background-color: ${(props) =>
    props.status === "order_received" && "#00ff00"};
  background-color: ${(props) => props.status === "order_placed" && "#FF0000"};
  color: ${(props) => props.status === "order_placed" && "#FFFFFF"};

  background-color: ${(props) =>
    props.status === "cancelled" && "var(--color-grey-500)"};

  padding: 0 0.5rem;
  font-weight: 600;
  justify-self: center;
  border-radius: 0.4rem;
`;

const StyledVendor = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledDate = styled.div`
  justify-self: center;

  @media ${device.laptopL} {
    justify-self: flex-start;
  }
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

function PurchaseRow({ purchase, index, id, deletedTable }) {
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

  function handleRestoreButtonClick() {
    editPurchase({ ...purchase, isDeleted: false });
  }

  return (
    ///////////////////////////////////
    // AVAILABLE PURCHASES
    ///////////////////////////////////
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

      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Part
          </StyledColumnLaptopL>
          <div>{part.name}</div>

          <StyledColumnLaptopL as="header" type="heading">
            Vendor
          </StyledColumnLaptopL>

          <StyledVendor>{vendor}</StyledVendor>

          <StyledColumnLaptopL as="header" type="heading">
            Quantity
          </StyledColumnLaptopL>

          <div>{quantity}</div>

          <StyledColumnLaptopL as="header" type="heading">
            Order Placed On
          </StyledColumnLaptopL>

          <StyledDate>{formatDate(orderPlacedOnDate)}</StyledDate>

          <StyledColumnLaptopL as="header" type="heading">
            Status
          </StyledColumnLaptopL>

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

          <StyledColumnLaptopL as="header" type="heading">
            Modified On
          </StyledColumnLaptopL>

          <StyledDate>
            {formatDate(
              orderStatusUpdateOn[orderStatusUpdateOn.length - 1].updatedOn
            )}
          </StyledDate>
        </>
      )}

      {/* DELETED PURCHASES */}
      {deletedTable && (
        <>
          <div>{part.name}</div>
          <div>{vendor}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default PurchaseRow;
