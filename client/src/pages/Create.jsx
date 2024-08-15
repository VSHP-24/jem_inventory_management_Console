import CreateFormTabs from "../features/create/CreateFormNavTabs";
import DisplayForm from "../features/create/DisplayForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Create() {
  return (
    <>
      <Row>
        <Heading as="h2">Create</Heading>
      </Row>

      <Row>
        <CreateFormTabs />
      </Row>

      <DisplayForm />
    </>
  );
}

export default Create;
