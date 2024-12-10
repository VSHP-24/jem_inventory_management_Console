import styled from "styled-components";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import { formatStatus } from "../../utils/helpers";
import Button from "../../ui/Button";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { useEditOrder } from "./useEditOrder";
import { useDeleteOrder } from "./useDeleteOrder";
import OrderForm from "./OrderForm";
import OrderDetailPage from "./OrderDetailPage";
import { useEditPart } from "../parts/useEditPart";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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
          <div>{id}</div>
          <div>{user.user.name}</div>
          <div>{`₹ ${cost}`}</div>
          <div>{formatStatus(paymentMethod)}</div>
          <div>{formatStatus(paymentStatus)}</div>
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
              <div>
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
              </div>
            )}
          </StyledContainer>
        </>
      )}
      {deletedTable && (
        <>
          <div>{id}</div>
          <div>{user.user.name}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default OrderRow;
