import { useState } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";

import { useGetSubCategories } from "./useGetSubCategories";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function SubCategoryTable() {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  const { isPending, subCategories } = useGetSubCategories();

  function handleClick() {
    console.log(
      subCategories.filter(
        (subCategory) => subCategory.isDeleted || subCategory.category.isDeleted
      )
    );
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Table columns=".5fr 1fr 1fr .5fr">
        <Table.Header>
          <div>Sl No.</div>
          <div>Category</div>
          <div>SubCategory</div>
        </Table.Header>

        <Table.Body
          data={subCategories.filter(
            (subCategory) =>
              !subCategory.isDeleted && !subCategory.category.isDeleted
          )}
          render={(subCategory, i) => (
            <SubCategoryRow
              subCategory={subCategory}
              index={i}
              key={subCategory.id}
              openId={openId}
              close={close}
              open={open}
              id={subCategory.id}
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

export default SubCategoryTable;
