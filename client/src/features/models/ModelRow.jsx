import toast from "react-hot-toast";
import styled, { css } from "styled-components";

import RestoreButton from "../../ui/RestoreButton";
import Table from "../../ui/Table";
import ModelDetailPage from "./ModelDetailPage";
import ModelForm from "./ModelForm";

import { useDeleteModel } from "./useDeleteModel";
import { useEditModel } from "./useEditModel";
import { device } from "../../utils/devices";

const columnType = {
  modelDetails: css`
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

function ModelRow({ model, index, id, deletedTable }) {
  const { name, brand, version, year } = model;
  const { isDeleting, deleteModel } = useDeleteModel();

  const { editModel } = useEditModel();

  function handleRestoreButtonClick() {
    //IF BIKE MODEL IS NOT DELETED, BUT BIKE BRAND IS DELETED
    if (!model.isDeleted)
      return toast.error(
        `${model.brand.name} brand is deleted . Restore brand first ! `
      );

    //IF BIKE MODEL IS DELETED
    editModel({ ...model, isDeleted: false });
  }

  ///////////////////////////////////
  // AVAILABLE BIKE MODELS
  ///////////////////////////////////
  return (
    <Table.Row
      id={id}
      isDeleting={isDeleting}
      contentType="Model"
      detailPageContent={<ModelDetailPage model={model} />}
      editFormContent={<ModelForm modelToEdit={model} />}
      deleteContentFrom={deleteModel}
    >
      <div>
        {(index <= 8 && `0${index + 1}`) ||
          (index === 9 && `${index + 1}`) ||
          index + 1}
      </div>

      {!deletedTable && (
        <>
          <StyledColumnLaptopL as="header" type="heading">
            Brand
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="modelDetails">
            {brand.name}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Name
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="modelDetails">{name}</StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Version
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="modelDetails">
            {version}
          </StyledColumnLaptopL>

          <StyledColumnLaptopL as="header" type="heading">
            Year
          </StyledColumnLaptopL>
          <StyledColumnLaptopL type="modelDetails">{year}</StyledColumnLaptopL>
        </>
      )}

      {/* DELETED BIKE MODELS */}
      {deletedTable && (
        <>
          <div>{name}</div>
          <div>{version}</div>
          <div>{year}</div>

          <RestoreButton
            onHandleRestoreButtonClick={handleRestoreButtonClick}
          />
        </>
      )}
    </Table.Row>
  );
}

export default ModelRow;
