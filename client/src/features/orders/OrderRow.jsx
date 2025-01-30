import styled, { css } from "styled-components";

import OrderForm from "./OrderForm";
import OrderDetailPage from "./OrderDetailPage";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import Button from "../../ui/Button";

import { formatStatus } from "../../utils/helpers";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { useEditOrder } from "./useEditOrder";
import { useDeleteOrder } from "./useDeleteOrder";
import { useEditPart } from "../parts/useEditPart";
import { device } from "../../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  align-items: center;
  justify-content: start;

  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const StyledOrderId = styled.div`
  word-break: break-word;
`;

const columnType = {
  orderDetails: css`
    font-size: 1rem;
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
    props.status === "order_delivered" && "#00ff00"};

  background-color: ${(props) =>
    props.status === "order_confirmed" && "#E9C111"};

  background-color: ${(props) => props.status === "order_shipped" && "#FF7440"};

  color: ${(props) => props.status === "order_placed" && "#FFFFFF"};

  background-color: ${(props) => props.status === "order_placed" && "#FF0000"};
  color: ${(props) => props.status === "order_placed" && "#FFFFFF"};

  background-color: ${(props) =>
    props.status === "cancelled" && "var(--color-grey-500)"};

  padding: 0 0.5rem;
  font-weight: 600;
  justify-self: center;
  border-radius: 0.4rem;
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

function OrderRow({ order, index, id, deletedTable }) {
  const { user, cost, paymentMethod, paymentStatus, orderStatus } = order;
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const { isEditing, editOrder } = useEditOrder();
  const { editPart } = useEditPart();

  function handleCheckClick(orderStatus) {
    if (orderStatus === "order_placed") {
      editOrder({ ...order, orderStatus: "order_confirmed" });
    }

    if (orderStatus === "order_confirmed") {
      editOrder({ ...order, orderStatus: "order_shipped" });

      order.orderItems.map((orderItem) =>
        orderItem.product.includedParts.map((el) => {
          el.part.quantity -= el.quantity;
          return editPart({ ...el.part });
        })
      );
    }
  }

  function handleCrossClick() {
    editOrder({ ...order, orderStatus: "cancelled" });
  }

  function handleRestoreButtonClick() {
    editOrder({ ...order, isDeleted: false });
  }

  return (
    ///////////////////////////////////
    // AVAILABLE ORDERS
    ///////////////////////////////////
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Order"
      detailPageContent={<OrderDetailPage order={order} />}
      editFormContent={<OrderForm orderToEdit={order} />}
      deleteContentFrom={deleteOrder}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>

      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Order ID
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="orderDetails">
            {id.slice(id.length - 7)}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Name
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="orderDetails">
            {user.user.name}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Cost
          </StyledColumnLaptopL>

          <StyledColumnLaptopL type="orderDetails">{`₹ ${cost}`}</StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Payment Method
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="orderDetails">
            {formatStatus(paymentMethod)}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Payment Status
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="orderDetails">
            {formatStatus(paymentStatus)}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Order Status
          </StyledColumnLaptopL>
          <StyledContainer>
            <StyledStatus status={orderStatus}>
              {formatStatus(
                `${
                  orderStatus === "order_placed"
                    ? "order_received"
                    : orderStatus
                }`
              )}
            </StyledStatus>

            {(orderStatus === "order_placed" ||
              orderStatus === "order_confirmed") && (
              <StyledColumnLaptopL type="orderDetails">
                <StyledButton
                  type="check"
                  onClick={() => handleCheckClick(orderStatus)}
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
              </StyledColumnLaptopL>
            )}
          </StyledContainer>
        </>
      )}

      {/* DELETED ORDERS */}
      {deletedTable && (
        <>
          <StyledOrderId>{id}</StyledOrderId>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default OrderRow;
