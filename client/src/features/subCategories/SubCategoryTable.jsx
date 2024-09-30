import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SubCategoryRow from "./SubCategoryRow";
import Button from "../../ui/Button";

import { useGetSubCategories } from "./useGetSubCategories";

const StyledButton = styled(Button)`
  width: 15rem;
`;

function SubCategoryTable() {
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
              id={subCategory.id}
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
