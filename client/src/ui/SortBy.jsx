import styled from "styled-components";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import { device } from "../utils/devices";

const StyledSelect = styled(Select)`
  border: 2px solid var(--color-grey-900);
  border-radius: 7px;
  height: 5rem;
  font-size: 2.5rem;
  width: 100%;

  @media ${device.laptopL} {
    font-size: 1.2rem;
    height: 4rem;
  }
`;

const StyledOption = styled.option`
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
