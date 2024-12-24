import styled from "styled-components";

import Spinner from "./Spinner";

const StyledSpinnerFullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gold-200);
  width: 100%;
`;

function SpinnerFullPage() {
  return (
    <StyledSpinnerFullPage>
      <Spinner />
    </StyledSpinnerFullPage>
  );
}

export default SpinnerFullPage;
