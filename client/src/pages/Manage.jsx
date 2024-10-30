import DisplayManageTable from "../features/manage/DisplayManageTable";
import ManageTableNavTabs from "../features/manage/ManageTableNavTabs";
import ManageTableOperations from "../features/manage/ManageTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Manage() {
  return (
    <>
      <Row>
        <Heading as="h2">Manage</Heading>
      </Row>
      <Row>
        <ManageTableOperations />
      </Row>
      <Row>
        <ManageTableNavTabs />
      </Row>

      <DisplayManageTable />
    </>
  );
}

export default Manage;
