import styled from "styled-components";

import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { device } from "../utils/devices";

const StyledRow = styled(Row)`
  @media ${device.laptopL} {
    gap: 1.8rem;
  }

  @media ${device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  @media ${device.mobileM} {
    gap: 0.8rem;
  }
`;
function Dashboard() {
  return (
    <>
      <StyledRow>
        <Heading as="h2">Dashboard</Heading>
        <DashboardFilter />
      </StyledRow>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
