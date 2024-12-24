import styled, { css } from "styled-components";

import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import CustomerDetailPage from "./CustomerDetailPage";
import CustomerForm from "./CustomerForm";

import { device } from "../../utils/devices";
import { useEditUser } from "../users/useEditUser";
import { useDeleteUser } from "../users/useDeleteUser";

const columnType = {
  userDetails: css`
    @media ${device.laptopL} {
      grid-column: 3;
    }
    @media ${device.mobileM} {
      grid-column: 3;
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

function CustomerRow({ customer, index, id, deletedTable }) {
  const { user, phoneNumber } = customer;
  const { isDeleting, deleteUser } = useDeleteUser();

  const { editUser } = useEditUser();

  function handleRestoreButtonClick() {
    editUser({ ...user, active: true });
  }

  return (
    ///////////////////////////////////
    // AVAILABLE CUSTOMERS
    ///////////////////////////////////
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Customer"
      detailPageContent={<CustomerDetailPage customer={customer} />}
      editFormContent={<CustomerForm customerToEdit={customer} />}
      deleteContentFrom={deleteUser}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>

      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Name
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="customerDetails">
            {user.name}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Email
          </StyledColumnLaptopL>

          <StyledColumnLaptopL type="customerDetails">
            {user.email}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Phone No.
          </StyledColumnLaptopL>

          <StyledColumnLaptopL type="customerDetails">
            {phoneNumber}
          </StyledColumnLaptopL>
        </>
      )}

      {/* DELETED CUSTOMERS */}
      {deletedTable && (
        <>
          <div>{user.email}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default CustomerRow;
