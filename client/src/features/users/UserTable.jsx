import { Navigate, useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGetUsers } from "./useGetUsers";
import UserRow from "./UserRow";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";

function UserTable() {
  const { isPending, users } = useGetUsers();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  let sortedUsers;
  let filterDeletedUsers = [];
  let filterAvailableUsers = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT

    const staffMembers = users.filter((user) => user.role === "staff");

    sortedUsers = staffMembers.sort((a, b) => {
      if (direction === "asc") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return 1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return -1;
      }
      if (direction === "desc") {
        if (a[field].toUpperCase() > b[field].toUpperCase()) return -1;
        if (b[field].toUpperCase() > a[field].toUpperCase()) return 1;
      }
      return null;
    });

    // Filter Deleted Users

    filterDeletedUsers = sortedUsers.filter((user) =>
      user.active === false ? user : null
    );

    // Filter Available Users

    filterAvailableUsers = sortedUsers.filter((user) =>
      user.active === true ? user : null
    );

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(staffMembers.length / PAGE_SIZE);
  }

  function DeletedUsers() {
    if (!filterDeletedUsers || filterDeletedUsers.length === 0)
      return <Empty resourceName={"Deleted Users"} />;

    return (
      <Table
        columns="2fr 7.5fr 7.5fr .75fr "
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
          <div>Email</div>
        </Table.Header>

        <Table.Body
          data={filterDeletedUsers}
          render={(user, i) => (
            <UserRow
              user={user}
              index={i}
              key={user.id}
              id={user.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount)
    return <Navigate replace to="/Users?userOptions=allUsers" />;

  return (
    <Table
      deletedTableContent={<DeletedUsers />}
      columns=".75fr 2fr 2.5fr 1fr .75fr"
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
      </Table.Header>

      <Table.Body
        data={filterAvailableUsers}
        render={(user, i) => (
          <UserRow user={user} index={i} key={user.id} id={user.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={filterAvailableUsers.length} />
      </Table.Footer>
    </Table>
  );
}

export default UserTable;
