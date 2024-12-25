import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { PAGE_SIZE } from "../utils/constants";
import { device } from "../utils/devices";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;
  padding: 0.5rem;

  & span {
    font-weight: 600;
  }

  @media ${device.tablet} {
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    font-size: 0.8rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-gold-500)" : "var(--color-grey-800)"};
  color: ${(props) =>
    props.active ? " var(--color-gold-100)" : "var(--color-gold-500)"};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-grey-900);
    color: var(--color-gold-600);
  }

  @media ${device.mobileM} {
    padding: 0.6rem 0.8rem;

    & svg {
      height: 1rem;
      width: 1rem;
    }

    height: 3rem;
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  //FINDS THE TOTAL NUMBER OF PAGES
  const pageCount = Math.ceil(count / PAGE_SIZE);

  //MOVE TO NEXT PAGE
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  //MOVE TO PREVIOUS PAGE
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <Buttons>
        {currentPage !== 1 && (
          <PaginationButton onClick={prevPage}>
            <HiChevronLeft /> <span>...Previous</span>
          </PaginationButton>
        )}

        <P>
          Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
          <span>
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{" "}
          of <span>{count}</span> results
        </P>

        {currentPage !== pageCount && (
          <PaginationButton onClick={nextPage}>
            <span>Next... </span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
