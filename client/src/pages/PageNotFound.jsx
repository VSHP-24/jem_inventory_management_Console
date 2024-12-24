import styled from "styled-components";

import Heading from "../ui/Heading";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-900);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-gold-600);
  border: 1px solid var(--color-gold-700);
  border-radius: var(--border-radius-lg);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          Oops! The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} variation="primary" size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
