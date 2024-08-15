import ManageTableNavTabs from "../features/manage/ManageTableNavTabs";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Manage() {
  return (
    <>
      <Row>
        <Heading as="h2">Manage</Heading>
      </Row>
      <Row>
        <ManageTableNavTabs />
      </Row>
    </>
  );
}

export default Manage;
