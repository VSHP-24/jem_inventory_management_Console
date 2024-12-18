import { Navigate, useSearchParams } from "react-router-dom";
import { useGetCustomers } from "./useGetCustomers";
import Table from "../../ui/Table";
import CustomerRow from "./CustomerRow";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";
import styled from "styled-components";
import { device } from "../../utils/devices";

const customerTableStyles = {
  defaultColumns: ".5fr 1fr 2fr 1.5fr .75fr",
  laptopL: { columns: ".25fr 1fr 1fr ", rows: "1fr 1fr 1fr" },
  tablet: { columns: ".25fr 1fr 1fr", rows: "1fr 1fr 1fr" },
  mobileM: { columns: ".15fr 1fr 1fr", rows: "1fr 1fr 1fr" },
};

const StyledTableColumnLaptopL = styled.div`
  @media ${device.laptopL} {
    grid-column: 2;
  }
`;

const InvisibileBox = styled.div`
  color: var(--color-gold-400);
`;

function DeletedCustomers({ filterDeletedCustomers }) {
  if (!filterDeletedCustomers || filterDeletedCustomers.length === 0)
    return <Empty resourceName={"Deleted Customers"} />;

  return (
    <Table
      columns={"1fr 2.5fr .5fr"}
      modalWindowedTable={true}
      menuListRequired={false}
    >
      <Table.Header>
        <div>Sl No.</div>
        <div>Email</div>
      </Table.Header>
      <Table.Body
        data={filterDeletedCustomers}
        render={(customer, i) => (
          <CustomerRow
            customer={customer}
            index={i}
            key={customer.id}
            id={customer.id}
            deletedTable={true}
          />
        )}
      />
    </Table>
  );
}

function CustomersTable() {
  const { isPending, customers } = useGetCustomers();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  let sortedCustomers;
  let filterDeletedCustomers = [];
  let filterAvailableCustomers = [];
  let currentPage;
  let pageCount;

  if (!isPending) {
    // SORT
    sortedCustomers = customers.sort((a, b) => {
      if (direction === "asc") {
        if (
          a.user[field].toUpperCase() >
          b.user[field].toUpperCase().toUpperCase()
        )
          return 1;

        if (b.user[field].toUpperCase() > a.user[field].toUpperCase())
          return -1;
      }
      if (direction === "desc") {
        if (a.user[field].toUpperCase() > b.user[field].toUpperCase())
          return -1;
        if (b.user[field].toUpperCase() > a.user[field].toUpperCase()) return 1;
      }
      return null;
    });

    // Filter Deleted Customers
    filterDeletedCustomers = sortedCustomers.filter(
      (customer) => !customer.user.active
    );
    // Filter Available Customers
    filterAvailableCustomers = sortedCustomers.filter(
      (customer) => customer.user.active
    );

    currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    pageCount = Math.ceil(customers.length / PAGE_SIZE);
  }

  if (isPending) return <Spinner />;

  if (currentPage > pageCount) return <Navigate replace to="/customers" />;

  return (
    <Table
      deletedTableContent={
        <DeletedCustomers filterDeletedCustomers={filterDeletedCustomers} />
      }
      columns={customerTableStyles}
    >
      <Table.Header>
        <div>Sl No.</div>

        <StyledTableColumnLaptopL>Name</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Email</StyledTableColumnLaptopL>
        <StyledTableColumnLaptopL>Phone Number</StyledTableColumnLaptopL>

        <InvisibileBox>Hello</InvisibileBox>
      </Table.Header>

      <Table.Body
        data={filterAvailableCustomers}
        render={(customer, i) => (
          <CustomerRow
            customer={customer}
            index={i}
            key={customer.id}
            id={customer.id}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={filterAvailableCustomers.length} />
      </Table.Footer>
    </Table>
  );
}

export default CustomersTable;
