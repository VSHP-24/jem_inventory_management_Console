import styled from "styled-components";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const StyledSelect = styled(Select)`
  border: 2px solid var(--color-grey-900);
  border-radius: 7px;
  height: 5rem;
  font-size: 2.5rem;
  width: 25rem;
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
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
