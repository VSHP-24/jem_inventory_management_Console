import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 2fr 0.2fr 0.4fr 0.2fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.2rem 1.2rem;

  &:not(:last-child) {
    border-bottom: 0.1rem solid var(--color-grey-600);
  }
`;

function ProductRow({ product, index }) {
  const { name, brand, model, category, subCategory } = product;
  return (
    <TableRow role="row">
      <div>{index + 1}</div>
      <div>{name}</div>
      <div>{brand.name}</div>
      <div>{model.name}</div>
      <div>{category.name}</div>
      <div>{subCategory.name}</div>
      <button>View Details</button>
    </TableRow>
  );
}

export default ProductRow;
