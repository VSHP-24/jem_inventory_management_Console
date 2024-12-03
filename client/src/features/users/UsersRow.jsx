import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import CreateNewStaffForm from "../authentication/CreateNewStaffForm";
import { useDeleteUser } from "./useDeleteUser";
import { useEditUser } from "./useEditUser";
import UserDetailPage from "./UserDetailPage";

function UsersRow({ user, index, id, deletedTable }) {
  const { name, email, role } = user;
  const { isDeleting, deleteUser } = useDeleteUser();

  const { editUser } = useEditUser();

  function handleRestoreButtonClick() {
    editUser({ ...user, active: true });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="User"
      detailPageContent={<UserDetailPage user={user} />}
      editFormContent={<CreateNewStaffForm userToEdit={user} />}
      deleteContentFrom={deleteUser}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      {!deletedTable && (
        <>
          <div>{name}</div>
          <div>{email}</div>
          <div>{role}</div>
        </>
      )}
      {deletedTable && (
        <>
          <div>{name}</div>
          <div>{email}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default UsersRow;
