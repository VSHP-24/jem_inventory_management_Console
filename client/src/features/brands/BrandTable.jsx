import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";

import { useGetBrands } from "./useGetBrands";
import Button from "../../ui/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function BrandTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, brands } = useGetBrands();

  function handleClick() {
    console.log(brands.filter((brand) => brand.isDeleted));
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".5fr 1fr  .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
        </Table.Header>

        <Table.Body
          data={brands.filter((brand) => !brand.isDeleted)}
          render={(brand, i) => (
            <BrandRow
              brand={brand}
              index={i}
              key={brand.id}
              openId={openId}
              close={close}
              open={open}
              id={brand.id}
              position={position}
              setPosition={setPosition}
            />
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
