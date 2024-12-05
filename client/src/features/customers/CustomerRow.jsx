import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import { useDeleteUser } from "../users/useDeleteUser";
import { useEditUser } from "../users/useEditUser";
import CustomerDetailPage from "./CustomerDetailPage";
import CustomerForm from "./CustomerForm";

function CustomerRow({ customer, index, id, deletedTable }) {
  const { user, phoneNumber } = customer;
  const { isDeleting, deleteUser } = useDeleteUser();

  const { editUser } = useEditUser();

  function handleRestoreButtonClick() {
    editUser({ ...user, active: true });
  }

  return (
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
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{phoneNumber}</div>
        </>
      )}

      {deletedTable && (
        <>
          <div>{user.name}</div>
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
