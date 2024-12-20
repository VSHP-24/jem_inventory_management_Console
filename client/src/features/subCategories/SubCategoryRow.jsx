import toast from "react-hot-toast";
import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import SubCategoryDetailPage from "./SubCategoryDetailPage";
import SubCategoryForm from "./SubCategoryForm";

import { useDeleteSubCategory } from "./useDeleteSubCategory";
import { useEditSubCategory } from "./useEditSubCategory";
import styled, { css } from "styled-components";
import { device } from "../../utils/devices";

const columnType = {
  subCategoryDetails: css`
    @media ${device.laptopL} {
      grid-column: 3;
    }
    @media ${device.mobileM} {
      grid-column: 3;
    }
  `,

  heading: css`
    font-weight: 600;
    display: none;

    @media ${device.laptopL} {
      grid-column: 2;
      display: block;
    }
  `,
};

const StyledColumnLaptopL = styled.div`
  ${(props) => columnType[props.type]}
`;

function SubCategoryRow({ subCategory, index, id, deletedTable }) {
  const { name, category } = subCategory;
  const { isDeleting, deleteSubCategory } = useDeleteSubCategory();

  const { editSubCategory } = useEditSubCategory();

  function handleRestoreButtonClick() {
    if (!subCategory.isDeleted)
      return toast.error(
        `${subCategory.category.name} category is deleted . Restore Category first ! `
      );
    editSubCategory({ ...subCategory, isDeleted: false });
  }

  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="SubCategory"
      detailPageContent={<SubCategoryDetailPage subCategory={subCategory} />}
      editFormContent={<SubCategoryForm subCategoryToEdit={subCategory} />}
      deleteContentFrom={deleteSubCategory}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>
      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Category
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="subCategoryDetails">
            {category.name}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Name
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="subCategoryDetails">
            {name}
          </StyledColumnLaptopL>
        </>
      )}
      {deletedTable && (
        <>
          <div>{category.name}</div>
          <div>{name}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default SubCategoryRow;
