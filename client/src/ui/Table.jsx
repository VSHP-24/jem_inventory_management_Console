import styled, { css } from "styled-components";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import TableMenuButton from "./TableMenuButton";
import TableMenuList from "./TableMenuList";
import DeletedTableItems from "./DeletedTableItems";

import { PAGE_SIZE } from "../utils/constants";
import { device } from "../utils/devices";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-700);

  font-size: 1rem;
  background-color: var(--color-gold-200);
  border-radius: 7px;
  overflow: hidden;
  width: 100%;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }

  @media ${device.tablet} {
    font-size: 1rem;
  }

  @media ${device.mobileM} {
    font-size: 0.8rem;
  }
`;

const CommonRow = styled.div`
  display: grid;
  transition: none;
  align-items: center;
  padding: 0.5rem 1.2rem;

  grid-template-columns: ${(props) => props?.columns};

  grid-template-columns: ${(props) => props.columns?.defaultColumns};

  @media ${device.laptopL} {
    grid-template-columns: ${(props) => props.columns.laptopL?.columns};
    grid-template-rows: ${(props) => props.columns.laptopL?.rows};
  }

  @media ${device.tablet} {
    grid-template-columns: ${(props) => props.columns.tablet?.columns};
    padding: 0.5rem 1rem;
  }

  @media ${device.mobileM} {
    grid-template-columns: ${(props) => props.columns.mobileM?.columns};
    padding: 0.2rem 0.25rem;
    gap: 0.25rem;
    word-break: break-all;
  }
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-gold-400);
  border-bottom: 1px solid var(--color-grey-700);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-800);

  ${(props) =>
    !props.modalWindowedTable &&
    css`
      @media ${device.laptopL} {
        display: none;
      }
      @media ${device.tablet} {
        display: none;
      }
    `};
`;

const StyledRow = styled(CommonRow)`
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-600);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-gold-400);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;

  /* This will hide the footer when it contains no child elements. */
  &:not(:has(*)) {
    display: none;
  }

  @media ${device.laptopL} {
    padding: 1rem;
  }
  @media ${device.tablet} {
    padding: 0.8rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  padding: 0.5rem;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

const TableContext = createContext();

function Table({
  columns,
  children,
  deletedTableContent,
  modalWindowedTable = false,
  menuListRequired = true,
  tablePosition,
  top,
  right,
}) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const [searchParams] = useSearchParams();

  // IF SEARCHPARAMS DOESN'T HAVE PAGE , DEFAULT IS SET TO 1
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <TableContext.Provider
      value={{
        columns,
        openId,
        position,
        setPosition,
        close,
        open,
        menuListRequired,
        currentPage,
        modalWindowedTable,
        tablePosition,
        top,
        right,
      }}
    >
      <StyledTable role="table">{children}</StyledTable>
      {!modalWindowedTable && (
        <DeletedTableItems deletedTableContent={deletedTableContent} />
      )}
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, modalWindowedTable } = useContext(TableContext);
  return (
    <StyledHeader
      modalWindowedTable={modalWindowedTable}
      role="row"
      columns={columns}
      as="header"
    >
      {children}
    </StyledHeader>
  );
}

function Row({
  children,
  id,
  isDeleting,
  contentType,
  detailPageContent,
  editFormContent,
  deleteContentFrom,
}) {
  const {
    columns,
    openId,
    close,
    open,
    setPosition,
    position,
    menuListRequired,
    tablePosition,
    top,
    right,
  } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}

      {menuListRequired && (
        <TableMenuButton
          id={id}
          openId={openId}
          close={close}
          open={open}
          setPosition={setPosition}
          tablePosition={tablePosition}
          top={top}
          right={right}
        />
      )}

      {openId === id && (
        <TableMenuList
          id={id}
          openId={openId}
          close={close}
          position={position}
          isDeleting={isDeleting}
          contentType={contentType}
          detailPageContent={detailPageContent}
          editFormContent={editFormContent}
          deleteContentFrom={() => {
            deleteContentFrom(id);
            close();
          }}
        />
      )}
    </StyledRow>
  );
}

function Body({ data, render }) {
  const { currentPage, modalWindowedTable } = useContext(TableContext);
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  if (!modalWindowedTable) {
    return (
      <StyledBody>
        {data
          .map(render)
          .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
      </StyledBody>
    );
  }

  if (modalWindowedTable) {
    return <StyledBody>{data.map(render)}</StyledBody>;
  }
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
