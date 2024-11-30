import DisplayUsersNavTabsPages from "../features/users/DisplayUsersNavTabsPages";
import UsersNavTabs from "../features/users/UsersNavTabs";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Users() {
  return (
    <>
      <Row>
        <Heading as="h2">Users</Heading>
      </Row>
      <Row>
        <UsersNavTabs />
      </Row>

      <DisplayUsersNavTabsPages />
    </>
  );
}

export default Users;
