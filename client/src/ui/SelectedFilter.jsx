import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";
import { device } from "../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 55rem;
  max-height: 15rem;
  overflow-y: scroll;
  cursor: pointer;
  flex-flow: row wrap;

  @media ${device.laptopL} {
    font-size: 1.4rem;
    max-height: 7.5rem;
    overflow-y: scroll;
  }

  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const StyledIndividualContainer = styled.div`
  display: block flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  background-color: var(--color-gold-300);
  border-radius: 1rem;

  :hover {
    background-color: var(--color-gold-700);
  }

  @media ${device.laptopL} {
    font-size: 0.8rem;
  }
`;

const StyledButton = styled(Button)`
  padding-left: 0.2rem;
  cursor: pointer;
  border: none;
  padding: 0.2rem;
  text-decoration: none;
  display: inline-block;
  background-color: inherit;
  color: var(--color-red-800);
  :hover {
    font-weight: 700;
  }
`;

function SelectedFilter({
  selectedFilterLabels,
  onHandleIndividualOptionsClick,
}) {
  return (
    <StyledContainer>
      {!selectedFilterLabels.length && <span>No Filter Selected</span>}
      {selectedFilterLabels.length >= 1 &&
        selectedFilterLabels.map((filter) => (
          <StyledIndividualContainer
            key={filter}
            onClick={() => onHandleIndividualOptionsClick(filter)}
          >
            <span>{filter}</span>
            <StyledButton size="small" variation="danger" type="clear">
              <HiOutlineXMark />
            </StyledButton>
          </StyledIndividualContainer>
        ))}
    </StyledContainer>
  );
}

export default SelectedFilter;
