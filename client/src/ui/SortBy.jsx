import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import Select from "./Select";

import { device } from "../utils/devices";

const StyledSelect = styled(Select)`
  border: 2px solid var(--color-grey-900);
  border-radius: 7px;
  height: 4rem;
  width: 100%;
  max-width: 20rem;
  font-size: 1rem;

  @media ${device.laptopL} {
    font-size: 1.2rem;
    height: 4rem;
    max-width: 20rem;
  }

  @media ${device.tablet} {
    max-width: 100%;
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

const StyledOption = styled.option`
  font-size: 1rem;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }
`;

function SortBy({ sortByOptions = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect onChange={handleChange} value={sortBy}>
      {sortByOptions.map((option) => (
        <StyledOption value={option.value} key={option.value}>
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
