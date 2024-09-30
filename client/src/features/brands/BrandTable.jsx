import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";
import Button from "../../ui/Button";

import { useGetBrands } from "./useGetBrands";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function BrandTable() {
  const { isPending, brands } = useGetBrands();

  function handleClick() {
    console.log(brands.filter((brand) => brand.isDeleted));
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".5fr 1fr .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
        </Table.Header>

        <Table.Body
          data={brands.filter((brand) => !brand.isDeleted)}
          render={(brand, i) => (
            <BrandRow brand={brand} index={i} key={brand.id} id={brand.id} />
          )}
        />
      </Table>
      <StyledButton size="medium" variation="danger" onClick={handleClick}>
        Deleted Items
      </StyledButton>
    </>
  );
}

export default BrandTable;
